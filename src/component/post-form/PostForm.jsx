import React, { useCallback,useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import DBservice from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import conf from '../../conf/conf.js'

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [AiResponse,setAiResponse] = useState("")

  const submit = async (data) => {
    console.log("Data being sent:", data);
    if (post) {
      const file = data.image[0]
        ? await DBservice.uploadFile(data.image[0])
        : null;

      if (file) {
        console.log(post.featuredImage);
        DBservice.deleteFile(post.featuredImage);
        console.log("File deleted");
      }

      const dbPost = await DBservice.updatePost(post?.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        navigate("/");
        console.log("Error while creating post");
      }
    } else {
      const file = await DBservice.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await DBservice.createPost({
          ...data,
          userId: userData.$id,
        });
        console.log(dbPost);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
          console.log("Post created");
        } else {
          navigate("/");
          console.log("Error while creating post");
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);


  async function callHuggingFaceAPI(aiprompt) {
    const url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";
    const headers = {
      Authorization: conf.AiApiToken,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      inputs: aiprompt,
      parameters: { max_length: 180 },
    });

   
      try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        });
        const result = await response.json();

       
        let  output = result[0]?.generated_text.replace(/\n+/g, " ");
        console.log(output)
        if (output.includes(aiprompt)) {
            output = output.replace(aiprompt + '?', " ").trim();
          }
        console.log(output)
       
        return output;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
  }

  

  const handleAICall = async () => {
    const aiprompt = getValues("AI-Blog");
    if (!aiprompt) {
      alert("Please give a prompt");
      return;
    }
  
    try {
      const response = await callHuggingFaceAPI(aiprompt);
      const aiContent = response || "No Response from AI";
     
      setValue("content", aiContent); 
      setAiResponse(aiContent); 
    } catch (error) {
      console.error("Error calling AI:", error);
      setAiResponse("Failed to get a response from AI.");
    }
  };
    return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap flex-col lg:flex-row"
    >
      <div className="lg:w-2/3 px-2 flex-col w-full">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 border border-gray-500"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 border border-gray-500"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        <div>
        <Input
            label="Get Help From AI"
            type="text"
            className="w-full mb-2 border border-gray-400 "
            {...register("AI-Blog", { required: false })}
          />
          <Button
            type="button"
            onClick={handleAICall}
            className="bg-black text-white px-4 py-2 rounded w-full  lg:w-[60%] font-semibold"
          >
            Send
          </Button>
        </div>
      </div>
      <div className="lg:w-1/3 w-full mt-6 lg:mt-0 px-2 ">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 border border-gray-400"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={DBservice.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 border border-gray-400"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-black"}
          className="w-full text-white rounded-md"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

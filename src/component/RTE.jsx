import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";
import { useSelector } from "react-redux";

export default function RTE({ name, control, label, defaultValue = "" }) {
  // Check if dark mode is enabled
  const theme = useSelector((store) => store.theme.theme);
  const [editorKey, setEditorKey] = useState(0);

  // Reinitialize the editor when the theme changes
  useEffect(() => {
    setEditorKey((prevKey) => prevKey + 1);
    
  }, [theme]);


  return (
    <div className="w-full rounded-md mb-4 border border-gray-300 dark:border-gray-900">
      {label && (
        <label className="inline-block mb-1 dark:text-white pl-1">{label}</label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.TinyApi}
            initialValue={defaultValue}
             key={editorKey}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              skin: theme === "dark" ? "oxide-dark" : "oxide", // TinyMCE dark/light skin
              content_css: theme === "dark" ? "dark" : "", // Content styles for iframe
              content_style: `
                body {
                  background-color: ${theme === "dark" ? "black" : "white"};
                  color: ${theme === "dark" ? "white" : "black"};
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 14px;
                }
              `,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

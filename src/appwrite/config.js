import {Client,Databases,Storage,ID, Query} from 'appwrite'
import conf from '../conf/conf.js'
export class Service{

    client = new Client();
    bucket;
    databases;

    constructor(){
        
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.ProjectId)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    //Post Collection

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            
       return await this.databases.createDocument(
            conf.DatabaseId,
            conf.PostCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
          )

        } catch (error) {
            const err = ("Error!: Appwrite Error Post cant create",error)
            return err;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.DatabaseId,
                conf.PostCollectionId,
                slug,
                {
                   title,
                   content,
                   featuredImage,
                   status
                }
            )
        } catch (error) {
            console.log("Error while updating post at appwrite",error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.DatabaseId,conf.PostCollectionId,slug)
            return true;

        } catch (error) {
            console.log("error while deleting post at appwrite",error)
            return false;
        }
    }

    async getPost(slug){
        try {
           const post =  await this.databases.getDocument(conf.DatabaseId,conf.PostCollectionId,slug)
           return post;
        } catch (error) {
            console.log("Error while getting post",error)
        }
    }

    async getAllPosts(queries = [Query.equal("status",'active')]){
        try {
         return  await this.databases.listDocuments(
                conf.DatabaseId,
                conf.PostCollectionId,
                queries
                
            )
        } catch (error) {
            console.log("error while getting Posts",error)
        }
    }

    async getUserPosts(userId){
      try {
       const userPosts =  await this.databases.listDocuments(
            conf.DatabaseId,
            conf.PostCollectionId,
            Query.equal["userId",userId]
        )
        return userPosts;
      } catch (error) {
        console.log("Error while fetching user posts")
      }
    }

    //File Handling
    async uploadFile(file){
        try {
            
            return await this.storage.createFile(
                conf.BucketId,
                ID.unique(),
                file
            )


        } catch (error) {
            console.log("Error while uploading file",error)
            return false
        }
    }

    async deleteFile(fileId){
     try {
        await this.storage.deleteFile(
            conf.BucketId,
            fileId
        )
     } catch (error) {
        console.log("error while deleting file",error);
     }
    }

     getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.BucketId,
            fileId
        )
    }

    async incrLike(userId, slug) {
        try {

            const currentDocument = await this.databases.getDocument(
                conf.DatabaseId,
                conf.PostCollectionId,
                slug
            );
    
           let updatedLikes;

            const currentLikes = currentDocument.likes || [];
            if (currentLikes.includes(userId)) {
               
             updatedLikes =   currentLikes.filter((like) => like !== userId)
            }else{
                updatedLikes = [...currentLikes, userId];
            }
    
           
       
    
           
            const updatedDocument = await this.databases.updateDocument(
                conf.DatabaseId,
                conf.PostCollectionId,
                slug,
                {
                    likes: updatedLikes,
                }
            );
            return updatedDocument.likes;
    
        } catch (error) {
            console.log("Error while updating post at Appwrite", error);
        }
    }
    
   



    //Comment collection

    async addComment({slug,content,userId,name}){
       try {
         await this.databases.createDocument(
            conf.DatabaseId,
            conf.CommentCollectionId,
            'unique()',
            {
             blogId:slug,
             content,
             userId,
             name
            }    
        )
        console.log("Comment added")
        return;
       } catch (error) {
         console.log("Error while commenting on a post",error)
       }
    }

    async getComment(slug){
        try {
            return  await this.databases.listDocuments(
              conf.DatabaseId,
              conf.CommentCollectionId,
              [Query.equal('blogId', slug)]
            )


            
        } catch (error) {
            console.log("Error while fecthing comments",error)
        }
    }

    async deleteComment(commentId){
        try {
            await this.databases.deleteDocument(conf.DatabaseId,conf.CommentCollectionId,commentId)
            return true;

        } catch (error) {
            console.log("error while deleting post at appwrite",error)
            return false;
        }
    }
    
    async updateComment(commentId,content){
        try {
          return  await  this.databases.updateDocument(
            conf.DatabaseId,
            conf.CommentCollectionId,
            commentId,
            {
                content
            }
            )
        } catch (error) {
            console.log("Error while updating comment",error)
        }
    }


     // Users Collection

    async createUser(username,userID){
      try {
        return await this.databases.createDocument(
            conf.DatabaseId,
            conf.UsersCollectionId,
            'unique()',
            {
                username,
                userID
            }

        )
      } catch (error) {
        console.log("Error while adding user to usercollection",error)
      }
        
    }

    async getUser(userID) {
        try {
            const result = await this.databases.listDocuments(
                conf.DatabaseId,         // Your database ID
                conf.UsersCollectionId,  // Your collection ID
                [Query.equal('userID', userID)] // Correct syntax for querying
            );
    
            if (result.documents.length === 0) {
                throw new Error("No user found with the provided userID.");
            }
    
            if (result.documents.length > 1) {
                console.warn("Multiple users found. Returning the first match.");
            }
    
            return result.documents[0];
        } catch (error) {
            console.log("Error while getting the user", error);
            throw error; 
        }
    }
    
}






const DBservice = new Service();

export default DBservice;
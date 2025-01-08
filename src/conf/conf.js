const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    BucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    DatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    PostCollectionId: String(import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID ),
    CommentCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID ),
    ProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    TinyApi: String(import.meta.env.VITE_TINY_API_KEY),
    UsersApi: String(import.meta.env.VITE_APPWRITE_USERS_API),
    UsersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    AiApiToken:String(import.meta.env.VITE_AI_MODEL_API),
}
export default conf; 
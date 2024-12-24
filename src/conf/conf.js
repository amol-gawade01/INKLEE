const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    BucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    DatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    CollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID ),
    ProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    TinyApi: String(import.meta.env.VITE_TINY_API_KEY)
}
export default conf; 
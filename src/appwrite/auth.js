import { Client,Account,ID } from "appwrite";
import conf  from "../conf/conf";



export class AuthService{

  client = new Client();
  account;


  constructor(){

    this.client
     .setEndpoint(conf.appwriteUrl)
     .setProject(conf.ProjectId)

     this.account = new Account(this.client);
  }

  async createAccount({email,password,name}){
    try {
        const userAccount = await this.account.create(ID.unique(),email,password,name);
     
    } catch (error) {
        throw error
    }

  }

  async loginUser({email,password}){
    try {
       return await this.account.createEmailPasswordSession(email,password);
    } catch (error) {
        throw error;
    }
  }

  async getCurrentUser() {
    try {
        const user = await this.account.get();
        return user;
    } catch (error) {
        if (error.code === 401) {
            console.error("No user is currently logged in.");
            return null; // Return null if the user is not logged in
        }
        console.error("Error fetching current user:", error);
        throw error; // Rethrow any other error
    }
}


  async logout(){
    try {
        await this.account.deleteSessions()

    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);   
    }
  }

}


const authService = new AuthService();  


export default authService;
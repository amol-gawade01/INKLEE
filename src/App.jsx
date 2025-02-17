import { useState,useEffect} from 'react' 
import { login,logout } from './store/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import authService from './appwrite/auth';
import { Header,Footer,Shimmer } from './component/index.js';
import { Outlet } from 'react-router-dom';


function App() {

   const [loading,setLoading] = useState(true);
   const theme = useSelector((store) => store.theme.theme);
   const dispatch = useDispatch()


   useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        console.log("This is user",userData)
        dispatch(login({userData}))
        
      }else{
        dispatch(logout())
      }
    })

    .finally(() => setLoading(false))


     
   }, [])
   
   useEffect(() => {
    document.body.className = "" // Set the class based on theme
    document.body.className = theme; // Set the class based on theme
  }, [theme]);


  if (loading) {
    return <>
    <Header/>
    <div className=' text-center items-center w-screen h-screen mt-40'>

    <Shimmer/>
    </div>
    
    </>
  }else{
    return <>
     <Header/>
     <main className='min-h-screen'>
     <Outlet/>
     </main>
     <Footer/>
    </>
  }
}

export default App

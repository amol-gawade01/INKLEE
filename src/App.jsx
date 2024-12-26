import { useState,useEffect} from 'react' 
import { login,logout } from './store/authSlice.js';
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth';
import { Header,Footer,Shimmer } from './component/index.js';
import { Outlet } from 'react-router-dom';


function App() {

   const [loading,setLoading] = useState(true);
   const dispatch = useDispatch()


   useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
        
      }else{
        dispatch(logout())
      }
    })

    .finally(() => setLoading(false))
     
   }, [])
   


  if (loading) {
    return <>
    <Header/>
    <Shimmer/>
    <Footer/>
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

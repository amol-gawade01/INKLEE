import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container,LogoutBtn,Logo } from '../index.js'
import { useNavigate } from 'react-router-dom' 
function Header() {
  const authStatus = useSelector((store) => store.auth.status)
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
    <header>
       <Container>
        <nav className='flex'>
          <div>

          <Link>
          <Logo width='70px'/>
          </Link>
          </div>
          <div>
            <ul className='flex ml-auto'>
              {navItems.map((item) => item.active ?  (
              <li key={item.name}>
                <button  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={() => navigate(item.slug)}>{item.name}</button>
              </li>) : null)}
              {authStatus && (<li><LogoutBtn/> </li>)}
            </ul>
          </div>
        </nav>
       </Container>
    </header>
  )
}

export default Header
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, LogoutBtn, Logo } from "../index.js";
import { useNavigate } from "react-router-dom";
function Header() {
  const authStatus = useSelector((store) => store.auth.status);
  const userData = useSelector((store) => store.auth.userData);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
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
    {
      name: "Profile",
      slug: `/Profile`,
      active: authStatus,
    },
  ];
  return (
    <header className="select-none">
      <Container>
        <nav className="flex justify-center">
          <div className="relative right-[400px] mt-5">
            <Link>
              <Logo/>
            </Link>
          </div>
          <div className="mt-4">
            <ul className="flex ml-auto">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="text-black font-semibold">
                    <button
                      className="inline-bock px-6 py-2 duration-200 hover:bg-black hover:text-white rounded-full "
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="text-black font-semibold ">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

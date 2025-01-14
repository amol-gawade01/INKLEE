import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, LogoutBtn, Logo, Input } from "../index.js";
import { useNavigate } from "react-router-dom";
import { changeTheme } from "../../store/themeSlice.js";

function Header() {
  const authStatus = useSelector((store) => store.auth.status);
  const theme = useSelector((store) => store.theme.theme);
  const [colortheme, setColortheme] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Profile", slug: `/Profile`, active: authStatus },
  ];

  const handleThemeToggle = () => {
    setColortheme((prev) => !prev);
    dispatch(changeTheme(!colortheme));
  };

  const menuIcon = theme === "light" 
  ? {
      open: "https://res.cloudinary.com/vipeocloud/image/upload/v1736869267/close_sycvh9.png",
      closed: "https://res.cloudinary.com/vipeocloud/image/upload/v1736869267/menu_bt9fpc.png",
    }
  : {
      open: "https://res.cloudinary.com/vipeocloud/image/upload/v1736869267/close_1_iioy0i.png",
      closed: "https://res.cloudinary.com/vipeocloud/image/upload/v1736870443/menu_1_x2e1kx.png",
    };
   
  return (
    <header className="select-none ">
      <Container>
        <nav className="flex items-center justify-between p-4">
          {/* Logo */}
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black focus:outline-none"
            >
              <img
                src={menuOpen ? menuIcon.open : menuIcon.closed}
                className="w-8 h-8 mt-3"
                alt="Menu Toggle"
              />
            </button>
          </div>

          {/* Navigation Menu */}
          <ul
            className={`${
              menuOpen ? "block" : "hidden"
            } lg:flex lg:space-x-6 absolute bg-black lg:bg-transparent lg:static top-16 left-0 w-full mt-5 z-20 shadow-md lg:shadow-none lg:w-auto`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li
                    key={item.name}
                    className="text-white dark:text-white lg:text-black font-semibold text-center lg:text-left"
                  >
                    <button
                      className="inline-bock px-6 py-2 duration-200 hover:bg-black  hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full"
                      onClick={() => {
                        setMenuOpen(false); // Close menu on mobile
                        navigate(item.slug);
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li className="dark:text-white  lg:text-black font-semibold text-center lg:text-left ">
                <LogoutBtn />
              </li>
            )}
            <li className="flex items-center">
              <div className="toggle-container mt-1">
                <label className="switch">
                  <input
                    type="checkbox"
                    id="mode-toggle"
                    onChange={handleThemeToggle}
                  ></input>
                  <span className="slider"></span>
                </label>
              </div>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

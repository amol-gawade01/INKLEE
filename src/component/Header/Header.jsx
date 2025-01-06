import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, LogoutBtn, Logo } from "../index.js";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((store) => store.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Profile", slug: `/Profile`, active: authStatus },
  ];

  return (
    <header className="select-none bg-white shadow-md">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
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
                    className="text-white lg:text-black font-semibold text-center lg:text-left"
                  >
                    <button
                      className="inline-bock px-6 py-2 duration-200 hover:bg-black hover:text-white rounded-full"
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
              <li className="text-white lg:text-black font-semibold text-center lg:text-left">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

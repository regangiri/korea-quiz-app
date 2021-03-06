import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";
import { Link } from "react-router-dom";
import Icon from "react-hero-icon";
import Courses from "./Courses";

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [isActive, setActive] = useState(false);
  const [login, setLogin] = useState(false);
  const [session, setSession] = useState(null);

  const { data: authListener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === "SIGNED_IN") {
        setLogin(true);
      }
      if (event === "SIGNED_OUT") {
        setLogin(false);
      }
    }
  );

  const handleToggle = () => {
    setActive(!isActive);
  };

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const loginWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  if (navbar) {
    return (
      <header className="block sm:flex justify-center sm:justify-around sticky duration-500 top-0 z-50 items-center bg-secondary sm:py-5">
        <div className="title text-sm sm:text-3xl">
          <Icon
            className="flex w-10 h-10 sm:hidden"
            icon="menu"
            type="solid"
            onClick={handleToggle}
          />

          <h1 className="brand p-2 text-white lg:text-5xl sm:font-semibold text-xl">
            EasyToLearning
          </h1>
        </div>
        <div
          className={
            isActive
              ? "nav-items text-xs sm:flex block "
              : "nav-items text-xs sm:flex hidden "
          }
        >
          <Link to="/">
            <div className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  ">
              Home
            </div>
          </Link>
          {session ? (
            <Link to="/course">
              <div className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  ">
                Courses
              </div>
            </Link>
          ) : null}
          {session ? (
            <Link to="/dictionary">
              <div className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  ">
                Dictionary
              </div>
            </Link>
          ) : null}
          {session ? (
            <Link to="/speakingpractice">
              <div className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  ">
                Speaking Practice
              </div>
            </Link>
          ) : null}
          <Link to="/about">
            <div className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  ">
              About Me
            </div>
          </Link>

          {login ? (
            <button
              onClick={logout}
              className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  "
            >
              Logout
            </button>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  "
            >
              Login
            </button>
          )}
        </div>
      </header>
    );
  } else {
    return (
      <header className="block sm:flex justify-center sm:justify-around  duration-1000 top-0 z-50 items-center  pb-2 sm:py-5">
        <div className="title text-sm sm:text-3xl">
          <Icon
            className="flex w-10 h-10 sm:hidden"
            icon="menu"
            type="solid"
            onClick={handleToggle}
          />
          <h1 className="brand p-2 text-black lg:text-5xl sm:font-semibold text-xl">
            EasyToLearning
          </h1>
        </div>
        <div
          className={
            isActive
              ? "nav-items text-xs sm:flex block "
              : "nav-items text-xs sm:flex hidden "
          }
        >
          <Link to="/">
            <div className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  ">
              Home
            </div>
          </Link>
          {session ? (
            <Link to="/course">
              <div className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  ">
                Courses
              </div>
            </Link>
          ) : null}
          {session ? (
            <Link to="/dictionary">
              <div className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  ">
                Dictionary
              </div>
            </Link>
          ) : null}
          {session ? (
            <Link to="/speakingpractice">
              <div className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  ">
                Speaking Practice
              </div>
            </Link>
          ) : null}
          <Link to="/about">
            <div className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  ">
              About Me
            </div>
          </Link>

          {login ? (
            <button
              onClick={logout}
              className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  "
            >
              Logout
            </button>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="nav-links text-lg py-3 font-bold mx-2 lg:mx-5 sm:text-xl text-black hover:text-red-600 lg:hover:scale-125  "
            >
              Login
            </button>
          )}
        </div>
      </header>
    );
  }
}

export default Navbar;

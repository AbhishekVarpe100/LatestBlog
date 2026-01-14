import React from "react";
import { Link, Outlet } from "react-router-dom";

function MainHome() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">

      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex gap-6 fixed w-full top-16 z-30">
        <Link to="/mainhome" className="text-blue-600 font-semibold">
          Home
        </Link>

        <Link to="/mainhome/blogs" className="text-blue-600 font-semibold">
          Blogs
        </Link>

        <Link to="/mainhome/favblogs" className="text-blue-600 font-semibold">
          Favourite Blogs
        </Link>
      </nav>

      {/* Main content */}
      <section className="p-6 mt-20">
        <Outlet />
      </section>

    </div>
  );
}

export default MainHome;

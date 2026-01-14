import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [failed, setFailed] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (res.data.msg && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setSuccess("Login successful");
        setTimeout(() => {
          setSuccess("");
          setTimeout(() => {
            navigate("/mainhome");
            setTimeout(()=>{
              window.location.reload()
            },500)
          }, 2000);
        }, 3000);
      } else if (res.data) {
        setFailed(res.data);
        setTimeout(() => {
          setFailed("");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      localStorage.getItem("token")
        ? navigate("/mainhome")
        : null;
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="w-full max-w-sm bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Login
        </h2>

        {/* Success / Error Message */}
        <>
          {success && (
            <p className="text-sm text-green-600 bg-green-100 px-3 py-2 rounded-lg text-center mb-4 animate-fadeIn">
              {success}
            </p>
          )}
          {failed && (
            <p className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded-lg text-center mb-4 animate-fadeIn">
              {failed}
            </p>
          )}
        </>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 text-sm shadow-sm"
          />

          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 text-sm shadow-sm"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;

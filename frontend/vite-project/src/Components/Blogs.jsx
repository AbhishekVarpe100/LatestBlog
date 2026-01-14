import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Blogs() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [render, setRender] = useState(false);
  const [progress, setProgress] = useState(0);

  // Add Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3000/add-blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      if (res.data.message) {
        alert("Blog saved");
        setProgress(0);
        setTitle("");
        setDesc("");
        setFile(null);
        setRender((prev) => !prev);
      }
    } catch (err) {
      console.log("Upload error:", err);
    }
  };

  // Get Blogs
  const getBlog = async () => {
    const res = await axios.get("http://localhost:3000/get-blogs");
    setBlogs(res.data);
  };

  // Delete Blog
  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const res = await axios.delete(`http://localhost:3000/delete-blog/${id}`);

    if (res.data) {
      alert("Blog deleted");
      setRender((prev) => !prev);
    }
  };

  useEffect(() => {
    getBlog();
  }, [render]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* ---------- Create Blog Section ---------- */}
      <h1 className="text-4xl font-bold text-center mb-8">Create a Blog</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 mt-1"
              rows="4"
              placeholder="Enter description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-gray-700">Upload Image</label>
            <input
              type="file"
              className="mt-1"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          {/* Upload Progress */}
          {progress > 0 && progress < 100 && (
            <div className="mb-4">
              <p className="text-gray-700 mb-1">Uploading: {progress}%</p>
              <div className="w-full bg-gray-200 h-3 rounded-lg">
                <div
                  className="bg-blue-500 h-3 rounded-lg transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Blog
          </button>
        </form>
      </div>

      {/* ---------- All Blogs Section ---------- */}
      <div>
        {blogs?.map((ele) => (
          <div
            key={ele._id}
            className="bg-white shadow-md rounded-xl mb-6 overflow-hidden"
          >
            <div className="p-5">
              <h2 className="text-2xl font-semibold">{ele.title}</h2>

              <p className="text-gray-700 mt-2">
                {ele.description?.length > 120
                  ? ele.description.substring(0, 120) + "..."
                  : ele.description}
              </p>

              {ele.description?.length > 120 && (
                <Link
                  to={`${ele._id}`}
                  className="text-blue-600 font-medium mt-2 inline-block"
                >
                  Read More →
                </Link>
              )}
            </div>

            {ele.file && (
              <img
                src={ele.file}
                alt="blog"
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-5">
              <button
                onClick={() => deleteBlog(ele._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;

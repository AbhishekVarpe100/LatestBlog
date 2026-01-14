import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function OneBlog() {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/get-a-blog/${id}`);
      setData(res.data);
    } catch (error) {
      console.log("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {data.title}
        </h1>

        {/* Image */}
        {data.file && (
          <img
            src={data.file}
            alt="Blog"
            className="w-full rounded-xl shadow-md mb-6 object-cover max-h-[450px]"
          />
        )}

        {/* Description */}
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
          {data.description}
        </p>
      </div>
    </div>
  );
}

export default OneBlog;

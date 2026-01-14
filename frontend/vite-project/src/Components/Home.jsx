import React, { useState, useEffect } from "react";

function Home() {
  const slides = [
    {
      img: "https://picsum.photos/id/1011/1600/900",
      title: "Welcome to Our Blog",
      desc: "Explore stories, ideas, and insights from amazing writers."
    },
    {
      img: "https://picsum.photos/id/1006/1600/900",
      title: "Latest Tech Trends",
      desc: "Stay ahead with news about AI, Web Dev, Cloud, and more."
    },
    {
      img: "https://picsum.photos/id/1021/1600/900",
      title: "Creative Lifestyle",
      desc: "Discover creativity, motivation, and productivity tips."
    },
    {
      img: "https://picsum.photos/id/1035/1600/900",
      title: "Travel Adventures",
      desc: "Get inspired by amazing travel destinations and tips."
    },
    {
      img: "https://picsum.photos/id/1042/1600/900",
      title: "Health & Wellness",
      desc: "Learn how to maintain a balanced lifestyle for mind and body."
    },
    {
      img: "https://picsum.photos/id/1050/1600/900",
      title: "Food & Recipes",
      desc: "Delicious recipes and culinary inspiration from around the world."
    },
    {
      img: "https://picsum.photos/id/1062/1600/900",
      title: "Photography Insights",
      desc: "Tips, tutorials, and inspiration for photography enthusiasts."
    },
    {
      img: "https://picsum.photos/id/1070/1600/900",
      title: "Business & Startups",
      desc: "Latest trends, insights, and stories from the startup world."
    },
    {
      img: "https://picsum.photos/id/1084/1600/900",
      title: "Art & Culture",
      desc: "Explore art, culture, and creative expression across the globe."
    },
    {
      img: "https://picsum.photos/id/1045/1600/900",
      title: "Motivation & Self-Growth",
      desc: "Get inspired and grow personally and professionally every day."
    }
  ];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* SLIDE */}
      <div
        className="w-full h-full bg-cover bg-center duration-1000"
        style={{ backgroundImage: `url(${slides[current].img})` }}
      >
        {/* Overlay */}
        <div className="w-full h-full bg-gradient-to-r from-black/60 via-black/40 to-transparent flex flex-col justify-center p-10 sm:p-16">
          <h1 className="text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg animate-fade">
            {slides[current].title}
          </h1>

          <p className="text-gray-200 mt-3 text-lg sm:text-xl max-w-xl animate-fade">
            {slides[current].desc}
          </p>

        
        </div>
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="absolute top-1/2 left-5 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md text-black p-3 rounded-full shadow-xl duration-300"
      >
        ❮
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute top-1/2 right-5 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md text-black p-3 rounded-full shadow-xl duration-300"
      >
        ❯
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 flex-wrap max-w-[90%] justify-center">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 rounded-full cursor-pointer border border-white ${
              current === index
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/40"
            } duration-300`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Home;

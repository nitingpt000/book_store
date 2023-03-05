import React from "react";
import { Carousel } from "antd";
import { Images } from "../assets";
import BookList from "../components/BookList";
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Home = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <section>
      <div className="bg-gray-900 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <img
              className="w-full h-full object-contain object-center"
              src={Images.cover1}
              alt="Hero Image"
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <img
              className="w-full h-full object-cover object-center"
              src={Images.cover2}
              alt="Hero Image"
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <BookList />
      </div>
    </section>
  );
};

export default Home;

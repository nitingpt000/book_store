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
      <div className="">
        <img src={Images.cover1} alt="book" />
      </div>
      <div>
        <img src={Images.cover2} alt="book" />
      </div>
      <div className="flex justify-center w-[80%]">
        <BookList />
      </div>
    </section>
  );
};

export default Home;

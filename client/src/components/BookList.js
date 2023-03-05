import React from "react";
import { Col, Row } from "antd";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const navigate = useNavigate();
  const handleBookCard = () => {
    navigate("/book/1");
  };
  return (
    <>
      <Row gutter={[32, 32]} justify="center">
        {[...Array(100).fill(1)].map((book) => {
          return <BookCard onClick={handleBookCard} />;
        })}
      </Row>
    </>
  );
};

export default BookList;

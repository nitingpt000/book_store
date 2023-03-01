import React from "react";
import { Col, Row } from "antd";
import BookCard from "./BookCard";

const BookList = () => {
  return (
    <>
      <Row gutter={[32, 32]}>
        {[...Array(100).fill(1)].map((book) => {
          return <BookCard />;
        })}
      </Row>
    </>
  );
};

export default BookList;

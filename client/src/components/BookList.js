import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../helpers/constants";
const BookList = () => {
  const [data,setData]= useState([]);
  const navigate = useNavigate();
  const handleBookCard = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  useEffect(()=>{
    axios.get(`${apiUrl}/book`).then(result=>setData(result.data.data)).catch(console.warn)
    console.log(data)
  },[data]);
  return (
    <>
      <Row gutter={[32, 32]} justify="center">
        {data.map((book) => {
          return <BookCard onClick={()=>handleBookCard(book.book_id)} bookData={book} />;
        })}
      </Row>
    </>
  );
};

export default BookList;

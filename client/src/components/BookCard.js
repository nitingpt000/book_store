import React, { useState, useEffect } from "react";
import { Card, Tag, Skeleton, Avatar, Row } from "antd";
import { apiUrl } from "../helpers/constants";

const imagePath= apiUrl
const BookCard = ({ onClick,bookData }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const {author,book_id,genre_id,image_url,isbn,price,title,publisher,genre_name}=bookData
  useEffect(() => {
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      className="m-2 p-2"
      onClick={onClick}
    >
      {isLoading ? (
        <Avatar
          size="large"
          shape="square"
          style={{ width: "100%", height: "10rem" }}
        />
      ) : (
        <img
          alt="example"
          crossOrigin="anonymous"
          src={imagePath+image_url}
          onLoad={() => setIsLoading(false)}
        />
      )}
      <div style={{ marginTop: "1rem" }}>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col justify-center items-center py-2 gap-2">
            <div className="font-bold text-xl">${price}</div>
            <div className="text-center">
              {title}
            </div>
            <div className="font-semibold">{author}</div>
            <Row className="flex py-2">
              <Tag className="bg-black text-white ">{genre_name}</Tag>
             
            </Row>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BookCard;

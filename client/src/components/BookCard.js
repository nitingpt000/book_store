import React, { useState, useEffect } from "react";
import { Card, Tag, Skeleton, Avatar, Row } from "antd";
import { Images } from "../assets";
import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;

const BookCard = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

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
          src={Images.book1}
          onLoad={() => setIsLoading(false)}
        />
      )}
      <div style={{ marginTop: "1rem" }}>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col justify-center items-center py-2 gap-2">
            <div className="font-bold text-xl">$40.34</div>
            <div className="text-center">
              The Courage to Be Free: Florida's Blueprint for America's Revival
            </div>
            <div className="font-semibold">George Bush</div>
            <Row className="flex py-2">
              <Tag className="bg-black text-white ">fiction</Tag>
              <Tag className="bg-black text-white">non-fiction</Tag>
              <Tag className="bg-black text-white">science</Tag>
            </Row>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BookCard;

import {
  Button,
  Card,
  Col,
  Divider,
  InputNumber,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { useState, useEffect } from "react";
import { Images } from "../assets";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

function ProductDetail({
  name = "book",
  description = "some here",
  price = "0",
  imageUrl,
}) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = () => {
    // Implement the functionality to add the product to the user's cart.
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Card className="py-12">
      <Row gutter={[16, 16]}>
        <Col span={10} className="flex flex-col items-center justify-center">
          {isLoading ? (
            <Skeleton.Image style={{ width: 200, height: 300 }} />
          ) : (
            <img src={Images.book1} alt={name} style={{ maxWidth: "100%" }} />
          )}
        </Col>
        <Col span={14}>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <>
              <Title level={2}>{name}</Title>
              <Divider />
              <Text>{description}</Text>
              <Divider />
              <Text strong>{`Price: $${price}`}</Text>
              <Divider />
              <InputNumber
                min={1}
                max={10}
                defaultValue={1}
                onChange={handleQuantityChange}
              />
              <Divider />
              <Button
                type="default"
                style={{ marginRight: 16 }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button type="default" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default ProductDetail;

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
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import { actions } from "../contexts/store/actions";
import {
  useStoreDispatch,
  useStoreState,
} from "../contexts/store";
import { apiUrl } from "../helpers/constants";

const { Title, Text } = Typography;
const imagePath= apiUrl;
function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const storeDispatch = useStoreDispatch();
  const { cartList } = useStoreState();
  const [data,setData]= useState({});
  const navigate = useNavigate();
  const {bookId} = useParams();
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  const {book_id,title,author,publisher,publication_date,isbn,genre_name,price,stock_count,image_url}=data

  const handleAddToCart = () => {
    // Implement the functionality to add the product to the user's cart.
    const items = [...cartList, { book_id,quantity,price }];
    actions.addItemToCart(storeDispatch, items);
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };
  useEffect(() => {
    actions.fetchCartItems(storeDispatch, cartList);
  }, [storeDispatch, cartList]);

  useEffect(() => {
    axios.get(`${apiUrl}/book/${bookId}`).then(result=>setData(result.data.data))
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
            <img src={imagePath+image_url} alt={title} style={{ maxWidth: "100%" }} crossOrigin="anonymous" />
          )}
        </Col>
        <Col span={14}>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <>
              <Title level={2}>{title}</Title>
              <Text strong>{`By: ${author}`}</Text>
              <Divider />
              <div className="flex flex-col">

              <Text>{`${title}`}</Text>
              <Text>{`Publication: ${publisher}`}</Text>
              <Text>{`Publication Date: ${new Date(publication_date).toLocaleDateString()}`}</Text>
              <Text>{`ISBN: ${isbn}`}</Text>
              <Text>{`In Stocks: ${stock_count}`}</Text>
              </div>
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

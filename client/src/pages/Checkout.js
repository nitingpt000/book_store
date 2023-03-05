import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSuccessModal from "../components/OrderSuccessModal";
import { useStoreState,useStoreDispatch } from "../contexts/store";
import { actions } from "../contexts/store/actions";
import axios from 'axios'
import { apiUrl } from "../helpers/constants";
const { Title, Text } = Typography;

function CheckoutPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [total,setTotal]=useState(0)
  const storeDispatch = useStoreDispatch();
  const {cartList} = useStoreState();
  console.log(cartList)
  const navigate = useNavigate();
  const afterCheckout = () => {
    // Implement the functionality to add the product to the user's cart.
    const items = [];
    actions.addItemToCart(storeDispatch, items);
  };
  const handleOrderClick = () => {
    // Perform the order processing logic here
    // ...
    console.log(cartList);
    const order = {customerId:2,orderTotal:total,bookList:[{bookId:10,quantity:2},{bookId:10,quantity:2}]}
    axios.post(`${apiUrl}/order`,order);
    afterCheckout()
    // Set the modal visibility to true to show the success message
    setModalVisible(true);
  };

  const handleModalOk = () => {
    // Handle the "Ok" button click in the modal
    // ...

    // Set the modal visibility to false to hide the modal
    navigate("/");
  };
  


  useEffect(() => {
    actions.fetchCartItems(storeDispatch, cartList);
    setTotal(cartList.reduce((acc,cumm)=>{
      acc+=(cumm.price*cumm.quantity)
      return acc
    },0))
  }, [storeDispatch, cartList]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Spin tip="Loading..." spinning={false} size="large">
        <Card>
          <Title level={2}>Checkout</Title>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={8} offset={4}>
              <Title level={3}>Shipping Information</Title>
              <Divider />
              <Form onFinish={() => {}} layout="vertical">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name." },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email." },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: "Please enter your address." },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    { required: true, message: "Please enter your city." },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="State/Province"
                  name="state"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your state/province.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Zip/Postal Code"
                  name="zip"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your zip/postal code.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
              <OrderSuccessModal visible={modalVisible} onOk={handleModalOk} />
            </Col>
            <Col span={8} offset={4} className="flex flex-col">
              <Title level={3}>Order Summary</Title>
              <Divider />
              <Text>Sub Total: ${total}</Text>
              <Divider />
              <Text strong>Total: ${total}</Text>
              <Button
                type="default"
                htmlType="submit"
                onClick={handleOrderClick}
                className="my-4"
              >
                Complete Checkout
              </Button>
            </Col>
          </Row>
        </Card>
      </Spin>
    </Space>
  );
}

export default CheckoutPage;

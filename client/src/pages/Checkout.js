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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSuccessModal from "../components/OrderSuccessModal";
const { Title, Text } = Typography;

function CheckoutPage() {
  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleOrderClick = () => {
    // Perform the order processing logic here
    // ...

    // Set the modal visibility to true to show the success message
    setModalVisible(true);
  };

  const handleModalOk = () => {
    // Handle the "Ok" button click in the modal
    // ...

    // Set the modal visibility to false to hide the modal
    navigate("/");
  };

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
              <Text>Example Product: $19.99</Text>
              <Divider />
              <Text strong>Total: $19.99</Text>
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

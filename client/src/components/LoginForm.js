import { Form, Input, Button, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setIsLoading(true);
    setTimeout(() => {
      navigate("/");
      setIsLoading(false);
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Form
          name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className="p-2" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="p-2" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-green-400 w-full"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default LoginForm;

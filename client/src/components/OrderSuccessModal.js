import { Button, Modal, Typography } from "antd";

const { Title } = Typography;

function OrderSuccessModal({ visible, onOk }) {
  return (
    <Modal
      visible={visible}
      onCancel={onOk}
      footer={[
        <Button key="ok" type="default" onClick={onOk}>
          Ok
        </Button>,
      ]}
    >
      <Title level={3}>Order Placed Successfully</Title>
      <p>Thank you for your purchase!</p>
    </Modal>
  );
}

export default OrderSuccessModal;

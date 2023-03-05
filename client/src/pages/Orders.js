import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Layout, Modal } from 'antd';
import { apiUrl } from "../helpers/constants";

const { confirm } = Modal;

const Orders = () => {
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Customer ID',
      dataIndex: 'customer_id',
      key: 'customer_id',
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
      render:(text,record)=>new Date(record.order_date).toLocaleDateString()
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => showCancelConfirm(record.order_id)}>Cancel</Button>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/order`).then(result => setData(result.data.data))
  }, [refresh]);

  const showCancelConfirm = (orderId) => {
    confirm({
      title: 'Are you sure you want to cancel this order?',
      onOk() {
        cancelOrder(orderId);
      },
      onCancel() {},
    });
  };

  async function cancelOrder(orderId) {
    try {
      await axios.put(`${apiUrl}/order/${orderId}`, { status: 'cancel' })
      setRefresh(!refresh); // toggle the refresh state to trigger a rerender
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-2">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Orders;

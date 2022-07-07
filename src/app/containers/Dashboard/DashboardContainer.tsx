import { Table } from 'antd';
import { PaymentResponseDTO } from 'core/services/http/payments/dto/payments-service.response.dto';
import paymentsService from 'core/services/http/payments/payments.service';
import React, { useEffect, useState } from 'react';
import { showErrorMessage } from 'utils/constants/messages/messages.helper';
import { numberFormatter } from 'utils/helpers/number-formatter.helper';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';

const DashboardContainer = () => {
  const [data, setData] = useState<PaymentResponseDTO[]>([]);

  const loadData = async () => {
    try {
      const { data } = await paymentsService.getAllPayment();

      setData(data);
    } catch (err: any) {
      showErrorMessage('An error occurred while loading the data!');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const paymentColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: number) => <p>{numberFormatter.format(text)}</p>,
    },
    {
      title: 'Balance transaction',
      dataIndex: 'balanceTransaction',
      key: 'balanceTransaction',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Billed user email',
      dataIndex: 'billedUserEmail',
      key: 'billedUserEmail',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Seller message',
      dataIndex: 'sellerMessage',
      key: 'sellerMessage',
      render: text => <p>{text}</p>,
    },
    {
      title: 'paid',
      dataIndex: 'paid',
      key: 'paid',
      render: (text: boolean) => (
        <p>{text ? <CheckOutlined /> : <StopOutlined />}</p>
      ),
    },
  ];

  return (
    <Table
      style={{ margin: '0 auto', maxWidth: '60%' }}
      dataSource={data}
      columns={paymentColumns}
    />
  );
};

export default DashboardContainer;

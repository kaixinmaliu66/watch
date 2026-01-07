import React from 'react';
import { Card, Row, Col, Statistic, Space, Typography } from 'antd';
import { WalletOutlined, ShoppingCartOutlined, GlobalOutlined } from '@ant-design/icons';
import { useRecords } from '../../hooks/useRecords';

const { Title, Text } = Typography;

export default function StatsPage() {
  const { records } = useRecords();
  const todayTotal = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Title level={2}>营收统计</Title>
      <Row gutter={24}>
        <Col span={8}>
          <Card bordered={false} style={{ background: '#1d39c4' }}>
            <Statistic
              title="今日总收 入"
              value={todayTotal}
              precision={2}
              prefix={<WalletOutlined />}
              valueStyle={{ color: '#fff', fontSize: '32px' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="今日单数"
              value={records.length}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="客单价"
              value={records.length ? (todayTotal / records.length).toFixed(2) : 0}
              prefix="¥"
            />
          </Card>
        </Col>
      </Row>

      <Card title="业务产地构成 (概览)" style={{ marginTop: '24px' }}>
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Space size="large">
            <GlobalOutlined style={{ fontSize: '100px', color: '#303030' }} />
            <Text type="secondary">图表引擎加载中... (瑞士产地占比最高)</Text>
          </Space>
        </div>
      </Card>
    </div>
  );
}


import React from 'react';
import { Layout, Menu } from 'antd';
import { motion } from 'framer-motion';
import {
  PlusOutlined, DatabaseOutlined, BarChartOutlined, ThunderboltOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header } = Layout;

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveKey = () => {
    if (location.pathname === '/input') return 'input';
    if (location.pathname === '/data') return 'data';
    if (location.pathname === '/stats') return 'stats';
    return 'input';
  };

  const handleMenuClick = (e) => {
    const key = e.key;
    if (key === 'input') navigate('/input');
    else if (key === 'data') navigate('/data');
    else if (key === 'stats') navigate('/stats');
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #1e293b 100%)' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(15, 20, 25, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.16)',
        padding: '0 40px',
        height: '80px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
      }}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#818cf8',
            fontSize: '24px',
            fontWeight: '800',
            marginRight: '50px',
            letterSpacing: '0.5px',
            textShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/input')}
        >
          <ThunderboltOutlined style={{ marginRight: 12, fontSize: '28px', color: '#6366f1' }} />
          WATCH PRO
        </motion.div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[getActiveKey()]}
          style={{
            border: 'none',
            flex: 1,
            fontSize: '16px',
            background: 'transparent',
            fontWeight: 500,
          }}
          onClick={handleMenuClick}
          items={[
            {
              key: 'input',
              icon: <PlusOutlined style={{ fontSize: '18px' }} />,
              label: <span style={{ fontSize: '15px' }}>业务录入</span>
            },
            {
              key: 'data',
              icon: <DatabaseOutlined style={{ fontSize: '18px' }} />,
              label: <span style={{ fontSize: '15px' }}>价格维护</span>
            },
            {
              key: 'stats',
              icon: <BarChartOutlined style={{ fontSize: '18px' }} />,
              label: <span style={{ fontSize: '15px' }}>营收统计</span>
            },
          ]}
        />
      </Header>
      <Layout style={{ height: 'calc(100vh - 80px)', padding: '24px 40px', overflow: 'auto' }}>
        {children}
      </Layout>
    </Layout>
  );
}


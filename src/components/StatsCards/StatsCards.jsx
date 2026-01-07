import React from 'react';
import { Card, Typography, Flex } from 'antd';
import { motion } from 'framer-motion';
import {
  WalletOutlined, ShoppingCartOutlined,
  ArrowUpOutlined, ArrowDownOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

export default function StatsCards({ todayTotal, recordsCount }) {
  const stats = [
    {
      title: '今日营收',
      value: todayTotal,
      prefix: '¥',
      suffix: '',
      icon: <WalletOutlined />,
      color: '#818cf8',
      bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35) 0%, rgba(99, 102, 241, 0.2) 100%)'
    },
    {
      title: '今日订单',
      value: recordsCount,
      prefix: '',
      suffix: '单',
      icon: <ShoppingCartOutlined />,
      color: '#4ade80',
      bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.35) 0%, rgba(34, 197, 94, 0.2) 100%)'
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div key={stat.title} variants={itemVariants}>
          <Card
            className="hover-scale"
            bodyStyle={{
              padding: '24px',
              background: stat.bgGradient,
              border: `1px solid rgba(148, 163, 184, 0.12)`,
              borderRadius: 16
            }}
          >
            <Flex justify="space-between" align="center">
              <div>
                <Text style={{ fontSize: 18, fontWeight: 500 }}>{stat.title}</Text>
                <div style={{ fontSize: 28, fontWeight: 700, margin: '3px 0', color: stat.color, letterSpacing: '-0.5px' }}>
                  {stat.prefix}{stat.value.toLocaleString()} {stat.suffix}
                </div>
                <Flex align="center" gap={6}>
                  <span style={{ color: stat.color, fontSize: 12 }}>{stat.icon}</span>
                  <Text style={{ fontSize: 12 }}>较昨日</Text>
                  <span style={{
                    color: index > 0 ? '#4ade80' : '#f87171',
                    fontSize: 12,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    {index > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {index > 0 ? '12.5%' : '5.2%'}
                  </span>
                </Flex>
              </div>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${stat.color}25 0%, ${stat.color}10 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                color: stat.color,
                border: `1px solid ${stat.color}30`
              }}>
                {stat.icon}
              </div>
            </Flex>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}


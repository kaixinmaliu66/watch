import React, { useState } from 'react';
import { Layout } from 'antd';
import { Flex, Typography, Tag, Button } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusOutlined } from '@ant-design/icons';
import { useBatteries } from '../../hooks/useBatteries';
import { useRecords } from '../../hooks/useRecords';
import StatsCards from '../../components/StatsCards/StatsCards';
import RecordsTable from '../../components/RecordsTable/RecordsTable';
import InputRecordModal from '../../components/InputRecordModal/InputRecordModal';
import { message } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function InputPage() {
  const { batteries, refreshBatteries } = useBatteries();
  const { records, refreshRecords, addRecord } = useRecords();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todayTotal = records.reduce((sum, r) => sum + r.amount, 0);

  const handleSave = async (recordData) => {
    const success = await addRecord(recordData);
    if (success) {
      message.success('录入成功');
      return true;
    } else {
      message.error('录入失败');
      return false;
    }
  };

  return (
    <Content>
      <AnimatePresence mode="wait">
        <motion.div
          key="input"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
            <div>
              <Title level={3} style={{ color: '#e2e8f0', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  业务录入
                </motion.span>
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Tag style={{
                    fontSize: 12,
                    padding: '4px 12px',
                    borderRadius: 8,
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#818cf8',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    fontWeight: 500
                  }}>
                    今日新增 {records.length} 笔
                  </Tag>
                </motion.span>
              </Title>
              <Text style={{ fontSize: 14, color: '#94a3b8' }}>记录每日业务数据，实时掌握经营状况</Text>
            </div>
          </Flex>

          <StatsCards todayTotal={todayTotal} recordsCount={records.length} />
          <RecordsTable records={records} />

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              position: 'fixed',
              right: 120,
              bottom: 120,
              zIndex: 3,
            }}
          >
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              style={{
                width: 64,
                height: 64,
                fontSize: 22,
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                border: 'none',
                boxShadow: '0 10px 30px rgba(124,58,237,0.45)',
              }}
            />
          </motion.div>

          <InputRecordModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            batteries={batteries}
            onSave={handleSave}
          />
        </motion.div>
      </AnimatePresence>
    </Content>
  );
}


import React, { useState } from 'react';
import { Card, Table, Button, Modal, Space, Flex, InputNumber, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useBatteries } from '../../hooks/useBatteries';
import { api } from '../../services/api';
import { message } from 'antd';

const { Title, Text } = Typography;

export default function DataPage() {
  const { batteries, refreshBatteries } = useBatteries();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleUpdatePrice = async () => {
    if (!editingItem) return;
    try {
      await api.updateBattery({
        id: editingItem.id,
        prices: {
          price_cn: editingItem.price_cn,
          price_jp: editingItem.price_jp,
          price_ch: editingItem.price_ch
        }
      });
      message.success('价格更新完成');
      setIsEditModalOpen(false);
      refreshBatteries();
    } catch (error) {
      message.error('更新失败');
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Card
        title={<Title level={3} style={{ margin: 0, color: '#e2e8f0' }}>电池配件价格表</Title>}
        bordered={false}
      >
        <Table
          dataSource={batteries}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: '100%' }}
          columns={[
            {
              title: '电池型号',
              dataIndex: 'model',
              render: m => <Text strong style={{ fontSize: 16, color: '#e2e8f0' }}>{m}</Text>
            },
            {
              title: '国产价格 (¥)',
              dataIndex: 'price_cn',
              render: v => <span style={{ color: v ? '#e2e8f0' : '#64748b' }}>{v ? `¥${v}` : '-'}</span>
            },
            {
              title: '日产价格 (¥)',
              dataIndex: 'price_jp',
              render: v => <span style={{ color: v ? '#e2e8f0' : '#64748b' }}>{v ? `¥${v}` : '-'}</span>
            },
            {
              title: '瑞士价格 (¥)',
              dataIndex: 'price_ch',
              render: v => <span style={{ color: v ? '#e2e8f0' : '#64748b' }}>{v ? `¥${v}` : '-'}</span>
            },
            {
              title: '操作',
              render: (record) => (
                <Button
                  icon={<EditOutlined />}
                  onClick={() => { setEditingItem({ ...record }); setIsEditModalOpen(true); }}
                  style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                    color: '#818cf8'
                  }}
                >
                  修改价格
                </Button>
              )
            }
          ]}
        />
      </Card>

      <Modal
        title={<Title level={4}>修改 {editingItem?.model} 销售价格</Title>}
        open={isEditModalOpen}
        onOk={handleUpdatePrice}
        onCancel={() => setIsEditModalOpen(false)}
        okText="保存修改"
        cancelText="取消"
        styles={{
          body: {
            background: 'rgba(17, 24, 39, 0.6)',
            backdropFilter: 'blur(12px)',
          }
        }}
      >
        <Space direction="vertical" style={{ width: '100%', paddingTop: '20px' }} size="large">
          <Flex align="center">
            <Text style={{ width: '100px' }}>国产价格:</Text>
            <InputNumber
              prefix="¥"
              style={{ flex: 1 }}
              value={editingItem?.price_cn}
              onChange={v => setEditingItem({ ...editingItem, price_cn: v })}
            />
          </Flex>
          <Flex align="center">
            <Text style={{ width: '100px' }}>日产价格:</Text>
            <InputNumber
              prefix="¥"
              style={{ flex: 1 }}
              value={editingItem?.price_jp}
              onChange={v => setEditingItem({ ...editingItem, price_jp: v })}
            />
          </Flex>
          <Flex align="center">
            <Text style={{ width: '100px' }}>瑞士价格:</Text>
            <InputNumber
              prefix="¥"
              style={{ flex: 1 }}
              value={editingItem?.price_ch}
              onChange={v => setEditingItem({ ...editingItem, price_ch: v })}
            />
          </Flex>
        </Space>
      </Modal>
    </div>
  );
}


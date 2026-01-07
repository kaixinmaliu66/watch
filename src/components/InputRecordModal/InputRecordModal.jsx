import React, { useState } from 'react';
import { Modal, Button, Divider, Flex } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import BatterySelectorTable from '../BatterySelectorTable/BatterySelectorTable';
import { message } from 'antd';

export default function InputRecordModal({ open, onClose, batteries, onSave }) {
  const [formData, setFormData] = useState({
    category: '更换配件',
    sub: '电池',
    model: null,
    origin: '',
    price: 0
  });

  const handleSave = async () => {
    if (!formData.model || !formData.price) {
      message.warning('请选择型号和产地价格');
      return;
    }
    const success = await onSave({
      category: formData.category,
      sub: formData.sub,
      detail: `${formData.model.model} (${formData.origin})`,
      amount: formData.price
    });
    if (success) {
      setFormData({ category: '更换配件', sub: '电池', model: null, origin: '', price: 0 });
      onClose();
    }
  };

  const handleSelect = ({ model, origin, price }) => {
    setFormData({ ...formData, model, origin, price });
  };

  return (
    <Modal
      title={<span style={{ color: '#e2e8f0', fontWeight: 600 }}>收 入</span>}
      open={open}
      width={1200}
      onCancel={onClose}
      styles={{
        body: {
          maxHeight: 'calc(80vh - 10px)',
          overflowY: 'auto',
          overflowX: 'hidden',
        },
        content: {
          maxHeight: '85vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 64px'
        },
      }}
      footer={[
        <Button
          key="cancel"
          size="large"
          onClick={onClose}
          style={{
            background: 'rgba(148, 163, 184, 0.08)',
            borderColor: 'rgba(148, 163, 184, 0.2)',
            color: '#e2e8f0'
          }}
        >
          取消
        </Button>,
        <Button
          key="ok"
          size="large"
          type="primary"
          icon={<CheckCircleFilled />}
          onClick={handleSave}
          disabled={!formData.price}
          style={{
            background: formData.price ? '#6366f1' : 'rgba(99, 102, 241, 0.3)',
            borderColor: formData.price ? '#6366f1' : 'rgba(99, 102, 241, 0.3)',
          }}
        >
          确认录入数据库
        </Button>
      ]}
    >
      <div>
        <Divider orientation="left" style={{ color: '#cbd5e1', borderColor: 'rgba(148, 163, 184, 0.2)' }}>
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>1. 业务类型</span>
        </Divider>
        <Flex gap={24}>
          <Button
            block
            size="large"
            type={formData.category === '更换配件' ? 'primary' : 'default'}
            style={{ height: '48px', fontSize: '16px' }}
            onClick={() => setFormData({ ...formData, category: '更换配件' })}
          >
            更换配件
          </Button>
          <Button block size="large" disabled style={{ height: '48px', fontSize: '16px' }}>
            维修 / 保养
          </Button>
          <Button block size="large" disabled style={{ height: '48px', fontSize: '16px' }}>
            配钥匙
          </Button>
        </Flex>

        <Divider orientation="left" style={{ marginTop: '20px', color: '#cbd5e1', borderColor: 'rgba(148, 163, 184, 0.2)' }}>
          <span style={{ color: '#e2e8f0', fontWeight: 500 }}>2. 选择配件</span>
        </Divider>
        <Flex gap={24}>
          {['电池', '表带', '机芯'].map(item => (
            <Button
              key={item}
              size="large"
              style={{ flex: 1, height: '55px' }}
              type={formData.sub === item ? 'primary' : 'default'}
              onClick={() => setFormData({ ...formData, sub: item, model: null, origin: '', price: 0 })}
            >
              {item}
            </Button>
          ))}
        </Flex>

        {formData.sub === '电池' ? (
          <>
            <Divider orientation="left" style={{ marginTop: '20px', color: '#cbd5e1', borderColor: 'rgba(148, 163, 184, 0.2)' }}>
              <span style={{ color: '#e2e8f0', fontWeight: 500 }}>3. 选择型号和产地</span>
            </Divider>
            <BatterySelectorTable
              batteries={batteries}
              formData={formData}
              onSelect={handleSelect}
            />
          </>
        ) : (
          <>
            <Divider orientation="left" style={{ marginTop: '40px' }}>3. 选择型号</Divider>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {batteries.map(b => (
                <Button
                  key={b.id}
                  type={formData.model?.id === b.id ? 'primary' : 'default'}
                  style={{ minWidth: '90px', height: '50px', fontSize: '16px', borderRadius: '6px' }}
                  onClick={() => setFormData({ ...formData, model: b, origin: '', price: 0 })}
                >
                  {b.model}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}


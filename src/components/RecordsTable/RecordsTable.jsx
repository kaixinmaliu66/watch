import React, { useState } from 'react';
import { Table, Card, Tag, Tooltip, Button, Pagination } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

export default function RecordsTable({ records }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const columns = [
    {
      title: '日期',
      dataIndex: 'created_at',
      key: 'date',
      width: 240,
      render: (text) => {
        if (!text) return <span style={{ color: '#64748b' }}>-</span>;
        try {
          let dateStr = text;
          if (typeof text === 'string' && text.includes(' ')) {
            dateStr = text.substring(0, 16);
          } else {
            const date = new Date(text);
            if (isNaN(date.getTime())) return <span style={{ color: '#64748b' }}>{text}</span>;
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            dateStr = `${year}-${month}-${day} ${hours}:${minutes}`;
          }
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 500 }}>
                {dateStr.split(' ')[1]}
              </span>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>
                {dateStr.split(' ')[0]}
              </span>
            </div>
          );
        } catch (e) {
          return <span style={{ color: '#64748b' }}>{text}</span>;
        }
      }
    },
    {
      title: '业务类型',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (text) => {
        const colorMap = {
          '更换配件': { bg: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' },
          '维修服务': { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
          '配钥匙': { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' }
        };
        const style = colorMap[text] || { bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', border: 'rgba(148, 163, 184, 0.3)' };
        return (
          <Tag
            style={{
              background: style.bg,
              color: style.color,
              border: `1px solid ${style.border}`,
              margin: 0,
              padding: '2px 10px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {text || '-'}
          </Tag>
        );
      }
    },
    {
      title: '子类',
      dataIndex: 'sub',
      key: 'sub',
      width: 100,
      render: (text) => (
        <span style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 400 }}>
          {text || '-'}
        </span>
      )
    },
    {
      title: '详情',
      dataIndex: 'detail',
      key: 'detail',
      ellipsis: true,
      render: (text) => (
        <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 400 }}>
          {text || '-'}
        </span>
      )
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      width: 120,
      render: (amount) => (
        <div style={{
          fontWeight: 600,
          color: '#818cf8',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 4
        }}>
          <span style={{
            background: 'rgba(99, 102, 241, 0.1)',
            padding: '4px 10px',
            borderRadius: 6,
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            ¥{amount ? amount.toFixed(2) : '0.00'}
          </span>
        </div>
      )
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#e2e8f0', fontWeight: 600 }}>今日业务记录</span>
            <Tooltip title="最近30条业务记录">
              <InfoCircleOutlined style={{ color: '#94a3b8', fontSize: 14 }} />
            </Tooltip>
          </div>
        }
        extra={
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Tag style={{
              margin: 0,
              background: 'rgba(99, 102, 241, 0.15)',
              color: '#818cf8',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 6,
              padding: '4px 12px',
              fontWeight: 500
            }}>
              共 {records.length} 条记录
            </Tag>
            {records.length > pageSize && (
              <Pagination
                size="small"
                current={currentPage}
                pageSize={pageSize}
                total={records.length}
                showSizeChanger={false}
                onChange={(page) => setCurrentPage(page)}
                showTotal={(total) => (
                  <span style={{ color: '#94a3b8', fontSize: 13 }}>
                    共 <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{total}</span> 条
                  </span>
                )}
                itemRender={(page, type, originalElement) => {
                  if (type === 'prev') {
                    return <Button size="small" style={{ color: '#e2e8f0', borderColor: 'rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)' }}>上一页</Button>;
                  }
                  if (type === 'next') {
                    return <Button size="small" style={{ color: '#e2e8f0', borderColor: 'rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)' }}>下一页</Button>;
                  }
                  return originalElement;
                }}
              />
            )}
          </div>
        }
        bodyStyle={{ padding: 0, position: 'relative' }}
      >
        <Table
          columns={columns}
          dataSource={records.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
          rowKey="id"
          pagination={false}
          style={{ background: 'transparent' }}
          rowClassName={(record, index) => {
            return index % 2 === 0 ? 'table-row-even' : 'table-row-odd';
          }}
        />
      </Card>
    </motion.div>
  );
}


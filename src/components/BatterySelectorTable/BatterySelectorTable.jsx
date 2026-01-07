import React from 'react';
import { Table, Typography, Tabs } from 'antd';
import { filterBatteriesBySeries, allSeries, seriesLabels } from '../../utils/batterySeries';

const { Text } = Typography;

export default function BatterySelectorTable({ batteries, formData, onSelect }) {
  const [batterySeries, setBatterySeries] = React.useState('all');
  const filteredBatteries = filterBatteriesBySeries(batteries, batterySeries);

  const createPriceCell = (price, record, origin) => {
    const isSelected = formData.model?.id === record.id && formData.origin === origin;
    return price ? (
      <div
        onClick={() => onSelect({ model: record, origin, price })}
        style={{
          cursor: 'pointer',
          padding: '6px 0px',
          borderRadius: '8px',
          background: isSelected
            ? 'rgba(251, 191, 36, 0.2)'
            : 'rgba(148, 163, 184, 0.08)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: isSelected ? '0 0 0 1px #fbbf24' : 'none',
          fontSize: '16px',
          color: isSelected ? '#fbbf24' : '#e2e8f0',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.background = 'rgba(148, 163, 184, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.background = 'rgba(148, 163, 184, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
          }
        }}
      >
        ¥{price}
      </div>
    ) : (
      <Text style={{ fontSize: '13px', color: '#64748b' }}>-</Text>
    );
  };

  const columns = [
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      width: '100px',
      render: (text) => (
        <Text strong style={{ fontSize: '16px', color: '#e2e8f0', fontWeight: 600 }}>
          {text || '-'}
        </Text>
      )
    },
    {
      title: '国产',
      dataIndex: 'price_cn',
      key: 'price_cn',
      width: '25%',
      align: 'center',
      render: (price, record) => createPriceCell(price, record, '国产')
    },
    {
      title: '村田',
      dataIndex: 'price_jp',
      key: 'price_jp',
      width: '25%',
      align: 'center',
      render: (price, record) => createPriceCell(price, record, '村田')
    },
    {
      title: '瑞士',
      dataIndex: 'price_ch',
      key: 'price_ch',
      width: '25%',
      align: 'center',
      render: (price, record) => createPriceCell(price, record, '瑞士')
    }
  ];

  return (
    <>
      <Tabs
        activeKey={batterySeries}
        onChange={setBatterySeries}
        style={{ marginTop: '20px' }}
        items={allSeries.map(series => ({
          key: series,
          label: seriesLabels[series],
          children: null
        }))}
      />
      <div style={{ marginTop: '20px', border: '1px solid rgba(148, 163, 184, 0.16)', borderRadius: 12, overflow: 'hidden' }}>
        <Table
          dataSource={filteredBatteries}
          rowKey="id"
          pagination={false}
          size="small"
          style={{ borderRadius: '8px', padding: '16px' }}
          columns={columns}
          height={300}
          scroll={{ y: 300 }}
        />
      </div>
    </>
  );
}


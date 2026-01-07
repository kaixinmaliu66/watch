// 主题配置
import { theme } from 'antd';

export const appTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#6366f1',
    borderRadius: 12,
    colorBgLayout: '#0f1419',
    colorText: '#e2e8f0',
    colorTextSecondary: '#94a3b8',
    colorBgContainer: '#1a1f2e',
    colorBorder: 'rgba(148, 163, 184, 0.16)',
    fontSize: 14,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Menu: {
      itemSelectedBg: 'rgba(99, 102, 241, 0.2)',
      itemSelectedColor: '#818cf8',
      itemHoverColor: '#a5b4fc',
      itemMarginInline: 8,
      itemBorderRadius: 8,
    },
    Card: {
      paddingLG: 24,
      colorBgContainer: '#1a1f2e',
      colorBorderSecondary: 'rgba(148, 163, 184, 0.12)',
      borderRadius: 16,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    },
    Table: {
      headerBg: '#1e293b',
      headerColor: '#cbd5e1',
      headerBorderRadius: 0,
      borderColor: 'rgba(148, 163, 184, 0.12)',
      headerSplitColor: 'rgba(148, 163, 184, 0.12)',
      colorBgContainer: '#1a1f2e',
      colorText: '#e2e8f0',
      colorTextHeading: '#cbd5e1',
      fontSize: 14,
      padding: 16,
      paddingContentVerticalLG: 16,
    },
    Button: {
      defaultBg: 'rgba(148, 163, 184, 0.08)',
      defaultBorderColor: 'rgba(148, 163, 184, 0.2)',
      defaultColor: '#e2e8f0',
      primaryColor: '#ffffff',
      borderRadius: 8,
      fontWeight: 500,
    },
    Input: {
      colorBgContainer: 'rgba(15, 23, 42, 0.6)',
      colorBorder: 'rgba(148, 163, 184, 0.2)',
      colorText: '#e2e8f0',
      activeBorderColor: '#818cf8',
      borderRadius: 8,
    },
    Modal: {
      titleFontSize: 20,
      titleColor: '#e2e8f0',
      paddingContentHorizontalLG: 32,
      headerBg: 'transparent',
      colorBgElevated: '#1a1f2e',
      borderRadius: 16,
    },
    Tag: {
      borderRadius: 6,
      fontSize: 12,
      paddingInline: 10,
    },
  },
};

export const globalStyles = `
  .table-row-even {
    background: rgba(15, 23, 42, 0.3) !important;
  }
  .table-row-odd {
    background: transparent !important;
  }
  .ant-table-thead > tr > th {
    background: #1e293b !important;
    border-bottom: 2px solid rgba(148, 163, 184, 0.16) !important;
    font-weight: 600 !important;
    font-size: 15px !important;
    color: #cbd5e1 !important;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid rgba(148, 163, 184, 0.08) !important;
  }
  .ant-pagination {
    color: #94a3b8 !important;
  }
  .ant-pagination-item {
    background: rgba(15, 23, 42, 0.6) !important;
    border-color: rgba(148, 163, 184, 0.2) !important;
  }
  .ant-pagination-item a {
    color: #e2e8f0 !important;
  }
  .ant-pagination-item-active {
    background: rgba(99, 102, 241, 0.2) !important;
    border-color: #6366f1 !important;
  }
  .ant-pagination-item-active a {
    color: #818cf8 !important;
  }
  .ant-pagination-prev button,
  .ant-pagination-next button {
    color: #e2e8f0 !important;
    border-color: rgba(148, 163, 184, 0.2) !important;
  }
`;


import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { appTheme, globalStyles } from './styles/theme';
import AppLayout from './components/Layout/AppLayout';
import AppRouter from './router';

export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <ConfigProvider theme={appTheme}>
        <BrowserRouter>
          <AppLayout>
            <AppRouter />
          </AppLayout>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // <--- 重点：检查这行代码是否在 App 之前引入
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
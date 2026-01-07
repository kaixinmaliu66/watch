const fs = require('fs');
const path = require('path');

const files = {
    // 1. 基础配置
    'package.json': {
        "name": "watch-store-system",
        "version": "1.0.0",
        "main": "main.js",
        "scripts": {
            "dev": "vite",
            "electron:dev": "electron ."
        },
        "dependencies": {
            "antd": "^5.0.0",
            "better-sqlite3": "^11.0.0",
            "react": "^18.0.0",
            "react-dom": "^18.0.0",
            "lucide-react": "^0.263.0"
        },
        "devDependencies": {
            "@vitejs/plugin-react": "^4.0.0",
            "autoprefixer": "^10.0.0",
            "electron": "^31.0.0",
            "postcss": "^8.0.0",
            "tailwindcss": "^3.0.0",
            "vite": "^5.0.0"
        }
    },

    'tailwind.config.js': `export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: { extend: { fontSize: { 'giant': '2.5rem', 'huge': '1.8rem' } } },
    plugins: [],
  }`,

    'postcss.config.js': `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`,

    'index.html': `<!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8" /><title>表店记账系统</title></head>
      <body class="bg-black">
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>`,

    // 2. 后端逻辑 (Main Process)
    'main.js': `const { app, BrowserWindow, ipcMain } = require('electron');
    const path = require('path');
    const Database = require('better-sqlite3');

    let db;
    function createWindow() {
      const win = new BrowserWindow({
        width: 1200, height: 900,
        webPreferences: { preload: path.join(__dirname, 'preload.js') }
      });
      win.loadURL('http://localhost:5173');
    }

    app.whenReady().then(() => {
      const dbPath = path.join(app.getPath('userData'), 'watch.db');
      db = new Database(dbPath);
      db.exec(\`
        CREATE TABLE IF NOT EXISTS battery_info (id INTEGER PRIMARY KEY, model TEXT, price_cn REAL, price_jp REAL, price_ch REAL);
        CREATE TABLE IF NOT EXISTS income_records (id INTEGER PRIMARY KEY, category TEXT, sub_category TEXT, detail TEXT, amount REAL, time DATETIME DEFAULT CURRENT_TIMESTAMP);
      \`);
      
      // 初始化演示数据
      const check = db.prepare('SELECT count(*) as count FROM battery_info').get();
      if(check.count === 0) {
        db.prepare('INSERT INTO battery_info (model, price_cn, price_jp, price_ch) VALUES (?,?,?,?)').run('396', 48, 88, 280);
        db.prepare('INSERT INTO battery_info (model, price_cn, price_jp, price_ch) VALUES (?,?,?,?)').run('516', null, 68, 260);
      }

      ipcMain.handle('db:getBatteries', () => db.prepare('SELECT * FROM battery_info').all());
      ipcMain.handle('db:addIncome', (e, r) => db.prepare('INSERT INTO income_records (category, sub_category, detail, amount) VALUES (?,?,?,?)').run(r.category, r.sub, r.detail, r.amount));
      ipcMain.handle('db:getTodayIncome', () => db.prepare('SELECT * FROM income_records WHERE date(time) = date("now") ORDER BY id DESC').all());
      
      createWindow();
    });`,

    'preload.js': `const { contextBridge, ipcRenderer } = require('electron');
    contextBridge.exposeInMainWorld('api', {
      getBatteries: () => ipcRenderer.invoke('db:getBatteries'),
      addIncome: (r) => ipcRenderer.invoke('db:addIncome', r),
      getTodayIncome: () => ipcRenderer.invoke('db:getTodayIncome')
    });`,

    // 3. 前端逻辑 (React)
    'src/index.css': `@tailwind base; @tailwind components; @tailwind utilities; 
    body { background-color: #000; color: #fff; font-size: 1.25rem; }`,

    'src/main.jsx': `import React from 'react'; import ReactDOM from 'react-dom/client'; import App from './App'; import './index.css';
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

    'src/App.jsx': `import React, { useState, useEffect } from 'react';
    import { Layout, Menu, Button, Card, Table, message, Typography, Space } from 'antd';
    const { Header, Content } = Layout;

    export default function App() {
      const [menu, setMenu] = useState('input');
      const [step, setStep] = useState(1);
      const [batteries, setBatteries] = useState([]);
      const [selectedModel, setSelectedModel] = useState(null);
      const [records, setRecords] = useState([]);

      useEffect(() => { 
        if(window.api) {
          window.api.getBatteries().then(setBatteries);
          window.api.getTodayIncome().then(setRecords);
        }
      }, []);

      const saveRecord = async (origin, price) => {
        const data = { category: '更换配件', sub: '电池', detail: \`型号:\${selectedModel.model} (\${origin})\`, amount: price };
        await window.api.addIncome(data);
        const fresh = await window.api.getTodayIncome();
        setRecords(fresh);
        message.success({ content: '保存成功！', style: { fontSize: '2rem' } });
        setStep(1);
      };

      return (
        <Layout className="min-h-screen bg-black">
          <Header className="h-20 flex justify-center bg-gray-900 border-b border-gray-700">
            <Menu theme="dark" mode="horizontal" className="text-huge w-full flex justify-center" 
              selectedKeys={[menu]} onClick={e => setMenu(e.key)}
              items={[{key:'input', label:'数据录入'}, {key:'stats', label:'营收统计'}]} />
          </Header>
          <Content className="p-10">
            {menu === 'input' && (
              <div className="max-w-5xl mx-auto">
                {step === 1 && (
                  <Button className="w-full h-40 text-giant bg-blue-700" onClick={()=>setStep(2)}>更换配件</Button>
                )}
                {step === 2 && (
                  <div className="grid grid-cols-2 gap-5">
                    <Button className="h-32 text-huge" onClick={()=>setStep(3)}>电池</Button>
                    <Button className="h-32 text-huge bg-gray-800 text-gray-500">表带(开发中)</Button>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-10">
                    <div className="grid grid-cols-4 gap-4">
                      {batteries.map(b => (
                        <Button key={b.id} className="h-20 text-huge" type={selectedModel?.id===b.id?'primary':'default'} onClick={()=>setSelectedModel(b)}>
                          {b.model}
                        </Button>
                      ))}
                    </div>
                    {selectedModel && (
                      <div className="flex gap-4">
                        {selectedModel.price_cn && <Button className="flex-1 h-32 text-huge bg-orange-600" onClick={()=>saveRecord('国产', selectedModel.price_cn)}>国产 ¥{selectedModel.price_cn}</Button>}
                        <Button className="flex-1 h-32 text-huge bg-blue-600" onClick={()=>saveRecord('日产', selectedModel.price_jp)}>日产 ¥{selectedModel.price_jp}</Button>
                        <Button className="flex-1 h-32 text-huge bg-green-600" onClick={()=>saveRecord('瑞士', selectedModel.price_ch)}>瑞士 ¥{selectedModel.price_ch}</Button>
                      </div>
                    )}
                  </div>
                )}
                <Table className="mt-20 custom-dark-table" dataSource={records} pagination={false} 
                  columns={[{title:'项目', dataIndex:'detail'}, {title:'金额', dataIndex:'amount', render: v=>\`¥\${v}\`}]} />
              </div>
            )}
          </Content>
        </Layout>
      );
    }`,

    'vite.config.js': `import { defineConfig } from 'vite'; import react from '@vitejs/plugin-react';
    export default defineConfig({ plugins: [react()] });`
};

// 执行创建逻辑
Object.entries(files).forEach(([name, content]) => {
    const filePath = path.join(process.cwd(), name);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, typeof content === 'string' ? content : JSON.stringify(content, null, 2));
    console.log(`✅ 已创建: ${name}`);
});
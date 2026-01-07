const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('better-sqlite3');

let db;

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            // 关联下面的 preload.js
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // 如果你正在运行 npm run dev，请确保端口一致
    win.loadURL('http://localhost:5173');

    return win;
}

app.whenReady().then(() => {
    // 1. 初始化数据库文件（保存在用户本地目录）
    const dbPath = path.join(app.getPath('userData'), 'watch_store.db');
    db = new Database(dbPath);
    console.log('数据库已就绪:', dbPath);

    // 2. 建表
    db.exec(`
    CREATE TABLE IF NOT EXISTS battery_info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      model TEXT UNIQUE,
      price_cn REAL,
      price_jp REAL,
      price_ch REAL,
      price_seiko REAL,
      price_eco REAL
    );

    CREATE TABLE IF NOT EXISTS income_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      sub_category TEXT,
      detail TEXT,
      amount REAL,
      time DATETIME DEFAULT (datetime('now', 'localtime'))
    );
  `);

    // 3. 添加新列（如果不存在）
    try {
        db.exec('ALTER TABLE battery_info ADD COLUMN price_seiko REAL');
    } catch (e) {
        // 列已存在，忽略错误
    }
    try {
        db.exec('ALTER TABLE battery_info ADD COLUMN price_eco REAL');
    } catch (e) {
        // 列已存在，忽略错误
    }

    // 4. 清空并插入完整的电池价目表数据
    db.exec('DELETE FROM battery_info');
    const insert = db.prepare('INSERT INTO battery_info (model, price_cn, price_jp, price_ch, price_seiko, price_eco) VALUES (?, ?, ?, ?, ?, ?)');
    
    // 根据价目表插入数据
    const batteryData = [
        ['396', 48, 88, 280, null, null],
        ['516', null, 68, 260, null, null],
        ['521', 28, 68, 280, null, null],
        ['621', 28, 68, 120, null, 260],
        ['626', 28, 68, 120, null, 260],
        ['716', null, 68, 180, null, null],
        ['721', 28, 68, 160, null, 380],
        ['916', null, 88, 180, null, 280],
        ['920', 28, 88, 180, null, 280],
        ['927', 28, 88, 180, null, null],
        ['2032', 10, 28, 68, 68, null],
        ['2025', 10, 28, 68, 68, null],
        ['2016', 10, 28, 68, 68, null]
    ];
    
    batteryData.forEach(data => {
        insert.run(...data);
    });

    // 4. 定义前端可以调用的“接口” (IPC)
    ipcMain.handle('db:getBatteries', () => {
        return db.prepare('SELECT * FROM battery_info').all();
    });

    ipcMain.handle('db:getTodayIncome', () => {
        // 只取今天的流水，返回所有需要的字段
        const records = db.prepare("SELECT id, time, category, sub_category, detail, amount FROM income_records WHERE date(time) = date('now', 'localtime') ORDER BY id DESC").all();
        // 将字段名映射为前端期望的格式
        return records.map(record => ({
            ...record,
            created_at: record.time,
            sub: record.sub_category
        }));
    });

    ipcMain.handle('db:addIncome', (event, record) => {
        const stmt = db.prepare('INSERT INTO income_records (category, sub_category, detail, amount) VALUES (?, ?, ?, ?)');
        return stmt.run(record.category, record.sub, record.detail, record.amount);
    });

    ipcMain.handle('db:updateBattery', (event, { id, prices }) => {
        const stmt = db.prepare('UPDATE battery_info SET price_cn = ?, price_jp = ?, price_ch = ? WHERE id = ?');
        return stmt.run(prices.price_cn, prices.price_jp, prices.price_ch, id);
    });

    const win = createWindow();

    // 仅在开发环境打开 DevTools（可选，如需始终打开请移除 if 判断）
    if (!app.isPackaged) {
        win.webContents.once('did-finish-load', () => {
            win.webContents.openDevTools({ mode: 'detach' });
        });
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
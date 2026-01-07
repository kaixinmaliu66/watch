# 项目架构说明

## 目录结构

```
src/
├── components/          # 可复用组件
│   ├── Layout/         # 布局组件
│   │   └── AppLayout.jsx
│   ├── StatsCards/     # 统计卡片组件
│   │   └── StatsCards.jsx
│   ├── RecordsTable/   # 记录表格组件
│   │   └── RecordsTable.jsx
│   ├── BatterySelectorTable/  # 电池选择表格组件
│   │   └── BatterySelectorTable.jsx
│   └── InputRecordModal/  # 录入弹窗组件
│       └── InputRecordModal.jsx
├── pages/              # 页面组件
│   ├── InputPage/      # 业务录入页面
│   │   └── InputPage.jsx
│   ├── DataPage/       # 价格维护页面
│   │   └── DataPage.jsx
│   └── StatsPage/       # 营收统计页面
│       └── StatsPage.jsx
├── services/           # API服务层
│   └── api.js          # 封装所有后端API调用
├── hooks/              # 自定义Hooks
│   ├── useBatteries.js # 电池数据Hook
│   └── useRecords.js   # 记录数据Hook
├── utils/              # 工具函数
│   └── batterySeries.js # 电池系列分类工具
├── styles/             # 样式配置
│   └── theme.js        # 主题配置和全局样式
├── router/             # 路由配置
│   └── index.jsx       # 路由定义
├── App.jsx             # 根组件
└── main.jsx            # 入口文件
```

## 架构特点

1. **组件化**: 将功能拆分为独立可复用的组件
2. **页面分离**: 每个功能模块独立成页面
3. **服务层**: API调用统一封装在services层
4. **Hooks**: 数据获取逻辑封装在自定义Hooks中
5. **路由系统**: 使用React Router进行页面导航
6. **主题配置**: 统一的主题和样式配置

## 数据流

1. 页面组件使用Hooks获取数据
2. Hooks调用services层的API
3. services层与后端IPC通信
4. 数据更新后通过Hooks返回给组件

## 路由

- `/input` - 业务录入页面
- `/data` - 价格维护页面
- `/stats` - 营收统计页面
- `/` - 默认重定向到 `/input`


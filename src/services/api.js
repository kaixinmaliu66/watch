// API 服务层 - 封装所有与后端的通信
export const api = {
  // 获取电池列表
  getBatteries: async () => {
    if (!window.api) return [];
    return await window.api.getBatteries();
  },

  // 获取今日收 入记录
  getTodayIncome: async () => {
    if (!window.api) return [];
    const records = await window.api.getTodayIncome();
    return records.map(record => ({
      ...record,
      created_at: record.time,
      sub: record.sub_category
    }));
  },

  // 添加收 入记录
  addIncome: async (record) => {
    if (!window.api) return null;
    return await window.api.addIncome(record);
  },

  // 更新电池价格
  updateBattery: async ({ id, prices }) => {
    if (!window.api) return null;
    return await window.api.updateBattery({ id, prices });
  }
};


// 电池系列工具函数
export const getBatterySeries = (model) => {
  if (!model) return 'other';
  const firstChar = model.charAt(0);
  if (['3', '5', '6', '7', '9', '2'].includes(firstChar)) {
    return firstChar;
  }
  return 'other';
};

export const allSeries = ['all', '3', '5', '6', '7', '9', '2', 'other'];

export const seriesLabels = {
  'all': '全部',
  '3': '3系',
  '5': '5系',
  '6': '6系',
  '7': '7系',
  '9': '9系',
  '2': '2系',
  'other': '其他'
};

export const filterBatteriesBySeries = (batteries, series) => {
  if (series === 'all') return batteries;
  return batteries.filter(b => getBatterySeries(b.model) === series);
};


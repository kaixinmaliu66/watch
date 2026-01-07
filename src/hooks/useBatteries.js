import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useBatteries = () => {
  const [batteries, setBatteries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBatteries = async () => {
    try {
      setLoading(true);
      const data = await api.getBatteries();
      setBatteries(data || []);
    } catch (error) {
      console.error('获取电池列表失败:', error);
      setBatteries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatteries();
  }, []);

  return { batteries, loading, refreshBatteries: fetchBatteries };
};


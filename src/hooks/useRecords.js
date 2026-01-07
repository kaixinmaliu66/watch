import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await api.getTodayIncome();
      setRecords(data || []);
    } catch (error) {
      console.error('获取记录失败:', error);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const addRecord = async (recordData) => {
    try {
      await api.addIncome(recordData);
      await fetchRecords();
      return true;
    } catch (error) {
      console.error('添加记录失败:', error);
      return false;
    }
  };

  return { records, loading, refreshRecords: fetchRecords, addRecord };
};


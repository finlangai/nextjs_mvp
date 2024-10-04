import { useEffect } from 'react';
import { useAppDispatch } from './useAppStore'; 
import { setSelectedButtonActive } from '@/src/redux/StockPage/stockPageSlice';

const useSetSelectedButtonStockPage = (buttonIndex: number) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedButtonActive({ button: buttonIndex }));
  }, [dispatch, buttonIndex]);
};

export default useSetSelectedButtonStockPage;

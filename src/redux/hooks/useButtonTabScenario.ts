import { useEffect } from 'react';
import { useAppDispatch } from './useAppStore'; 
import { setHistorySelectedButton } from '@/src/redux/ValuetionPage/valuationHistorySlice';

const useButtonTabScenario = (buttonIndex: number) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHistorySelectedButton({ button: buttonIndex }));
  }, [dispatch, buttonIndex]);
};

export default useButtonTabScenario;

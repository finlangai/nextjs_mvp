import { useEffect } from 'react';
import { useAppDispatch } from './useAppStore'; 
import { setSelectedButtonActive } from '@/src/redux/SiderBar/siderBarSlice';

const useSetSelectedButtonSiderBar = (buttonIndex: number) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedButtonActive({ button: buttonIndex }));
  }, [dispatch, buttonIndex]);
};

export default useSetSelectedButtonSiderBar;

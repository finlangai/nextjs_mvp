import { useEffect } from 'react';
import { useAppDispatch } from './useAppStore'; 
import { setSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';

const useSetSelectedValuetionPage = (buttonIndex: number) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedButton({ button: buttonIndex }));
  }, [dispatch, buttonIndex]);
};

export default useSetSelectedValuetionPage;

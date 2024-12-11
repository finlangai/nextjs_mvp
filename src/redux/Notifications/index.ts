import { combineReducers } from '@reduxjs/toolkit';
import getTokenNotificationsReducers from "./getTokenNotificationsSlice";
import dataNotificationsReducers from "./dataNotificationsSlice"

const NotificationsReducers = combineReducers({
    tokenData: getTokenNotificationsReducers,
    dataNoti: dataNotificationsReducers
});
  
export type RootState = ReturnType<typeof getTokenNotificationsReducers>;
export default NotificationsReducers;

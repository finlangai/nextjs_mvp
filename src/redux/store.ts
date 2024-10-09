import { configureStore, combineReducers } from '@reduxjs/toolkit';
import financialStatementReducer from './FinancialStatement/financialStatementSlice';
import financialMetricReducer from './FinancialMetric/financialMetricSlice';
import reportPageReducer from './ReportPage/reportPageSlice';
import stockPageReducer from './StockPage/stockPageSlice';
import siderBarReducer from './SiderBar/siderBarSlice';
import btnNextPrevReportPageReducer from './BtnNextPrevReportPage/btnNextPrevReportPageSlice';
import searchAndChangeStockReducer from './SearchAndChangeStock/searchAndChangeStockSlice';
import priceStockReducer from './PriceStock/priceStockSlice';
import profileSummaryReducer from "./ProfileSummary/profileSummarySlice";
import tickerListReducer from './TickerList/tickerListSlice';
import topGainerReducer from './CardStock/topGainerSlice';
import industryReducer from './CardStock/industrySlice';
import priceInsightsReducer from "./PriceInsights/priceInsightsSlice"

// Kết hợp industryReducer & topGainerReducer
const cardStockReducer = combineReducers({
  industry: industryReducer,
  topGainer: topGainerReducer,
});

const store = configureStore({
  reducer: {
    financialStatement: financialStatementReducer,
    financialMetric: financialMetricReducer,
    reportPage: reportPageReducer,
    stockPage: stockPageReducer,
    siderBar: siderBarReducer,
    btnNextPrevReport: btnNextPrevReportPageReducer,
    searchVn30Stock: searchAndChangeStockReducer,
    priceStock: priceStockReducer,
    profileSummary: profileSummaryReducer,
    tickerList: tickerListReducer,
    cardStock: cardStockReducer,
    priceInsights: priceInsightsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
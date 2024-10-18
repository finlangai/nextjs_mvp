import { combineReducers } from '@reduxjs/toolkit';
import roiChartReducer from './roiChartSlice';
import marginalProfitChartReducer from './marginalProfitChartSlice';
import rosChartReducer from './rosChartSlice';
import epsChartReducer from './epsChartSlice';
import liquidityRatioChartReducer from './liquidityRatioChartSlice';
import debtToAssetsRatioReducer from "./debtToAssetsRatioSlice";
import interestCoverageRatioReducer from "./interestCoverageRatioSlice";
import freeCashFlowGrowthRateReducer from "./freeCashFlowGrowthRateSlice";
import assetGrowthRateReducer from "./assetGrowthRateSlice";
import equityGrowthRateReducer from "./equityGrowthRateSlice";
import returnOnAssetsGrowthRateReducer from "./returnOnAssetsGrowthRateSlice";
import EPSGrowthReducer from "./EPSGrowthSlice"
import eBITDAGrowthRateReducer  from "./eBITDAGrowthRateSlice"
import revenueGrowthRateReducer from "./revenueGrowthRateSlice"
import profitGrowthRateReducer from "./profitGrowthRateSlice"

const chartsReducer = combineReducers({
  roi: roiChartReducer,
  marginalProfit: marginalProfitChartReducer,
  ros: rosChartReducer,
  eps: epsChartReducer,
  liquidityRatio: liquidityRatioChartReducer,
  interestCoverageRatio: interestCoverageRatioReducer,
  debtToAssetsRatio: debtToAssetsRatioReducer,
  freeCashFlowGrowthRate: freeCashFlowGrowthRateReducer,
  assetGrowthRate: assetGrowthRateReducer,
  equityGrowthRate: equityGrowthRateReducer,
  returnOnAssetsGrowthRate: returnOnAssetsGrowthRateReducer,
  GePSGrowth: EPSGrowthReducer,
  eBITDAGrowthRate: eBITDAGrowthRateReducer,
  revenueGrowthRate: revenueGrowthRateReducer,
  profitGrowthRate: profitGrowthRateReducer
});

export type ChartsState = ReturnType<typeof chartsReducer>;

export default chartsReducer;
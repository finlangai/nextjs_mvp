import ROIChart from '../../charts/forecasting/ROIChart';
import MarginalProfitChart from "../../charts/forecasting/MarginalProfitChart";
import EPSChart from "../../charts/forecasting/EPSChart";
import ROSChart from "../../charts/forecasting/ROSChart";
import FreeCashFlowGrowthRateChart from "../../charts/forecasting/FreeCashFlowGrowthRateChart";
import AssetGrowthRateChart from "../../charts/forecasting/AssetGrowthRateChart";
import EquityGrowthRateChart from './EquityGrowthRateChart';
import ReturnOnAssetsGrowthRateChart from './ReturnOnAssetsGrowthRateChart';
import RevenueGrowthRateChart from './RevenueGrowthRateChart';
import ProfitGrowthRateChart from './ProfitGrowthRateChart';
import EBITDAGrowthRateChart from './EBITDAGrowthRateChart';
import EPSGrowthChart from './EPSGrowthChart';
import LiquidityRatioChart from './LiquidityRatioChart';
import InterestCoverageRatioChart from './InterestCoverageRatioChart';
import DebtToAssetsRatioChart from './DebtToAssetsRatioChart';

import { ChartConfig } from '@/src/interfaces/Chart';

// Trả về một mảng các mảng cấu hình
export const getConfigCharts = (chartsConfig: any): ChartConfig[][] => [
  [
    {
      n: "Hiệu quả sinh lời dựa trên vốn",
      chart: ROIChart,
      color: chartsConfig.roi.color,
    },
    {
      n: "Biên lợi nhuận",
      chart: MarginalProfitChart,
      color: chartsConfig.marginalProfit.color,
    },
    {
      n: "Tỷ suất lợi nhuận trên doanh thu",
      chart: ROSChart,
      color: chartsConfig.ros.color,
    },
    {
      n: "Lợi nhuận trên mỗi cổ phần",
      chart: EPSChart,
      color: chartsConfig.eps.color,
    },
  ],
  [
    {
      n: "Tính thanh khoản",
      chart: LiquidityRatioChart,
      color: chartsConfig.liquidityRatio.color,
    },
    {
      n: "Tỷ số thanh toán lãi vay",
      chart: InterestCoverageRatioChart,
      color: chartsConfig.interestCoverageRatio.color,
    },
    {
      n: "Tỷ số nợ trên tài sản",
      chart: DebtToAssetsRatioChart,
      color: chartsConfig.debtToAssetsRatio.color,
    },
  ],
  [
    {
      n: "Tăng trưởng doanh thu",
      chart: RevenueGrowthRateChart,
      color: chartsConfig.revenueGrowthRate.color,
    },
    {
      n: "Tăng trưởng lợi nhuận",
      chart: ProfitGrowthRateChart,
      color: chartsConfig.profitGrowthRate.color,
    },
    {
      n: "Tăng trưởng lợi nhuận trước lãi vay, thuế và khấu hao",
      chart: EBITDAGrowthRateChart,
      color: chartsConfig.eBITDAGrowthRate.color,
    },
    {
      n: "Tăng trưởng lợi nhuận trên mỗi cổ phần",
      chart: EPSGrowthChart,
      color: chartsConfig.GePSGrowth.color,
    },
  ],
  [
    {
      n: "Tăng trưởng dòng tiền tự do",
      chart: FreeCashFlowGrowthRateChart,
      color: chartsConfig.liquidityRatio.color,
    },
  ],
  [
    {
      n: "Tỷ lệ tăng trưởng tài sản",
      chart: AssetGrowthRateChart,
      color: chartsConfig.assetGrowthRate.color,
    },
    {
      n: "Tỷ lệ tăng trưởng vốn chủ sở hữu",
      chart: EquityGrowthRateChart,
      color: chartsConfig.equityGrowthRate.color,
    },
    {
      n: "Tỷ lệ tăng trưởng lợi nhuận trên tổng tài sản",
      chart: ReturnOnAssetsGrowthRateChart,
      color: chartsConfig.returnOnAssetsGrowthRate.color,
    },
  ],
];

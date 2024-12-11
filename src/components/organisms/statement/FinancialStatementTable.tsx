"use client";

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { selectSelectedText, selectSelectedButton } from '@/src/redux/ReportPage';
import {
    selectFinancialStatementsData,
    selectFinancialStatementsLoading,
    selectFinancialStatementsError,
} from '@/src/redux/FinancialStatement';
import {
    selectFinancialMetricsData,
    selectFinancialMetricsLoading,
    selectFinancialMetricsError,
} from '@/src/redux/FinancialMetric';
import {
    selectByDataQuarter,
    selectByDataYear,

    setLimitByDataBtnNext,
    setLimitByDataBtnPrev,
    setLimitByDataQuarter,
    setLimitByDataYear,

    selectLimitSubscribeQuarter,
    selectLimitSubscribeYear,
    setLimitSubscribe
} from '@/src/redux/BtnNextPrevReportPage';
import { FinancialMetric } from '@/src/interfaces/FinancialMetric';
import { FinancialStatement } from '@/src/interfaces/FinancialStatement';
import { formatBCTC } from '@/src/utils/formatBCTC';
import renderItemStatement from './renderItemStatement';
import renderItemMetric from './renderItemMetric';
import { BarsLoader } from '../../common/Loader';

const FinancialStatementTable = () => {
    const dispatch = useAppDispatch();

    const financialStatements = useAppSelector(selectFinancialStatementsData);
    const loading_st = useAppSelector(selectFinancialStatementsLoading);
    const error_st = useAppSelector(selectFinancialStatementsError);

    const financialMetrics = useAppSelector(selectFinancialMetricsData);
    const loading_mt = useAppSelector(selectFinancialMetricsLoading);
    const error_mt = useAppSelector(selectFinancialMetricsError);

    const selectedButton = useAppSelector(selectSelectedButton);
    const selectedText = useAppSelector(selectSelectedText);

    // Chia dữ liệu thành hai biến riêng biệt
    const [statementsData, setStatementsData] = useState<FinancialStatement[]>(financialStatements);
    const [metricsData, setMetricsData] = useState<FinancialMetric[]>(financialMetrics);

    // Lấy subcrible
    const slectSubcribleYear = useAppSelector(selectLimitSubscribeYear)
    const selectSubcribleQuarter = useAppSelector(selectLimitSubscribeQuarter)

    // Lấy ByDdata
    const slectYear = useAppSelector(selectByDataYear);
    const selectQuarter = useAppSelector(selectByDataQuarter);

    // Logic chính
    const logicMain = (maindata: any) => {
        const dataMain = maindata;
        // Giới hạn cao nhất được lưu lần đầu vào ByData
        // Lần đầu khởi tạo dữ liệu
        if (slectYear === null || selectQuarter === null) {
            dispatch(setLimitByDataQuarter(dataMain[0]?.values[0]?.quarter))
            dispatch(setLimitByDataYear(dataMain[0]?.values[0]?.year))

            if (dataMain?.[0]?.values[0]?.quarter === 4) {
                dispatch(setLimitSubscribe({
                    quarter: 1,
                    year: dataMain[0]?.values[0]?.year + 1,
                }))
            };

            if (dataMain?.[0]?.values[0]?.quarter < 4 && dataMain[0]?.values[0]?.quarter > 0) {
                const x = dataMain?.[0]?.values[0]?.quarter + 1;
                dispatch(setLimitSubscribe({
                    quarter: x,
                    year: dataMain?.[0]?.values[0]?.year,
                }))
            };

            if (dataMain?.[0]?.values[0]?.quarter === 0) {
                dispatch(setLimitSubscribe({
                    quarter: 0,
                    year: dataMain?.[0]?.values[0]?.year + 1,
                }))
            };

            // báo cáo tài chính đủ 10 data thì cho phép bấm prev để xem. Ngược lại
            if (dataMain?.[0]?.values.length < 10) {
                dispatch(setLimitByDataBtnPrev(true));
            } else {
                dispatch(setLimitByDataBtnPrev(false));
            };

            return;
        };

        if (dataMain?.[0]?.values?.length < 10) {
            dispatch(setLimitByDataBtnPrev(true));
        } else {
            dispatch(setLimitByDataBtnPrev(false));
        };

        if (slectYear && selectQuarter === 0 && slectSubcribleYear) {
            if (slectYear < slectSubcribleYear && selectQuarter === 0) {
                dispatch(setLimitByDataBtnNext(true));
            }
            else if (slectYear >= slectSubcribleYear && selectQuarter === 0) {
                dispatch(setLimitByDataBtnNext(false));
            }
        };

        if (slectYear && selectQuarter && slectSubcribleYear && selectSubcribleQuarter) {
            if (slectSubcribleYear < slectYear ||
                (slectSubcribleYear === slectYear && selectSubcribleQuarter <= selectQuarter)) {
                dispatch(setLimitByDataBtnNext(false));
            } else {
                dispatch(setLimitByDataBtnNext(true));
            }
        };
    };

    useEffect(() => {
        if (selectedButton === 4) {
            if (financialMetrics.length === 0) return;
            setMetricsData(financialMetrics);
            logicMain(financialMetrics);
            console.log(financialMetrics)
        } else {
            if (financialStatements.length === 0) return;
            setStatementsData(financialStatements);
            logicMain(financialStatements);
        }
    }, [financialStatements, financialMetrics, selectQuarter, slectYear, slectSubcribleYear, selectSubcribleQuarter]);

    const loading = loading_st || loading_mt;
    const error = error_st || error_mt;

    if (loading) {
        return (
            <div className='px-[40px] flex justify-center items-center h-[300px]'>
                <BarsLoader />
            </div>
        );
    }

    if (error) {
        return <div className='text-white pl-[40px]'>Error: {error}</div>;
    }

    return (
        <div className="px-[40px]">
            {/* ========================HEADER======================== */}
            <div className="w-full flex items-center h-[60px] rounded-[8px] bg-fintown-btn-2 dark:bg-fintown-btn-2-light px-[16px]">
                <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light flex-grow-0 flex-shrink-0 basis-[350px]">
                    {selectedText}
                </div>
                <div className="flex-grow flex-shrink basis-auto">
                    <div className="flex justify-between">
                        {selectedButton !== 4 ? (
                            // Lấy tối đa 9 phần tử từ statementsData[0]?.values
                            statementsData[0]?.values?.slice(0, 9).map((x) => (
                                <div className="text-[14px] text-fintown-txt-1 dark:text-fintown-txt-1-light min-w-[calc(11.1111%)] pl-[16px]" key={x.period}>
                                    <div className="flex justify-end">{x.period}</div>
                                </div>
                            ))
                        ) : (
                            // Lấy tối đa 9 phần tử từ metricsData[0]?.values
                            metricsData[0]?.values?.slice(0, 9).map((x) => (
                                <div className="text-[14px] text-fintown-txt-1 min-w-[calc(11.1111%)] pl-[16px]" key={x.period}>
                                    <div className="flex justify-end">{x.period}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* ========================BODY======================== */}
            {selectedButton !== 4 ? (
                <>
                    {(() => {
                        if (!statementsData || statementsData.length === 0) {
                            return <div className='text-white'>No data available</div>;
                        }
                        const formattedData = formatBCTC(statementsData);
                        return formattedData.map(renderItemStatement);
                    })()}
                </>
            ) : (
                <>
                    {metricsData && metricsData.length > 0 ? (
                        metricsData.map(renderItemMetric)
                    ) : (
                        <div className='text-white'>No data available</div>
                    )}
                </>
            )}
        </div>
    );
};

export default FinancialStatementTable;

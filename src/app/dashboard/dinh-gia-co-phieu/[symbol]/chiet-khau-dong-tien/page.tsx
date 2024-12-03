"use client";
import React, { useEffect, useRef } from 'react';
import useSetSelectedValuetionPage from '@/src/redux/hooks/useButtonValuetionPage';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchValuationParams } from '@/src/redux/ValuationParams/valuationParamsSlice';
import { fetchValuationResult } from '@/src/redux/ValuationResult';
import { fetchScenarios } from '@/src/redux/Scenarios';
import { selectToken } from "@/src/redux/auth";
import ValuationCentralComponent from '@/src/components/organisms/valuetion/ValuationCentral';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';

export default function DCFValuetionPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    useSetSelectedValuetionPage(0);
    const selectButton = useAppSelector(selectSelectedButton);

    // FETCH API LẦN ĐẦU===============================================================
    const hasFetched = useRef(false);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (selectButton === null || selectButton === undefined) {
            return;
        }
        if (!hasFetched.current) {
            const name ='discounted-cash-flow';
            const year = new Date().getFullYear();
            const filter = `year=${year}`;            
            if (token) {
                dispatch(fetchValuationParams({ symbol: symbol, name: name, token: token }));
                dispatch(fetchValuationResult({ symbol: symbol, name: name, token: token, body: { t: 1 } }));
                dispatch(fetchScenarios({ symbol: symbol, name: name, token: token, filter: filter }));
                hasFetched.current = true;
            }
        }
    }, [dispatch, selectButton]);

    return (
        <>
            < ValuationCentralComponent
                symbol={symbol}
                name='Mô hình chiết khấu dòng tiền (Discounted Cash Flow)'
                formular='Công thức: P0 = Σ (FCFE_t) / (1 + r)^t'
            />
        </>
    );
}

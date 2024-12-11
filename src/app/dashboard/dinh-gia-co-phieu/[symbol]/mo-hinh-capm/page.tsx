"use client";
import React, { useEffect, useRef } from 'react';
import useSetSelectedValuetionPage from '@/src/redux/hooks/useButtonValuetionPage';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchValuationParams } from '@/src/redux/ValuationParams/valuationParamsSlice';
import { fetchValuationResult } from '@/src/redux/ValuationResult';
import { fetchScenarios, resetScenarios, resetIdScenario } from '@/src/redux/Scenarios';
import { selectToken } from "@/src/redux/auth";
import ValuationCentral from '@/src/components/organisms/valuetion/ValuationCentral';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';
import { setHistorySelectedButton } from '@/src/redux/ValuetionPage/valuationHistorySlice';

export default function DCFValuetionPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    useSetSelectedValuetionPage(6);

    dispatch(setHistorySelectedButton({ button: 0 }));
    dispatch(resetIdScenario());
    dispatch(resetScenarios());
    const selectButton = useAppSelector(selectSelectedButton);
    // FETCH API LẦN ĐẦU===============================================================
    const hasFetched = useRef(false);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (selectButton === null || selectButton === undefined) {
            return;
        }
        if (!hasFetched.current) {
            const name = 'capital-asset-pricing-model';
            const year = new Date().getFullYear();
            const filter = `year=${year}`;            
            if (token) {
                dispatch(fetchValuationParams({ symbol: symbol, name: name, token: token }));
                dispatch(fetchValuationResult({ symbol: symbol, name: name, token: token, body: { Rm: 0.15 } }));
                dispatch(fetchScenarios({ symbol: symbol, name: name, token: token, filter: filter }));
                hasFetched.current = true;
            }
        }
    }, [dispatch, selectButton]);

    return (
        <>
            < ValuationCentral
                symbol={symbol}
                name='Mô hình CAPM (Capital Asset Pricing Model)'
                formular='Công thức: Ra = Rf + βa * (Rm - Rf)'
            />
        </>
    );
}

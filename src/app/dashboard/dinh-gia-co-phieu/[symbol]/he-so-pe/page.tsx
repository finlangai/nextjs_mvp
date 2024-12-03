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

export default function HeSoPePage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    useSetSelectedValuetionPage(3);

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
            const name = 'price-to-earnings-relative-valuation';
            const year = new Date().getFullYear();
            const filter = `year=${year}`;            
            if (token) {
                dispatch(fetchValuationParams({ symbol: symbol, name: name, token: token }));
                dispatch(fetchValuationResult({ symbol: symbol, name: name, token: token }));
                dispatch(fetchScenarios({ symbol: symbol, name: name, token: token, filter: filter }));
                hasFetched.current = true;
            }
        }
    }, [dispatch, selectButton]);

    return (
        <>
            < ValuationCentral
                symbol={symbol}
                name='Mô hình định giá theo hệ số P/E (Price to Earnings)'
                formular='Công thức: P = EPS x P/E'
            />
        </>
    );
}

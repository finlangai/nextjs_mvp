"use client";
import React, { useEffect, useRef } from 'react';
import useSetSelectedValuetionPage from '@/src/redux/hooks/useButtonValuetionPage';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchValuationParams } from '@/src/redux/ValuationParams/valuationParamsSlice';
import { fetchValuationResult } from '@/src/redux/ValuationResult';
import { fetchScenarios } from '@/src/redux/Scenarios';
import { selectToken } from "@/src/redux/auth";
import ValuationCentral from '@/src/components/organisms/valuetion/ValuationCentral';
import { getModelNameValuation } from '@/src/utils/getModelNameValuation';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';

export default function DDMValuetionPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    useSetSelectedValuetionPage(1);
    const selectButton = useAppSelector(selectSelectedButton);

    // FETCH API LẦN ĐẦU===============================================================
    const hasFetched = useRef(false);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (selectButton === null || selectButton === undefined) {
            return;
        }
        if (!hasFetched.current) {
            const name = 'dividend-discount-model';
            const year = new Date().getFullYear();
            const filter = `year=${year}`;
            if (token) {
                dispatch(fetchValuationParams({ symbol: symbol, name: name, token: token }));
                dispatch(fetchValuationResult({ symbol: symbol, name: name, token: token, body: { g: 0.3 } }));
                dispatch(fetchScenarios({ symbol: symbol, name: name, token: token, filter: filter }));
                hasFetched.current = true;
            }
        }
    }, [selectButton]);

    return (
        <>
            < ValuationCentral
                symbol={symbol}
                name='Mô hình chiết khấu cổ tức (Dividend Discount Model)'
                formular='Công thức: P0 = D1 / (r - g)'
            />
        </>
    );
}

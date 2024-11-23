"use client";
import React, { useState, useEffect, useRef } from 'react';
import useSetSelectedValuetionPage from '@/src/redux/hooks/useButtonValuetionPage';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchValuationParams } from '@/src/redux/ValuationParams/valuationParamsSlice';
import { fetchValuationResult } from '@/src/redux/ValuationResult';
import { fetchScenarios } from '@/src/redux/Scenarios';
import { selectToken } from "@/src/redux/auth";
import ValuationCentral from '@/src/components/organisms/valuetion/ValuationCentral';

export default function DDMValuetionPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    useSetSelectedValuetionPage(1);

    // FETCH API LẦN ĐẦU===============================================================
    const hasFetched = useRef(false);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (!hasFetched.current) {
            const name = 'dividend-discount-model';
            if (token) {
                dispatch(fetchValuationParams({ symbol: symbol, name: name, token: token }));
                dispatch(fetchValuationResult({ symbol: symbol, name: name, token: token }));
                dispatch(fetchScenarios({ symbol: symbol, name: name, token: token }));
                hasFetched.current = true;
            }
        }
    }, [dispatch]);


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

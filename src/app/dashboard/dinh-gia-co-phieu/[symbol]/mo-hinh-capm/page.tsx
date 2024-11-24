"use client";
import React, { useState, useEffect, useRef } from 'react';
import useSetSelectedValuetionPage from '@/src/redux/hooks/useButtonValuetionPage';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchValuationParams } from '@/src/redux/ValuationParams/valuationParamsSlice';
import { fetchValuationResult } from '@/src/redux/ValuationResult';
import { fetchScenarios } from '@/src/redux/Scenarios';
import { selectToken } from "@/src/redux/auth";
import ValuationCentral from '@/src/components/organisms/valuetion/ValuationCentral';

export default function DCFValuetionPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    useSetSelectedValuetionPage(6);

    // FETCH API LẦN ĐẦU===============================================================
    const hasFetched = useRef(false);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (!hasFetched.current) {
            const name = 'capital-asset-pricing-model';
            if (token) {
                dispatch(fetchValuationParams({ symbol: symbol, name: name, token: token }));
                dispatch(fetchValuationResult({ symbol: symbol, name: name, token: token, body: { Rm: 0.15 } }));
                dispatch(fetchScenarios({ symbol: symbol, name: name, token: token }));
                hasFetched.current = true;
            }
        }
    }, [dispatch]);

    return (
        <>
            < ValuationCentral
                symbol={symbol}
                name='Mô hình chiết khấu dòng tiền (Discounted Cash Flow)'
                formular='Công thức: P0 = Σ (FCFt) / (1 + r)^t'
            />
        </>
    );
}

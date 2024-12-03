"use client";
import React, { useState, useEffect, useRef } from 'react';
import useSetSelectedValuetionPage from '@/src/redux/hooks/useButtonValuetionPage';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/useAppStore';
import { fetchValuationParams } from '@/src/redux/ValuationParams/valuationParamsSlice';
import { fetchValuationResult } from '@/src/redux/ValuationResult';
import { fetchScenarios } from '@/src/redux/Scenarios';
import { selectToken } from "@/src/redux/auth";
import ValuationCentral from '@/src/components/organisms/valuetion/ValuationCentral';
import { selectSelectedButton } from '@/src/redux/ValuetionPage/valuetionPageSlice';

export default function BenjaminGrahamValuetionPage({ params }: { params: { symbol: string } }) {
    const { symbol } = params;
    const dispatch = useAppDispatch();
    useSetSelectedValuetionPage(2);
    const selectButton = useAppSelector(selectSelectedButton);

    // FETCH API LẦN ĐẦU===============================================================
    const hasFetched = useRef(false);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (!hasFetched.current) {
            if (!selectButton) {
                return; 
            }
            const name = 'graham-intrinsic-value-formula';
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
                name='Công thức định giá cổ phiếu của Benjamin Graham'
                formular='Công thức: V = (E x (8.5 + 2g) x 4.4) / y'
            />
        </>
    );
}

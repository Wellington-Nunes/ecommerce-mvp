"use client";

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

type FiltersState = {
    searchTerm: string;
};

type FiltersActions = {
    setSearchTerm: (term: string) => void;
    resetSearch: () => void;
};

type FiltersContextType = {
    state: FiltersState;
    actions: FiltersActions;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<FiltersState>({ searchTerm: '' });

    const setSearchTerm = useCallback((term: string) => {
        setState(prev => ({ ...prev, searchTerm: term }));
    }, []);

    const resetSearch = useCallback(() => {
        setState(prev => ({ ...prev, searchTerm: '' }));
    }, []);

    const actions = useMemo(() => ({
        setSearchTerm,
        resetSearch
    }), [setSearchTerm, resetSearch]);

    const value = useMemo(() => ({
        state,
        actions
    }), [state, actions]);

    return (
        <FiltersContext.Provider value={value}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilters = () => {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error('useFilters deve ser usado dentro de um FiltersProvider');
    }
    return context;
};

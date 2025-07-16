import { createContext, useContext } from 'react';

type LayoutContextType = {
    isFilterOpen: boolean;
    setIsFilterOpen: (isOpen: boolean) => void;
};

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayoutContext должен использоваться внутри LayoutProvider');
    }
    return context;
};
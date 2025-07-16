import type { Hero } from './types/hero-type.tsx';
import { createContext } from 'react';

type HeroesContextType = {
    allHeroes: Hero[] | null;
    foundHeroes: Hero[] | null;
    setAllHeroes: (heroes: Hero[] | null) => void;
    setFoundHeroes: (heroes: Hero[] | null) => void;
}
export const HeroesContext = createContext<HeroesContextType>(null!);
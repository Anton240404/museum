import css from './home.module.css';
import { Button } from '../../UI/button/button.tsx';
import SearchIcon from '/src/assets/search.svg?react';
import FilterIcon from '/src/assets/filter.svg?react';
import { HeroCard } from '../hero-card/hero-card.tsx';

export function Home() {
    return (
        <>
            <div className={css.buttonsAndText}>
                <Button
                    color={'red'}
                    text={'ПОИСК ГЕРОЯ'}
                    icon={<SearchIcon />}
                />

                <Button
                    color={'default'}
                    text={'ФИЛЬТР'}
                    icon={<FilterIcon />}
                />
                <p className={css.text}>СТЕНА ПАМЯТИ</p>
                <img src="/src/assets/wall-of-memory.svg" alt="stenapamyati" />
            </div>
            <div className={css.veteransGrid}>
                {heroes.map(hero => (
                    <HeroCard key={hero.id} hero={hero} />
                ))}
            </div>
        </>
    );
}
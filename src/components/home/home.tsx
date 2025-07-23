import css from './home.module.css';
import { Button } from '../../UI/button/button.tsx';
import SearchIcon from 'assets/search.svg?react';
import SearchIcon2 from 'assets/search.svg';
import FilterIcon from 'assets/filter.svg?react';
import FilterIconActive from 'assets/filter-active.svg?react';
import { HeroCard } from '../hero-card/hero-card.tsx';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterPanel } from '../filter-panel/filter-panel.tsx';
import { useLayoutContext } from '../layout-context/layout-context.tsx';
import { HeroesContext } from '../../heroes-context.tsx';
import { apiProvider } from '../../api-provider.ts';
import wallOfMemoryUrl from 'assets/wall-of-memory.svg';

export function Home() {
    const { isFilterOpen, setIsFilterOpen } = useLayoutContext();
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [error, setError] = useState('');
    const { allHeroes, foundHeroes, setFoundHeroes, setAllHeroes } = useContext(HeroesContext);

    const navigate = useNavigate();

    const heroes = foundHeroes || allHeroes;

    useEffect(() => {
        if (foundHeroes) return;

        apiProvider.getHeroes()
            .then(data => setAllHeroes(data))
            .catch(error => {
                setError('Произошла ошибка');
                console.error(error);
            });
    }, [foundHeroes]);


    return (
        <>
            {isFilterOpen && (
                <FilterPanel
                    onChangeHeroes={(members) => {
                        setAllHeroes(members);
                        setIsFilterActive(true);
                    }}
                    onClose={() => setIsFilterOpen(!isFilterOpen)}
                />
            )}

            <div className={css.buttonsAndText}>
                <div className={isFilterActive? css.buttonContainerActive : css.buttonContainer}>
                    <Button
                        color={'red'}
                        text={'ПОИСК ГЕРОЯ'}
                        icon={<SearchIcon />}
                        onClick={() => navigate('/search')}
                    />
                    <SearchIcon2 />

                    {foundHeroes ? (
                        <Button
                            color={'default'}
                            text={'ОЧИСТИТЬ ВСЁ'}
                            onClick={() => setFoundHeroes(null)}
                        />
                    ) : (
                        <Button
                            color={!isFilterActive ? 'default' : 'red'}
                            text={isFilterActive ? 'ФИЛЬТР АКТИВЕН' : 'ФИЛЬТР'}
                            icon={!isFilterActive ? <FilterIcon/> : <FilterIconActive />}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        />
                    )}

                    {isFilterActive && !foundHeroes && (
                        <Button
                            color={'default'}
                            text={'ОЧИСТИТЬ ВСЁ'}
                            onClick={() => {
                                fetch('https://book-memory-sections-out.itlabs.top/api/members')
                                    .then(res => res.json())
                                    .then(data => {
                                        setAllHeroes(data);
                                        setIsFilterActive(false);
                                    });
                            }}
                        />
                    )}
                </div>

                {foundHeroes ? (<p className={css.text}>РЕЗУЛЬТАТЫ ПОИСКА <span className={css.count}>{foundHeroes.length}</span></p>) : (<p className={css.text}>СТЕНА ПАМЯТИ</p>)}
                <img src={wallOfMemoryUrl} alt="stenapamyati" />
            </div>

            {error && <p className={css.error}>{error}</p>}

            <div className={css.veteransContainer}>
                {!heroes && <p className={css.loading}>Загрузка...</p>}

                {heroes && !heroes.length && <p>Нет результатов</p>}

                {heroes && heroes?.length > 0 && (
                    <>
                        <div className={css.veteranFirst}>
                            <HeroCard
                                hero={heroes[0]}
                            />
                        </div>
                        <div className={css.veteransGrid}>
                            {heroes.slice(1).map(hero => {
                                return <HeroCard key={hero.id} hero={hero} />;
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}


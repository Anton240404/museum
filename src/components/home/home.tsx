import css from './home.module.css';
import { Button } from '../../UI/button/button.tsx';
import searchIconPath from '/assets/search.svg';
import filterIconPath from '/assets/filter.svg';
import filterIconActivePath from '/assets/filter-active.svg';
import wallOfMemoryPath from '/assets/wall-of-memory.svg';
import { HeroCard } from '../hero-card/hero-card.tsx';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterPanel } from '../filter-panel/filter-panel.tsx';
import { useLayoutContext } from '../layout-context/layout-context.tsx';
import { HeroesContext } from '../../heroes-context.tsx';
import { apiProvider } from '../../api-provider.ts';
import { MoonLoader } from 'react-spinners';

export function Home() {
    const { isFilterOpen, setIsFilterOpen } = useLayoutContext();
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [error, setError] = useState('');
    const { allHeroes, foundHeroes, setFoundHeroes, setAllHeroes } =
        useContext(HeroesContext);

    const navigate = useNavigate();

    const heroes = foundHeroes || allHeroes;

    useEffect(() => {
        if (foundHeroes) return;

        apiProvider
            .getHeroes()
            .then((data) => setAllHeroes(data))
            .catch((error) => {
                setError('Произошла ошибка');
                console.error(error);
            });
    }, [foundHeroes]);

    return (
        <>
            <FilterPanel
                show={isFilterOpen}
                onChangeHeroes={(members) => {
                    setAllHeroes(members);
                    setIsFilterActive(true);
                }}
                onClose={() => setIsFilterOpen(!isFilterOpen)}
            />

            <div className={css.buttonsAndText}>
                <div
                    className={
                        isFilterActive
                            ? css.buttonContainerActive
                            : css.buttonContainer
                    }
                >
                    <Button
                        color={'red'}
                        text={'ПОИСК ГЕРОЯ'}
                        size={'sm'}
                        icon={<img src={searchIconPath} />}
                        onClick={() => navigate('/search')}
                    />

                    {foundHeroes ? (
                        <Button
                            color={'default'}
                            size={'sm'}
                            text={'ОЧИСТИТЬ ВСЁ'}
                            onClick={() => setFoundHeroes(null)}
                        />
                    ) : (
                        <Button
                            color={!isFilterActive ? 'default' : 'red'}
                            size={'sm'}
                            text={isFilterActive ? 'ФИЛЬТР АКТИВЕН' : 'ФИЛЬТР'}
                            icon={
                                !isFilterActive ? (
                                    <img src={filterIconPath} />
                                ) : (
                                    <img src={filterIconActivePath} />
                                )
                            }
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        />
                    )}

                    {isFilterActive && !foundHeroes && (
                        <Button
                            color={'default'}
                            text={'ОЧИСТИТЬ ВСЁ'}
                            onClick={() => {
                                fetch(
                                    'https://book-memory-sections-out.itlabs.top/api/members'
                                )
                                    .then((res) => res.json())
                                    .then((data) => {
                                        setAllHeroes(data);
                                        setIsFilterActive(false);
                                    });
                            }}
                        />
                    )}
                </div>

                {foundHeroes ? (
                    <p className={css.text}>
                        РЕЗУЛЬТАТЫ ПОИСКА{' '}
                        <span className={css.count}>{foundHeroes.length}</span>
                    </p>
                ) : (
                    <p className={css.text}>СТЕНА ПАМЯТИ</p>
                )}
                <img
                    className={css.wallIcon}
                    src={wallOfMemoryPath}
                    alt="stenapamyati"
                />
            </div>

            {error && <p className={css.error}>{error}</p>}

            <div className={css.veteransContainer}>
                {!heroes && <MoonLoader />}

                {heroes && !heroes.length && <p>Нет результатов</p>}

                {heroes && heroes?.length > 0 && (
                    <>
                        <div className={css.veteranFirst}>
                            <HeroCard hero={heroes[0]} />
                        </div>
                        <div className={css.veteransGrid}>
                            {heroes.slice(1).map((hero) => {
                                return <HeroCard key={hero.id} hero={hero} />;
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

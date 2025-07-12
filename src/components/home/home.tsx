import css from './home.module.css';
import { Button } from '../../UI/button/button.tsx';
import SearchIcon from '/src/assets/search.svg?react';
import FilterIcon from '/src/assets/filter.svg?react';
import { HeroCard } from '../hero-card/hero-card.tsx';
import { useEffect, useState } from 'react';
import { type Hero } from '../../types/hero-type.tsx';
import { useNavigate } from 'react-router-dom';
import { FilterPanel } from '../filter-panel/filter-panel.tsx';

export function Home() {
    const [heroes, setHeroes] = useState<Hero[] | null>(null);

    const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://book-memory-sections-out.itlabs.top/api/members')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setHeroes(data))
            .catch((error) => {
                setError('Произошла ошибка');
                console.error(error);
            });
    }, []);

    const handleToggleFilterPanel = () => {
        const isOpening = !isFilterPanelVisible;
        setIsFilterPanelVisible(isOpening);
    };

    return (
        <>
            {isFilterPanelVisible && (
                <FilterPanel
                    onChangeHeroes={members => setHeroes(members)}
                    onClose={handleToggleFilterPanel}
                />
            )}

            <div className={css.buttonsAndText}>
                <div className={css.buttonContainer}>
                    <Button
                        color={'red'}
                        text={'ПОИСК ГЕРОЯ'}
                        icon={<SearchIcon />}
                        onClick={() => navigate('/search')}
                    />
                    <Button
                        color={'default'}
                        text={'ФИЛЬТР'}
                        icon={<FilterIcon />}
                        onClick={handleToggleFilterPanel}
                    />
                </div>
                <p className={css.text}>СТЕНА ПАМЯТИ</p>
                <img src="/src/assets/wall-of-memory.svg" alt="stenapamyati" />
            </div>

            {error && <p className={css.error}>{error}</p>}

            <div className={css.veteransContainer}>
                {heroes === null && <p>Загрузка...</p>}

                {heroes && heroes.length === 0 && <p>Нет результатов</p>}

                {heroes && heroes.length > 0 && (
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


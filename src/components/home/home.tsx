import css from './home.module.css';
import { Button } from '../../UI/button/button.tsx';
import SearchIcon from '/src/assets/search.svg?react';
import FilterIcon from '/src/assets/filter.svg?react';
import { HeroCard } from '../hero-card/hero-card.tsx';
import { useEffect, useState } from 'react';
import { type Hero } from '../../types/hero-type.tsx';
import { useNavigate } from 'react-router-dom';
import { FilterPanel } from '../filter-panel/filter-panel.tsx';
import { VirtualKeyboard } from '../virtual-keyboard/virtual-keyboard.tsx';

export function Home() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [initialHeroes, setInitialHeroes] = useState<Hero[]>([]);
    const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
    const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); 

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://book-memory-sections-out.itlabs.top/api/members')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Data from API:', data);
                setHeroes(data);
                setInitialHeroes(data);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }, []);

    const handleToggleFilterPanel = () => {
        const isOpening = !isFilterPanelVisible;
        setIsFilterPanelVisible(isOpening);
    };
    const handleKeyPress = (key: string) => {
        if (key === 'word-delete') {
            setSelectedLetters(prev => prev.slice(0, -1));
            return;
        }

        if (key.length === 1) {
            const upperKey = key.toUpperCase();
            setSelectedLetters(prev => {
                if (prev.includes(upperKey)) {
                    return prev;
                }
                return [...prev, upperKey];
            });
        }
    };

    const handleClearFilters = () => {
        setSelectedLetters([]);
        setHeroes(initialHeroes);
    };

    return (
        <>
            {isFilterPanelVisible && (
                <FilterPanel
                    onChangeHeroes={members => setHeroes(members)}
                    onClose={handleToggleFilterPanel}
                    selectedLetters={selectedLetters}
                    onClear={handleClearFilters}
                />
            )}
            {isKeyboardVisible && (
                <VirtualKeyboard
                    onKeyPress={handleKeyPress}
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
            <div className={css.veteransContainer}>
                {heroes.length > 0 && (
                    <div className={css.veteranFirst}>
                        <HeroCard
                            hero={heroes[0]}
                        />
                    </div>
                )}
                <div className={css.veteransGrid}>
                    {heroes.slice(1).map(hero => {
                        return <HeroCard key={hero.id} hero={hero} />;
                    })}
                </div>
            </div>
        </>
    );
}
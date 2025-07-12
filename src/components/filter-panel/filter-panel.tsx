import css from './filter-panel.module.css';
import { useEffect, useState } from 'react';
import { Button } from '../../UI/button/button.tsx';
import type { Hero } from '../../types/hero-type.tsx';

type Props = {
    onClose: () => void;
    onChangeHeroes: (heroes: Hero[]) => void;
}

type GetFiltersResponse = {
    yearStart: number
    yearEnd: number
    rank: string[]
    word: string[]
}

export const FilterPanel = (props: Props) => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
    const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

    const [filters, setFilters] = useState<GetFiltersResponse | null>(null);
    const [error, setError] = useState('');
    const [searchError, setSearchError] = useState('');
    const [showAllRanks, setShowAllRanks] = useState(false);

    useEffect(() => {
        fetch('https://book-memory-sections-out.itlabs.top/api/members/filters/get')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Data from API:', data);
                setFilters(data);
                setMin(data.yearStart);
                setMax(data.yearEnd);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке данных:', error);
                setError('Произошла ошибка при загрузке фильтров');
            });
    }, []);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        if (value <= max) setMin(value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        if (value >= min) setMax(value);
    };

    const [animationClass, setAnimationClass] = useState(css.slideIn);

    const handleClose = () => {
        setAnimationClass(css.slideOut);
        setTimeout(() => {
            props.onClose();
        }, 500);
    };

    //TODO ---------------------
    const handleRankChange = (rank: string) => {
        setSelectedRanks(prevRanks => {
            if (prevRanks.includes(rank)) {
                return prevRanks.filter(r => r !== rank);
            } else {
                return [...prevRanks, rank];
            }
        });
    };

    //TODO ---------------------

    const handleApplyFilters = () => {
        setSearchError('');

        const ranks = selectedRanks.join(',');
        const words = selectedLetters.join(',');

        const url = `https://book-memory-sections-out.itlabs.top/api/members?yearStart=${min}&yearEnd=${max}&rank=${ranks}&word=${words}`;

        fetch(url)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(`Ошибка сети: ${resp.status}`);
                }
                return resp.json();
            })
            .then(filteredHeroes => {
                props.onChangeHeroes(filteredHeroes);
                props.onClose();
            })
            .catch(error => {
                console.error('Ошибка при применении фильтров:', error);
                setSearchError('Не удалось загрузить данные. Попробуйте еще раз.');
            });
    };

    const handleClear = () => {
        if (filters) {
            setMin(filters.yearStart);
            setMax(filters.yearEnd);
        }
        setSelectedRanks([]);
        setSearchError('');
        setSelectedLetters([]);
    };

    function renderBody() {
        if (!filters) {
            return <p>Загрузка...</p>;
        }

        if (error) {
            return <p className={css.error}>{error}</p>;
        }

        return (
            <div>
                <div className={css.section}>
                    <div className={css.sliderPlaceholder} />
                    <p className={css.label}>ДАТА РОЖДЕНИЯ</p>
                    <div className={css.inputs}>
                        <input type="range" min={filters.yearStart} max={filters.yearEnd} value={min}
                               onChange={handleMinChange} style={{ flex: 1 }} />
                        <input type="range" min={filters.yearStart} max={filters.yearEnd} value={max}
                               onChange={handleMaxChange} style={{ flex: 1 }} />
                    </div>
                    <div className={css.dateInputs}>
                        <input type="text" value={min} onChange={(e) => setMin(+e.target.value)}
                               className={css.dateInput} style={{ flex: 1 }} />
                        <input type="text" value={max} onChange={(e) => setMax(+e.target.value)}
                               className={css.dateInput} style={{ flex: 1 }} />
                    </div>
                </div>

                <div className={css.section}>
                    <p className={css.label}>ЗВАНИЕ</p>
                    {filters.rank.map((rank, index) => {
                        if (!showAllRanks && index > 2) {
                            return null;
                        }
                        return (
                            <label key={rank} className={css.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedRanks.includes(rank)}
                                    onChange={() => handleRankChange(rank)}
                                />
                                {rank}
                            </label>
                        );
                    })}


                    {filters.rank.length > 3 && (
                        <button
                            className={css.showAllButton}
                            onClick={() => setShowAllRanks(!showAllRanks)}
                        >
                            {showAllRanks ? 'Скрыть' : 'Показать все'}
                        </button>
                    )}
                </div>

                <div className={css.section}>
                    <p className={css.label}>ПО БУКВАМ</p>
                    {selectedLetters.join(', ')}
                    <div className={css.letterGrid}>
                        {filters.word.map((letter) => (
                            <button
                                key={letter}
                                onClick={() => {
                                    const selected = selectedLetters.includes(letter);

                                    if (selected) {
                                        setSelectedLetters(selectedLetters.filter((l) => l !== letter));
                                    } else {
                                        setSelectedLetters([...selectedLetters, letter]);
                                    }
                                }}
                                className={`${css.letterButton} ${selectedLetters.includes(letter) ? css.activeLetter : ''}`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={css.buttonContainer}>
                    <Button
                        onClick={handleApplyFilters}
                        text="ПРИМЕНИТЬ"
                        color="red"
                        size="md"
                    />
                    <Button
                        onClick={handleClear}
                        text="ОЧИСТИТЬ"
                        color="default"
                        size="md"
                    />
                </div>
                {searchError && <p className={css.error}>{searchError}</p>}
            </div>
        );
    }

    return (
        <div className={`${css.container} ${animationClass}`}>
            <div className={css.header}>
                <h2 className={css.title}>ФИЛЬТРЫ</h2>
                <img className={css.close} src="/src/assets/close.svg" alt="close" onClick={handleClose} />
            </div>
            {renderBody()}
        </div>
    );
};

import css from './filter-panel.module.css';
import { useEffect, useState } from 'react';

type Props = {
    onClose: () => void;
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

    const [filters, setFilters] = useState<GetFiltersResponse | null>(null);
    const [error, setError] = useState('');


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


    /*TODO! Разобраться с анимацией*/
    const [animationClass, setAnimationClass] = useState(css.slideIn);

    const handleClose = () => {
        setAnimationClass(css.slideOut);
        setTimeout(() => {
            props.onClose();
        }, 500); // 500 мс = 0.5 сек
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
                    <input type="range" min={filters.yearStart} max={filters.yearEnd} value={min} onChange={handleMinChange} />
                    <input type="range" min={filters.yearStart} max={filters.yearEnd} value={max} onChange={handleMaxChange} />
                    <div className={css.dateInputs}>
                        <input type="text" value={min} onChange={(e) => setMin(+e.target.value)}
                               className={css.dateInput} />
                        <input type="text" value={max} onChange={(e) => setMax(+e.target.value)}
                               className={css.dateInput} />
                    </div>
                </div>

                {/* Звание */}
                <div className={css.section}>
                    <p className={css.label}>ЗВАНИЕ</p>
                    <label className={css.checkboxLabel}>
                        <input type="checkbox" /> Ефрейтор
                    </label>
                    <label className={css.checkboxLabel}>
                        <input type="checkbox" defaultChecked /> Лейтенант
                    </label>
                    <label className={css.checkboxLabel}>
                        <input type="checkbox" /> Генерал
                    </label>
                    {/*Добавить еще хотя бы одно звание*/}
                    <button className={css.showAllButton}>Посмотреть все</button>
                </div>

                {/* По буквам */}
                <div className={css.section}>
                    <p className={css.label}>ПО БУКВАМ</p>
                    <div className={css.letterGrid}>
                        {filters.word.map((letter) => (
                            <button
                                key={letter}
                                className={`${css.letterButton} ${letter === 'А' ? css.activeLetter : ''}`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        /*TODO! Разобраться с анимацией*/
        <div className={`${css.container} ${animationClass}`}>
            <div className={css.header}>
                <h2 className={css.title}>ФИЛЬТРЫ</h2>
                <img className={css.close} src="/src/assets/close.svg" alt="close" onClick={handleClose} />
            </div>

            {renderBody()}
        </div>
    );
};

// function List() {
//     const isError = false;
//     const isLoading = false;
//
//     function renderBody() {
//         if (isError) {
//             return (
//                 <p className={css.error}>Произошла ошибка</p>
//             );
//         }
//
//         if (isLoading) {
//             return (
//                 <p className={css.loading}>Загрузка...</p>
//             );
//         }
//
//         return <ul>
//             <li>1</li>
//             <li>1</li>
//             <li>1</li>
//             <li>1</li>
//             <li>1</li>
//         </ul>;
//     }
//
//     return (
//         <div>
//             <p>Список</p>
//
//             {renderBody()}
//         </div>
//     );
// }
//
// function List() {
//     const isError = false;
//     const isLoading = false;
//
//
//
//     return (
//         <div>
//             <p>Список</p>
//
//             <Body />
//         </div>
//     );
// }
//
// function Body() {
//     if (isError) {
//         return (
//             <p className={css.error}>Произошла ошибка</p>
//         );
//     }
//
//     if (isLoading) {
//         return (
//             <p className={css.loading}>Загрузка...</p>
//         );
//     }
//
//     return <ul>
//         <li>1</li>
//         <li>1</li>
//         <li>1</li>
//         <li>1</li>
//         <li>1</li>
//     </ul>;
// }
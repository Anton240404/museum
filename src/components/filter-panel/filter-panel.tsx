import css from './filter-panel.module.css';
import { useState } from 'react';

type Props = {
    onClose: () => void;
}

export const FilterPanel = (props: Props) => {

    const letters = [
        'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж',
        'З', 'И', 'Й', 'К', 'Л', 'М', 'Н',
        'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф',
        'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю',
    ];

    const [min, setMin] = useState(1940);
    const [max, setMax] = useState(1991);

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

    return (
        /*TODO! Разобраться с анимацией*/
        <div className={`${css.container} ${animationClass}`}>
            <div className={css.header}>
                <h2 className={css.title}>ФИЛЬТРЫ</h2>
                <img className={css.close} src="/src/assets/close.svg" alt="close" onClick={handleClose} />
            </div>

            {/* Дата рождения */}
            <div className={css.section}>
                <div className={css.sliderPlaceholder} />
                <p className={css.label}>ДАТА РОЖДЕНИЯ</p>
                <input type="range" min="1900" max="2024" value={min} onChange={handleMinChange} />
                <input type="range" min="1900" max="2024" value={max} onChange={handleMaxChange} />
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
                    {letters.map((letter) => (
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
};
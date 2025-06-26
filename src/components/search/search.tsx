import {  useState } from 'react';
import { VirtualKeyboard } from '../virtual-keyboard/virtual-keyboard.tsx';
import css from './search.module.css';
import SearchIcon from '/src/assets/search.svg?react';
import { Button } from '../../UI/button/button.tsx';
import { useNavigate } from 'react-router-dom';


export function Search() {
    const [value, setValue] = useState('');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const navigate = useNavigate();

    const handleKeyPress = (key: string) => {
        if (key === 'Enter') {
            console.log('Search:', value);
        } else if (key === 'Backspace') {
            setValue((prev) => prev.slice(0, -1));
        } else {
            setValue((prev) => prev + key);
        }
    };

    return (
        <>
            <div className={css.searchInputWrapper}>
                <h2 className={css.searchHero}>Поиск по базе героев</h2>
                <input
                    className={css.searchInput}
                    value={value}
                    placeholder="Кого вы ищите?"
                    onFocus={() => setShowKeyboard(true)}
                    readOnly
                />
                <SearchIcon className={css.searchIcon} />
                <Button
                    color={'default'}
                    text={'НА ГЛАВНУЮ'}
                    size={'md'}
                    onClick={() => navigate('/')}
                />
            </div>
            {showKeyboard && (
                <VirtualKeyboard
                    onKeyPress={handleKeyPress}
                    onClose={() => setShowKeyboard(false)}
                />
            )}
        </>
    );
}
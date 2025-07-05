import { useRef, useState } from 'react';
import { VirtualKeyboard } from '../virtual-keyboard/virtual-keyboard.tsx';
import css from './search.module.css';
import SearchIcon from '/src/assets/search.svg?react';
import { Button } from '../../UI/button/button.tsx';
import { useNavigate } from 'react-router-dom';


export function Search() {
    const [value, setValue] = useState('');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyPress = (key: string) => {
        if (key === 'Enter') {
            console.log('Search:', value);
            setShowKeyboard(false);
        } else if (key === 'word-delete') {
            setValue((prev) => prev.slice(0, -1)); // удаляет 1 символ
        } else if (key === 'Space') {
            setValue((prev) => prev + ' ');
        } else {
            const input = inputRef.current;
            if (input) {
                const pos = input.selectionStart ?? value.length;
                const newValue = value.slice(0, pos) + key + value.slice(pos);
                setValue(newValue);
                const newPos = pos + key.length;
                setTimeout(() => {
                    input.setSelectionRange(newPos, newPos);
                    input.focus();
                }, 0);
            } else {
                setValue((prev) => prev + key);
            }
        }
    };


    return (
        <>
            <div className={`${css.searchInputWrapper} ${showKeyboard ? css.keyboardVisible : ''}`}>
                <h2 className={css.searchHero}>Поиск по базе героев</h2>
                <div className={css.searchInputContainer} >
                    <input
                        className={css.searchInput}
                        value={value}
                        placeholder="Кого вы ищите?"
                        onFocus={() => setShowKeyboard(true)}
                        readOnly
                    />
                    <SearchIcon className={css.searchIcon} />
                </div>
                <div className={`${css.buttonWrapper} ${showKeyboard ? css.keyboardMode : ''}`}>
                    <Button
                        color={'white'}
                        text={'НА ГЛАВНУЮ'}
                        size={'xl'}
                        onClick={() => navigate('/')}
                    />
                </div>
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
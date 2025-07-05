import { useState } from 'react';
import styles from './vertual-keyboard.module.css';
import { type LayoutName, layouts } from '../layouts/layouts.tsx';
import CloseKeyboardIcon from '/src/assets/close-keyboard.svg?react';
import WordDeleteIcon from '/src/assets/word-delete.svg?react';
import WordArrowIcon from '/src/assets/word-arrow.svg?react';
import TranslateIcon from '/src/assets/translate.svg?react';
import * as React from 'react';

const keyIcons: { [key: string] : React.ComponentType} = {
    'word-delete': WordDeleteIcon,
    'word-arrow': WordArrowIcon,
    'translate': TranslateIcon,
};

const keyConfigs: {[key: string]: string} = {
    'Space': styles.space,
    'word-delete': styles.wordDelete,
    'word-arrow': styles.wordArrow,
    'translate': styles.translate,
    '&123': styles.numbers,
    'Ввод': styles.enter
}

type Props = {
    onKeyPress: (value: string) => void;
    onClose: () => void;
};

export function VirtualKeyboard(props: Props) {
    const [layout, setLayout] = useState<LayoutName>('default');
    const [isUppercase, setIsUppercase] = useState(false);

    const handleClick = (key: string) => {
        switch (key) {
            case '&123':
                setLayout('symbols');
                break;
            case 'ABC':
                setLayout('default');
                break;
            case 'АБВ':
                setLayout('ru');
                break;
            case 'translate':
                setLayout(layout === 'default' ? 'ru' : 'default');
                break;
            case 'word-arrow':
                setIsUppercase((prev) => !prev); // включаем/выключаем апперкейс
                break;
            case 'word-delete':
            case 'Ввод':
            case 'Space':
                props.onKeyPress(key);
                break;
            default:
                { const value = isUppercase ? key.toUpperCase() : key;
                props.onKeyPress(value);
                if (isUppercase) setIsUppercase(false); } // сброс как у мобильной клавиатуры
        }
    };

    return (
        <div className={styles.keyboard}>
            {layouts[layout].map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((key) => {
                        const IconComponent = keyIcons[key];
                        const customClass = keyConfigs[key] || '';
                        const isActiveShift = key === 'word-arrow' && isUppercase;

                        return (
                            <button
                                key={key}
                                className={`${styles.key} ${customClass}${isActiveShift ? styles.activeShift : ''}`}
                                onClick={() => handleClick(key)}
                            >
                                {IconComponent ? (
                                    <IconComponent />
                                ) : (
                                    isUppercase ? key.toUpperCase() : key
                                )}
                            </button>
                        );
                    })}
                </div>
            ))}
            <button className={styles.close} onClick={props.onClose}>
                <CloseKeyboardIcon />
            </button>
        </div>
    );
}
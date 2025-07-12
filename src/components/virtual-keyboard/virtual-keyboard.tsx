import { useState } from 'react';
import styles from './vertual-keyboard.module.css';
import { type LayoutName, layouts } from '../layouts/layouts.tsx';
import CloseKeyboardIcon from '/src/assets/close-keyboard.svg?react';
import WordDeleteIcon from '/src/assets/word-delete.svg?react';
import WordArrowIcon from '/src/assets/word-arrow.svg?react';
import TranslateIcon from '/src/assets/translate.svg?react';

const keyIcons = {
    'word-delete': WordDeleteIcon,
    'word-arrow': WordArrowIcon,
    'translate': TranslateIcon,
};

const keyConfigs = {
    'Пробел': styles.space,
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
                setLayout('eng');
                break;
            case 'translate':
                setLayout(layout === 'default' ? 'eng' : 'default');
                break;
            case 'word-arrow':
                setIsUppercase((prev) => !prev);
                break;
            case 'word-delete':
            case 'Ввод':
            case 'Пробел':
                props.onKeyPress(key);
                break;
            default:
                { const value = isUppercase ? key.toUpperCase() : key;
                props.onKeyPress(value);
                if (isUppercase) setIsUppercase(false); }
        }
    };

    return (
        <div className={styles.keyboard}>
            {layouts[layout].map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((key) => {
                        /*TODO!!!!*/
                        type KeyIcon = keyof typeof keyIcons;
                        type KeyConfig = keyof typeof keyConfigs;

                        const IconComponent = keyIcons[key as KeyIcon];
                        const customClass = keyConfigs[key as KeyConfig] || '';
                        const isActiveShift = key === 'word-arrow' && isUppercase;

                        return (
                            <button
                                key={key}
                                className={`${styles.key} ${customClass} ${isActiveShift ? styles.activeShift : ''}`}
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
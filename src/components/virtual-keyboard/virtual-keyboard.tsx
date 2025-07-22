import { useState } from 'react';
import styles from './vertual-keyboard.module.css';
import { type LayoutName, layouts } from '../layouts/layouts.tsx';
import CloseKeyboardIcon from '../../assets/close-keyboard.svg?react';
import WordDeleteIcon from '../../assets/word-delete.svg?react';
import WordArrowIcon from '../../assets/word-arrow.svg?react';

const keyIcons = {
    'word-delete': WordDeleteIcon,
    'word-arrow': WordArrowIcon,
};

const keyConfigs = {
    'Пробел': styles.space,
    'word-delete': styles.wordDelete,
    'word-arrow': styles.wordArrow,
    '&123': styles.numbers,
    'Ввод': styles.enter,
    'АБВ': styles.translate
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
            case 'АБВ':
                setLayout('default');
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
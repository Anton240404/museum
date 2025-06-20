import { useState } from 'react';
import styles from './vertual-keyboard.module.css';

type Props = {
    onKeyPress: (value: string) => void;
    onClose: () => void;
};

type LayoutName = 'default' | 'ru' | 'symbols';

const layouts = {
    default: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['⬆', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
        ['&123', '🌐', 'Space', 'Enter']
    ],
    ru: [
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д'],
        ['⬆', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', '⌫'],
        ['&123', '🌐', 'Space', 'Enter']
    ],
    symbols: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['-', '/', ':', ';', '(', ')', '₽', '&', '@'],
        ['.', ',', '?', '!', '\'', '⌫'],
        ['ABC', 'АБВ', 'Space', 'Enter']
    ]
} as const;

export function VirtualKeyboard(props:Props) {
    const [layout, setLayout] = useState<LayoutName>('default');

    const handleClick = (key: string) => {
        switch (key) {
            case '⌫':
                props.onKeyPress('Backspace');
                break;
            case 'Enter':
                props.onKeyPress('Enter');
                break;
            case 'Space':
                props.onKeyPress(' ');
                break;
            case '&123':
                setLayout('symbols');
                break;
            case 'ABC':
                setLayout('default');
                break;
            case 'АБВ':
                setLayout('ru');
                break;
            case '🌐':
                setLayout((prev) => (prev === 'default' ? 'ru' : 'default'));
                break;
            default:
                props.onKeyPress(key);
        }
    };

    return (
        <div className={styles.keyboard}>
            {layouts[layout].map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((key) => (
                        <button key={key} className={styles.key} onClick={() => handleClick(key)}>
                            {key}
                        </button>
                    ))}
                </div>
            ))}
            <button className={styles.close} onClick={props.onClose}>✕</button>
        </div>
    );
}
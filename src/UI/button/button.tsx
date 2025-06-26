import styles from './button.module.css';
import type { ReactNode } from 'react';

type Props = {
    color: | 'default' | 'red'
    onClick?: () => void;
    text: string;
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
    size?: 'sm' | 'md';
    icon?: ReactNode;
};

export function Button(props: Props) {
    const classnames = [styles.button];

    if (props.color === 'default') {
        classnames.push(styles.default);
    } else if (props.color === 'red') {
        classnames.push(styles.red);
    }

    if (props.size === 'md') {
        classnames.push(styles.md);
    }

    return (
        <>
            <button
                type={props.type || 'button'}
                disabled={props.disabled}
                // !
                onClick={() => props.onClick?.()}
                className={classnames.join(' ')}
            >   {props.icon && <span className={styles.icon}>{props.icon}</span>}
                {props.text}
            </button>
        </>
    );
}

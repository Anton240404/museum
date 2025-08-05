import styles from './button.module.css';
import type { ReactNode } from 'react';

type Props = {
    color: 'default' | 'red' | 'white';
    onClick?: () => void;
    text: string;
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
    size?: 'sm' | 'md' | 'xl';
    icon?: ReactNode;
};

export function Button(props: Props) {
    const classnames = [styles.button];

    if (props.color === 'default') {
        classnames.push(styles.default);
    } else if (props.color === 'red') {
        classnames.push(styles.red);
    } else if (props.color === 'white') {
        classnames.push(styles.white);
    }
    if (props.size === 'sm') {
        classnames.push(styles.sm);
    }
    if (props.size === 'md') {
        classnames.push(styles.md);
    }
    if (props.size === 'xl') {
        classnames.push(styles.xl);
    }

    return (
        <>
            <button
                type={props.type || 'button'}
                disabled={props.disabled}
                onClick={() => props.onClick?.()}
                className={classnames.join(' ')}
            >
                {' '}
                {props.icon && (
                    <span className={styles.icon}>{props.icon}</span>
                )}
                {props.text}
            </button>
        </>
    );
}

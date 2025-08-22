import { useNavigate } from 'react-router';
import { Nav } from '../../nav.ts';
import type { Hero } from '../../types/hero-type.tsx';
import { FALLBACK_IMAGE_URL } from '../../constans/constans.ts';
import css from './hero-card.module.css';
import clsx from 'clsx';

type Props = {
    hero: Hero;
    className: string;
};

export function HeroCard(props: Props) {
    const navigate = useNavigate();

    if (!props.hero) {
        return <p>Загрузка...</p>;
    }

    return (
        <div
            className={clsx(css.cardContainer, props.className)}
            onClick={() => navigate(Nav.hero(props.hero.id))}
        >
            <img
                className={css.heroImage}
                src={FALLBACK_IMAGE_URL}
                alt={props.hero.name}
            />
            <p className={css.heroName}>{props.hero.name}</p>
        </div>
    );
}

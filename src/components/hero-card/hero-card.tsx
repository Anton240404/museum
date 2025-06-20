import { useNavigate } from 'react-router';
import { Nav } from '../../nav.ts';
import type { Hero } from '../../types/hero-type.tsx';
import { FALLBACK_IMAGE_URL } from '../../constans/constans.ts';

type Props = {
    hero: Hero
}

export function HeroCard(props:Props) {
    const navigate = useNavigate();

    if (!props.hero) {
        return <p>Загрузка...</p>;
    }

    return (
        <div
            onClick={() => navigate(Nav.hero(props.hero.id))}
        >
            <img
                src={FALLBACK_IMAGE_URL}
                alt={props.hero.name}
                style={{ maxWidth: '200px', maxHeight: '200px'}}
            />

        </div>
    );
}






/*type Props = {
    veteran: Veteran
}

export function HeroCard({ veteran }: Props) {
    const navigate = useNavigate();

    if (!veteran) {
        return null;
    }

    return (
        <div
            style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '16px',
                margin: '8px',
                textAlign: 'center',
                width: '180px',
                cursor: 'pointer',
            }}
            onClick={() => navigate(Nav.hero(veteran.id))}
        >
            <img
                src={veteran.photo}
                alt={`${veteran.lastName} ${veteran.firstName}`}
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <h5 style={{ margin: '10px 0 0 0' }}>{`${veteran.lastName} ${veteran.firstName.charAt(0)}.`}</h5>
        </div>
    );
}*/









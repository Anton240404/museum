import { useNavigate } from 'react-router';
import { Nav } from '../../nav.ts';



import { useEffect, useState } from 'react';

export type Hero = {
    id: number;
    name: string;
    image: string;
};

export function HeroCard() {
    const navigate = useNavigate();
    const [hero, setHero] = useState<Hero | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://book-memory-sections-out.itlabs.top/api/members');
                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                    return;
                }

                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setHero(data[0]);
                } else {
                    console.warn('Данные с сервера пришли пустыми или не в формате массива.');
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных героя:', error);
            }
        };

        fetchData();
    }, []);

    if (!hero) {
        return <p>Загрузка...</p>;
    }

    return (
        <div
            onClick={() => navigate(Nav.hero(hero.id))}
        >
            <img
                src={hero.image}
                alt={hero.name}
                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
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









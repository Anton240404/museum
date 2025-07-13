import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Hero as HeroType } from '../../types/hero-type.tsx';
import { API_BASE_URL, FALLBACK_IMAGE_URL } from '../../constans/constans.ts';
import css from './hero.module.css';
import { Button } from '../../UI/button/button.tsx';
import MedalIcon from '/src/assets/medal.svg?react';

const useLoadHero = (id: string) => {
    const [hero, setHero] = useState<HeroType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('ID героя не найден в URL.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setHero(null);

        fetch(`${API_BASE_URL}/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data: HeroType) => {
                setHero(data);
            })
            .catch(err => {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Произошла неизвестная ошибка');
                }
                console.error('Ошибка при загрузке данных героя:', err);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [id]);

    return {
        hero,
        loading,
        error,
    };
};


export function Hero() {
    /*TODO!!!*/
    const { id: _id } = useParams<{ id: string }>();
    const id = _id as string;

    const navigate = useNavigate();
    const { hero, loading, error } = useLoadHero(id);


    const handleNextHero = () => {
        const currentId = Number(id);
        if (!isNaN(currentId)) {
            navigate(`/hero/${currentId + 1}`);
        }
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const renderBody = () => {
        if (loading) {
            return <p className={`${css.loadingAndErrorText} ${css.loading}`}>Загрузка...</p>;
        }
        if (error) {
            return <p className={`${css.loadingAndErrorText} ${css.error}`}>Произошла ошибка</p>
        }

        return (
            <div>
                <h2 className={css.textName}>{hero?.name}</h2>
                <div className={css.infoContainer}>
                    <div className={css.infoPlace}>
                        <p className={css.upText}>Год рождения</p>
                        <p className={css.downText}>{hero?.yearStartAt ? `${hero?.yearStartAt} г.` : 'Неизвестно'}</p>
                    </div>
                    <div className={css.infoPlace}>
                        <p className={css.upText}>Место рождения</p>
                        <p className={css.downText}>{!hero?.city ? 'Неизвестно' : hero?.city}</p>
                    </div>
                </div>

                <div className={css.infoContainer}>
                    <div className={css.infoPlace}>
                        <p className={css.upText}>Звание</p>
                        <p className={css.downText}>{hero?.ranks || 'Неизвестно'}</p>
                    </div>
                    <div className={css.infoPlace}>
                        <p className={css.upText}>Призван в армию</p>
                        <p className={css.downText}>{!hero?.calledUponDate ? 'Неизвестно' : hero?.calledUponDate}</p>
                    </div>
                    <div className={css.infoPlace}>
                        <p className={css.upText}>Как погиб</p>
                        <p className={css.downText}>{!hero?.howDie ? 'Неизвестно' : hero?.howDie}</p>
                    </div>
                </div>
                <div className={css.infoContainer}>
                    <div className={css.infoPlace}>
                        <p className={css.upText}>Место гибели (захоронение)</p>
                        <p className={css.downText}>{!hero?.placeDeath ? 'Неизвестно' : hero?.placeDeath}</p>
                    </div>
                    <div className={css.infoPlace}>
                        <p className={css.upText}>Дата гибели</p>
                        <p className={css.downText}>{ hero?.yearEndAt ? `${hero?.yearEndAt} г.` : 'Неизвестно'}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className={css.line}></div>
            <div className={css.container}>
                <div className={css.heroInfo}>
                    {renderBody()}

                    <div>
                        <div className={css.buttonsContainer}>
                            <Button
                                color={'default'}
                                text={'НА ГЛАВНУЮ'}
                                size={'md'}
                                onClick={handleGoHome}
                            />
                            <Button
                                color={'red'}
                                text={'СЛЕДУЮЩИЙ ГЕРОЙ'}
                                size={'md'}
                                icon={<MedalIcon />}
                                onClick={handleNextHero}
                            />
                        </div>
                        <p className={css.friendsInfo}>Для стены памяти информация получена от родных, близких и друзей
                            героев</p>
                    </div>
                </div>

                {!error && hero && (
                    <div>
                        <img
                            className={css.heroImage}
                            src={hero?.image || FALLBACK_IMAGE_URL}
                            alt={hero?.name}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
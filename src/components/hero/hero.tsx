import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Hero as HeroType } from '../../types/hero-type.tsx';
import { API_BASE_URL, FALLBACK_IMAGE_URL } from '../../constans/constans.ts';
import css from './hero.module.css';
import { Button } from '../../UI/button/button.tsx';
import MedalIcon from '/src/assets/medal.svg?react';


export function Hero() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [heroData, setHeroData] = useState<HeroType | null>(null);
    const [, setLoading] = useState(true);
    const [, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('ID героя не найден в URL.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setHeroData(null);

        fetch(`${API_BASE_URL}/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data: HeroType) => {
                setHeroData(data);
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
    console.log('Debug heroData:', heroData);

     const calledUponDateInfo = !heroData?.calledUponDate ? 'Неизвестно' : heroData?.calledUponDate;
     const placeDeathInfo = !heroData?.placeDeath ? 'Неизвестно' : heroData?.placeDeath;
     const howDieInfo = !heroData?.howDie ? 'Неизвестно' : heroData?.howDie;
     const ranksInfo = !heroData?.ranks ? 'Неизвестно' : heroData?.ranks;
     const cityInfo = !heroData?.city ? 'Неизвестно' : heroData?.city;
     const yearStartAtInfo = !heroData?.yearStartAt ? 'Неизвестно' : heroData?.yearStartAt;
     const yearEndAtInfo = !heroData?.yearEndAt ? 'Неизвестно' : heroData?.yearEndAt;


    const handleNextHero = () => {
        if (id) {
            const currentId = parseInt(id, 10);
            if (!isNaN(currentId)) {
                navigate(`/hero/${currentId + 1}`);
            }
        }
    };

    const handleGoHome = () => {
        navigate('/');
    }

    return (
        <>
            <div className={css.line}></div>
            <div className={css.container}>
                <div className={css.heroInfo}>
                    <h2 className={css.textName}>{heroData?.name}</h2>
                    <div className={css.infoContainer}>
                        <div className={css.infoPlace}>
                            <p className={css.upText}>Год рождения</p>
                            <p className={css.downText}>{`${yearStartAtInfo} г.`}</p>
                        </div>
                        <div className={css.infoPlace}>
                            <p className={css.upText}>Место рождения</p>
                            <p className={css.downText}>{cityInfo}</p>
                        </div>
                    </div>

                    <div className={css.infoContainer}>
                        <div className={css.infoPlace}>
                            <p className={css.upText}>Звание</p>
                            <p className={css.downText}>{ranksInfo}</p>
                        </div>
                        <div className={css.infoPlace}>
                            <p className={css.upText}>Призван в армию</p>
                            <p className={css.downText}>{calledUponDateInfo}</p>
                        </div>
                        <div className={css.infoPlace}>
                            <p className={css.upText}>Как погиб</p>
                            <p className={css.downText}>{howDieInfo}</p>
                        </div>
                    </div>
                    <div className={css.infoContainer}>
                        <div className={css.infoPlace}>
                            <p className={css.upText}>Место гибели (захоронение)</p>
                            <p className={css.downText}>{placeDeathInfo}</p>
                        </div>
                        <div className={css.infoPlace}>
                            <p className={css.upText}>Дата гибели</p>
                            <p className={css.downText}>{`${yearEndAtInfo} г.`}</p>
                        </div>
                    </div>
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
                    <p className={css.friendsInfo}>Для стены памяти информация получена от родных, близких и друзей героев</p>
                </div>
                <div>
                    <img
                        className={css.heroImage}
                        src={heroData?.image || FALLBACK_IMAGE_URL}
                        alt={heroData?.name}
                    />
                </div>

            </div>
        </>
    );
}
import styles from './reset.module.css';
import { Outlet, Route, Routes } from 'react-router';
import { Home } from './components/home/home.tsx';
import { HeroView } from './components/hero/hero.tsx';
import { Search } from './components/search/search.tsx';
import { Nav } from './nav.ts';
import css from './components/home/home.module.css';
import clsx from 'clsx';
import style from './components/layout-app.module.css';
import { useState } from 'react';
import { LayoutContext } from './components/layout-context/layout-context.tsx';
import type { Hero } from './types/hero-type.tsx';
import { HeroesContext } from './heroes-context.tsx';

function App() {
    const [allHeroes, setAllHeroes] = useState<Hero[] | null>(null);
    const [foundHeroes, setFoundHeroes] = useState<Hero[] | null>(null);

    return (
        <div className={styles.reset}>
            <HeroesContext value={{ allHeroes, foundHeroes, setFoundHeroes, setAllHeroes }}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path={Nav.hero(':id')} element={<HeroView />} />
                    </Route>
                    <Route path="/search" element={<SearchLayout />} />
                </Routes>
            </HeroesContext>
        </div>
    );
}

function Header(props: { textColor?: 'white' | 'black' }) {
    return <div className={css.header}>
        <img className={css.logo} src="/assets/title-museum.png" alt="logo" />
        <div>
            <h1 className={clsx({
                [css.titleHeaderWhite]: props.textColor === 'white',
                [css.titleHeaderBlack]: props.textColor === 'black',
            })}>Музей Боевой и Трудовой Славы </h1>
            <h1
                className={clsx({
                    [css.subtitleHeaderWhite]: props.textColor === 'white',
                    [css.subtitleHeaderBlack]: props.textColor === 'black',
                })}
            >город Александров </h1>
        </div>
    </div>;
}

function SearchLayout() {
    return (
        <div className={style.containerLayout}>
            <div className={style.searchLayoutBackground}>
                <div className={style.layoutBackground}>
                    <Header textColor="white" />
                    <Search />
                </div>
            </div>
        </div>
    );
}

function Layout() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <LayoutContext.Provider value={{ isFilterOpen, setIsFilterOpen }}>
            <div className={css.container}>
                <Header textColor="black" />
                <Outlet />
                {isFilterOpen && <div className={style.backdrop} />}
            </div>
        </LayoutContext.Provider>
    );
}

export default App;

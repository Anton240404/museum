import styles from './reset.module.css';
import { Outlet, Route, Routes } from 'react-router';
import { Home } from './components/home/home.tsx';
import { Hero } from './components/hero/hero.tsx';
import { Search } from './components/search/search.tsx';
import { Nav } from './nav.ts';
import css from './components/home/home.module.css';
import clsx from 'clsx';
import style from './components/layout.module.css';

function App() {
    return (
        <div className={styles.reset}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path={Nav.hero(':id')} element={<Hero />} />
                </Route>
                <Route path="/search" element={< SearchLayout />} />
            </Routes>
        </div>
    );
}


function Header(props: { textColor?: 'white' | 'black' }) {
    return <div className={css.header}>
        <img className={css.logo} src="/src/assets/title-museum.png" alt="logo" />
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
    return (
        <div className={css.container}>
            <Header textColor="black" />
            <Outlet />
        </div>
    );
}

export default App;

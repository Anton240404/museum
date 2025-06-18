import styles from './reset.module.css';
import { Outlet, Route, Routes } from 'react-router';
import { Home } from './components/home/home.tsx';
import { Hero } from './components/hero/hero.tsx';
import { Search } from './components/search/search.tsx';
import { Nav } from './nav.ts';
import css from './components/home/home.module.css';

function App() {
    return (
        <div className={styles.reset}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path={Nav.hero(":id")} element={<Hero />} />
                    <Route path="/search" element={<Search />} />
                </Route>
            </Routes>
        </div>
    );
}

function Header() {
    return <div className={css.header}>
        <img className={css.logo} src="/src/assets/title-museum.png" alt="logo" />
        <div>
            <h1 className={css.titleHeader}>Музей Боевой и Трудовой Славы </h1>
            <h1 className={css.subtitleHeader}>город Александров </h1>
        </div>
    </div>
}

function Layout() {
    return (
        <div className={css.container}>
            <Header />
            <Outlet />
        </div>
    )
}

export default App;

import styles from './reset.module.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {

    return (
        <div className={styles.reset}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hero/:id" element={<Hero />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;

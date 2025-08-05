import type { Hero } from './types/hero-type.tsx';

type Filters = {
    name?: string;
    yearStart?: number;
    yearEnd?: number;
    ranks?: string[];
    letters?: string[];
};

export const apiProvider = {
    getHeroes: (filters?: Filters): Promise<Hero[]> => {
        let url = 'https://book-memory-sections-out.itlabs.top/api/members';
        if (filters) {
            const params = new URLSearchParams();

            if (filters.name) {
                params.append('name', filters.name);
            }

            if (filters.yearStart !== undefined) {
                params.append('yearStart', filters.yearStart.toString());
            }

            if (filters.yearEnd !== undefined) {
                params.append('yearEnd', filters.yearEnd.toString());
            }
            if (filters.ranks && filters.ranks.length > 0) {
                params.append('ranks', filters.ranks.join(','));
            }

            if (filters.letters && filters.letters.length > 0) {
                params.append('word', filters.letters.join(','));
            }

            const paramsString = params.toString();
            if (paramsString) {
                url += '?' + paramsString;
            }
        }

        return fetch(url).then((resp) => {
            if (!resp.ok) throw new Error(`Ошибка : ${resp.status}`);
            return resp.json();
        });
    },
};

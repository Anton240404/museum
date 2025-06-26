export type Hero = {
    id: number;
    name: string;
    yearStartAt: number;
    yearEndAt: number;
    ranks: string;
    howDie: string;
    image: string;
    dateBirth: string;
    calledUponDate: string;
    city: string;
    placeDeath: string;
};

export const testHero: Hero = {
    id: 1,
    name: 'Иван Петрович',
    yearStartAt: 2000,
    yearEndAt: 2010,
    ranks: '1',
    howDie: 'Погиб в бою',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.renuar.co.il%2Fmen%2Fclothes%2Fknitwear_and_cardigans%2F414892115.html&psig=AOvVaw3xIOx2H202JwL1bVtBFnaa&ust=1750591547640000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPjMteyzgo4DFQAAAAAdAAAAABAE',
    dateBirth: '2000-01-01',
    calledUponDate: '2000-01-01',
    city: 'Москва',
    placeDeath: 'Москва',
}

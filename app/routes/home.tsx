import type { Route } from './+types/home';
import HomePage from '~/pages/HomePage';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'NinjaQuiz' },
        {
            name: 'NinjaQuiz',
            content:
                'Une application de quiz pour progresser dans différents domaines',
        },
    ];
}

export default function Home() {
    return <HomePage />;
}

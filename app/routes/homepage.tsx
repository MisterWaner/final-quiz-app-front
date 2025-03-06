import type { Route } from './+types/homepage';
import Home from '~/components/Main/Home';

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

export default function HomePage() {
    return (
        <>
            <Home />
        </>
    );
}

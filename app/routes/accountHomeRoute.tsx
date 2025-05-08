import type { Route } from './+types/home';
import AccountHomePage from '~/pages/AccountHomePage';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'NinjaQuiz - Mon Compte' },
        {
            name: 'NinjaQuiz',
            content:
                'Une application de quiz pour progresser dans différents domaines',
        },
    ];
}

export default function Home() {
    return <AccountHomePage />;
}

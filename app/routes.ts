import {
    type RouteConfig,
    index,
    layout,
    prefix,
    route,
} from '@react-router/dev/routes';

export default [
    layout('components/Main/main-layout.tsx', [
        index('routes/homepage.tsx'),
        ...prefix('jouer', [
            index('routes/playing-main-page.tsx'),
            layout('components/Game/game-layout.tsx', [
                route(':type', 'routes/quiz-page.tsx'),
            ]),
        ]),

        route('classements', 'routes/ranking.tsx'),
        route('connexion', 'routes/login.tsx'),
    ]),
] satisfies RouteConfig;

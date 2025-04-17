import {
    type RouteConfig,
    index,
    layout,
    prefix,
    route,
} from '@react-router/dev/routes';

export default [
    layout('Layout/MainLayout.tsx', [
        index('routes/home.tsx'),
        ...prefix('jouer', [
            index('routes/playingMainRoute.tsx'),
            layout('Layout/GameLayout.tsx', [
                route(':type', 'routes/quizRoute.tsx'),
            ]),
        ]),
        route('classements', 'routes/rankingRoute.tsx'),
        route('connexion', 'routes/loginRoute.tsx'),
        route('inscription', 'routes/signinRoute.tsx'),
    ]),
] satisfies RouteConfig;

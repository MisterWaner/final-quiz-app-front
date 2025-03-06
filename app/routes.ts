import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("components/Main/main-layout.tsx", [
        index("routes/homepage.tsx"),
        route("jouer", "routes/playing-main-page.tsx"),
        route("classements", "routes/ranking.tsx"),
        route("connexion", "routes/login.tsx"),
    ])
] satisfies RouteConfig;

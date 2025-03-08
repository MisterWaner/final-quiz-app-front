import type { Subject, Theme } from './types';

export type ThemeSelectorData = {
    id: number;
    name: string;
    subtype?: {
        name: string;
        themes: Theme[];
    };
    themes: Theme[];
};

export const themeSelectorData: ThemeSelectorData[] = [
    {
        name: 'Mathématiques',
        id: 1,
        themes: [
            {
                id: 1,
                name: 'Addition',
                path: '/math/addition',
                subjectId: 1,
            },
            {
                id: 2,
                name: 'Soustraction',
                path: '/math/soustraction',
                subjectId: 1,
            },
            {
                id: 3,
                name: 'Multiplication',
                path: '/math/multiplication',
                subjectId: 1,
            },
            {
                id: 4,
                name: 'Calculs aléatoires',
                path: '/math/random-operation',
                subjectId: 1,
            },
        ]
    },
];

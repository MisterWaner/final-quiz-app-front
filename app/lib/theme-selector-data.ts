import type { Subject, Theme } from './types';

export type ThemeSelectorData = {
    id: number;
    name: string;
    subtype?: {
        name: string;
        subjects: Subject[];
    };
    subjects: Subject[];
};

export const themeSelectorData: ThemeSelectorData[] = [
    {
        name: 'Mathématiques',
        id: 1,
        subjects: [
            {
                id: 1,
                name: 'Addition',
                path: 'addition',
                type: 'addition'
            },
            {
                id: 2,
                name: 'Soustraction',
                path: 'soustraction',
                type: 'soustraction'
            },
            {
                id: 3,
                name: 'Multiplication',
                path: 'multiplication',
                type: 'multiplication'
            },
            {
                id: 4,
                name: 'Calculs aléatoires',
                path: 'random-operation',
                type: 'random-operation'
            },
        ],
    },
];

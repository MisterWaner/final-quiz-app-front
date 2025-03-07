const BASE_URL = 'http://localhost:3001';

import type { Question } from '~/lib/types';

export async function getMathQuestions(theme: string): Promise<Question[]> {
    try {
        const response = await fetch(`${BASE_URL}/math/${theme}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch math questions');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching math questions:', error);
        return [];
    }
}

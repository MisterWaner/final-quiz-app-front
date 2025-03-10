const BASE_URL = 'http://localhost:3001';

import type { MultipleChoiceQuestion } from '~/lib/types';

export async function getGeoQuestions(path: string): Promise<MultipleChoiceQuestion[]> {
    try {
        const response = await fetch(`${BASE_URL}/geography/${path}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error('Error fetching math questions:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching math questions:', error);
        return [];
    }
}
const BASE_URL = 'http://localhost:3001';

import type { DirectQuestion } from '~/lib/types';

export async function getMathQuestions(path: string): Promise<DirectQuestion[]> {
    try {
        
        const response = await fetch(`${BASE_URL}/math/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

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

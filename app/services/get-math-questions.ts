const BASE_URL = 'http://localhost:3001';

import type { Question } from '~/lib/types';
import { getSubjectWithThemes } from './get-subject-with-themes';

export async function getMathQuestions(path: string): Promise<Question[]> {
    const subjects = await getSubjectWithThemes();
    const themes = subjects[0].themes;
   
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

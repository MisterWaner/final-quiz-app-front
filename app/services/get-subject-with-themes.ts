const BASE_URL = 'http://localhost:3001/api';

import type { Subject } from '~/lib/types';

export async function getSubjectWithThemes(): Promise<Subject[]> {
    try {
        const response = await fetch(`${BASE_URL}/subjects/with-themes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch subjects:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch subjects:', error);
        return [];
    }
}
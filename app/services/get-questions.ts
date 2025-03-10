import type {
    DirectQuestion,
    MultipleChoiceQuestion,
    TrueOrFalseQuestion,
} from '~/lib/types';

const BASE_URL = 'http://localhost:3001';

export async function getQuestions(
    path: string
): Promise<
    MultipleChoiceQuestion[] | TrueOrFalseQuestion[] | DirectQuestion[]
> {
    try {
        const response = await fetch(`${BASE_URL}/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error('Error fetching questions:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}

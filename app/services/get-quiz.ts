import type { Quiz, Subject, Theme } from '~/lib/types';

const BASE_URL = 'http://localhost:3001/api/quiz';

export type PathProps = {
    subjectPath: Subject['subjectPath'];
    themePath: Theme['themePath'];
};

export async function getQuiz({
    subjectPath,
    themePath,
}: PathProps): Promise<Quiz> {
    try {
        const response = await fetch(
            `${BASE_URL}/${subjectPath}/${themePath}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            const data = (await response.json()) as Quiz;
            return data;
        } else {
            console.error('Failed to fetch quiz data:', response.status);
            return {} as Quiz;
        }
    } catch (error) {
        console.error('Failed to fetch quiz data:', error);
        return {} as Quiz;
    }
}

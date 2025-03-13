import type {
    Quiz,
    Subject,
    Theme,
} from '~/lib/types';

const BASE_URL = 'http://localhost:3001';

export type PathProps = {
    subjectPath: Subject['subjectPath'];
    themePath: Theme['themePath'];
}

export async function getQuiz(
    { subjectPath, themePath }: PathProps
): Promise<
    Quiz
> {
    try {
        const response = await fetch(`${BASE_URL}/${subjectPath}/${themePath}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json() as Quiz;
            console.log(data);
            return data;
        } else {
            console.error('Error fetching questions:', response.status);
            return {} as Quiz;
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
        return {} as Quiz;
    }
}

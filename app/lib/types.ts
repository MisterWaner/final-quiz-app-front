export type Subject = {
    id: number;
    name: string;
    themes: Theme[];
    path: string;
};

export type Theme = {
    id: number;
    name: string;
    type: string;
    subjectId: number;
    path: string;
};

export type MultipleChoiceQuestion = {
    id: number;
    questionText: string;
    choices: string[];
    correctAnswer: string;
};

export type TrueOrFalseQuestion = {
    id: number;
    questionText: string;
    correctAnswer: string;
    choices: boolean[];
};

export type DirectQuestion = {
    id: number;
    questionText: string;
    correctAnswer: string;
};

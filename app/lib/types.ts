export type Subject = {
    id: number;
    name: string;
    path: string;
    type: string;
}

export type Theme = {
    id: number;
    name: string;
    subjectId: number;
    path: string;
}

export type Question = {
    id: number;
    questionText: string;
    correctAnswer: string;
}

export type MultipleChoiceQuestion = {
    id: number;
    questionText: string;
    choices: string[];
    correctAnswer: string;
}

export type TrueOrFalseQuestion = {
    id: number;
    questionText: string;
    correctAnswer: string;
    choices: boolean[];
}
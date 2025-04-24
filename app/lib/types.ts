export type Subject = {
    id: number;
    name: string;
    themes: Theme[];
    subjectPath: string;
};

export type Theme = {
    id: number;
    name: string;
    type: string;
    subjectId: number;
    themePath: string;
};

export interface Quiz {
    id: number;
    questionType: QuestionType;
    questions: (
        | MultipleChoiceQuestion
        | TrueOrFalseQuestion
        | DirectQuestion
    )[];
    themeId: Theme['id'];
}

export type QuestionType = 'multiple-choice' | 'true-or-false' | 'direct';

export interface QuestionBase {
    id: number;
    questionType: QuestionType;
    theme: Theme;
    questionText: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
    questionType: 'multiple-choice';
    options: string[];
    correctAnswer: string;
}

export interface TrueOrFalseQuestion extends QuestionBase {
    questionType: 'true-or-false';
    options: boolean[];
    correctAnswer: boolean | string;
}

export interface DirectQuestion extends QuestionBase {
    questionType: 'direct';
    correctAnswer: string;
}

export type User = {
    id?: string;
    username?: string;
    password?: string;
};

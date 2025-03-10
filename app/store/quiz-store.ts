import { create } from 'zustand';

import { getMathQuestions } from '~/services/get-math-questions';
import { getSubjectWithThemes } from '~/services/get-subject-with-themes';
import type {
    MultipleChoiceQuestion,
    DirectQuestion,
    TrueOrFalseQuestion,
    Subject,
} from '~/lib/types';
import { getGeoQuestions } from '~/services/get-geo-questions';


export type QuizState = {
    theme: string;
    subjectName: string;
    isSelected: boolean;
    type: string;
    directQuestions: DirectQuestion[];
    multipleChoiceQuestions: MultipleChoiceQuestion[];
    trueOrFalseQuestions: TrueOrFalseQuestion[];
    userAnswer: string | number | null;
    currentQuestionIndex: number;
    totalQuestions: number;
    dialogTitle: string;
    dialogTitleStyle: string;
    dialogActionStyle: string;
    progress: number;
    totalProgress: number;
    score: number;
    sessionScore: number;
    timer: number;
    isTimerRunning: boolean;
};

type QuizAction = {
    getSubjectLists: () => Promise<Subject[]>;
    generateQuestion: (type: QuizState['type']) => Promise<void>;
    handleNextQuestion: () => void;
    checkUserAnswer: (userAnswer: QuizState['userAnswer']) => void;
    incrementProgress: () => void;
    resetProgress: () => void;
    incrementScore: () => void;
    incrementSessionScore: () => void;
    resetScore: () => void;
    setTimer: (timer: QuizState['timer']) => void;
    startTimer: (timer: QuizState['timer']) => void;
    stopTimer: () => void;
    resetTimer: () => void;
    decrementTimer: () => void;
};

export const useQuizStore = create<QuizState & QuizAction>((set, get) => ({
    theme: '',
    subjectName: '',
    isSelected: false,
    type: '',
    directQuestions: [],
    multipleChoiceQuestions: [],
    trueOrFalseQuestions: [],
    currentQuestionIndex: 0,
    totalQuestions: 10,
    userAnswer: '',
    dialogTitle: '',
    dialogTitleStyle: 'text-stone-950',
    dialogActionStyle: '',
    progress: 0,
    totalProgress: 100,
    score: 0,
    sessionScore: 0,
    timer: 15,
    isTimerRunning: false,

    setTimer(timer) {
        set({ timer });
    },
    startTimer(timer) {
        set({ isTimerRunning: true, timer: timer });
    },
    stopTimer() {
        set({ isTimerRunning: false });
    },
    resetTimer() {
        set({ timer: 15, isTimerRunning: false });
    },
    decrementTimer() {
        const { timer, isTimerRunning } = get();
        if (isTimerRunning && timer > 0) {
            set({ timer: timer - 1 });
        }
    },

    async getSubjectLists(): Promise<Subject[]> {
        try {
            const subjects = await getSubjectWithThemes();
            return subjects;
        } catch (error) {
            console.error('Erreur lors de la récupération des thèmes', error);
            return [];
        }
    },

    // Questions
    async generateQuestion(path: string) {
        let { directQuestions, multipleChoiceQuestions, trueOrFalseQuestions } = get();
        try {
            if (path.includes('math')) {
                
                directQuestions = await getMathQuestions(path);
                console.log(directQuestions);
                directQuestions.map((question) => ({
                    id: question.id,
                    questionText: question.questionText,
                    correctAnswer: question.correctAnswer,
                }));
                set({ directQuestions, currentQuestionIndex: 0 });
            } else if (path.includes('geography')) {
                multipleChoiceQuestions = await getGeoQuestions(path);
                console.log(multipleChoiceQuestions);
                multipleChoiceQuestions.map((question) => ({
                    id: question.id,
                    questionText: question.questionText,
                    choices: question.choices,
                    correctAnswer: question.correctAnswer,
                }));
                set({ multipleChoiceQuestions, currentQuestionIndex: 0 });
            }
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des questions',
                error
            );
        }
    },
    handleNextQuestion() {
        const { currentQuestionIndex, directQuestions, multipleChoiceQuestions, trueOrFalseQuestions } = get();
        let questions = directQuestions || multipleChoiceQuestions || trueOrFalseQuestions;
        if (questions && currentQuestionIndex < questions.length - 1) {
            set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
    },
    checkUserAnswer(userAnswer) {
        const {
            currentQuestionIndex,
            directQuestions,
            multipleChoiceQuestions,
            trueOrFalseQuestions,
            timer,
            stopTimer,
            incrementScore,
        } = get();
        const questions = directQuestions || multipleChoiceQuestions || trueOrFalseQuestions;
        if (questions && currentQuestionIndex < questions.length - 1) {
            const currentQuestion = questions[currentQuestionIndex];
            if (currentQuestion.correctAnswer === userAnswer) {
                set({
                    dialogTitle: 'Bravo ! Bonne réponse !',
                    dialogTitleStyle: 'text-green-500',
                    dialogActionStyle:
                        'bg-green-500 text-slate-50 hover:bg-green-500/90',
                });
                incrementScore();
            } else if (currentQuestion.correctAnswer !== userAnswer) {
                set({
                    dialogTitle: `Dommage, mauvaise réponse... La bonne réponse est ${currentQuestion.correctAnswer}`,
                    dialogTitleStyle: 'text-red-500',
                    dialogActionStyle:
                        'bg-red-500 text-slate-50 hover:bg-red-500/90',
                });
            } else {
                set({
                    dialogTitle: '',
                    dialogTitleStyle: '',
                    dialogActionStyle: '',
                });
            }

            if (!userAnswer && timer === 0) {
                set({
                    dialogTitle: `Dommage, le temps est écoulé. La bonne réponse est ${currentQuestion.correctAnswer}`,
                    dialogTitleStyle: 'text-red-500',
                    dialogActionStyle:
                        'bg-red-500 text-slate-50 hover:bg-red-500/90',
                });
            }
            stopTimer();
        } else if (
            questions &&
            currentQuestionIndex === questions?.length - 1
        ) {
            const currentQuestion = questions[currentQuestionIndex];
            if (currentQuestion.correctAnswer === userAnswer) {
                set({
                    dialogTitle: 'Bravo ! Bonne réponse !',
                    dialogTitleStyle: 'text-green-500',
                    dialogActionStyle:
                        'bg-green-500 text-slate-50 hover:bg-green-500/90',
                });
                incrementScore();
            } else if (currentQuestion.correctAnswer !== userAnswer) {
                set({
                    dialogTitle: `Dommage, mauvaise réponse... La bonne réponse est ${currentQuestion.correctAnswer}`,
                    dialogTitleStyle: 'text-red-500',
                    dialogActionStyle:
                        'bg-red-500 text-slate-50 hover:bg-red-500/90',
                });
            } else {
                set({
                    dialogTitle: '',
                    dialogTitleStyle: '',
                    dialogActionStyle: '',
                });
            }
            stopTimer();
        }
    },
    // Progress
    incrementProgress: () => {
        const { progress, totalProgress } = get();
        for (let i = 0; i < totalProgress; i++) {
            set({ progress: progress + 10 });
        }
    },
    resetProgress: () => {
        set({ progress: 0 });
    },

    // Score
    incrementScore: () => {
        set((state) => ({ score: state.score + 1 }));
    },
    incrementSessionScore: () => {
        const { score } = get();
        set((state) => ({ sessionScore: state.sessionScore + score }));
    },
    resetScore: () => {
        set((state) => ({ score: (state.score = 0) }));
    },
}));

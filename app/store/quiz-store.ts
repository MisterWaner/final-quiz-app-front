import { create } from 'zustand';
import { getQuiz, type PathProps } from '~/services/get-quiz';
import { getSubjectWithThemes } from '~/services/get-subject-with-themes';
import type { Subject, Quiz, QuestionType } from '~/lib/types';

export type QuizState = {
    theme: string;
    subject: string;
    isSelected: boolean;
    questionType: QuestionType;
    quiz: Quiz;
    type: string;
    questions: Quiz['questions'];
    userAnswer: string | number | null;
    currentQuestionIndex: number;
    totalQuestions: number;
    dialog: {
        title: string;
        style: string;
        actionStyle: string;
    };
    progress: number;
    totalProgress: number;
    score: number;
    sessionScore: number;
    timer: number;
    isTimerRunning: boolean;
};

export type QuizAction = {
    getSubjectLists: () => Promise<Subject[]>;
    getQuiz: (path: PathProps) => Promise<Quiz | {}>;
    handleNextQuestion: () => void;
    checkUserAnswer: (userAnswer: QuizState['userAnswer']) => void;
    incrementProgress: () => void;
    resetProgress: () => void;
    incrementScore: () => void;
    incrementSessionScore: () => void;
    resetScore: () => void;
    resetQuiz: () => void;
    setTimer: (timer: QuizState['timer']) => void;
    startTimer: (timer: QuizState['timer']) => void;
    stopTimer: () => void;
    resetTimer: () => void;
    decrementTimer: () => void;
};

export const useQuizStore = create<QuizState & QuizAction>((set, get) => ({
    theme: '',
    subject: '',
    isSelected: false,
    questionType: '' as QuestionType,
    type: '',
    quiz: {} as Quiz,
    questions: [],
    currentQuestionIndex: 0,
    totalQuestions: 10,
    userAnswer: null,
    dialog: {
        title: '',
        style: 'text-slate-950',
        actionStyle: '',
    },
    progress: 0,
    totalProgress: 100,
    score: 0,
    sessionScore: 0,
    timer: 15,
    isTimerRunning: false,

    // Timer
    setTimer(timer) {
        set({ timer });
    },
    startTimer(timer) {
        set({ isTimerRunning: true, timer });
    },
    stopTimer() {
        set({ isTimerRunning: false });
    },
    resetTimer() {
        set({ isTimerRunning: false, timer: 15 });
    },
    decrementTimer() {
        const { timer, isTimerRunning } = get();
        if (isTimerRunning && timer > 0) {
            set({ timer: timer - 1 });
        }
    },

    // Quiz
    async getSubjectLists(): Promise<Subject[]> {
        const subjects = await getSubjectWithThemes();
        return subjects;
    },
    async getQuiz({ subjectPath, themePath }: PathProps): Promise<Quiz | {}> {
        let { questionType, quiz, questions } = get();
        quiz = await getQuiz({ subjectPath, themePath });
        questionType = quiz.questionType;
        questions = quiz.questions;
        set({ questionType, quiz, questions });
        return { quiz, questionType };
    },
    resetQuiz() {
        set({
            quiz: {} as Quiz,
            questions: [],
            questionType: '' as QuestionType,
            currentQuestionIndex: 0,
        });
    },
    handleNextQuestion() {
        const { currentQuestionIndex, questions } = get();

        if (questions && currentQuestionIndex < questions.length - 1) {
            set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
    },
    checkUserAnswer(userAnswer) {
        const {
            currentQuestionIndex,
            questions,
            timer,
            stopTimer,
            incrementScore,
        } = get();

        if (questions && currentQuestionIndex < questions.length - 1) {
            const currentQuestion = questions[currentQuestionIndex];
            console.log("Réponse utilisater", userAnswer);
            console.log("Réponse correcte", currentQuestion.correctAnswer);

            if (currentQuestion.correctAnswer === userAnswer) {
                set({
                    dialog: {
                        title: 'Bravo! Bonne réponse!',
                        style: 'text-green-500',
                        actionStyle:
                            'bg-green-500 text-slate-50 hover:bg-green-500/90',
                    },
                });
                incrementScore();
            } else if (currentQuestion.correctAnswer !== userAnswer) {
                set({
                    dialog: {
                        title: `Dommage, mauvaise réponse... La bonne réponse est ${currentQuestion.correctAnswer} `,
                        style: 'text-red-500',
                        actionStyle:
                            'bg-red-500 text-slate-50 hover:bg-red-500/90',
                    },
                });
            } else {
                set({
                    dialog: {
                        title: '',
                        style: 'text-slate-950',
                        actionStyle: '',
                    },
                });
            }

            if (!userAnswer && timer === 0) {
                set({
                    dialog: {
                        title: `Dommage, le temps est écoulé! La bonne réponse est ${currentQuestion.correctAnswer}`,
                        style: 'text-red-500',
                        actionStyle:
                            'bg-red-500 text-slate-50 hover:bg-red-500/90',
                    },
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
                    dialog: {
                        title: 'Bravo! Bonne réponse!',
                        style: 'text-green-500',
                        actionStyle:
                            'bg-green-500 text-slate-50 hover:bg-green-500/90',
                    },
                });
                incrementScore();
            } else if (currentQuestion.correctAnswer !== userAnswer) {
                set({
                    dialog: {
                        title: `Dommage, mauvaise réponse... La bonne réponse est ${currentQuestion.correctAnswer}`,
                        style: 'text-red-500',
                        actionStyle:
                            'bg-red-500 text-slate-50 hover:bg-red-500/90',
                    },
                });
            } else {
                set({
                    dialog: {
                        title: '',
                        style: 'text-slate-950',
                        actionStyle: '',
                    },
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

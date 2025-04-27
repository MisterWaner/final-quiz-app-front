import CapitalsMultipleChoiceQuestionCard from './Geography/CapitalsMultipleChoiceQuestionCard';
import FlagsMultipleChoiceQuestionCard from './Geography/FlagsMultipleChoiceQuestionCard';

import { useQuizStore } from '~/store/quiz-store';

export default function MutlipleChoiceQuestionCard() {
    const quiz = useQuizStore((state) => state.quiz);
    let questions = quiz.questions;
    const currentQuestionIndex = useQuizStore(
        (state) => state.currentQuestionIndex
    );

    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.questionText.includes('capitale')) {
        return <CapitalsMultipleChoiceQuestionCard />;
    } else if (currentQuestion.questionText.includes('drapeau')) {
        return <FlagsMultipleChoiceQuestionCard />;
    }
}

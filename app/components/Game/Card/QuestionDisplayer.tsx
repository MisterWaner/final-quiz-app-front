import DirectQuestionCard from './DirectQuestionCard';
import QCMQuestionCard from './QCMQuestionCard';
import TrueOrFalseQuestionCard from './TrueOrFalseQuestionCard';

import { useQuizStore } from '~/store/quiz-store';

export default function QuestionDisplayer() {
    const questionType = useQuizStore((state) => state.questionType);
    console.log(questionType);

    if (questionType === 'direct') {
        return <DirectQuestionCard />;
    } else if (questionType === 'multiple-choice') {
        return <QCMQuestionCard />;
    } else {
        return <TrueOrFalseQuestionCard />;
    }
}

import DirectQuestionCard from './Cards/DirectQuestionCard';
import MutlipleChoiceQuestionCard from './Cards/MutlipleChoiceQuestionCard';
import TrueOrFalseQuestionCard from './Cards/TrueOrFalseQuestionCard';

import { useQuizStore } from '~/store/quiz-store';

export default function QuestionDisplayer() {
    const questionType = useQuizStore((state) => state.questionType);

    if (questionType === 'direct') {
        return <DirectQuestionCard />;
    } else if (questionType === 'multiple-choice') {
        return <MutlipleChoiceQuestionCard />;
    } else {
        return <TrueOrFalseQuestionCard />;
    }
    
}

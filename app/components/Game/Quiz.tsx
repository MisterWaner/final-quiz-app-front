import { useParams } from 'react-router';

import Wrapper from '../Wrapper';
import ContentSection from '../ContentSection';
import ProgressBar from './ProgressBar';
import ScoreIndicator from './ScoreIndicator';
import EndGameCard from './Card/EndGameCard';
import QuestionCard from './Card/QuestionCard';

import { useQuizStore } from '~/store/quiz-store';

export default function Quiz() {
    const { type } = useParams();
    const { theme } = useQuizStore();

    const progress = useQuizStore((state) => state.progress);
    const totalProgress = useQuizStore((state) => state.totalProgress);

    return (
        <Wrapper>
            {progress === totalProgress ? (
                <>
                    <ContentSection>
                        <EndGameCard />
                    </ContentSection>
                    <ContentSection>
                        <ScoreIndicator />
                        <ProgressBar />
                    </ContentSection>
                </>
            ) : (
                <>
                    <h2 className='text-3xl font-bold text-center'>
                        {type
                            ? type
                                .split('-')
                                .map(
                                    (part) =>
                                        part.charAt(0).toUpperCase() +
                                        part.slice(1))
                                .join(' ')
                            : ''}
                    </h2>
                    <ContentSection>
                        <QuestionCard />
                    </ContentSection>
                    <ContentSection>
                        <ScoreIndicator />
                        <ProgressBar />
                    </ContentSection>
                </>
            )}
        </Wrapper>
    );
}

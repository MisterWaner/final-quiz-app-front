import { useParams } from 'react-router';

import Wrapper from '../Wrapper';
import ContentSection from '../ContentSection';
import ProgressBar from './ProgressBar';
import ScoreIndicator from './ScoreIndicator';
import EndGameCard from './Card/EndGameCard';
import QuestionDisplayer from './Card/QuestionDisplayer';

import { useQuizStore } from '~/store/quiz-store';
import { useEffect, useState } from 'react';
import type { Subject } from '~/lib/types';

export default function Quiz() {
    const { type } = useParams();

    const { getSubjectLists } = useQuizStore();
    const progress = useQuizStore((state) => state.progress);
    const totalProgress = useQuizStore((state) => state.totalProgress);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        getSubjectLists().then((subjects) => {
            setSubjects(subjects);
        });
    }, []);

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
                                          part.slice(1)
                                  )
                                  .join(' ')
                            : ''}
                    </h2>
                    <ContentSection>
                        <QuestionDisplayer />
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

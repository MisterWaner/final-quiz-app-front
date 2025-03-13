import { useParams } from 'react-router';

import Wrapper from '../Wrapper';
import ContentSection from '../ContentSection';
import ProgressBar from './ProgressBar';
import ScoreIndicator from './ScoreIndicator';
import EndGameCard from './Card/EndGameCard';
import QuestionCard from './Card/QuestionCard';

import { useQuizStore } from '~/store/quiz-store';
import QCMQuestionCard from './Card/QCMQuestionCard';
import { useEffect, useState } from 'react';
import type { Subject } from '~/lib/types';

export default function Quiz() {
    const { type } = useParams();

    const { getSubjectLists, generateQuiz } = useQuizStore();
    const progress = useQuizStore((state) => state.progress);
    const totalProgress = useQuizStore((state) => state.totalProgress);

    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        getSubjectLists().then((subjects) => {
            setSubjects(subjects);
        });
    }, []);

    const names = subjects.map((subject) => subject.name);
    console.log(names);

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
                        {names[0] === 'Mathématiques' ? (
                            <QuestionCard />
                        ) : (
                            <QCMQuestionCard />
                        )}
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

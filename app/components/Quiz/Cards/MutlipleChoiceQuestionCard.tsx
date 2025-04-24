import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import Timer from '../Timer';

import { useQuizStore } from '~/store/quiz-store';
import MultipleChoiceNextQuestionModal from '../Modals/MultipleChoiceNextQuestionModal';

export default function MutlipleChoiceQuestionCard() {
    const { isTimerRunning, startTimer, resetTimer, decrementTimer } =
        useQuizStore();
    const quiz = useQuizStore((state) => state.quiz);
    const timer = useQuizStore((state) => state.timer);
    const currentQuestionIndex = useQuizStore(
        (state) => state.currentQuestionIndex
    );

    let questions = quiz.questions;

    useEffect(() => {
        let intervalID: NodeJS.Timeout;
        if (isTimerRunning) {
            intervalID = setInterval(() => {
                decrementTimer();
            }, 1000);
        }

        return () => {
            clearInterval(intervalID);
        };
    }, [isTimerRunning, decrementTimer]);

    const currentQuestion = questions[currentQuestionIndex];

    function handleSetResetTimer() {
        resetTimer();
    }

    return (
        <Card
            className='md:w-1/2 mx-auto mt-24'
            onMouseEnter={() => {
                if (!isTimerRunning && timer > 0) startTimer(timer);
            }}
        >
            <CardHeader>
                <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-sm italic'>
                    {currentQuestion?.questionText}
                </p>
                <Label className='mt-4'>Ta réponse :</Label>

                <div className='grid grid-cols-2 items-center gap-4 mt-4'>
                    {('options' in currentQuestion
                        ? currentQuestion.options
                        : []
                    ).map(
                        (option, index) => (
                            console.log(option),
                            (
                                <MultipleChoiceNextQuestionModal
                                    key={index}
                                    handleSetResetTimer={handleSetResetTimer}
                                    option={option as string}
                                />
                            )
                        )
                    )}
                </div>
                <Timer />
            </CardContent>
        </Card>
    );
}

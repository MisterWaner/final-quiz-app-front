import { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import Timer from '../Timer';
import NextQuestionModal from '../Modals/NextQuestionModal';

import { useQuizStore } from '~/store/quiz-store';
import { Button } from '~/components/ui/button';

export default function QCMQuestionCard() {
    const { isTimerRunning, startTimer, resetTimer, decrementTimer } =
        useQuizStore();
    const quiz = useQuizStore((state) => state.quiz);
    const timer = useQuizStore((state) => state.timer);
    const currentQuestionIndex = useQuizStore(
        (state) => state.currentQuestionIndex
    );

    let questions = quiz.questions;

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isTimerRunning) {
            intervalId = setInterval(() => {
                decrementTimer();
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isTimerRunning, decrementTimer]);

    if (!questions || questions.length === 0) return null;

    const currentQuestion = questions[currentQuestionIndex];

    function handleSetResetTimer() {
        resetTimer();
    }

    function handleSelectOption(option: string) {
        const selectedOption = option;
        console.log(selectedOption);

        useQuizStore.setState({ userAnswer: selectedOption });

        return <NextQuestionModal handleSetResetTimer={handleSetResetTimer} />;
    }

    return (
        <Card
            className='md:w-1/2 mx-auto mt-24'
            onMouseEnter={() => {
                if (!isTimerRunning && timer > 0) {
                    startTimer(timer);
                }
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
                    {('choices' in currentQuestion
                        ? currentQuestion.choices
                        : []
                    ).map(
                        (choice, index) => (
                            console.log(choice),
                            (
                                <Button
                                    className='bg-stone-50 border border-stone-200 text-stone-950 hover:bg-stone-100'
                                    key={index}
                                    value={choice as string}
                                    onClick={() =>
                                        handleSelectOption(choice as string)
                                    }
                                >
                                    {choice}
                                </Button>
                            )
                        )
                    )}
                </div>

                <Timer />
            </CardContent>
            <CardFooter className='justify-end'>
                <NextQuestionModal handleSetResetTimer={handleSetResetTimer} />
            </CardFooter>
        </Card>
    );
}

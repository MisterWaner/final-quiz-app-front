import { useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { useQuizStore } from '~/store/quiz-store';

import FlagsRadioGroup from '../../RadioGroup/FlagsRadioGroup';
import NextQuestionModal from '../../Modals/NextQuestionModal';
import Timer from '../../Timer';

export default function FlagsMultipleChoiceQuestionCard() {
    const { isTimerRunning, startTimer, resetTimer, decrementTimer } =
        useQuizStore();
    const quiz = useQuizStore((state) => state.quiz);
    const userAnswer = useQuizStore((state) => state.userAnswer);
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

    function handleRadioInput(value: string) {
        console.log(value);
        useQuizStore.setState({
            userAnswer: value,
        });
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
                <div className='text-sm italic flex items-center gap-4'>
                    <span>{currentQuestion?.questionText}</span>
                    <img
                        src={currentQuestion?.imageUrl}
                        alt={`Drapeau de ${currentQuestion.questionText}`}
                        className='w-32 h-20 '
                    />
                </div>
                <Label className='mt-4'>Ta réponse :</Label>

                <FlagsRadioGroup handleRadioInput={handleRadioInput} />
                <Timer />
            </CardContent>
            <CardFooter className='justify-end'>
                <NextQuestionModal handleSetResetTimer={handleSetResetTimer} />
            </CardFooter>
        </Card>
    );
}

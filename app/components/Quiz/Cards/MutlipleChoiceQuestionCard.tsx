import { useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import Timer from '../Timer';

import { useQuizStore } from '~/store/quiz-store';
import NextQuestionModal from '../Modals/NextQuestionModal';
import CapitalsRadioGroup from '../RadioGroup/CapitalsRadioGroup';
import { Flag } from 'lucide-react';
import FlagsRadioGroup from '../RadioGroup/FlagsRadioGroup';

export default function MutlipleChoiceQuestionCard() {
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
                <p className='text-sm italic'>
                    {currentQuestion?.questionText}
                </p>
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

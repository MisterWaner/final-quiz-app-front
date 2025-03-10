import { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '~/components/ui/card';
import { RadioGroup } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';
import Timer from '../Timer';
import NextQuestionModal from '../Modals/NextQuestionModal';

import { useQuizStore } from '~/store/quiz-store';
import CustomRadioInput from '~/components/CustomRadioInput';

export default function QCMQuestionCard() {
    const {
        questions,
        currentQuestionIndex,
        timer,
        isTimerRunning,
        startTimer,
        resetTimer,
        decrementTimer,
    } = useQuizStore();
    const userAnswer = useQuizStore((state) => state.userAnswer);

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
        setSelectedOption(option);
        console.log(option);
        useQuizStore.setState({
            userAnswer: selectedOption,
        });
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

                <RadioGroup
                    className='grid grid-cols-2 items-center gap-4 mt-4'
                    value={selectedOption || undefined}
                    onValueChange={handleSelectOption}
                >
                    {['Option 1', 'Option 2', 'Option3', 'Option 4'].map(
                        (option) => (
                            <CustomRadioInput
                                label={option}
                                value={option}
                                id={option}
                                key={option}
                            />
                        )
                    )}
                </RadioGroup>

                <Timer />
            </CardContent>
            <CardFooter className='justify-end'>
                <NextQuestionModal handleSetResetTimer={handleSetResetTimer} />
            </CardFooter>
        </Card>
    );
}

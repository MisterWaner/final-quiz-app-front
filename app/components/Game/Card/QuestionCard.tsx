import { useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { useQuizStore } from '~/store/quiz-store';

import NextQuestionModal from '../Modals/NextQuestionModal';

export default function QuestionCard() {
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

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        useQuizStore.setState({
            userAnswer: value,
        });
    }

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
                <p className='text-sm italic'>{currentQuestion.questionText}</p>
                <div className='grid grid-cols-3 items-center gap-4 mt-4'>
                    <Label>Ta réponse :</Label>
                    <Input
                        type='text'
                        className='col-span-2'
                        placeholder='Réponse'
                        onChange={handleInputChange}
                        value={userAnswer}
                        disabled={timer === 0}
                        tabIndex={0}
                    />
                </div>
                {isTimerRunning && timer > 10 ? (
                    <div className='font-bold text-3xl flex w-full justify-center mt-4 text-green-500'>
                        {timer}
                    </div>
                ) : isTimerRunning && timer > 5 && timer <= 10 ? (
                    <div className='font-bold text-3xl flex w-full justify-center mt-4 text-orange-500'>
                        {timer}
                    </div>
                ) : isTimerRunning && timer > 0 && timer <= 5 ? (
                    <div className='font-bold text-3xl flex w-full justify-center mt-4 text-red-500  animate-ping'>
                        {timer}
                    </div>
                ) : (
                    <div className='font-bold text-3xl flex w-full justify-center mt-4 text-slate-500'>
                        {timer}
                    </div>
                )}
            </CardContent>
            <CardFooter className='justify-end'>
                <NextQuestionModal handleSetResetTimer={handleSetResetTimer} />
            </CardFooter>
        </Card>
    );
}

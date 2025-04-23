import { useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardFooter,
} from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import Timer from '../Timer';
import { useQuizStore } from '~/store/quiz-store';
import NextQuestionModal from '../Modals/NextQuestionModal';

export default function DirectQuestionCard() {
    const { isTimerRunning, startTimer, resetTimer, decrementTimer } =
        useQuizStore();

    const userAnswer = useQuizStore((state) => state.userAnswer);
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

    if (!questions || questions.length === 0) return null;

    console.log(questions);

    const currentQuestion = questions[currentQuestionIndex];

    console.log(currentQuestion);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
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
                        value={userAnswer as string}
                        disabled={timer === 0}
                        tabIndex={0}
                    />
                </div>
                <Timer />
            </CardContent>
            <CardFooter className='justify-end'>
                <NextQuestionModal handleSetResetTimer={handleSetResetTimer} />
            </CardFooter>
        </Card>
    );
}

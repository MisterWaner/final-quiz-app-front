import { useState, useCallback } from 'react';
import { SendHorizonal } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogDescription,
} from '~/components/ui/alert-dialog';
import { useQuizStore } from '~/store/quiz-store';

export default function AnswerAndNextQuestionModal({
    handleSetResetTimer,
    choice,
}: {
    handleSetResetTimer: () => void;
    choice: string;
}) {
    const { handleNextQuestion, checkUserAnswer, incrementProgress } =
        useQuizStore();

    const dialogTitle = useQuizStore((state) => state.dialogTitle);
    const dialogTitleStyle = useQuizStore((state) => state.dialogTitleStyle);
    const dialogActionStyle = useQuizStore((state) => state.dialogActionStyle);
    const userAnswer = useQuizStore((state) => state.userAnswer);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSubmit = useCallback(() => {
        console.log(choice);
        checkUserAnswer(choice);
        useQuizStore.setState({
            userAnswer: '',
        });
        incrementProgress();
    }, [checkUserAnswer, choice, incrementProgress]);
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className='bg-stone-50 border border-stone-200 text-stone-950 hover:bg-stone-100 hover:cursor-pointer'
                    onClick={handleSubmit}
                >
                    {choice}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogDescription style={{ visibility: 'hidden' }}>
                    Fenêtre de confirmation
                </AlertDialogDescription>
                <AlertDialogHeader>
                    <AlertDialogTitle className={dialogTitleStyle}>
                        {dialogTitle}
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction asChild className={dialogActionStyle}>
                        <Button
                            className='font-semibold w-2/6 cursor-pointer'
                            onClick={() => {
                                handleNextQuestion();
                                handleSetResetTimer();
                            }}
                        >
                            Suivant
                            <SendHorizonal className='ml-2 h-4 w-4' />
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

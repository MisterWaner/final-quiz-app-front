import { useState, useEffect, useCallback } from 'react';
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

export default function NextQuestionModal({
    handleSetResetTimer,
}: {
    handleSetResetTimer: () => void;
}) {
    const { handleNextQuestion, checkUserAnswer, incrementProgress } =
        useQuizStore();

    const dialogTitle = useQuizStore((state) => state.dialogTitle);
    const dialogTitleStyle = useQuizStore((state) => state.dialogTitleStyle);
    const dialogActionStyle = useQuizStore((state) => state.dialogActionStyle);
    const userAnswer = useQuizStore((state) => state.userAnswer);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSubmit = useCallback(() => {
        checkUserAnswer(userAnswer);
        useQuizStore.setState({
            userAnswer: '',
        });
        incrementProgress();
    }, [checkUserAnswer, userAnswer, incrementProgress]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                setIsModalOpen(true);
                handleSubmit();
            }
        },
        [handleSubmit]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <AlertDialogTrigger asChild>
                <Button className='font-semibold w-2/6 cursor-pointer' onClick={handleSubmit}>
                    Valider
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

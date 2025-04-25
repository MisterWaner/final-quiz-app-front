import { useState, useCallback } from 'react';
import { SendHorizonal } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
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

export default function MultipleChoiceNextQuestionModal({
    handleSetResetTimer,
    option,
}: {
    handleSetResetTimer: () => void;
    option: string;
}) {
    const { handleNextQuestion, checkUserAnswer, incrementProgress } =
        useQuizStore();

    const dialog = useQuizStore((state) => state.dialog);
    const userAnswer = useQuizStore((state) => state.userAnswer);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSubmit = useCallback(() => {
        checkUserAnswer(userAnswer);
        console.log(userAnswer);
        useQuizStore.setState({
            userAnswer: '',
        });
        incrementProgress();
    }, [checkUserAnswer, incrementProgress, userAnswer]);

    return (
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <AlertDialogTrigger asChild>
                <Input
                    className='bg-slate-50 border border-slate-200 text-slate-950 hover:bg-slate-100 cursor-pointer'
                    type='radio'
                    value={userAnswer as string}
                    placeholder={option}
                    onClick={handleSubmit}
                />
                    
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogDescription style={{ visibility: 'hidden' }}>
                    Fenêtre de confirmation
                </AlertDialogDescription>
                <AlertDialogHeader>
                    <AlertDialogTitle className={dialog.style}>
                        {dialog.title}
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction asChild className={dialog.actionStyle}>
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

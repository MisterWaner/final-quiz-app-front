import { useNavigate } from 'react-router';
import { LogIn, UserX } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
} from '~/components/ui/alert-dialog';
import { useQuizStore } from '~/store/quiz-store';

export default function EndedDiscoveryModal() {
    const navigate = useNavigate();
    const { resetProgress, resetScore, resetQuiz } = useQuizStore();

    function handleRegister() {
        resetProgress();
        resetScore();
        resetQuiz();
        navigate('/inscription');
    }

    function handleCancel() {
        resetProgress();
        resetScore();
        resetQuiz();
        navigate('/');
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='font-semibold w-3/6 cursor-pointer'>Terminer</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tu as terminé la découverte !
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Tu peux créer ton compte pour continuer à jouer et
                    sauvegarder ton score.
                </AlertDialogDescription>
                <AlertDialogFooter className='flex flex-row gap-2 mt-2'>
                    <AlertDialogAction asChild>
                        <Button
                            className='font-semibold w-3/6 self-end cursor-pointer'
                            onClick={() => handleRegister()}
                        >
                            Créer mon compte
                            <LogIn className='ml-2 h-4 w-4' />
                        </Button>
                    </AlertDialogAction>
                    <AlertDialogCancel asChild>
                        <Button
                            className='font-semibold w-3/6 bg-red-500 cursor-pointer hover:bg-red-600 hover:text-white' 
                            onClick={() => handleCancel()}
                            variant='destructive'
                        >
                            Terminer
                            <UserX className='ml-2 h-4 w-4' />
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

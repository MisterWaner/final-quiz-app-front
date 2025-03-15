import { useNavigate, useParams, useRevalidator } from 'react-router';
import { Button } from '~/components/ui/button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogAction,
} from '~/components/ui/alert-dialog';
import { RotateCcw, List } from 'lucide-react';

import { useQuizStore } from '~/store/quiz-store';

export default function SaveScoreModal() {
    const {
        resetScore,
        resetTimer,
        resetProgress,
        resetQuiz,
        incrementSessionScore,
    } = useQuizStore();
    const score = useQuizStore((state) => state.score);

    const navigate = useNavigate();
    const revalidator = useRevalidator();

    const { type } = useParams<{ type: string }>();

    function handleSaveScoreInLocalStorage() {
        let savedScore = localStorage.getItem('score');
        if (savedScore) {
            const numberSavedScore = Number(savedScore);
            savedScore = (numberSavedScore + score).toString();
            localStorage.setItem('score', savedScore);
            return savedScore;
        } else {
            return localStorage.setItem('score', score.toString());
        }
    }

    function handleSaveScore() {
        console.log(score);
        incrementSessionScore();
        handleSaveScoreInLocalStorage();
        //updateScore(score);
        resetScore();
        resetTimer();
        resetProgress();
        resetQuiz();
        navigate('/jouer');
    }

    function handleRestart() {
        incrementSessionScore();
        handleSaveScoreInLocalStorage();
        //updateScore(score);
        resetScore();
        resetTimer();
        resetProgress();
        resetQuiz();
        navigate('/jouer');
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='font-semibold w-3/6 cursor-pointer'>
                    Enregistrer mon score
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Ton score a été enregistré !
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-row gap-2'>
                    <AlertDialogAction asChild>
                        <Button
                            className='font-semibold w-3/6 cursor-pointer'
                            onClick={() => handleRestart()}
                        >
                            Recommencer
                            <RotateCcw className='ml-2 h-4 w-4' />
                        </Button>
                    </AlertDialogAction>
                    <AlertDialogAction asChild>
                        <Button
                            className='font-semibold w-3/6 cursor-pointer'
                            onClick={() => handleSaveScore()}
                        >
                            Tous les quizz
                            <List className='ml-2 h-4 w-4' />
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

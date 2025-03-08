import { Progress } from '~/components/ui/progress';
import { useQuizStore } from '~/store/quiz-store';

export default function ProgressBar() {
    const progress = useQuizStore((state) => state.progress);

    return (
        <>
            <Progress
                value={progress}
                className={`md:w-1/2 mx-auto mt-10 ${
                    progress <= 50 ? 'bg-red-500' : 'bg-green-500'
                }`}
            />
            <div className='mt-2 text-2xl font-bold text-center'>
                {progress}%
            </div>
        </>
    );
}

import { Progress } from '~/components/ui/progress';
import { useQuizStore } from '~/store/quiz-store';

export default function ProgressBar() {
    const progress = useQuizStore((state) => state.progress);

    if (progress <= 50) {
        return (
            <>
                <Progress
                    value={progress}
                    className='md:w-1/2 mx-auto mt-10'
                    indicatorColor='bg-red-500'
                />
                <div className='mt-2 text-2xl font-bold text-center'>
                    {progress}%
                </div>
            </>
        );
    } else if (progress > 50 && progress <= 100) {
        return (
            <>
                <Progress
                    value={progress}
                    className='md:w-1/2 mx-auto mt-10'
                    indicatorColor='bg-green-500'
                />
                <div className='mt-2 text-2xl font-bold text-center'>
                    {progress}%
                </div>
            </>
        );
    }
}

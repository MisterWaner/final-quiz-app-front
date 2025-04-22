import { useQuizStore } from '~/store/quiz-store';

export default function Timer() {
    const { timer, isTimerRunning } = useQuizStore();
    return (
        <>
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
        </>
    );
}

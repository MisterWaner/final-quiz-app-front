import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

import { useQuizStore } from '~/store/quiz-store';

export default function CapitalsRadioGroup({
    handleRadioInput,
}: {
    handleRadioInput: (value: string) => void;
}) {
    const userAnswer = useQuizStore((state) => state.userAnswer);
    const quiz = useQuizStore((state) => state.quiz);
    const timer = useQuizStore((state) => state.timer);
    const currentQuestionIndex = useQuizStore(
        (state) => state.currentQuestionIndex
    );

    let questions = quiz.questions;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <RadioGroup
            className='grid grid-cols-2 items-center gap-4 mt-4'
            value={userAnswer as string}
            onValueChange={handleRadioInput}
        >
            {('options' in currentQuestion ? currentQuestion.options : []).map(
                (option, index) => (
                    <div className='flex items-center space-x-4' key={index}>
                        <RadioGroupItem
                            value={option as string}
                            id={option as string}
                            disabled={timer === 0}
                            className='cursor-pointer '
                        />
                        <Label
                            htmlFor={option as string}
                            className='cursor-pointer'
                        >
                            {option as string}
                        </Label>
                    </div>
                )
            )}
        </RadioGroup>
    );
}

import { Label } from '~/components/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

import { useQuizStore } from '~/store/quiz-store';

export default function FlagsRadioGroup({
    handleRadioInput,
}: {
    handleRadioInput: (value: string) => void;
}) {
    const userAnswer = useQuizStore((state) => state.userAnswer);
    const quiz = useQuizStore((state) => state.quiz);
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
                    //console.log(option),
                    <div className='flex items-center space-x-4 w-full' key={index}>
                        <RadioGroupItem
                            value={option as string}
                            id={`flag-${index}`}
                        />
                        <Label htmlFor={`flag-${index}`}>
                            <span>{index + 1}</span>
                            <img
                                className='w-32 h-24 object-cover rounded shadow'
                                src={`${option as string}`}
                                alt={option as string}
                            />
                        </Label>
                    </div>
                )
            )}
        </RadioGroup>
    );
}

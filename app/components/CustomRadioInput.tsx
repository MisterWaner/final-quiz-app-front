import { RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';

export type CustomRadioInputProps = {
    label: string;
    value: string;
    id: string;
};

export default function CustomRadioInput({
    label,
    value,
    id,
}: CustomRadioInputProps) {
    return (
        <div>
            <Label htmlFor={id} className='relative cursor-pointer w-full'>
                <RadioGroupItem value={value} id={id} className='sr-only' />
                <div
                    className='w-full p-3 text-center rounded-lg border border-stone-300 bg-stone-100 
                data-[state=checked]:bg-blue-600 data-[state=checked]:text-white transition-all'
                >
                    {label}
                </div>
            </Label>
        </div>
    );
}

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '~/lib/utils';

interface CustomProgressProps
    extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    indicatorColor: string;
}

const Progress = React.forwardRef<
    React.ComponentRef<typeof ProgressPrimitive.Root>,
    CustomProgressProps
>(({ className, value, indicatorColor, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            'relative h-4 w-full overflow-hidden rounded-full bg-stone-900/20 dark:bg-neutral-50/20',
            className
        )}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={`h-full w-full flex-1 transition-all dark:bg-neutral-50 ${indicatorColor}`}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// function Progress({
//     className,
//     value,
//     ...props
// }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
//     return (
//         <ProgressPrimitive.Root
//             data-slot='progress'
//             className={cn(
//                 'bg-stone-900/20 relative h-4 w-full overflow-hidden rounded-full',
//                 className
//             )}
//             {...props}
//         >
//             <ProgressPrimitive.Indicator
//                 data-slot='progress-indicator'
//                 className=' h-full w-full flex-1 transition-all'
//                 style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//             />
//         </ProgressPrimitive.Root>
//     );
// }

export { Progress };

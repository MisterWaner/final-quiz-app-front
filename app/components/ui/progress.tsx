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
        data-slot='progress'
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

export { Progress };

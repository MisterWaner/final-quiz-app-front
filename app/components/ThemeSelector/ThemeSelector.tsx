import { Link } from 'react-router';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuGroup,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';

import { useQuizStore } from '~/store/quiz-store';
import { themeSelectorData } from '~/lib/theme-selector-data';
import type { Theme } from '~/lib/types';

export default function ThemeSelector() {
    return <div>ThemeSelector</div>;
}

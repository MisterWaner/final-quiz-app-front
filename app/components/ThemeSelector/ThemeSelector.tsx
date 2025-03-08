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
import type { ThemeSelectorData } from '~/lib/theme-selector-data';
import type { Subject, Theme } from '~/lib/types';

export default function ThemeSelector() {
    const themeSelector = themeSelectorData;

    return (
        <div className='mt-4 flex flex-col md:flex-row gap-4 md:w-2/4'>
            {themeSelector.map(({ name, id, subtype, subjects }) => (
                <DropdownMenu key={id}>
                    <DropdownMenuTrigger className='font-bold' asChild>
                        <Button className='md:w-96 cursor-pointer'>{name}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='md:w-96 w-56' align='start'>
                        {subtype ? (
                            <DropdownMenuGroupWithSubtypes
                                subtype={{ ...subtype, id }}
                            />
                        ) : (
                            <DropdownMenuGroupWithoutSubtypes subjects={subjects} />
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            ))}
        </div>
    );
}

function DropdownMenuGroupWithSubtypes({
    subtype,
}: {
    subtype: ThemeSelectorData;
}) {
    const generateQuestion = useQuizStore((state) => state.generateQuestion);
    const setTimer = useQuizStore((state) => state.setTimer);

    return (
        <DropdownMenuGroup>
            <DropdownMenuLabel>{subtype.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {subtype.subjects.map(({ id, name, path, type }: Subject) => (
                <DropdownMenuItem key={id}>
                    <Link
                        to={`${path}`}
                        className='cursor-pointer'
                        onClick={() => {
                            generateQuestion(type, name);
                            setTimer(15);
                        }}
                    >
                        {name}
                    </Link>
                </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
    );
}

function DropdownMenuGroupWithoutSubtypes({ subjects }: { subjects: Subject[] }) {
    const generateQuestion = useQuizStore((state) => state.generateQuestion);
    const setTimer = useQuizStore((state) => state.setTimer);

    return <DropdownMenuGroup>
        {subjects?.map(({id, name, path, type}: Subject) => (
            <DropdownMenuItem key={id} asChild>
                <Link to={`${path}`} className='cursor-pointer'
                    onClick={() => {
                        generateQuestion(type, name);
                        setTimer(15);
                    }}
                >
                    {name}
                </Link>
            </DropdownMenuItem>
        ))}
    </DropdownMenuGroup>;
}

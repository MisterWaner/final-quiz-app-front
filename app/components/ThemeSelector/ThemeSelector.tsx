import { useEffect, useState } from 'react';
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

import type { Subject, Theme } from '~/lib/types';

export default function ThemeSelector() {
    const { getSubjectLists, generateQuestion, setTimer } = useQuizStore();
    
    const [subjects, setSubjects] = useState<Subject[]>([]);
    
    useEffect(() => {
        const fetchSubjects = async() => {
            const subjectsList = await getSubjectLists();
            setSubjects(subjectsList);
            console.log(subjectsList);
        }
        fetchSubjects();
    }, []);
    
    return (
        <div className='mt-4 flex flex-col md:flex-row gap-4 md:w-2/4'>
            {subjects.map(({ name, id, themes }) => (
                <DropdownMenu key={id}>
                    <DropdownMenuTrigger className='font-bold' asChild>
                        <Button className='md:w-96 cursor-pointer'>
                            {name}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='md:w-96 w-56' align='start'>
                        {themes.map(({ name, id, path }: Theme) => (
                            <DropdownMenuItem key={id}>
                                <Link
                                    to={`${path}`}
                                    className='cursor-pointer'
                                    onClick={() => {
                                        generateQuestion(path);
                                        setTimer(15);
                                    }}
                                >
                                    {name.charAt(0).toUpperCase() + name.slice(1)}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            ))}
        </div>
    );
}


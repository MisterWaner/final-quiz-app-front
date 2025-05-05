import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableHeader,
    TableCaption,
} from '~/components/ui/table';
import type { User } from '~/lib/types';

export default function GlobalRanksTableCard() {
    const [usersGlobalScores, setUsersGlobalScores] = useState<User[]>([]);

    return (
        <Table>
            <TableCaption>Ce classement est remis à 0 tous les mois</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-1/5 text-center'>
                        Position
                    </TableHead>
                    <TableHead className='w-2/5 text-center'>Pseudo</TableHead>
                    <TableHead className='w-2/5 text-center'>Score</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {usersGlobalScores.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell className='text-center'>
                            {index + 1}
                        </TableCell>
                        <TableCell className='text-center'>
                            {user.username}
                        </TableCell>
                        <TableCell className='text-center'>
                            100
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from '~/components/ui/card';
import { ScrollArea } from '~/components/ui/scroll-area';

export default function RanksTableCard({
    title,
    description,
    content,
}: {
    title: string;
    description?: string;
    content: React.ReactNode;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-center text-lg'>
                    {title}
                </CardTitle>
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <ScrollArea className='h-80 rounded-md border border-slate-950'>
                    {content}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

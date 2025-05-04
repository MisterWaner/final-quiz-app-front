import { Link } from 'react-router';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '~/components/ui/card';
import LoginForm from './LoginForm';

export default function LoginCard() {
    return (
        <Card className='max-sm:w-10/12 max-md:w-8/12 md:w-6/12 lg:w-4/12 flex flex-col items-center mt-10'>
            <CardHeader className='w-full text-center'>
                <CardTitle>Connecte-toi</CardTitle>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter>
                <p className='text-sm italic text-slate-400'>
                    Tu n'as pas encore de compte ?
                    <Link
                        to='/inscription'
                        className='text-slate-950 font-semibold underline underline-offset-4 ml-4'
                    >
                        Inscris toi !
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}

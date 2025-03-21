import { Link } from 'react-router';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '~/components/ui/card';
import LoginForm from '../Forms/LoginForm';

export default function LoginCard() {
    return (
        <Card className='max-sm:w-10/12 max-md:w-8/12 md:w-6/12 lg:w-4/12 flex flex-col items-center mt-10'>
            <CardHeader>
                <CardTitle>Inscris-toi</CardTitle>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter>
                <p className='text-sm italic text-stone-400'>
                    Tu n'as pas encore de compte ?
                    <Link
                        to='/inscription'
                        className='text-stone-950 font-semibold underline underline-offset-4 ml-4'
                    >
                        Inscris toi !
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}

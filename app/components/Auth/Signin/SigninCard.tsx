import { Link } from 'react-router';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '~/components/ui/card';
import SigninForm from './SigninForm';

export default function SigninCard() {
    return (
        <Card className='max-sm:w-10/12 max-md:w-8/12 md:w-6/12 lg:w-4/12 flex flex-col items-center mt-10'>
            <CardHeader className='w-full text-center'>
                <CardTitle>Inscris-toi</CardTitle>
            </CardHeader>
            <CardContent>
                <SigninForm />
            </CardContent>
            <CardFooter>
                <p className='text-sm italic text-slate-400'>
                    Déjà inscrit ?
                    <Link
                        to='/connexion'
                        className='text-slate-950 font-semibold underline underline-offset-4 ml-4'
                    >
                        Connecte toi !
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}

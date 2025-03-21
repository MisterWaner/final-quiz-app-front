import ContentSection from '../ContentSection';
import LoginCard from './Card/LoginCard';

export default function Login() {
    return (
        <ContentSection>
            <h2 className='text-3xl font-bold text-center mt-10'>
                Connexion
            </h2>
            <div className='flex flex-col justify-center items-center'>
                <LoginCard />
            </div>
        </ContentSection>
    );
}

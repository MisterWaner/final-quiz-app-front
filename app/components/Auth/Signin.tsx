import ContentSection from '../ContentSection';
import SigninCard from './Card/SigninCard';

export default function Signin() {
    return (
        <ContentSection>
            <h2 className='text-3xl font-bold text-center mt-10'>
                Inscription
            </h2>
            <div className="flex flex-col justify-center items-center">
                <SigninCard />
            </div>
        </ContentSection>
    );
}

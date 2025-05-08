import ContentSection from '~/components/ContentSection';
import ninjaQuiz from '/ninjaquiz.png';

export default function AccountHomePage() {
    return (
        <>
            <h2 className='text-3xl font-bold text-center mt-10'>Mon Compte</h2>
            <ContentSection>
                <div className='mt-20 flex flex-col items-center justify-center md:flex-row'>
                    <img
                        src={ninjaQuiz}
                        alt=''
                        className='w-3/6 md:w-1/4 select-none'
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </div>
            </ContentSection>
        </>
    );
}

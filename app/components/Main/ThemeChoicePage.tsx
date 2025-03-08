import ThemeSelector from '../ThemeSelector/ThemeSelector';
import ContentSection from '../ContentSection';

export default function ThemeChoicePage() {
    return (
        <>
            <h2 className='text-3xl font-bold text-center mt-10'>
                Choisis ton thème.
            </h2>
            <ContentSection>
                <div className='mt-10'>
                    <ThemeSelector />
                </div>
            </ContentSection>
        </>
    );
}

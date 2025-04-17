import ContentSection from '~/components/ContentSection';

export default function ThemeSelectionPage() {
    return (
        <>
            <h2 className='text-3xl font-bold text-center mt-10'>
                Choisis ton thème.
            </h2>
            <ContentSection>
                <div className="mt-10">
                    Theme Selector
                </div>
            </ContentSection>
        </>
    );
}

import ContentSection from '~/components/ContentSection';
import RanksTableCard from '~/components/Scores/RanksTableCard';
import DailyRanksTableCard from '~/components/Scores/DailyRanksTableCard';
import GlobalRanksTableCard from '~/components/Scores/GlobalRanksTableCard';

export default function RankingPage() {
    return (
        <>
            <h2 className='text-3xl font-bold text-center mt-10'>
                Classements
            </h2>
            <div className='flex max-xl:flex-col gap-6'>
                <ContentSection>
                    <RanksTableCard
                        title='Classement du jour'
                        description='Classement des meilleurs scores du jour'
                        content={<DailyRanksTableCard />}
                    />
                </ContentSection>
                <ContentSection>
                    <RanksTableCard
                        title='Classement global'
                        description='Classement des meilleurs scores mensuels'
                        content={<GlobalRanksTableCard />}
                    />
                </ContentSection>
            </div>
        </>
    );
}

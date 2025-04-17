import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import ninjaDino from '/ninja-velociraptor.svg'
import ContentSection from "~/components/ContentSection";
export default function HomePage() {
    return (
        <>
            <h2 className='text-3xl font-bold text-center mt-10'>
                Bienvenue sur NinjaQuiz
            </h2>
            <ContentSection>
                <div className='mt-20 flex flex-col items-center justify-center md:flex-row'>
                    <img src={ninjaDino} alt='' className='w-3/6 md:w-1/4' />
                    <p className='text-xl font-semibold mt-10 md:mt-0 md:ml-10'>
                        Te voilà sur NinjaQuiz, un jeu pour te faire pratiquer
                        un ensemble de matières dans le but de t'améliorer, de
                        progresser et de devenir{' '}
                        <span className='font-bold text-green-500 text-2xl'>
                            meilleur
                        </span>
                        .
                    </p>
                </div>
            </ContentSection>
            <ContentSection>
                <article>
                    <h3 className='text-2xl font-bold text-center'>
                        Comment ça marche ?
                    </h3>
                    <p className='mt-5'>
                        Tu peux jouer à NinjaQuiz sans créer de compte, mais si
                        tu veux pouvoir enregistrer ton score et voir ton
                        évolution au fil du temps, tu dois créer un compte{' '}
                        <span className='font-bold text-green-500'>
                            gratuitement
                        </span>
                        .
                    </p>
                    <div className='mt-5 grid grid-flow-row auto-rows-fr gap-4 md:grid-flow-col md:auto-cols-fr'>
                        <Button asChild>
                            <Link to='/inscription'>Créer un compte</Link>
                        </Button>
                        <Button asChild>
                            <Link to='/connexion'>Se connecter</Link>
                        </Button>
                        <Button asChild>
                            <Link to='/jouer'>Découvrir</Link>
                        </Button>
                    </div>
                </article>
            </ContentSection>
        </>
    );
}

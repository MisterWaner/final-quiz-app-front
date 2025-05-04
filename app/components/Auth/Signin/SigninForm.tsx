import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormLabel,
    FormItem,
    FormField,
    FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import SigninModal from './SigninModal';
import { registrationSchema } from '~/lib/zod-schemas';
import { useAuthStore } from '~/store/auth-store';

export default function SigninForm() {
    const form = useForm<z.infer<typeof registrationSchema>>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmation: '',
        },
    });

    const {
        registerUser,
        registrationMessage,
        registrationStatus,
        titleStyle,
        buttonStyle,
        showRegistrationModal,
        setShowRegistrationModal,
    } = useAuthStore();

    async function handleRegistration(
        values: z.infer<typeof registrationSchema>
    ) {
        try {
            await registerUser(values);
            console.log('Formulaire validé', values);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error, "Erreur lors de l'envoie des données");
                console.log(values);
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleRegistration)}
                className='flex flex-col gap-4'
            >
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pseudo</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    placeholder='Pseudo'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Mot de passe'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='confirmation'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmation du mot de passe</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='Confirmation du mot de passe'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex justify-end'>
                    <Button
                        type='submit'
                        disabled={!form.formState.isValid}
                        className='w-full xl:w-1/2'
                    >
                        S'inscrire
                    </Button>
                    <SigninModal
                        registrationStatus={registrationStatus}
                        registrationMessage={registrationMessage}
                        open={showRegistrationModal}
                        onOpenChange={(open) => setShowRegistrationModal(open)}
                        titleStyle={titleStyle}
                        buttonStyle={buttonStyle}
                    />
                </div>
            </form>
        </Form>
    );
}

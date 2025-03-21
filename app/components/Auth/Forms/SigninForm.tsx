import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import SigninModal from '../Modals/SigninModal';
import { registrationSchema } from '~/lib/zod-schemas';
import { useAuthStore } from '~/store/auth-store';

export default function SigninForm() {
    const {
        registerUser,
        registrationMessage,
        registrationStatus,
        showRegistrationDialog,
        titleColor,
        setShowRegistrationDialog,
    } = useAuthStore();

    const form = useForm<z.infer<typeof registrationSchema>>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmation: '',
        },
    });

    const handleRegistration = async (
        values: z.infer<typeof registrationSchema>
    ) => {
        try {
            await registerUser(values);
            console.log('Formulaire validé', values);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error, "Erreur lors de l'envoie des données");
                console.log(values);
            }
        }
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleRegistration)}
                className='space-y-4'
            >
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pseudo</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder='Pseudo'
                                    type='text'
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
                                    {...field}
                                    placeholder='mot de passe'
                                    type='password'
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
                            <FormLabel>Confirmation</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder='confirmation'
                                    type='password'
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
                        open={showRegistrationDialog}
                        onOpenChange={(open) => setShowRegistrationDialog(open)}
                        titleColor={titleColor}
                    />
                </div>
            </form>
        </Form>
    );
}

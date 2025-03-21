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
import LoginModal from '../Modals/LoginModal';
import { loginSchema } from '~/lib/zod-schemas';
import { useAuthStore } from '~/store/auth-store';

export default function LoginForm() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const {
        loginUser,
        loginMessage,
        loginStatus,
        showLoginDialog,
        titleColor,
        buttonColor,
        setShowLoginDialog,
    } = useAuthStore();

    const resetForm = (): void => {
        form.reset({
            username: '',
            password: '',
        });
    };

    const handleLogin = async (values: z.infer<typeof loginSchema>) => {
        try {
            await loginUser(values);
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
                onSubmit={form.handleSubmit(handleLogin)}
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
                <div className='flex justify-end'>
                    <Button
                        type='submit'
                        disabled={!form.formState.isValid}
                        className='w-full xl:w-1/2'
                    >
                        Se connecter
                    </Button>
                    <LoginModal
                        loginStatus={loginStatus}
                        loginMessage={loginMessage}
                        open={showLoginDialog}
                        onOpenChange={(open) => setShowLoginDialog(open)}
                        onClose={resetForm}
                        buttonColor={buttonColor}
                        titleColor={titleColor}
                    />
                </div>
            </form>
        </Form>
    );
}

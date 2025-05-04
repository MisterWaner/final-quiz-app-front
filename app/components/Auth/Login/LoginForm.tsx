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
import LoginModal from './LoginModal';
import { loginSchema } from '~/lib/zod-schemas';
import { useAuthStore } from '~/store/auth-store';

function LoginForm() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const {
        loginUser,
        loginMessage,
        loginStatus,
        titleStyle,
        buttonStyle,
        showLoginModal,
        setShowLoginModal,
    } = useAuthStore();

    function resetForm(): void {
        form.reset({
            username: '',
            password: '',
        });
    }

    async function handleLogin(values: z.infer<typeof loginSchema>) {
        try {
            await loginUser(values);
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
                className='flex flex-col gap-4'
                onSubmit={form.handleSubmit(handleLogin)}
            >
                <FormField
                    name='username'
                    control={form.control}
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
                    name='password'
                    control={form.control}
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
                        open={showLoginModal}
                        onOpenChange={(open) => setShowLoginModal(open)}
                        onClose={resetForm}
                        titleStyle={titleStyle}
                        buttonStyle={buttonStyle}
                    />
                </div>
            </form>
        </Form>
    );
}

export default LoginForm;

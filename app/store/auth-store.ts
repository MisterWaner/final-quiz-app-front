import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '~/lib/types';
import {
    registerUser as registerService,
    loginUser as loginService,
    logoutUser as logoutService,
} from '~/services/auth-service';

export type AuthState = {
    loginStatus: string;
    loginMessage: string;
    registrationStatus: string;
    registrationMessage: string;
    showLoginDialog: boolean;
    showRegistrationDialog: boolean;
    titleColor: string;
    buttonColor: string;
};

type AuthAction = {
    loginUser: (user: User) => Promise<void>;
    registerUser: (user: User) => Promise<void>;
    logoutUser: (user: User) => Promise<void>;
    setShowLoginDialog: (show: boolean) => void;
    setShowRegistrationDialog: (show: boolean) => void;
    resetLoginDialog: () => void;
    resetRegistrationDialog: () => void;
};

export const useAuthStore = create<AuthState & AuthAction>()(
    persist(
        (set) => ({
            loginStatus: '',
            loginMessage: '',
            registrationStatus: '',
            registrationMessage: '',
            showLoginDialog: false,
            showRegistrationDialog: false,
            titleColor: '',
            buttonColor: '',
            loginUser: async (user: User) => {
                try {
                    await loginService(user);
                    set({
                        loginStatus: 'Connexion réussie',
                        loginMessage: 'Tu es maintenant connecté',
                        showLoginDialog: true,
                        titleColor: 'text-green-500',
                        buttonColor: 'bg-green-500 hover:bg-green-500/90',
                    });
                } catch (error) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : "Une erreur inconnue s'est produite lors de la connexion";
                    set({
                        loginStatus: 'Erreur de connexion',
                        loginMessage: message,
                        showLoginDialog: true,
                        titleColor: 'text-red-500',
                        buttonColor: 'bg-red-500 hover:bg-red-500/90',
                    });
                    console.error('Erreur de connexion :', error);
                }
            },
            registerUser: async (user: User) => {
                try {
                    await registerService(user);
                    set({
                        loginStatus: 'Inscription réussie',
                        loginMessage: 'Bravo ton inscription est validée',
                        showLoginDialog: true,
                        titleColor: 'text-green-500',
                        buttonColor: 'bg-green-500 hover:bg-green-500/90',
                    });
                } catch (error) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : "Une erreur inconnue s'est produite lors de ton inscription";
                    set({
                        loginStatus: "Erreur d'inscription",
                        loginMessage: message,
                        showLoginDialog: true,
                        titleColor: 'text-red-500',
                        buttonColor: 'bg-red-500 hover:bg-red-500/90',
                    });
                    console.error("Erreur lors de l'inscription :", error);
                }
            },
            logoutUser: async (user: User) => {
                try {
                    await logoutService(user);
                    localStorage.removeItem('auth-store');
                    console.log('Déconnexion réussie');
                } catch (error) {
                    console.error(
                        'Une erreur est survenue lors de la déconnexion',
                        error
                    );
                }
            },
            setShowLoginDialog: (show: boolean) => {
                set({ showLoginDialog: show });
            },
            setShowRegistrationDialog: (show: boolean) => {
                set({ showRegistrationDialog: show });
            },
            resetLoginDialog: () => {
                set({
                    loginStatus: '',
                    loginMessage: '',
                    showLoginDialog: false,
                    titleColor: '',
                    buttonColor: '',
                });
            },
            resetRegistrationDialog: () => {
                set({
                    registrationStatus: '',
                    registrationMessage: '',
                    showRegistrationDialog: false,
                    titleColor: '',
                    buttonColor: '',
                });
            },
        }),
        {
            name: 'auth-store',
        }
    )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '~/lib/types';
import {
    registerUser as registerUserService,
    loginUser as loginUserService,
    logoutUser as logoutUserService,
} from '~/services/auth-service';

export type AuthState = {
    loginStatus: string;
    loginMessage: string;
    registrationStatus: string;
    registrationMessage: string;
    showLoginModal: boolean;
    showRegistrationModal: boolean;
    titleStyle: string;
    buttonStyle: string;
};

type AuthAction = {
    loginUser: (user: User) => Promise<void>;
    registerUser: (user: User) => Promise<void>;
    logoutUser: (user: User) => Promise<void>;
    setShowLoginModal: (show: boolean) => void;
    setShowRegistrationModal: (show: boolean) => void;
    resetLoginModal: () => void;
    resetRegistrationModal: () => void;
};

export const useAuthStore = create<AuthState & AuthAction>()(
    persist(
        (set) => ({
            loginStatus: '',
            loginMessage: '',
            registrationStatus: '',
            registrationMessage: '',
            showLoginModal: false,
            showRegistrationModal: false,
            titleStyle: '',
            buttonStyle: '',

            loginUser: async (user: User) => {
                try {
                    await loginUserService(user);
                    set({
                        loginStatus: 'Connexion réussie',
                        loginMessage: 'Tu es maintenant connecté',
                        showLoginModal: true,
                        titleStyle: 'text-green-500',
                        buttonStyle: 'bg-green-500 hover:bg-green-500/90',
                    });
                } catch (error) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : "Une erreur inconnue s'est produite lors de la connexion";
                    set({
                        loginStatus: 'Erreur de connexion',
                        loginMessage: message,
                        showLoginModal: true,
                        titleStyle: 'text-red-500',
                        buttonStyle: 'bg-red-500 hover:bg-red-500/90',
                    });
                    console.error('Erreur de connexion : ', error);
                }
            },

            registerUser: async (user: User) => {
                try {
                    await registerUserService(user);
                    set({
                        loginStatus: 'Inscription réussie',
                        loginMessage: 'Bravo ton inscription est validée',
                        showLoginModal: true,
                        titleStyle: 'text-green-500',
                        buttonStyle: 'bg-green-500 hover:bg-green-500/90',
                    });
                } catch (error) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : "Une erreur inconnue s'est produite lors de l'inscription";
                    set({
                        loginStatus: "Erreur d'inscription",
                        loginMessage: message,
                        showLoginModal: true,
                        titleStyle: 'text-red-500',
                        buttonStyle: 'bg-red-500 hover:bg-red-500/90',
                    });
                    console.error("Erreur d'inscription : ", error);
                }
            },

            logoutUser: async (user: User) => {
                try {
                    await logoutUserService(user);
                    localStorage.removeItem('auth-store');
                    console.log('Utilisateur déconnecté');
                } catch (error) {
                    console.error('Erreur de déconnexion : ', error);
                }
            },
            setShowLoginModal: (show: boolean) => {
                set({ showLoginModal: show });
            },
            setShowRegistrationModal: (show: boolean) => {
                set({ showRegistrationModal: show });
            },
            resetLoginModal: () => {
                set({
                    loginStatus: '',
                    loginMessage: '',
                    showLoginModal: false,
                    titleStyle: '',
                    buttonStyle: '',
                });
            },
            resetRegistrationModal: () => {
                set({
                    registrationStatus: '',
                    registrationMessage: '',
                    showRegistrationModal: false,
                    titleStyle: '',
                    buttonStyle: '',
                });
            },
        }),
        {
            name: 'auth-store',
        }
    )
);

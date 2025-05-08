import type { User } from '~/lib/types';

const BASE_URL = 'http://localhost:3001/api/auth'

export async function registerUser(user: User) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData, 'Utilisateur enregistré');
        } else {
            throw new Error("Erreur lors de l'enregistrement");
        }
    } catch (error) {
        console.error(
            "Une erreur est survenue lors de l'enregistrement",
            error
        );
        throw error;
    }
}

export async function loginUser(user: User) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'authentification");
        }

        const responseData = await response.json();
        console.log(responseData, 'Utilisateur authentifié');
        return responseData;
    } catch (error) {
        console.error(
            "Une erreur est survenue lors de l'authentification",
            error
        );
        throw error;
    }
}

export async function checkUser() {
    try {
        const response = await fetch(`${BASE_URL}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error("Vous n'êtes pas autorisé à accéder à cette page");
        }
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error(
            "Une erreur est survenue lors de la vérification de l'authentification",
            error
        );
        throw error;
    }
}

export async function logoutUser(user: User) {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la déconnexion");
        }

        const responseData = await response.json();
        console.log(responseData, 'Utilisateur déconnecté');
        return responseData;
    } catch (error) {
        console.error(
            "Une erreur est survenue lors de la déconnexion",
            error
        );
        throw error;
    }
}

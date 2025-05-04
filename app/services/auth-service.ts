import type { User } from '~/lib/types';

const BASE_URL = 'http://localhost:3001/api/users'

export async function registerUser(user: User) {
    try {
        const response = await fetch(BASE_URL, {
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

export async function loginUser(user: User) {}

export async function logoutUser(user: User) {}
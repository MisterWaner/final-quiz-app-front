import { z } from 'zod';

export const registrationSchema = z
    .object({
        username: z
            .string()
            .trim()
            .min(2, {
                message: 'Ton pseudo doit contenir au moins 2 caractères',
            })
            .max(35, {
                message: 'Ton pseudo ne peut pas dépasser 35 caractères',
            }),
        password: z
            .string()
            .trim()
            .min(6, {
                message: 'Ton mot de passe doit contenir au moins 6 caractères',
            })
            .max(20, {
                message: 'Ton mot de passe ne peut pas dépasser 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
                }
            ),

        confirmation: z
            .string()
            .trim()
            .min(6, {
                message: 'Ton mot de passe doit contenir au moins 6 caractères',
            })
            .max(20, {
                message: 'Ton mot de passe ne peut pas dépasser 20 caractères',
            })
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/,
                {
                    message:
                        'Ton mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
                }
            ),
    })
    .refine((data) => data.password === data.confirmation, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmation'],
    });

export const loginSchema = z.object({
    username: z
        .string()
        .trim()
        .min(2, { message: 'Ton pseudo doit contenir au moins 2 caractères' })
        .max(35, { message: 'Ton pseudo ne doit pas dépasser 35 caractères' }),

    password: z
        .string()
        .trim()
        .min(6, {
            message: 'Ton mot de passe doit contenir au moins 6 caractères',
        })
        .max(20, {
            message: 'Ton mot de passe ne doit pas dépasser 20 caractères',
        }),
});
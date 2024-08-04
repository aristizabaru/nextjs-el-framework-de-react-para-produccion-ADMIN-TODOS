import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from 'next-auth/providers/google';
import Credentials from "next-auth/providers/credentials";
import prisma from './lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { signInEmailPassword } from './auth/actions/auth-actions';

export const { handlers, signIn, signOut, auth } = NextAuth( {
    adapter: PrismaAdapter( prisma ),
    providers: [
        GitHub,
        Google,
        Credentials( {
            credentials: {
                email: { label: "Corre Electrónico", type: "email", placeholder: "usuario@gmail.com" },
                password: { label: "Contraseña", type: "password", placeholder: "******" },
            },
            async authorize ( { email, password }, request ): Promise<any> {
                const user = signInEmailPassword( email as string, password as string );

                if ( !user ) return null;

                return user;
            },
        } ),
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt ( { token, user, profile } ) {
            if ( user ) { // User is available during sign-in
                const userDB = await prisma.user.findUnique( { where: { email: token.email! } } );
                token.id = userDB?.id!;
                token.roles = userDB?.roles!;
            }


            return token;
        },
        async session ( { session, token, user } ) {
            session.user.id = token.id;
            session.user.roles = token.roles;


            return session;
        }
    }
} );

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const getServerUserSession = async () => {
    const session = await auth();

    return session?.user;
};

export const signInEmailPassword = async ( email: string, password: string ) => {
    if ( !email || !password ) return null;

    const user = await prisma.user.findUnique( { where: { email: email } } );

    if ( !user ) {
        return await createUser( email, password );
    }

    const isValidUser = bcrypt.compareSync( password, user.password ?? '' );

    if ( !isValidUser ) return null;

    return user;

};

const createUser = async ( email: string, password: string ) => {
    const user = await prisma.user.create( {
        data: {
            email: email,
            password: bcrypt.hashSync( password ),
            name: email.split( '@' ).at( 0 )
        }
    } );
};
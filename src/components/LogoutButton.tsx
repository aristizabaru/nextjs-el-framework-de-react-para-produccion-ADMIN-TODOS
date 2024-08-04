'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { CiLogin, CiLogout, CiWarning } from 'react-icons/ci';

export const LogoutButton = () => {

    const { data: session, status } = useSession();

    if ( status === 'loading' ) {
        return (
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <CiWarning />
                <span className="group-hover:text-gray-700">Loading..</span>
            </button>
        );
    }

    if ( status === 'unauthenticated' ) {
        return (
            <button
                onClick={ () => signIn() }
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <CiLogin />
                <span className="group-hover:text-gray-700">Ingresar</span>
            </button>
        );
    }

    return (
        <button
            onClick={ () => signOut() }
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
        </button>
    );
};

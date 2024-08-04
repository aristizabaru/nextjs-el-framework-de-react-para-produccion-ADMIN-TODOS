'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function ProfilePage () {

    const { data: session, status } = useSession();

    useEffect( () => {
        console.log( 'Client side' );
    }, [] );

    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <div className='flex flex-col'>
                <span>{ session?.user?.name ?? 'no name' }</span>
                <span>{ session?.user?.id ?? 'no id' }</span>
                <span>{ session?.user?.email ?? 'no email' }</span>
                <span>{ session?.user?.image ?? 'no image' }</span>
                <span>{ session?.user.roles ?? 'no roles' }</span>
            </div>
        </div>
    );
}
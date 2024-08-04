import { WidgetItem } from '@/components/WidgetItem';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';


export default async function DashboardPage () {

    const session = await auth();

    const userImage = ( session?.user?.image )
        ? session.user.image
        : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';

    if ( !session ) {
        redirect( '/api/auth/signin' );
    }

    return (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <WidgetItem title={ 'Usuario conectado server side' } >
                <div className='flex flex-col justify-center text-center'>
                    <span>{ session.user?.name }</span>
                    <span className='text-[0.8em]'>{ session.user?.email }</span>
                    <Image
                        className='mt-4 rounded-full mx-auto'
                        src={ userImage } alt={ 'Imagen' } width={ 100 } height={ 100 } />
                </div>
            </WidgetItem>
        </div>
    );
}
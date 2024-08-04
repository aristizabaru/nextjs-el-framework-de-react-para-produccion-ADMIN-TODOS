import { TabBar } from '@/components/TabBar';
import { cookies } from 'next/headers';

export const metadata = {
    title: 'Cookies Page',
    description: 'Cookies Page',
};

export default function CookiesPage () {

    const cookieStore = cookies();
    const cookieTab = Number( cookieStore.get( 'selectedTab' )?.value ?? '1' );

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div className='flex flex-col'>
                <span className='text-3xl block mb-4'>Tabs</span>
                <TabBar currentTab={ cookieTab } />
            </div>
        </div>
    );
}
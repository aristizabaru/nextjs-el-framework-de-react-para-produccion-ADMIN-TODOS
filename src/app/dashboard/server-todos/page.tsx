export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getServerUserSession } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { NewTodo } from '@/todos/components/NewTodo';
import { TodosGrid } from '@/todos/components/TodosGrid';
import { redirect } from 'next/navigation';

console.log( 'Construida server' );

export const metadata = {
    title: 'TODOS',
    description: 'Server TODOS',
};

export default async function RestTodosPage () {

    const user = await getServerUserSession();

    if ( !user ) redirect( '/api/auth/signin' );

    const todos = await prisma.todo.findMany( {
        where: { userId: user?.id },
        orderBy: { description: 'asc' }
    } );

    return (
        <>
            <span className='text-3xl mb-4 block'>Server actions</span>
            <div className='w-full px-5 mx-5 mb-8'>
                <NewTodo />
            </div>
            <TodosGrid todos={ todos } />
        </>
    );
}
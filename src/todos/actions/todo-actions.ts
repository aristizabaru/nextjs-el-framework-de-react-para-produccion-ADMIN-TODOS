'use server';

import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const sleep = ( seconds: number ): Promise<void> => {
    return new Promise( resolve => {
        setTimeout( () => {
            resolve();
        }, seconds * 1000 );
    } );
};

export const toggleTodo = async ( id: string, complete: boolean ): Promise<Todo> => {

    await sleep( 3 );

    const todo = await prisma.todo.findFirst( { where: { id: id } } );

    if ( !todo ) {
        throw `Todo con id <${ id }> no encontrado`;
    }

    const updatedTodo = await prisma.todo.update( { where: { id: id }, data: { complete: complete } } );

    revalidatePath( '/dashboard/server-todos' );

    return updatedTodo;
};

export const addTodo = async ( description: string ): Promise<Todo | boolean> => {
    try {

        const newTodo = await prisma.todo.create( { data: { description } } );
        revalidatePath( '/dashboard/server-todos' );

        return newTodo;

    } catch ( error ) {

        return false;
    }
};

export const deleteTodo = async (): Promise<boolean> => {
    try {
        await prisma.todo.deleteMany( { where: { complete: true } } );
        revalidatePath( '/dashboard/server-todos' );

        return true;
    } catch ( error ) {
        return false;
    }
};
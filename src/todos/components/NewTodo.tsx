'use client';

// import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { addTodo, deleteTodo } from '../actions/todo-actions';
// import { createTodo, deleteTodos } from '../helpers/todos';

export const NewTodo = () => {

    const inputElement = useRef<HTMLInputElement | null>( null );
    // const router = useRouter();

    const onSubmit = async ( e: FormEvent ) => {
        e.preventDefault();

        const inputValue = inputElement.current?.value.trim() ?? '';

        if ( inputValue.length === 0 ) return;

        // await createTodo( inputValue );
        await addTodo( inputValue );
        inputElement.current!.value = '';

        // router.refresh();
    };

    const deleteCompleted = async () => {
        // await deleteTodos();
        // router.refresh();

        await deleteTodo();
    };

    return (
        <form onSubmit={ onSubmit } className='flex w-full'>
            <input
                type="text"
                ref={ inputElement }
                className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
                placeholder="¿Qué necesita ser hecho?" />

            <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
                Crear
            </button>

            <span className='flex flex-1'></span>

            <button
                onClick={ deleteCompleted }
                type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
                <IoTrashOutline />
                Delete
            </button>


        </form>
    );
};
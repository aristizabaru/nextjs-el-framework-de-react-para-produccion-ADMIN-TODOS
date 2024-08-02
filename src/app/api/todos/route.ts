import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as yup from 'yup';

export async function GET ( request: NextRequest ) {

    const searchParams = request.nextUrl.searchParams;
    const take = Number( searchParams.get( 'take' ) ?? 10 );
    const skip = Number( searchParams.get( 'skip' ) ?? 0 );

    if ( isNaN( take ) ) {
        return NextResponse.json(
            { message: 'take: debe ser un número' },
            { status: 400 }
        );
    }

    if ( isNaN( skip ) ) {
        return NextResponse.json(
            { message: 'skip: debe ser un número' },
            { status: 400 }
        );
    }

    const todos = await prisma.todo.findMany( {
        skip: skip,
        take: take,
    } );

    return NextResponse.json( {
        ok: true,
        data: todos
    } );
}

const postSchema = yup.object( {
    description: yup.string().required()
} );

export async function POST ( request: NextRequest ) {

    try {
        const { description } = await postSchema.validate( await request.json() );
        const newTodo = await prisma.todo.create( { data: { description } } );

        return NextResponse.json( {
            ok: true,
            data: newTodo
        } );
    } catch ( error ) {
        // Este manejo de errores es con fines educativos, en producción
        // nunca se deberían de enviar errores sin controlar la respuesta
        // y menos enviar directamente mensajes de error de la BD
        return NextResponse.json( error, { status: 400 } );
    }
}
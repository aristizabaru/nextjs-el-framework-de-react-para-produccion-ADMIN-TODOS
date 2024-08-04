import { getServerUserSession } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

export async function GET ( request: NextRequest, { params }: { params: { id: string; }; } ) {

    const { id } = params;

    const todo = await prisma.todo.findFirst( {
        where: { id }
    } );

    if ( !todo ) {
        return NextResponse.json(
            { message: 'El todo no existe' },
            { status: 404 }
        );
    }

    return NextResponse.json( {
        ok: true,
        data: todo
    } );
}

const putSchema = yup.object( {
    description: yup.string().optional(),
    complete: yup.bool().optional(),
} );

export async function PUT ( request: NextRequest, { params }: { params: { id: string; }; } ) {
    const user = await getServerUserSession();

    if ( !user ) {
        return NextResponse.json( 'No autorizado', { status: 401 } );
    }
    try {
        const { id } = params;
        const { description, complete } = await putSchema.validate( await request.json() );
        const updatedTodo = await prisma.todo.update( {
            where: {
                id,
                userId: user.id
            },
            data: {
                description,
                complete
            }
        } );

        return NextResponse.json( {
            ok: true,
            data: updatedTodo
        } );
    } catch ( error ) {
        // Este manejo de errores es con fines educativos, en producción
        // nunca se deberían de enviar errores sin controlar la respuesta
        // y menos enviar directamente mensajes de error de la BD
        return NextResponse.json( error, { status: 400 } );
    }
}

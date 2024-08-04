import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET ( request: Request ) {

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create( {
        data: {
            email: 'test@gmail.com',
            password: bcrypt.hashSync( 'qwerty' ),
            roles: [ 'admin', 'user', 'super-admin' ],
            todos: {
                createMany: {
                    data: [
                        { description: 'Piedra del alma', complete: true },
                        { description: 'Piedra del poder' },
                        { description: 'Piedra del espacio' },
                        { description: 'Piedra de la realidad' },
                        { description: 'Piedra del tiempo' },
                    ]
                }
            }
        }
    } );

    return NextResponse.json( {
        message: 'seed executed'
    } );
}
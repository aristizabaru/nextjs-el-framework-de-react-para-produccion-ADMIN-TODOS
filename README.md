# Next Js: El framework de React para producción (ADMIN TODOS)

## Acerca de

Este es un repositorio personal para ejecución del proyecto del curso **NextJs: El framework de React para producción** de **Fernando Herrera** en la plataforma de Udemy. Para acceder al curso completo puede hacer [clic aquí](https://www.udemy.com/course/nextjs-fh/)

El proyecto desarrollado a continuación explora la creación de una RESTful API en NextJs usando los [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), dentro de los conceptos desarrollados se encuentran:

- READ
- Paginación básica
- concepto e implementación de un SEED
- Docker para levantar bases de datos
- Postgres
- Prisma
- Prisma + Next
- Yup - Validador
- Consumo de RESTful Api desde APP router
- Client y Server Side Rendering
- Refresh de una ruta sin afectar estados (NextNavigation)
- Server Actions
- useOptimistic
- Cookies del lado del servidor
- Cookies del lado del cliente
- Carrito de compras
- Manipulación de cookies

## Requerimientos

- Node v20.15.0 LTS

## Instalación del proyecto

Para instalar el proyecto siga los siguientes pasos

Instalar módulos o dependencias

```
npm install
```

## Ejecución del proyecto

Para ejecutar el proyecto se deben seguir los siguientes pasos:

1. Ejecutar en entorno de desarrollo

- Levantar la base de datos

```
docker compose up -d
```

- Renombrar el `.env.test` a `.env`
- Reemplazar las variables de entorno
- Generar nueva migración (Prisma ORM)

```
npx prisma migrate dev
```

- Enviar modelo a BD sin generar migración (opcional - Prisma ORM)

```
npx prisma db push
```

- Generar Prisma client (Prisma ORM)

```
npx prisma generate
```

- levantar el proyecto

```
npm run dev
```

- Ejecutar SEED [para cargar datos de prueba en base de datos local](http://localhost:3000/api/seed)

```
http://localhost:3000/api/seed
```

2. Ejecutar en entorno de producción

```
npm build
npm start
```

### Información adicional

Para aprender más acerca de Next.js, visite los siguientes recursos:

- [Documentación oficial de Next.js](https://nextjs.org/docs) - aprenda acerca de las características de Next y su API.
- [Aprenda Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

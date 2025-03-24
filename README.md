# Instrucciones 

Para iniciar el proyecto se debe ejecutar el comando en la carpeta raíz del repositorio. Los archivos `segmentX.ts` ya se encuentran en la ruta `./backend/streaming/`.

```
docker compose up --build
```

Este comando iniciará el frontend en la url `http://localhost:4200`, el cual fue desarrollado utilizando Angular y Tailwind/Flowbite. Cuenta con 3 vistas:

- `/login`, para iniciar sesión.
- `/signup`, para registrarse.
- `/player`, para ver el reproductor. Esta vista se encuentra protegida por un *Guard*, el cual simplemente revisa si existe un token. Por otro lado, el *interceptor* cierra sesión en caso de que una request responda con código 4XX. De esta manera restringimos esta vista a los usuarios registrados y con sesión iniciada.

Por otro lado, a pesar de que tengo años de experiencia con NodeJS y que era posible desarrollar el backend con este lenguaje, preferí utilizar Golang para familiarizarme con él, conocer su sintaxis y su funcionamiento. Específicamente utilicé Golang con Gin y Gorm como ORM.

# Avances y desarrollo

Por temas de disponibilidad se desarrolló la prueba técnica en distintos espacios durante el fin de semana, distribuidos de la siguiente manera:

## Avance Jueves 20 de Marzo
Tiempo total del día: 1 Hora
- Se investigó qué es y cómo funciona Live Streaming HLS.
- Se comenzó a trabajar con Golang, se investigó cómo funciona y se crearon las primeras rutas.
- Se comenzó frontend con Angular.

## Avance Sábado 22 de Marzo
Tiempo total del día: 1 Hora 20 Minutos

- Se realizó conexión con base de datos y auto migraciones.
- Se crearon rutas de login y sign up.

## Avance Domingo 23 de Marzo
Tiempo total del día: 4 Horas 17 Minutos

- Se crearon rutas de login y sign up, con implementación de JWT.
- Se añadió middleware a las rutas del streaming.
- Se hicieron vistas de login y signup.
- Se hizo 'cronjob' que modifica el archivo `.m3u8` para simular el streaming. 
- Se dockerizó todo el proyecto.

## Avances extra Domingo 23 de Marzo
Tiempo total extra: 2 Horas.

- Se hizo vista de reproductor con chat, mensajes y usuario actual.
- Se hizo una revisión de código.
- Se hizo un poco responsive.
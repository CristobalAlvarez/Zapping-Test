# Instructivo 

Para iniciar el proyecto se debe ejecutar el comando

```
docker compose up --build
```

El cual levantará el frontend en la url `localhost:4200`. Este frontend tiene 3 vistas:

- `/login`, para iniciar sesión.
- `/signup`, para registrarse.
- `/player`, para ver el reproductor. Esta vista se encuentra protegida por un *Guard*, el cual simplemente revisa si existe un token. Por otro lado, el *interceptor* cierra sesión en caso de que una request responda con código 4XX. De esta manera restringimos esta vista a los usuarios registrados y con sesión iniciada.

# Avances y desarrollo

## Avance Jueves 20 de Marzo
Tiempo total del día: 1 Hora
- Se investigo que es y como funciona Live Streaming HLS.
- Se comenzó a trabajar con Golang, se investigó como funciona y se crearon las primeras rutas.
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
- Se dockerizo todo el proyecto.

## Avances extra Domingo 23 de Marzo
Tiempo total extra: 1 Hora 15 Minutos (21:45)

- Se hizo vista de reproductor con chat, mensajes y usuario actual.
- Se hizo una revisión de código.
- Se hizo un poco responsive.

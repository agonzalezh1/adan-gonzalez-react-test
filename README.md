# Adan Gonzalez Haro React Test

Este proyecto tiene como funcionalidad simular un portal de eCommercer con las siguientes características:

- Pantalla de login
- Consulta de productos
- Modificación de detalle de productos
- Agregar un nuevo producto
- Modificar las credenciales del usuario

Para obtener los datos de los productos hacer referencia al api [FakeStoreApi](https://fakestoreapi.com/).

## Configuracion

Para correr el proyecto hay que instalar las dependencias (`npm install`) y ejecutar el siguiente comando

```sh
$ npm start
```

El proyecto iniciará en la ruta [http://localhost:3000](http://localhost:3000) y para poder ingresar al login será cargar la ruta [http://localhost:3000/#/login](http://localhost:3000/#/login)

Las credenciales para ingresar al portal son: usuario `correo@dominio.com` y contraseña `p@ssword1`

## Tecnologías

Los paquetes que se utilizaron para el desarrollo de esta aplicación son los siguientes:

- `reduxjs/toolkit` para el manejo del estado de la aplicacion
- `react-hook-form` para las validaciones de los formularios
- `sass` para el manejo de estilos
- `typescript` para el manejo de los tipos de dato
- `webpack` para el empaquetado productivo

### Empaquetado productivo

La heramienta que se utiliza para crear el paquete productivo es webpack, y el comando que se utiliza esta configurado en el archivo `package.json`

```sh
$ npm run build
```

El copmando completo es el siguiente:

```sh
$ webpack --config webpack.prod.js --progress
```

## Next steps

- Realizar lazy loading en los componentes
- Implementar pruebas unitarias

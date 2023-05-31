# API Challenge Conexa
Una API desarrollada en Typescript, Node, Express y MongoDB que cuenta con 2 módulos, uno de Login y otro de Negocios. La misma fue construída siguiendo una arquitectura de microservicios.

![API_IMG](https://kozub.com.ar/wp-content/uploads/2021/01/What-is-an-API.png)

## Instalación
Clonar el repositorio e instalar las dependencias con el siguiente comando:

```bash
  npm install
```

## Variables de entorno

Se requiere configurar las siguientes variables de entorno en un fichero .env ubicado en la raíz del proyecto:
```
  PORT_LG=4001
  PORT_BS=4002
  DOMAIN_LG = http://localhost:4001
  DOMAIN_BS = http://localhost:4002
  SECRETORPRIVATEKEY=
  DATABASE_URL=
  DATABASE_URL_TEST=
```
SECRETORPRIVATEKEY debe completarse con la llave secreta que se quiera utilizar para firmar y verificar los JWT.
En DATABASE_URL y DATABASE_URL_TEST se deben establecer los strings de conexión de la base de datos de MongoDB que se quiera utilizar para producción y para tests, respectivamente.

## Ejecutar la aplicación
Lo indicado con -lg corresponde al módulo de login, mientras que lo indicado con -bs refiere al módulo de negocios.

```bash
# development
$ npm run dev-lg
$ npm run dev-bs

# production
$ npm run start-lg
$ npm run start-bs
```

## Endpoints Login

#### Registro
Registra un nuevo usuario con email y contraseña.

```http
  POST /api/register
```

| Body parameter | Type     | Description                          |
| :------------- | :------- | :----------------------------------- |
| `email`        | `string` | *Required*. Email del usuario        |
| `password`     | `string` | *Required*. Contraseña del usuario   |

#### Autenticación
Devuelve un JWT en caso de correcta autenticación de un usuario registrado.

```http
  POST /api/auth
```

| Body parameter | Type     | Description                          |
| :------------- | :------- | :----------------------------------- |
| `email`        | `string` | *Required*. Email del usuario        |
| `password`     | `string` | *Required*. Contraseña del usuario   |

El token obtenido debe enviarse en los headers de las peticiones que requieran autenticación:
| Headers        | Value | 
| :------------- | :-----| 
| `Authorization`| token | 

#### Listado de usuarios
*Requiere autenticación*
Muestra el listado de usuario registrados.

```http
  GET /api/list
```

Es posible paginar la búsqueda enviando los siguientes query parameters:

| Query parameter | Type     | Description                                  |
| :-------------- | :------- | :------------------------------------------- |
| `page`          | `number` | *Optional*. Número de página                 |
| `limit`         | `number` | *Optional*. Número de usuarios a mostrar     |
| `email`         | `string` | *Optional*. Búsqueda insensitiva por email   |

## Endpoints Negocios

#### Listado de usuarios
*Requiere autenticación*
*Solo puede ser consultado a través del endpoint de usuarios del módulo precedente*

```http
  GET /api/list
```

## Testing

```bash
$ npm run test-lg
```
Ejecuta todos los tests correspondientes al módulo de login.

```bash
$ npm run test-bs
```
Ejecuta todos los tests correspondientes al módulo de negocios.

## Deploys

El proyecto se encuentra desplegado y se puede probar también utilizando los siguientes enlaces:
```
https://api-login-4fxo.onrender.com
``` 
Módulo de login


```
https://api-business-v7k7.onrender.com
``` 
Módulo de negocios






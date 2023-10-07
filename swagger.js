// const swaggerJsdoc = require('swagger-jsdoc');
// const fs = require('fs');

// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Wallet App API',
//       version: '1.0.0',
//     },
//   },
//   servers: [
//     { url: 'https://young-ocean-87586-3686e0530b3d.herokuapp.com/', description: 'Production server' },
//     { url: 'http://localhost:4040', description: 'Local development server' },
//   ],
//   apis: ['./routes/api/*.js', './controllers/users/*.js', './models/*.js' ],
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//       },
//     },
//     schemas: {
//       User: {
//         type: 'object',
//         required: ['email', 'password', 'name'],
//         properties: {
//           email: {
//             type: 'string',
//             description: "User's email address",
//           },
//           password: {
//             type: 'string',
//             description: "User's password (hashed)",
//           },
//           name: {
//             type: 'string',
//             description: "User's name",
//           },
//           token: {
//             type: 'string',
//             description: 'JWT token associated with the user (optional)',
//           },
//         },
//       },
//     },
//   },

// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// try {
//   fs.writeFileSync('./docs/swagger.json', JSON.stringify(swaggerSpec));
// } catch (err) {
//   console.error(err);
// }
// module.exports = swaggerSpec;

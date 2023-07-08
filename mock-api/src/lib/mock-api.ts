import { setupWorker, graphql } from 'msw';
import localForage from 'localforage';
import { User } from "@cocodemy/models";

const userStore = localForage.createInstance({
  name: 'userStore',
});

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const worker = setupWorker(
  graphql.mutation('Signup', (req, res, ctx) => {
    const { firstName, lastName, phoneNumber, email, password, userType } =
      req.variables;

    // Generar un ID aleatorio para el usuario
    const id = Math.random().toString(36).substr(2, 9);

    const user = {
      id,
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      userType,
    };

    // Almacenar el usuario en IndexedDB con la ID como clave
    return userStore.setItem(id, user).then(async () => {
      await delay(3000);
      return res(
        ctx.data({
          user,
        })
      );
    });
  }),

  graphql.mutation('Login', (req, res, ctx) => {
    const { email, password } = req.variables;

    // Buscar todos los usuarios y encontrar el que coincide con el correo electrónico y la contraseña
    return userStore.iterate((user, key, iterationNumber) => {
      if ((user as User).email === email && (user as User).password === password) {
        return user;
      }
    }).then(async (user) => {
      await delay(3000);

      if (user) {
        return res(
          ctx.data({
            login: user,
          })
        );
      } else {
        return res(ctx.errors([{ message: 'Invalid email or password' }]));
      }
    });
  }),

  graphql.query('User', (req, res, ctx) => {
    const { id } = req.variables;

    // Recuperar el usuario de IndexedDB
    return userStore.getItem(id).then(async (user) => {
      await delay(3000);

      if (user) {
        return res(
          ctx.data({
            user,
          })
        );
      } else {
        return res(ctx.errors([{ message: 'User not found' }]));
      }
    });
  })
);

export default worker;

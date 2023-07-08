import { setupWorker, graphql } from 'msw';
import localForage from 'localforage';

const userStore = localForage.createInstance({
  name: "userStore"
});
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
    return userStore.setItem(id, user).then(() => {
      return res(
        ctx.data({
          user,
        })
      );
    });
  })
);

export default worker;

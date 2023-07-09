import { setupWorker, graphql } from 'msw';
import localForage from 'localforage';
import { User, Skill } from '@cocodemy/models';

const userStore = localForage.createInstance({
  name: 'userStore',
});

const skillStore = localForage.createInstance({
  name: 'skillStore',
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

    const skills: Skill[] = [];

    // Almacenar el usuario en IndexedDB con la ID como clave
    return userStore.setItem(id, user).then(async () => {
      await delay(3000);
      return res(
        ctx.data({
          user,
          skills,
        })
      );
    });
  }),

  graphql.mutation('Login', (req, res, ctx) => {
    const { email, password } = req.variables;

    // Buscar todos los usuarios y encontrar el que coincide con el correo electrónico y la contraseña
    return userStore
      .iterate((user) => {
        if (
          (user as User).email === email &&
          (user as User).password === password
        ) {
          return user;
        }

        return undefined;
      })
      .then(async (user) => {
        await delay(3000);

        if (user) {
          if ((user as User).userType === 'doer') {
            const skills = await skillStore.getItem((user as User).id);

            return res(
              ctx.data({ user, skills })
            );
          }

          return res(
            ctx.data({ user, skills: [] })
          );
        } else {
          return res(ctx.errors([{ message: 'Invalid email or password' }]));
        }
      });
  }),

  graphql.mutation('UpdateSkills', (req, res, ctx) => {
    const { skills, userId } = req.variables;

    // Almacenar las habilidades en IndexedDB con el ID del usuario como clave
    return skillStore.setItem(userId, skills).then(async () => {
      await delay(3000);
      return res(
        ctx.data({
          skills,
        })
      );
    });
  }),

  graphql.query('User', (req, res, ctx) => {
    const { id } = req.variables;

    // Recuperar el usuario de IndexedDB
    return userStore.getItem(id).then(async (user) => {
      await delay(3000);

      if (user) {
        if ((user as User).userType === 'doer') {
          const skills = await skillStore.getItem(id);
          return res(
            ctx.data({
              user,
              skills,
            })
          );
        }

        return res(
          ctx.data({
            user,
            skills: []
          })
        );
      } else {
        return res(ctx.errors([{ message: 'User not found' }]));
      }
    });
  })
);

export default worker;

import { graphql, setupWorker } from 'msw';
import localForage from 'localforage';
import {
  Doer,
  Notification,
  Service,
  Skill,
  User,
} from '@ondemandmarket/models';

const userStore = localForage.createInstance({
  name: 'userStore',
});

const skillStore = localForage.createInstance({
  name: 'skillStore',
});

const serviceStore = localForage.createInstance({
  name: 'serviceStore',
});

const notificationStore = localForage.createInstance({
  name: 'notificationStore',
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

    const skills: Skill[] = [];

    // Almacenar el usuario en IndexedDB con la ID como clave
    return userStore.setItem(id, user).then(async () => {
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

        if (user) {
          if ((user as User).userType === 'doer') {
            const skills = await skillStore.getItem((user as User).id);

            return res(ctx.data({ user, skills }));
          }

          return res(ctx.data({ user, skills: [] }));
        } else {
          return res(ctx.errors([{ message: 'Invalid email or password' }]));
        }
      });
  }),

  graphql.mutation('UpdateSkills', (req, res, ctx) => {
    const { skills, userId } = req.variables;

    // Almacenar las habilidades en IndexedDB con el ID del usuario como clave
    return skillStore.setItem(userId, skills).then(async () => {
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
            skills: [],
          })
        );
      } else {
        return res(ctx.errors([{ message: 'User not found' }]));
      }
    });
  }),

  graphql.query('GetServicesBySkills', async (req, res, ctx) => {
    const { services } = req.variables;
    const servicesInfo: { [key: string]: Service } = (
      services as Service[]
    ).reduce((result, service) => {
      return {
        ...result,
        [service.id]: service,
      };
    }, {});
    const serviceIds = (services as Service[]).map((skill) => skill.id);

    const users: { [key: string]: User } = {};
    await userStore.iterate((user, userId) => {
      users[userId] = user as User;
    });

    // Recuperar todas las habilidades de IndexedDB y filtrar las que coinciden con las habilidades proporcionadas
    await skillStore.iterate((storedSkill, userId) => {
      const skillsIds = (storedSkill as Skill[]).map((skill) => skill.id);
      const skillsByIds: { [key: string]: Skill } = (
        storedSkill as Skill[]
      ).reduce((result, skill) => {
        return {
          ...result,
          [skill.id]: skill,
        };
      }, {});
      if (serviceIds.some((item) => skillsIds.includes(item))) {
        serviceIds.forEach((serviceId) => {
          if (skillsIds.includes(serviceId)) {
            const doer: User = users[userId];
            const price = skillsByIds[serviceId].price;
            const cities = servicesInfo[serviceId].cities
              ? (servicesInfo[serviceId].cities || []).some((item) =>
                  (skillsByIds[serviceId].cities || []).includes(item)
                )
              : true;

            if (price && cities) {
              servicesInfo[serviceId].doers = (
                servicesInfo[serviceId].doers || []
              ).concat({
                id: doer.id,
                firstName: doer.firstName,
                lastName: doer.lastName,
                phoneNumber: doer.phoneNumber,
                email: doer.email,
                price: price,
                cities: skillsByIds[serviceId].cities || [],
              });
            }
          }
        });
      }
      return undefined;
    });

    return res(
      ctx.data({
        services: Object.values(servicesInfo),
      })
    );
  }),

  graphql.mutation('CreateServices', (req, res, ctx) => {
    const { services, userId } = req.variables;

    // Almacenar los servicios en IndexedDB con un ID aleatorio como clave
    const promises = services.map((service: Service) => {
      const id = Math.random().toString(36).substr(2, 9);
      service.userId = userId;
      return serviceStore.setItem(id, service);
    });

    return Promise.all(promises).then(async (services) => {
      // Almacenar las notificaciones para el userId y para cada uno de los doers en cada servicio
      const notificationPromises = [
        userId,
        ...services.flatMap((service) =>
          service.doers.map((doer: Doer | User) => doer.id)
        ),
      ].map(async (id) => {
        const notifications: Notification[] =
          (await notificationStore.getItem(id)) || [];
        const newNotifications = services.map((service: Service) => {
          const doerNames = (service.doers || [])
            .map((doer) => `${doer.firstName} ${doer.lastName}`)
            .join(', ');
          const doerCities = [
            ...new Set((service.doers || []).flatMap((doer) => doer.cities)),
          ].join(', ');
          return {
            serviceId: service.id,
            serviceName: service.name,
            doerName:
              id === userId
                ? doerNames
                : `${
                    (service.doers || []).find((doer) => doer.id === id)
                      ?.firstName
                  } ${
                    (service.doers || []).find((doer) => doer.id === id)
                      ?.lastName
                  }`,
            serviceCategories: service.category,
            serviceDate: service.date,
            serviceDescription: service.description,
            serviceLocation:
              id === userId
                ? doerCities
                : (
                    (service.doers || []).find((doer: Doer) => doer.id === id)
                      ?.cities || []
                  ).join(', '),
            servicePrice:
              (service.doers || []).find((doer: Doer) => doer.id === id)
                ?.price || 0,
            serviceStatus: 'Confirmed',
          };
        });

        notifications.push(...newNotifications);
        return notificationStore.setItem(id, notifications);
      });

      await Promise.all(notificationPromises);
      return res(
        ctx.data({
          services,
        })
      );
    });
  }),

  graphql.query('GetUserNotifications', (req, res, ctx) => {
    const { userId } = req.variables;

    // Recuperar las notificaciones del usuario de IndexedDB
    return notificationStore.getItem(userId).then(async (notifications) => {

      return res(
        ctx.data({
          notifications: notifications || [],
        })
      );
    });
  })
);

export default worker;

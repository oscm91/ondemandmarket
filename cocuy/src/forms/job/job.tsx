import React from 'react';
import { Formik } from 'formik';
import { today, parseDate, getLocalTimeZone } from '@internationalized/date';
import {
  Button,
  Dialog,
  DialogTrigger,
  Form,
  ListBox,
  Item,
  View,
  LabeledValue,
  ListView,
  ComboBox,
  Cell,
  Column,
  Calendar,
  TableView,
  TableBody,
  Row,
  Tabs,
  TabList,
  TabPanels,
  Text,
  TableHeader,
  ActionButton,
  Heading,
  Flex,
  Divider,
  Content,
  ButtonGroup,
  Slider,
  Section,
  ActionMenu,
  SearchField,
  TagGroup,
} from '@adobe/react-spectrum';
import ViewList from '@spectrum-icons/workflow/ViewList';
import Settings from '@spectrum-icons/workflow/Settings';
import Table from '@spectrum-icons/workflow/Table';
import AddToSelection from '@spectrum-icons/workflow/AddToSelection';
import Book from '@spectrum-icons/workflow/Book';
import Alert from '@spectrum-icons/workflow/Alert';
import * as Yup from 'yup';
import { Cities, Service, ServiceState, Skill } from '@cocodemy/models';
import Loader from '../../components/loader/loader';

interface JobProps {
  onFormSubmit: (values: Service[]) => void;
  service: ServiceState;
  skills?: Skill[];
  cities?: Cities;
}

const skillsList = [
  {
    id: 'limpieza de alfombras',
    name: 'limpieza de alfombras',
    description: 'Limpieza profunda de alfombras',
    category: ['LIMPIEZA'],
  },
  {
    id: 'paseador de perros',
    name: 'paseador de perros',
    description: 'Paseo y cuidado de perros',
    category: ['CUIDADO', 'MASCOTAS'],
  },
  {
    id: 'reparaciones electricas',
    name: 'reparaciones electricas',
    description: 'Reparación y mantenimiento de sistemas eléctricos',
    category: ['REPARACION', 'ELECTRICIDAD'],
  },
  {
    id: 'catering de alimentos',
    name: 'catering de alimentos',
    description: 'Servicio de alimentación para eventos',
    category: ['ALIMENTACION', 'EVENTOS'],
  },
  {
    id: 'domicilios',
    name: 'domicilios',
    description: 'Entrega de productos a domicilio',
    category: ['ENTREGAS'],
  },
  {
    id: 'reparacion de electrodomesticos',
    name: 'reparacion de electrodomesticos',
    description: 'Reparación y mantenimiento de electrodomésticos',
    category: ['REPARACION', 'ELECTRODOMESTICOS'],
  },
  {
    id: 'limpieza de hogar',
    name: 'limpieza de hogar',
    description: 'Limpieza general de casas y apartamentos',
    category: ['LIMPIEZA'],
  },
  {
    id: 'reparaciones en hogar',
    name: 'reparaciones en hogar',
    description: 'Reparaciones generales en el hogar',
    category: ['REPARACION'],
  },
  {
    id: 'jardineria',
    name: 'jardineria',
    description: 'Mantenimiento y cuidado de jardines',
    category: ['JARDINERIA'],
  },
  {
    id: 'cuidado de piscina',
    name: 'cuidado de piscina',
    description: 'Mantenimiento y limpieza de piscinas',
    category: ['LIMPIEZA', 'PISCINAS'],
  },
  {
    id: 'plomeria',
    name: 'plomeria',
    description: 'Reparación y mantenimiento de sistemas de plomería',
    category: ['REPARACION', 'PLOMERIA'],
  },
  {
    id: 'reparacion y lavado de ventanas',
    name: 'reparacion y lavado de ventanas',
    description: 'Limpieza y reparación de ventanas',
    category: ['LIMPIEZA', 'REPARACION'],
  },
  {
    id: 'pintura de interiores',
    name: 'pintura de interiores',
    description: 'Pintura de paredes y techos interiores',
    category: ['PINTURA'],
  },
  {
    id: 'pintura de exteriores',
    name: 'pintura de exteriores',
    description: 'Pintura de fachadas y exteriores',
    category: ['PINTURA'],
  },
  {
    id: 'instalacion de muebles',
    name: 'instalacion de muebles',
    description: 'Montaje e instalación de muebles',
    category: ['INSTALACION', 'MUEBLES'],
  },
  {
    id: 'limpieza de oficinas',
    name: 'limpieza de oficinas',
    description: 'Limpieza de espacios de oficina',
    category: ['LIMPIEZA', 'OFICINAS'],
  },
  {
    id: 'cuidado de niños',
    name: 'cuidado de niños',
    description: 'Cuidado y atención a niños',
    category: ['CUIDADO', 'NIÑOS'],
  },
  {
    id: 'cuidado de ancianos',
    name: 'cuidado de ancianos',
    description: 'Cuidado y atención a personas mayores',
    category: ['CUIDADO', 'ANCIANOS'],
  },
  {
    id: 'instalacion de electrodomesticos',
    name: 'instalacion de electrodomesticos',
    description: 'Instalación de electrodomésticos',
    category: ['INSTALACION', 'ELECTRODOMESTICOS'],
  },
  {
    id: 'limpieza de techos',
    name: 'limpieza de techos',
    description: 'Limpieza y mantenimiento de techos',
    category: ['LIMPIEZA', 'TECHOS'],
  },
  {
    id: 'limpieza de patios',
    name: 'limpieza de patios',
    description: 'Limpieza y mantenimiento de patios y áreas exteriores',
    category: ['LIMPIEZA', 'PATIOS'],
  },
  {
    id: 'instalacion de sistemas de seguridad',
    name: 'instalacion de sistemas de seguridad',
    description: 'Instalación de alarmas y sistemas de seguridad',
    category: ['INSTALACION', 'SEGURIDAD'],
  },
  {
    id: 'reparacion de sistemas de calefaccion',
    name: 'reparacion de sistemas de calefaccion',
    description: 'Reparación y mantenimiento de sistemas de calefacción',
    category: ['REPARACION', 'CALEFACCION'],
  },
  {
    id: 'reparacion de sistemas de aire acondicionado',
    name: 'reparacion de sistemas de aire acondicionado',
    description: 'Reparación y mantenimiento de sistemas de aire acondicionado',
    category: ['REPARACION', 'AIRE'],
  },
  {
    id: 'instalacion de sistemas de iluminacion',
    name: 'instalacion de sistemas de iluminacion',
    description: 'Instalación de sistemas de iluminación',
    category: ['INSTALACION', 'ILUMINACION'],
  },
  {
    id: 'reparacion de sistemas de iluminacion',
    name: 'reparacion de sistemas de iluminacion',
    description: 'Reparación de sistemas de iluminación',
    category: ['REPARACION', 'ILUMINACION'],
  },
  {
    id: 'instalacion de sistemas de riego',
    name: 'instalacion de sistemas de riego',
    description: 'Instalación de sistemas de riego para jardines',
    category: ['INSTALACION', 'JARDINERIA'],
  },
  {
    id: 'reparacion de sistemas de riego',
    name: 'reparacion de sistemas de riego',
    description: 'Reparación de sistemas de riego para jardines',
    category: ['REPARACION', 'JARDINERIA'],
  },
  {
    id: 'limpieza de garajes',
    name: 'limpieza de garajes',
    description: 'Limpieza y organización de garajes',
    category: ['LIMPIEZA', 'GARAJES'],
  },
  {
    id: 'organizacion de espacios',
    name: 'organizacion de espacios',
    description: 'Organización y orden de espacios interiores',
    category: ['ORGANIZACION'],
  },
];

const citiesList = {
  MDE: 'Medellín',
  BOG: 'Bogotá',
  CAL: 'Cali',
  BAR: 'Barranquilla',
  CAR: 'Cartagena',
  BUC: 'Bucaramanga',
  CUC: 'Cúcuta',
  STA: 'Santa Marta',
  IBA: 'Ibagué',
  PER: 'Pereira',
  MAN: 'Manizales',
  ARM: 'Armenia',
  NEI: 'Neiva',
  VIL: 'Villavicencio',
  PAS: 'Pasto',
  MON: 'Montería',
  SIN: 'Sincelejo',
  VAL: 'Valledupar',
  TUN: 'Tunja',
  RIO: 'Riohacha',
};

const DoerSchema = Yup.object().shape({
  id: Yup.string().required('Id Doer Required'),
  firstName: Yup.string().required('First Name Doer Required'),
  lastName: Yup.string().required('Last Name Doer Required'),
  phoneNumber: Yup.string().required('Phone Number Doer Required'),
  email: Yup.string().email().required('Email Doer Required'),
  price: Yup.number().required('Price Doer Required'),
  cities: Yup.array().of(Yup.string()).required('Cities Doer Required'),
});

const SkillSchema = Yup.object().shape({
  id: Yup.string().required('Id Required'),
  name: Yup.string().required('Name Required'),
  description: Yup.string().required('Description Required'),
  date: Yup.number().required('Date Required'),
  category: Yup.array()
    .of(Yup.string().required('Category Required'))
    .required('At least one category is required'),
  doers: Yup.array().of(DoerSchema).required('At least one doer is required'),
});

const FormSchema = Yup.lazy((value: { [key: string]: Skill }) =>
  Yup.object()
    .shape(
      Object.keys(value).reduce(
        (shape: { [key: string]: Yup.Schema }, key: string) => {
          shape[key] = SkillSchema;
          return shape;
        },
        {}
      )
    )
    .required('At least one skill is required')
);

function SkillSelection({
  values,
  setValues,
  skills,
  cities,
}: {
  values: { [key: string]: Service };
  setValues: (value: { [key: string]: Service }) => void;
  skills: Skill[];
  cities: Cities;
}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [location, setLocation] = React.useState<string>();
  const [date, setDate] = React.useState(new Date().getTime());

  const skillsByName: { [key: string]: Skill } = skills.reduce(
    (result, skill) => {
      return {
        ...result,
        [skill.id]: skill,
      };
    },
    {}
  );

  // Filtra las habilidades por el término de búsqueda
  const filteredSkills = skills.filter((skill) =>
    skill.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Divide la lista de habilidades en dos
  const half = Math.ceil(filteredSkills.length / 2);
  const firstHalf = filteredSkills.slice(0, half);
  const secondHalf = filteredSkills.slice(half, filteredSkills.length);

  const renderListBox = (skillsSubset: Skill[]) => (
    <ListBox
      aria-label="Skills"
      selectionMode="multiple"
      items={skillsSubset}
      selectedKeys={Object.keys(values)}
      onSelectionChange={(selected) => {
        const newSkills: string[] = [];

        for (const newSkill of selected) {
          newSkills.push(newSkill as string);
        }

        setValues(
          newSkills.reduce((result, newSkill) => {
            return {
              ...result,
              [newSkill]: {
                ...(values[newSkill] || {}),
                ...skillsByName[newSkill],
                ...(location ? { cities: [location] } : {}),
                ...(date ? { date: date } : {}),
              },
            };
          }, {})
        );
      }}
    >
      {(skill) => (
        <Item key={skill.id} textValue={skill.id}>
          <AddToSelection alignSelf="center" />
          <Text>{skill.id}</Text>
          <Text slot="description">{skill.description}</Text>
        </Item>
      )}
    </ListBox>
  );

  return (
    <Flex gap="size-100" direction="column" marginTop="size-200">
      <Flex gap="size-200" wrap="wrap" justifyContent="space-evenly">
        <SearchField label="Search skill..." onChange={setSearchTerm} />
        <View>
          <ComboBox
            aria-label="Skills"
            label="Select a city"
            inputValue={location ? cities[location] : undefined}
            defaultItems={Object.keys(cities).map((idCity) => {
              return {
                id: idCity,
                name: cities[idCity],
              };
            })}
            onSelectionChange={(selected) => {
              setLocation(selected as string);

              setValues(
                Object.entries(values).reduce((result, [, newSkill]) => {
                  return {
                    ...result,
                    [newSkill.id]: {
                      ...newSkill,
                      cities: [selected],
                    },
                  };
                }, {})
              );
            }}
          >
            {(item) => <Item textValue={item.name}>{item.name}</Item>}
          </ComboBox>
        </View>
        <View>
          <Calendar
            aria-label="Event date"
            minValue={today(getLocalTimeZone())}
            value={
              date
                ? parseDate(new Date(date).toISOString().split('T')[0])
                : undefined
            }
            onChange={(selected) => {
              setDate(selected.toDate(getLocalTimeZone()).getTime());

              setValues(
                Object.entries(values).reduce((result, [, newSkill]) => {
                  return {
                    ...result,
                    [newSkill.id]: {
                      ...newSkill,
                      date: selected.toDate(getLocalTimeZone()).getTime(),
                    },
                  };
                }, {})
              );
            }}
          />
        </View>
      </Flex>
      <Divider size="S"></Divider>
      <Flex>
        <View width="50%">{renderListBox(firstHalf)}</View>
        <View width="50%">{renderListBox(secondHalf)}</View>
      </Flex>
    </Flex>
  );
}

function SkillSettings({
  values,
  setFieldValue,
  cities,
  doersByService,
}: {
  values: { [key: string]: Service };
  setFieldValue: (key: string, value: any) => void;
  cities: Cities;
  doersByService?: {
    [key: string]: Service;
  };
}) {
  const [selectedSkill, setSelectedSkill] = React.useState<Service>();
  return (
    <View>
      <p>Propose services</p>
      <ListView
        aria-label="Skills Settign"
        items={Object.values(
          Object.keys(values).reduce((result, serviceId) => {
            const doersService = doersByService[serviceId].doers;
            if (doersService && doersService.length) {
              return {
                ...result,
                [serviceId]: values[serviceId],
              };
            }
            return {
              ...result,
            };
          }, {})
        )}
        selectionStyle="highlight"
        selectionMode="multiple"
        onAction={(selected) => {
          const skillSelected = values[selected];
          setSelectedSkill(skillSelected);
        }}
      >
        {(item) => (
          <Item key={item.id} textValue={item.name}>
            {item.name}
            <ActionMenu onAction={() => setSelectedSkill(item)}>
              <Item key="edit" textValue="Edit">
                <Text>Propose</Text>
              </Item>
            </ActionMenu>
          </Item>
        )}
      </ListView>
      {selectedSkill && selectedSkill.id && (
        <DialogTrigger isOpen={true}>
          <ActionButton isHidden={true}>
            Settings {selectedSkill.name}
          </ActionButton>
          {(close) => (
            <Dialog>
              <Heading>
                <Flex alignItems="center" gap="size-100">
                  <Book size="S" />
                  <Text>Propose service {selectedSkill.name}</Text>
                </Flex>
              </Heading>
              <Divider />
              <Content>
                <ListView
                  aria-label="Skills"
                  selectionMode="multiple"
                  selectedKeys={selectedSkill?.cities}
                  onSelectionChange={(selected) => {
                    const newDoers = [];

                    const doersById = doersByService[
                      selectedSkill?.id
                    ].doers.reduce((result, doer) => {
                      return {
                        ...result,
                        [doer.id]: doer,
                      };
                    }, {});

                    for (const newDoerId of selected) {
                      newDoers.push(doersById[newDoerId]);
                    }

                    setFieldValue(`${selectedSkill.id}.doers`, newDoers);
                  }}
                >
                  {doersByService[selectedSkill?.id].doers.map((item) => (
                    <Item key={item.id} textValue={item.firstName}>
                      <Text>
                        Propose to {item.firstName} {item.lastName}
                      </Text>
                      <Text slot="description">
                        for {item.price} in this cities:{' '}
                        {(item.cities || []).join(',')}
                      </Text>
                    </Item>
                  ))}
                </ListView>
              </Content>
              <ButtonGroup>
                <Button
                  variant="secondary"
                  onPress={() => setSelectedSkill(undefined)}
                >
                  Cancel
                </Button>
                <Button
                  variant="accent"
                  onPress={() => setSelectedSkill(undefined)}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Dialog>
          )}
        </DialogTrigger>
      )}
    </View>
  );
}

function SkillSummary({ values }: { values: { [key: string]: Service } }) {
  return (
    <View>
      <TableView aria-label="Summary of selected skills" width="100%">
        <TableHeader>
          <Column showDivider>Skill</Column>
          <Column showDivider>Price</Column>
          <Column showDivider>Date</Column>
          <Column showDivider align="end">
            Cities
          </Column>
        </TableHeader>
        <TableBody>
          {Object.keys(values).map((skillId) => (
            <Row key={skillId}>
              <Cell>{skillId}</Cell>
              <Cell>
                <Flex gap="size-100">
                  {values[skillId].doers.map((doer, i) => {
                    return (
                      <>
                        {i === 0 ? null : (
                          <Divider size="S" orientation="vertical" />
                        )}

                        <LabeledValue
                          label={`Price for ${doer.firstName} ${doer.lastName}`}
                          value={doer.price}
                          formatOptions={{ style: 'currency', currency: 'COP' }}
                        />
                      </>
                    );
                  })}
                </Flex>
              </Cell>
              <Cell>
                <LabeledValue
                  label="Date service"
                  value={parseDate(
                    new Date(values[skillId].date).toISOString().split('T')[0]
                  )}
                />
              </Cell>
              <Cell>
                <Flex gap="size-100">
                  {values[skillId].doers.map((doer, i) => {
                    return (
                      <>
                        {i === 0 ? null : (
                          <Divider size="S" orientation="vertical" />
                        )}
                        <TagGroup aria-label="Cities">
                          {doer.cities.map((city) => {
                            return <Item textValue={city}>{city}</Item>;
                          })}
                        </TagGroup>
                      </>
                    );
                  })}
                </Flex>
              </Cell>
            </Row>
          ))}
        </TableBody>
      </TableView>
    </View>
  );
}

export function Job({
  onFormSubmit,
  service,
  skills = skillsList,
  cities = citiesList,
}: JobProps) {
  const [doersByService, setDoersByService] = React.useState<{
    [key: string]: Service;
  }>();

  const [tabSelected, setTabSelected] = React.useState('selection');

  return (
    <Formik
      initialValues={{}}
      validationSchema={FormSchema}
      onSubmit={(values: { [key: string]: Service }) => {
        onFormSubmit(Object.values(values));
      }}
    >
      {({ values, setValues, setFieldValue, handleSubmit, errors }) => (
        <Form
          onSubmit={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}
        >
          <Tabs
            aria-label="Skill form sections"
            density="regular"
            selectedKey={tabSelected}
          >
            <TabList isHidden>
              <Item key="selection" textValue="Skill Selection">
                <ViewList /> <Text>Skill Selection</Text>
              </Item>
              <Item key="settings" textValue="Skill Settings">
                <Settings /> <Text>Reserve Skill</Text>
              </Item>
              <Item key="summary" textValue="Skill Summary">
                <Table /> <Text>Order Summary</Text>
              </Item>
            </TabList>
            <TabPanels>
              <Item key="selection" textValue="Skill Selection Content">
                <SkillSelection
                  values={values}
                  setValues={setValues}
                  skills={skills}
                  cities={cities}
                />
                <Flex justifyContent="center">
                  {service.servicesLoading ? (
                    <Loader />
                  ) : (
                    <Button
                      variant="accent"
                      marginTop="size-100"
                      onPress={() => {
                        service
                          ?.getServiceBySkills?.(Object.values(values))
                          .then((servicesResult) => {
                            const doersByServiceResult = servicesResult.reduce(
                              (
                                result: { [key: string]: Service },
                                service: Service
                              ) => {
                                return {
                                  ...result,
                                  [service.id]: service,
                                };
                              },
                              {}
                            );

                            const resultServiceSearch = Object.keys(
                              values
                            ).reduce((result, serviceId) => {
                              const doersService =
                                doersByServiceResult[serviceId].doers;
                              if (doersService && doersService.length) {
                                return {
                                  ...result,
                                  [serviceId]: values[serviceId],
                                };
                              }
                              return {
                                ...result,
                              };
                            }, {});

                            setDoersByService(doersByServiceResult);
                            setTabSelected('settings');
                            setValues(resultServiceSearch);
                          });
                      }}
                    >
                      Search Service
                    </Button>
                  )}
                </Flex>
              </Item>
              <Item key="settings" textValue="Skill Settings Content">
                <SkillSettings
                  doersByService={doersByService}
                  values={values}
                  setFieldValue={setFieldValue}
                  cities={cities}
                />
                <Flex justifyContent="center" gap="size-100">
                  <Button
                    variant="accent"
                    marginTop="size-100"
                    onPress={() => setTabSelected('selection')}
                  >
                    Back
                  </Button>
                  <Button
                    variant="accent"
                    marginTop="size-100"
                    onPress={() => {
                      setTabSelected('summary');
                    }}
                    isDisabled={!!Object.keys(errors).length}
                  >
                    Summary
                  </Button>
                </Flex>
              </Item>
              <Item key="summary" textValue="Skill Summary Content">
                <SkillSummary values={values} />
                {Object.keys(errors).length > 0 && (
                  <View>
                    <Heading level={3}>Errors</Heading>
                    <ListBox aria-label="Errors">
                      {Object.keys(errors).map((errorKey) => (
                        <Section title={errorKey}>
                          {Object.keys(
                            (errors as { [key: string]: string })[errorKey]
                          ).map((errorItemKey) => (
                            <Item key={errorItemKey} textValue={errorItemKey}>
                              <Alert />
                              <Text>
                                {errorItemKey} :{' '}
                                {
                                  (
                                    errors as {
                                      [key: string]: { [key: string]: string };
                                    }
                                  )[errorKey][errorItemKey]
                                }
                              </Text>
                            </Item>
                          ))}
                        </Section>
                      ))}
                    </ListBox>
                  </View>
                )}
                <Flex justifyContent="center" gap="size-100">
                  <Button
                    variant="accent"
                    marginTop="size-100"
                    onPress={() => setTabSelected('settings')}
                  >
                    Back
                  </Button>
                  {service.createServicesLoading ? (
                    <Loader />
                  ) : (
                    <Button isDisabled={!!Object.keys(errors).length} variant="accent" type="submit" marginTop="size-100">
                      Confirm
                    </Button>
                  )}
                </Flex>
              </Item>
            </TabPanels>
          </Tabs>
        </Form>
      )}
    </Formik>
  );
}

export default Job;

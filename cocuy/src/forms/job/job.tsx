import React from 'react';
import { Formik } from 'formik';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import {
  ActionButton,
  ActionMenu,
  Button,
  ButtonGroup,
  Calendar,
  Cell,
  Column,
  ComboBox,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Form,
  Heading,
  Item,
  LabeledValue,
  ListBox,
  ListView,
  Row,
  SearchField,
  Section,
  TableBody,
  TableHeader,
  TableView,
  TabList,
  TabPanels,
  Tabs,
  TagGroup,
  Text,
  View,
} from '@adobe/react-spectrum';
import ViewList from '@spectrum-icons/workflow/ViewList';
import Settings from '@spectrum-icons/workflow/Settings';
import Table from '@spectrum-icons/workflow/Table';
import AddToSelection from '@spectrum-icons/workflow/AddToSelection';
import Book from '@spectrum-icons/workflow/Book';
import Alert from '@spectrum-icons/workflow/Alert';
import * as Yup from 'yup';
import { Cities, Service, ServiceState, Skill } from '@ondemandmarket/models';
import Loader from '../../components/loader/loader';

interface JobProps {
  onFormSubmit: (values: Service[]) => void;
  service: ServiceState;
  skills?: Skill[];
  cities?: Cities;
}

const skillsList = [
  {
    id: 'carpet cleaning',
    name: 'Carpet cleaning',
    description: 'Deep cleaning of carpets',
    category: ['CLEANING'],
  },
  {
    id: 'dog walker',
    name: 'Dog walker',
    description: 'Walking and care of dogs',
    category: ['CARE', 'PETS'],
  },
  {
    id: 'electrical repairs',
    name: 'Electrical repairs',
    description: 'Repair and maintenance of electrical systems',
    category: ['REPAIR', 'ELECTRICITY'],
  },
  {
    id: 'food catering',
    name: 'Food catering',
    description: 'Food service for events',
    category: ['FOOD', 'EVENTS'],
  },
  {
    id: 'deliveries',
    name: 'Deliveries',
    description: 'Delivery of products at home',
    category: ['DELIVERIES'],
  },
  {
    id: 'appliance repair',
    name: 'Appliance repair',
    description: 'Repair and maintenance of appliances',
    category: ['REPAIR', 'APPLIANCES'],
  },
  {
    id: 'home cleaning',
    name: 'Home cleaning',
    description: 'General cleaning of houses and apartments',
    category: ['CLEANING'],
  },
  {
    id: 'home repairs',
    name: 'Home repairs',
    description: 'General repairs at home',
    category: ['REPAIR'],
  },
  {
    id: 'gardening',
    name: 'Gardening',
    description: 'Maintenance and care of gardens',
    category: ['GARDENING'],
  },
  {
    id: 'pool care',
    name: 'Pool care',
    description: 'Maintenance and cleaning of pools',
    category: ['CLEANING', 'POOLS'],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    description: 'Repair and maintenance of plumbing systems',
    category: ['REPAIR', 'PLUMBING'],
  },
  {
    id: 'window repair and washing',
    name: 'Window repair and washing',
    description: 'Cleaning and repair of windows',
    category: ['CLEANING', 'REPAIR'],
  },
  {
    id: 'interior painting',
    name: 'Interior painting',
    description: 'Painting of interior walls and ceilings',
    category: ['PAINTING'],
  },
  {
    id: 'exterior painting',
    name: 'Exterior painting',
    description: 'Painting of facades and exteriors',
    category: ['PAINTING'],
  },
  {
    id: 'furniture installation',
    name: 'Furniture installation',
    description: 'Assembly and installation of furniture',
    category: ['INSTALLATION', 'FURNITURE'],
  },
  {
    id: 'office cleaning',
    name: 'Office cleaning',
    description: 'Cleaning of office spaces',
    category: ['CLEANING', 'OFFICES'],
  },
  {
    id: 'child care',
    name: 'Child care',
    description: 'Care and attention to children',
    category: ['CARE', 'CHILDREN'],
  },
  {
    id: 'elderly care',
    name: 'Elderly care',
    description: 'Care and attention to elderly people',
    category: ['CARE', 'ELDERLY'],
  },
  {
    id: 'appliance installation',
    name: 'Appliance installation',
    description: 'Installation of appliances',
    category: ['INSTALLATION', 'APPLIANCES'],
  },
  {
    id: 'roof cleaning',
    name: 'Roof cleaning',
    description: 'Cleaning and maintenance of roofs',
    category: ['CLEANING', 'ROOFS'],
  },
  {
    id: 'patio cleaning',
    name: 'Patio cleaning',
    description: 'Cleaning and maintenance of patios and outdoor areas',
    category: ['CLEANING', 'PATIOS'],
  },
  {
    id: 'security system installation',
    name: 'Security system installation',
    description: 'Installation of alarms and security systems',
    category: ['INSTALLATION', 'SECURITY'],
  },
  {
    id: 'heating system repair',
    name: 'Heating system repair',
    description: 'Repair and maintenance of heating systems',
    category: ['REPAIR', 'HEATING'],
  },
  {
    id: 'air conditioning system repair',
    name: 'Air conditioning system repair',
    description: 'Repair and maintenance of air conditioning systems',
    category: ['REPAIR', 'AIR'],
  },
  {
    id: 'lighting system installation',
    name: 'Lighting system installation',
    description: 'Installation of lighting systems',
    category: ['INSTALLATION', 'LIGHTING'],
  },
  {
    id: 'lighting system repair',
    name: 'Lighting system repair',
    description: 'Repair of lighting systems',
    category: ['REPAIR', 'LIGHTING'],
  },
  {
    id: 'irrigation system installation',
    name: 'Irrigation system installation',
    description: 'Installation of irrigation systems for gardens',
    category: ['INSTALLATION', 'GARDENING'],
  },
  {
    id: 'irrigation system repair',
    name: 'Irrigation system repair',
    description: 'Repair of irrigation systems for gardens',
    category: ['REPAIR', 'GARDENING'],
  },
  {
    id: 'garage cleaning',
    name: 'Garage cleaning',
    description: 'Cleaning and organization of garages',
    category: ['CLEANING', 'GARAGES'],
  },
  {
    id: 'space organization',
    name: 'Space organization',
    description: 'Organization and order of interior spaces',
    category: ['ORGANIZATION'],
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
  doersByService = {},
}: {
  values: { [key: string]: Service };
  setFieldValue: (key: string, value: any) => void;
  cities: Cities;
  doersByService: {
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
          Object.keys(values).reduce(
            (result: { [key: string]: Service }, serviceId) => {
              const doersService = doersByService[serviceId]?.doers;
              if (doersService && doersService.length) {
                return {
                  ...result,
                  [serviceId]: values[serviceId],
                };
              }
              return {
                ...result,
              };
            },
            {}
          )
        )}
        selectionStyle="highlight"
        selectionMode="multiple"
        onAction={(selected) => {
          const skillSelected = values[selected];
          setSelectedSkill(skillSelected);
        }}
      >
        {(item: Service) => (
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

                    const doersById = doersByService
                      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        doersByService[selectedSkill?.id].doers.reduce(
                          (result, doer) => {
                            return {
                              ...result,
                              [doer.id]: doer,
                            };
                          },
                          {}
                        )
                      : {};

                    for (const newDoerId of selected) {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      newDoers.push(doersById[newDoerId]);
                    }

                    setFieldValue(`${selectedSkill.id}.doers`, newDoers);
                  }}
                >
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    doersByService[selectedSkill?.id].doers.map((item) => (
                      <Item key={item.id} textValue={item.firstName}>
                        <Text>
                          Propose to {item.firstName} {item.lastName}
                        </Text>
                        <Text slot="description">
                          for {item.price} in this cities:{' '}
                          {(item.cities || []).join(',')}
                        </Text>
                      </Item>
                    ))
                  }
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
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    values[skillId].doers.map((doer, i) => {
                      return (
                        <>
                          {i === 0 ? null : (
                            <Divider size="S" orientation="vertical" />
                          )}

                          <LabeledValue
                            label={`Price for ${doer.firstName} ${doer.lastName}`}
                            value={doer.price}
                            formatOptions={{
                              style: 'currency',
                              currency: 'COP',
                            }}
                          />
                        </>
                      );
                    })
                  }
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
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    values[skillId]?.doers.map((doer, i) => {
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
                    })
                  }
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
  }>({});

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
                    <Button
                      isDisabled={!!Object.keys(errors).length}
                      variant="accent"
                      type="submit"
                      marginTop="size-100"
                    >
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

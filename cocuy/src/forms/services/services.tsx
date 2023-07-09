import React from 'react';
import { Formik } from 'formik';
import {
  Button,
  Dialog,
  DialogTrigger,
  Form,
  ListBox,
  Item,
  View,
  ListView,
  Cell,
  Column,
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
} from '@adobe/react-spectrum';
import ViewList from '@spectrum-icons/workflow/ViewList';
import Settings from '@spectrum-icons/workflow/Settings';
import Table from '@spectrum-icons/workflow/Table';
import AddToSelection from '@spectrum-icons/workflow/AddToSelection';
import Book from '@spectrum-icons/workflow/Book';
import Alert from '@spectrum-icons/workflow/Alert';
import * as Yup from 'yup';
import { Cities, Skill } from "@cocodemy/models";

interface ServicesProps {
  onFormSubmit: (values: Skill[]) => void;
  initialSkills?: { [key: string]: Skill };
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

const SkillSchema = Yup.object().shape({
  id: Yup.string().required('Id Required'),
  name: Yup.string().required('Name Required'),
  description: Yup.string().required('Description Required'),
  category: Yup.array()
    .of(Yup.string().required('Category Required'))
    .required('At least one category is required'),
  cities: Yup.array()
    .of(Yup.string().required('City Required'))
    .required('At least one city is required'),
  price: Yup.number().positive().required('Required'),
});

const FormSchema = Yup.lazy((value: { [key: string]: Skill }) =>
  Yup.object().shape(
    Object.keys(value).reduce((shape: { [key: string]: Yup.Schema }, key: string) => {
      shape[key] = SkillSchema;
      return shape;
    }, {})
  ).required('At least one skill is required')
);

function SkillSelection({
  values,
  setValues,
  skills,
}: {
  values: { [key: string]: Skill };
  setValues: (value: { [key: string]: Skill }) => void;
  skills: Skill[];
}) {
  const skillsByName: { [key: string]: Skill } = skills.reduce(
    (result, skill) => {
      return {
        ...result,
        [skill.id]: skill,
      };
    },
    {}
  );

  return (
    <View>
      <ListBox
        aria-label="Skills"
        selectionMode="multiple"
        items={skills}
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
    </View>
  );
}

function SkillSettings({
  values,
  setFieldValue,
  cities,
}: {
  values: { [key: string]: Skill };
  setFieldValue: (key: string, value: any) => void;
  cities: Cities;
}) {
  const [selectedSkill, setSelectedSkill] = React.useState<Skill>();
  return (
    <View>
      <ListView
        aria-label="Skills Settign"
        items={Object.values(values)}
        selectionStyle="highlight"
        selectionMode="multiple"
        onAction={(selected) => {
          const skillSelected = values[selected];
          setSelectedSkill(skillSelected);
        }}
      >
        {(item) => (
          <Item key={item.name}>
            {item.name}
            <ActionMenu onAction={() => setSelectedSkill(item)}>
              <Item key="edit" textValue="Edit">
                <Text>Edit</Text>
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
                  <Text>Settings {selectedSkill.name}</Text>
                </Flex>
              </Heading>
              <Divider />
              <Content>
                <Slider
                  label="Estimated price"
                  minValue={10000}
                  maxValue={1000000}
                  step={1000}
                  formatOptions={{ style: 'currency', currency: 'COP' }}
                  onChange={(value) => {
                    setFieldValue(`${selectedSkill.id}.price`, value);
                  }}
                  width="100%"
                  value={selectedSkill.price}
                />
                <ListBox
                  aria-label="Skills"
                  selectionMode="multiple"
                  selectedKeys={selectedSkill?.cities}
                  onSelectionChange={(selected) => {
                    setFieldValue(
                      `${selectedSkill.id}.cities`,
                      Array.from(selected)
                    );
                  }}
                >
                  <Section title="Select a city">
                    {Object.keys(cities).map((item) => (
                      <Item key={item}>{cities[item]}</Item>
                    ))}
                  </Section>
                </ListBox>
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

function SkillSummary({ values }: { values: { [key: string]: Skill } }) {
  return (
    <View>
      <TableView aria-label="Summary of selected skills" width="100%">
        <TableHeader>
          <Column showDivider>Skill</Column>
          <Column showDivider>Price</Column>
          <Column showDivider align="end">
            Cities
          </Column>
        </TableHeader>
        <TableBody>
          {Object.keys(values).map((skillId) => (
            <Row key={skillId}>
              <Cell>{skillId}</Cell>
              <Cell>{values[skillId].price}</Cell>
              <Cell>{(values[skillId].cities || []).join(', ')}</Cell>
            </Row>
          ))}
        </TableBody>
      </TableView>
    </View>
  );
}

export function Services({
  onFormSubmit,
  skills = skillsList,
  cities = citiesList,
  initialSkills = {}
}: ServicesProps) {
  return (
    <Formik
      initialValues={initialSkills}
      validationSchema={FormSchema}
      onSubmit={(values: { [key: string]: Skill }) => {
        onFormSubmit(Object.values(values))
      }}
    >
      {({ values, setValues, setFieldValue, handleSubmit, errors }) => (
        <Form
          onSubmit={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}
        >
          <Tabs aria-label="Skill form sections" density="regular">
            <TabList>
              <Item key="selection" textValue="Skill Selection">
                <ViewList /> <Text>Skill Selection</Text>
              </Item>
              <Item key="settings" textValue="Skill Settings">
                <Settings /> <Text>Skill Settings</Text>
              </Item>
              <Item key="summary" textValue="Skill Summary">
                <Table /> <Text>Skill Summary</Text>
              </Item>
            </TabList>
            <TabPanels>
              <Item key="selection" textValue="Skill Selection Content">
                <SkillSelection
                  values={values}
                  setValues={setValues}
                  skills={skills}
                />
              </Item>
              <Item key="settings" textValue="Skill Settings Content">
                <SkillSettings
                  values={values}
                  setFieldValue={setFieldValue}
                  cities={cities}
                />
              </Item>
              <Item key="summary" textValue="Skill Summary Content">
                <SkillSummary values={values} />
                {Object.keys(errors).length > 0 && (
                  <View>
                    <Heading level={3}>Errors</Heading>
                    <ListBox aria-label="Errors">
                      {Object.keys(errors).map((errorKey) => (
                        <Section title={errorKey}>
                          {Object.keys(errors[errorKey]).map((errorItemKey) => (
                            <Item key={errorItemKey} textValue={errorItemKey}>
                              <Alert />
                              <Text>{errorItemKey} : {errors[errorKey][errorItemKey]}</Text>
                            </Item>
                          ))}
                        </Section>
                      ))}
                    </ListBox>
                  </View>
                )}
                <Flex justifyContent="center">
                  <Button variant="accent" type="submit" marginTop="size-100">
                    Sign up
                  </Button>
                </Flex>
              </Item>
            </TabPanels>
          </Tabs>
        </Form>
      )}
    </Formik>
  );
}

export default Services;

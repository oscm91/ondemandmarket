import React from 'react';
import { Formik } from 'formik';
import {
  ActionButton,
  ActionMenu,
  Button,
  ButtonGroup,
  Cell,
  Column,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Form,
  Heading,
  Item,
  ListBox,
  ListView,
  Row,
  Section,
  Slider,
  TableBody,
  TableHeader,
  TableView,
  TabList,
  TabPanels,
  Tabs,
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
import { Cities, Skill } from '@ondemandmarket/models';

interface ServicesProps {
  onFormSubmit: (values: Skill[]) => void;
  initialSkills?: { [key: string]: Skill };
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
          <Item key={item.name} textValue={item.name}>
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
                      <Item key={item} textValue={item}>
                        {cities[item]}
                      </Item>
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
  initialSkills = {},
}: ServicesProps) {
  return (
    <Formik
      initialValues={initialSkills}
      validationSchema={FormSchema}
      onSubmit={(values: { [key: string]: Skill }) => {
        onFormSubmit(Object.values(values));
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
                <Flex justifyContent="center">
                  <Button variant="accent" type="submit" marginTop="size-100">
                    Confirm Services
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

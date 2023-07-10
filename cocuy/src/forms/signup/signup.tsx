import {
  Button,
  Flex,
  Form,
  Link,
  Radio,
  RadioGroup,
  TextField,
  View,
} from '@adobe/react-spectrum';
import Email from '@spectrum-icons/workflow/Email';
import User from '@spectrum-icons/workflow/User';
import DevicePhone from '@spectrum-icons/workflow/DevicePhone';
import LockClosed from '@spectrum-icons/workflow/LockClosed';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NavigatorState, User as UserModel } from '@ondemandmarket/models';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phoneNumber: Yup.number().positive().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirm is required'),
  userType: Yup.string()
    .oneOf(['doer', 'client'], 'Invalid option')
    .required('Required'),
});

/* eslint-disable-next-line */
export interface SignupProps {
  onFormSubmit: (values: UserModel) => void; // Add this line
  navigator: NavigatorState;
}

export function Signup({ onFormSubmit, navigator }: SignupProps) {
  return (
    <Formik
      initialValues={{
        id: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values: UserModel) => {
        // same shape as initial values
        onFormSubmit(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form
          labelPosition="top"
          labelAlign="start"
          onSubmit={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}
        >
          <TextField
            icon={<User />}
            label="First Name"
            name="firstName"
            onChange={(value) => setFieldValue('firstName', value)}
            onBlur={handleBlur}
            value={values.firstName}
            validationState={
              touched.firstName && errors.firstName ? 'invalid' : undefined
            }
            errorMessage={touched.firstName && errors.firstName}
          />

          <TextField
            icon={<User />}
            label="Last Name"
            name="lastName"
            onChange={(value) => setFieldValue('lastName', value)}
            onBlur={handleBlur}
            value={values.lastName}
            validationState={
              touched.lastName && errors.lastName ? 'invalid' : undefined
            }
            errorMessage={touched.lastName && errors.lastName}
          />

          <TextField
            icon={<DevicePhone />}
            label="Phone Number"
            name="phoneNumber"
            onChange={(value) => setFieldValue('phoneNumber', value)}
            onBlur={handleBlur}
            value={values.phoneNumber}
            validationState={
              touched.phoneNumber && errors.phoneNumber ? 'invalid' : undefined
            }
            errorMessage={touched.phoneNumber && errors.phoneNumber}
          />

          <TextField
            icon={<Email />}
            type="email"
            label="Email"
            name="email"
            onChange={(value) => setFieldValue('email', value)}
            onBlur={handleBlur}
            value={values.email}
            validationState={
              touched.email && errors.email ? 'invalid' : undefined
            }
            errorMessage={touched.email && errors.email}
          />

          <TextField
            icon={<LockClosed />}
            type="password"
            label="Password"
            name="password"
            onChange={(value) => setFieldValue('password', value)}
            onBlur={handleBlur}
            value={values.password}
            validationState={
              touched.password && errors.password ? 'invalid' : undefined
            }
            errorMessage={touched.password && errors.password}
          />

          <TextField
            icon={<LockClosed />}
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            onChange={(value) => setFieldValue('confirmPassword', value)}
            onBlur={handleBlur}
            value={values.confirmPassword}
            validationState={
              touched.confirmPassword && errors.confirmPassword
                ? 'invalid'
                : undefined
            }
            errorMessage={touched.confirmPassword && errors.confirmPassword}
          />

          <RadioGroup
            label="Registering as"
            name="type"
            onChange={(value) => setFieldValue('userType', value)}
            value={values.userType}
            validationState={
              touched.userType && errors.userType ? 'invalid' : undefined
            }
            errorMessage={touched.userType && errors.userType}
          >
            <Radio value="client">Client</Radio>
            <Radio value="doer">Doer</Radio>
          </RadioGroup>

          <Flex justifyContent="center">
            <Button variant="accent" type="submit">
              Sign up
            </Button>
          </Flex>

          <View>
            <p>
              Already have an account?
              <br />
              <Link>
                <a
                  href="/login"
                  onClick={(e) => {
                    navigator.goToLogin?.();
                    e.preventDefault();
                  }}
                >
                  Login
                </a>
              </Link>
            </p>
          </View>
        </Form>
      )}
    </Formik>
  );
}

export default Signup;

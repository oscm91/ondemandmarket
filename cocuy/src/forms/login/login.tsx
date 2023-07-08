import { Credentials } from "@cocodemy/models";
import { Button, Flex, Link, TextField, View } from '@adobe/react-spectrum';
import Email from '@spectrum-icons/workflow/Email';
import LockClosed from '@spectrum-icons/workflow/LockClosed';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export interface LoginProps {
  onFormSubmit: (values: Credentials) => void;
}

export function Login({ onFormSubmit }: LoginProps) {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
        onFormSubmit(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Flex direction="column">
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

            <View alignSelf="center" paddingTop="size-100">
              <Button variant="accent" type="submit">
                Login
              </Button>
            </View>

            <View>
              <p>
                Don't have an account?
                <br />
                <Link>
                  <a href="/signup">Sign up</a>
                </Link>
              </p>
            </View>
          </Flex>
        </form>
      )}
    </Formik>
  );
}

export default Login;

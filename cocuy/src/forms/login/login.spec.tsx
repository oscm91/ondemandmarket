import { render } from '@testing-library/react';

import Login from './login';

describe('Login', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Login
        navigator={{
          pathname: '',
        }}
        onFormSubmit={(values) => {
          console.log(values);
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});

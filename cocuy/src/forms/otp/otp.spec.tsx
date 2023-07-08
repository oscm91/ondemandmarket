import { render } from '@testing-library/react';

import Otp from './otp';

describe('Otp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Otp />);
    expect(baseElement).toBeTruthy();
  });
});

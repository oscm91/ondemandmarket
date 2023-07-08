import { render } from '@testing-library/react';

import EarlyAccess from './early-access';

describe('EarlyAccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EarlyAccess />);
    expect(baseElement).toBeTruthy();
  });
});

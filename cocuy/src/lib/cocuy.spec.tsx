import { render } from '@testing-library/react';

import Cocuy from './cocuy';

describe('Cocuy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cocuy />);
    expect(baseElement).toBeTruthy();
  });
});

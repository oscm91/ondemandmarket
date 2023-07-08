import { render } from '@testing-library/react';

import Reducers from './reducers';

describe('Reducers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Reducers />);
    expect(baseElement).toBeTruthy();
  });
});

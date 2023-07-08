import { render } from '@testing-library/react';

import Access from './access';

describe('Access', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Access />);
    expect(baseElement).toBeTruthy();
  });
});

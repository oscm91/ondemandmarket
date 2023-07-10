import { render } from '@testing-library/react';

import OrderService from './order-service';

describe('OrderService', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrderService />);
    expect(baseElement).toBeTruthy();
  });
});

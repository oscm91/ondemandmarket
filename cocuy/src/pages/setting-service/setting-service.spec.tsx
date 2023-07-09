import { render } from '@testing-library/react';

import SettingService from './setting-service';

describe('SettingService', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SettingService />);
    expect(baseElement).toBeTruthy();
  });
});

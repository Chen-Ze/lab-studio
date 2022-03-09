import { render } from '@testing-library/react';

import MenuItem from './menu-item';
import AcUnitIcon from '@mui/icons-material/AcUnit';

describe('MenuItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MenuItem
        icon={<AcUnitIcon />}
        text="Something"
        onClick={() => {
          /* Do nothing */
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});

import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Meta, Story } from '@storybook/react';
import { ExperimentMenu } from './front-ui-experiment-tab-experiment-menu';
import ExperimentMenuItem from './menu-item/menu-item';
import CalculateIcon from '@mui/icons-material/Calculate';

export default {
  component: ExperimentMenu,
  title: 'ExperimentMenu',
} as Meta;

const Template: Story = (args) => (
  <ExperimentMenu>
    <ExperimentMenuItem
      text="LS 336"
      icon={<AcUnitIcon fontSize="large" />}
      onClick={() => {
        /* Do nothing */
      }}
    />
    <ExperimentMenuItem
      text="Calculator"
      icon={<CalculateIcon fontSize="large" />}
      onClick={() => {
        /* Do nothing */
      }}
    />
  </ExperimentMenu>
);

export const Primary = Template.bind({});
Primary.args = {};

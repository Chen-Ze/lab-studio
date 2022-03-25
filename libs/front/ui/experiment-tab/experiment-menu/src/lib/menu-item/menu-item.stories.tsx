import { Story, Meta } from '@storybook/react';
import { ExperimentMenuItem, MenuItemProps } from './menu-item';
import AcUnitIcon from '@mui/icons-material/AcUnit';

export default {
  component: ExperimentMenuItem,
  title: 'MenuItem',
  argTypes: {
    onClick: {
      action: 'onClick',
    },
  },
} as Meta;

const Template: Story<MenuItemProps> = (args) => (
  <ExperimentMenuItem {...args} icon={<AcUnitIcon fontSize="large" />} />
);

export const Primary = Template.bind({});
Primary.args = {
  text: 'LS 336',
};

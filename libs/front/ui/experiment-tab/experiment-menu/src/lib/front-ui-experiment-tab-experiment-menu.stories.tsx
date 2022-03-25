import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Meta, Story } from '@storybook/react';
import { ExperimentMenu } from './front-ui-experiment-tab-experiment-menu';
import ExperimentMenuItem from './menu-item/menu-item';
import CalculateIcon from '@mui/icons-material/Calculate';
import { ReactComponent as ReactLogo } from '../assets/React-icon.svg';
import { ReactComponent as VoltmeterIcon } from '../assets/voltmeter.svg';
import { ReactComponent as CurrentSourceIcon } from '../assets/current-source.svg';
import { ReactComponent as CalculatorIcon } from '../assets/calculator.svg';
import { ReactComponent as CryostatIcon } from '../assets/cryostat.svg';
import { ReactComponent as MagnetIcon } from '../assets/magnet.svg';
import { ReactComponent as CircuitIcon } from '../assets/circuit.svg';

export default {
  component: ExperimentMenu,
  title: 'ExperimentMenu',
} as Meta;

const Template: Story = (args) => (
  <ExperimentMenu
    childrenConstructors={[
      ({ onClick }) => (
        <ExperimentMenuItem
          key={2}
          text="Calculator"
          icon={<CalculatorIcon style={{ width: 60 }} />}
          onClick={() => {
            onClick();
          }}
        />
      ),
      ({ onClick }) => (
        <ExperimentMenuItem
          key={1}
          text="Lakeshore 336"
          icon={<CryostatIcon style={{ width: 60 }} />}
          onClick={() => {
            onClick();
          }}
        />
      ),
      ({ onClick }) => (
        <ExperimentMenuItem
          key={4}
          text="Lakeshore 625"
          icon={<MagnetIcon style={{ width: 60 }} />}
          onClick={() => {
            onClick();
          }}
        />
      ),
      ({ onClick }) => (
        <ExperimentMenuItem
          key={3}
          text="Keithley 2182"
          icon={<VoltmeterIcon style={{ width: 60 }} />}
          onClick={() => {
            onClick();
          }}
        />
      ),
      ({ onClick }) => (
        <ExperimentMenuItem
          key={5}
          text="Keithley 6221"
          icon={<CurrentSourceIcon style={{ width: 60 }} />}
          onClick={() => {
            onClick();
          }}
        />
      ),
      ({ onClick }) => (
        <ExperimentMenuItem
          key={6}
          text="Keithley 4200"
          icon={<CircuitIcon style={{ width: 60 }} />}
          onClick={() => {
            onClick();
          }}
        />
      ),
    ]}
  />
);

export const Primary = Template.bind({});
Primary.args = {};

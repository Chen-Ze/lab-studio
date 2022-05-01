import { Keithley2182 } from '@lab-studio/instruments/keithley-2182';
import { Keithley6221 } from '@lab-studio/instruments/keithley-6221';
import { RandomNumberGenerator } from '@lab-studio/instruments/random-number-generator';
import { RootInstrument } from '@lab-studio/instruments/root';
import { Container } from 'inversify';

const container = new Container();

container.bind(RandomNumberGenerator).to(RandomNumberGenerator);
container.bind(Keithley2182).to(Keithley2182);
container.bind(Keithley6221).to(Keithley6221);
container.bind(RootInstrument).to(RootInstrument);

export default container;
export { container as instrumentsContainer };

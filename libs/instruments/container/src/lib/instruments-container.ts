import { InstrumentController } from '@lab-studio/api/instrument/controller';
import { Keithley2182 } from '@lab-studio/instruments/keithley-2182';
import { Keithley6221 } from '@lab-studio/instruments/keithley-6221';
import { RandomNumberGenerator } from '@lab-studio/instruments/random-number-generator';
import { RootInstrument } from '@lab-studio/instruments/root';
import { Container } from 'inversify';

const registeredInstruments: {
  [tag: string]: { new (controller: InstrumentController): unknown };
} = {};

const container = new Container();

container.bind(RandomNumberGenerator).to(RandomNumberGenerator);
container.bind(Keithley2182).to(Keithley2182);
registeredInstruments['Keithley 2182'] = Keithley2182;
container.bind(Keithley6221).to(Keithley6221);
registeredInstruments['Keithley 6221'] = Keithley6221;
container.bind(RootInstrument).to(RootInstrument);

function instrumentClassToTag(allocator: typeof registeredInstruments[string]) {
  return Object.keys(registeredInstruments).find(
    (key) => registeredInstruments[key] === allocator
  );
}

function getAllInstrumentTags() {
  return Object.keys(registeredInstruments);
}

export default container;
export { container as instrumentsContainer };
export { container as instrumentContainer };
export { instrumentClassToTag };
export { getAllInstrumentTags };

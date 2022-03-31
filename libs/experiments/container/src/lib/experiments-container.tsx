import { CalculatorRenderer } from '@lab-studio/experiments/calculator';
import { bindExperiment } from '@lab-studio/experiments/util';
import { container } from './detailed-container';

bindExperiment(container, CalculatorRenderer);

export { container };

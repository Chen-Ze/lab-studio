import { CalculatorRenderer } from '@lab-studio/experiments/calculator';
import { PrintRenderer } from '@lab-studio/experiments/print';
import { bindExperiment } from '@lab-studio/experiments/util';
import { container } from './detailed-container';

bindExperiment(container, CalculatorRenderer);
bindExperiment(container, PrintRenderer);

export { container };
export { container as experimentsRendererContainer };

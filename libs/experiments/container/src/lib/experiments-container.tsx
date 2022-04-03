import { ApplyCurrentKeithley6221Renderer } from '@lab-studio/experiments/apply-current-keithley-6221';
import { CalculatorRenderer } from '@lab-studio/experiments/calculator';
import { PrintRenderer } from '@lab-studio/experiments/print';
import { bindExperiment } from '@lab-studio/experiments/util';
import { container } from './detailed-container';

bindExperiment(container, CalculatorRenderer);
bindExperiment(container, PrintRenderer);
bindExperiment(container, ApplyCurrentKeithley6221Renderer);

export { container };
export { container as experimentsRendererContainer };

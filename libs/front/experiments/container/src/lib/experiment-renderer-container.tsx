import { ApplyCurrentKeithley6221Renderer } from '@lab-studio/front/experiments/apply-current-keithley-6221-renderer';
import { CalculatorRenderer } from '@lab-studio/front/experiments/calculator-renderer';
import { PrintRenderer } from '@lab-studio/front/experiments/print-renderer';
import { bindExperiment } from '@lab-studio/experiments/util';
import { container } from './detailed-container';

bindExperiment(container, CalculatorRenderer);
bindExperiment(container, PrintRenderer);
bindExperiment(container, ApplyCurrentKeithley6221Renderer);

export { container };
export { container as experimentRendererContainer };

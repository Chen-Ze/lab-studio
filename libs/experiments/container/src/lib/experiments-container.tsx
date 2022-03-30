import { CalculatorRenderer } from '@lab-studio/experiments/calculator';
import { EXPERIMENT_MENU_RENDERER_TYPES } from '@lab-studio/front/feature/experiment-tab/experiment-menu-renderer';
import { EXPERIMENT_RENDERER_TYPES } from '@lab-studio/front/feature/experiment-tab/experiment-renderer-provider';
import { container } from './detailed-container';

container
  .bind(EXPERIMENT_RENDERER_TYPES.ExperimentRenderer)
  .to(CalculatorRenderer);
container
  .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentMenuItemRenderer)
  .to(CalculatorRenderer);
container
  .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentDefaultInputProvider)
  .to(CalculatorRenderer);

export { container };

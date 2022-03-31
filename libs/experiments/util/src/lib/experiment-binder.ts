import { EXPERIMENT_MENU_RENDERER_TYPES } from '@lab-studio/front/feature/experiment-tab/experiment-menu-renderer';
import { EXPERIMENT_RENDERER_TYPES } from '@lab-studio/front/feature/experiment-tab/experiment-renderer-provider';
import { Container } from 'inversify';
// import { makeExperimentRenderer } from './experiment-renderer-maker';

export function bindExperiment(
  container: Container,
  renderer: { new (): unknown } // waiting for ts@4.7 ReturnType<typeof makeExperimentRenderer<TRecipe>>
) {
  container.bind(EXPERIMENT_RENDERER_TYPES.ExperimentRenderer).to(renderer);
  container
    .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentMenuItemRenderer)
    .to(renderer);
  container
    .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentDefaultInputProvider)
    .to(renderer);
}

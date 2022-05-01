import {
  ExperimentEnvironmentReducerProvider,
  EXPERIMENT_ENVIRONMENT_REDUCER_TYPES,
} from '@lab-studio/front/feature/experiment-tab/experiment-environment-reducer-provider';
import {
  ExperimentMenuRenderer,
  EXPERIMENT_MENU_RENDERER_TYPES,
} from '@lab-studio/front/feature/experiment-tab/experiment-menu-renderer';
import {
  ExperimentRendererProvider,
  EXPERIMENT_RENDERER_TYPES,
} from '@lab-studio/front/feature/experiment-tab/experiment-renderer-provider';
import {
  RoutineRenderer,
  ROUTINE_RENDERER_TYPES,
} from '@lab-studio/front/feature/experiment-tab/routine-renderer';
import {
  EnvironmentReducer,
  EnvironmentReducerFallback,
} from '@lab-studio/front/feature/experiment-tab/scope-environment-reducer';
import { Container } from 'inversify';
import {
  DetailedFallbackExperimentRenderer,
  DetailedMenuRenderer,
  DetailedSubroutineItemRenderer,
  DetailedSubroutinesRenderer,
} from '@lab-studio/front/feature/experiment-tab/detailed-renderers';
import { RootRenderer } from '@lab-studio/front/experiments/root-renderer';

const container = new Container();

container
  .bind(EXPERIMENT_ENVIRONMENT_REDUCER_TYPES.ExperimentEnvironmentReducer)
  .to(EnvironmentReducer);
container
  .bind(
    EXPERIMENT_ENVIRONMENT_REDUCER_TYPES.ExperimentEnvironmentReducerFallback
  )
  .to(EnvironmentReducerFallback);

container.bind(EXPERIMENT_RENDERER_TYPES.ExperimentRenderer).to(RootRenderer);

container
  .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentDefaultInputProvider)
  .to(RootRenderer);

container
  .bind(EXPERIMENT_RENDERER_TYPES.ExperimentRendererFallback)
  .to(DetailedFallbackExperimentRenderer);

container
  .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentMenuPanelRenderer)
  .to(DetailedMenuRenderer);

container
  .bind(ROUTINE_RENDERER_TYPES.ExperimentRendererProvider)
  .to(ExperimentRendererProvider);
container
  .bind(ROUTINE_RENDERER_TYPES.ExperimentEnvironmentReducerProvider)
  .to(ExperimentEnvironmentReducerProvider);
container
  .bind(ROUTINE_RENDERER_TYPES.SubroutineItemRenderer)
  .to(DetailedSubroutineItemRenderer);
container
  .bind(ROUTINE_RENDERER_TYPES.SubroutinesRenderer)
  .to(DetailedSubroutinesRenderer);
container
  .bind(ROUTINE_RENDERER_TYPES.ExperimentMenuRenderer)
  .to(ExperimentMenuRenderer);
container.bind(ROUTINE_RENDERER_TYPES.RoutineRenderer).to(RoutineRenderer);

export { container };

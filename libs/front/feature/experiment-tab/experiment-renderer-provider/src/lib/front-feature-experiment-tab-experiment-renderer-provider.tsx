import {
  ExperimentRenderer,
  ExperimentRendererPropsTyped,
  shouldRender,
  typeRendererInput,
} from '@lab-studio/front/feature/experiment-tab/experiment-renderer';
import { inject, injectable, multiInject } from 'inversify';
import { EXPERIMENT_RENDERER_TYPES } from './experiment-renderer-types';

@injectable()
export class ExperimentRendererProvider {
  constructor(
    @multiInject(EXPERIMENT_RENDERER_TYPES.ExperimentRenderer)
    private experimentRenderers: ExperimentRenderer<unknown, unknown>[],
    @inject(EXPERIMENT_RENDERER_TYPES.ExperimentRendererFallback)
    private experimentRendererFallback: ExperimentRenderer<unknown, unknown>
  ) {
    /* Do nothing */
  }

  render = <TInput, TEnvironment>(
    experiment: ExperimentRendererPropsTyped<TInput, TEnvironment>
  ) => {
    const rendererForExperiment =
      this.experimentRenderers.find((renderer) =>
        shouldRender(renderer, experiment)
      ) || this.experimentRendererFallback;
    return (
      <rendererForExperiment.render
        inputData={experiment.typedInput.inputData.data}
        environmentData={experiment.typedInput.environmentData}
        onChange={(newInput) => {
          experiment.onChange(
            // eslint-disable-next-line
            // @ts-ignore
            typeRendererInput(rendererForExperiment, newInput)
          );
        }}
      />
    );
  };
}

export default ExperimentRendererProvider;

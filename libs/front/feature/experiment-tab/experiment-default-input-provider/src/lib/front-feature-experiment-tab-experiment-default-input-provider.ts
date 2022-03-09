export function frontFeatureExperimentTabExperimentDefaultInputProvider(): string {
  return 'front-feature-experiment-tab-experiment-default-input-provider';
}

export function defaultInputForType(type: string): ClassDecorator {
  return (target) => {
    // eslint-disable-next-line
    // @ts-ignore
    Reflect.defineMetadata('defaultInputForType', type, target.prototype);
  };
}

export interface ExperimentDefaultInputProvider<TInput> {
  defaultInput(): TInput;
}

export function getDefaultInputType<TInput>(
  defaultInputProvider: ExperimentDefaultInputProvider<TInput>
) {
  return (
    // eslint-disable-next-line
    // @ts-ignore
    Reflect.getMetadata('defaultInputForType', defaultInputProvider)
  );
}

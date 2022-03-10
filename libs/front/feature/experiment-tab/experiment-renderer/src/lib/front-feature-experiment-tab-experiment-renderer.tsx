import { Typed } from '@lab-studio/shared/util/types';
import { JSXElementConstructor } from 'react';

interface ExperimentRendererInput<TInput, TEnvironment> {
  inputData: TInput;
  environmentData: TEnvironment;
}

export interface ExperimentRendererProps<TInput, TEnvironment>
  extends ExperimentRendererInput<TInput, TEnvironment> {
  onChange: (inputData: TInput) => void;
}

type ExperimentRendererInputTyped<TInput, TEnvironment> =
  ExperimentRendererInput<Typed<TInput>, TEnvironment>;

export interface ExperimentRendererPropsTyped<TInput, TEnvironment> {
  typedInput: ExperimentRendererInputTyped<TInput, TEnvironment>;
  onChange: (inputData: Typed<TInput>) => void;
}

export interface ExperimentRenderer<TInput, TEnvironment> {
  render: JSXElementConstructor<ExperimentRendererProps<TInput, TEnvironment>>;
}

export function renderType(type: string): ClassDecorator {
  return (target) => {
    // eslint-disable-next-line
    // @ts-ignore
    Reflect.defineMetadata('renderType', type, target.prototype);
  };
}

export function shouldRender<
  TRendererInput,
  TRendererEnvironment,
  TExperimentInput,
  TExperimentEnvironment
>(
  renderer: ExperimentRenderer<TRendererInput, TRendererEnvironment>,
  experimentInput: ExperimentRendererPropsTyped<
    TExperimentInput,
    TExperimentEnvironment
  >
) {
  return (
    // eslint-disable-next-line
    // @ts-ignore
    Reflect.getMetadata('renderType', renderer) ===
    experimentInput.typedInput.inputData._type
  );
}

export function typeRendererInput<TRendererInput, TRendererEnvironment, TInput>(
  renderer: ExperimentRenderer<TRendererInput, TRendererEnvironment>,
  experimentInput: TInput
): Typed<TInput> {
  return {
    // eslint-disable-next-line
    // @ts-ignore
    _type: Reflect.getMetadata('renderType', renderer),
    data: experimentInput,
  };
}

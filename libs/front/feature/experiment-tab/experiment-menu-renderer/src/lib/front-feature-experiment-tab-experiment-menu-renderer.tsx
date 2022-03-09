import { encodeType, Typed } from '@lab-studio/shared/util/types';
import { inject, injectable, multiInject } from 'inversify';
import { JSXElementConstructor, ReactNode } from 'react';
import {
  ExperimentDefaultInputProvider,
  getDefaultInputType,
} from '@lab-studio/front/feature/experiment-tab/experiment-default-input-provider';
import { EXPERIMENT_MENU_RENDERER_TYPES } from './experiment-menu-renderer-type';

export function itemForType(type: string): ClassDecorator {
  return (target) => {
    // eslint-disable-next-line
    // @ts-ignore
    Reflect.defineMetadata('itemForType', type, target.prototype);
  };
}

export interface ExperimentMenuItemRendererProps {
  onAdd(): void;
}

export interface ExperimentMenuItemRenderer {
  renderMenuItem: JSXElementConstructor<ExperimentMenuItemRendererProps>;
}

export function getItemType(defaultInputProvider: ExperimentMenuItemRenderer) {
  return (
    // eslint-disable-next-line
    // @ts-ignore
    Reflect.getMetadata('itemForType', defaultInputProvider)
  );
}

export interface ExperimentMenuPanelRendererProps {
  childrenConstructors: JSXElementConstructor<{
    onAdd: () => void;
  }>[];
}

export interface ExperimentMenuPanelRenderer {
  render: JSXElementConstructor<ExperimentMenuPanelRendererProps>;
}

export interface ExperimentMenuRendererProps {
  onAdd<Input>(typedInput: Typed<Input>): void;
}

@injectable()
export class ExperimentMenuRenderer {
  constructor(
    @multiInject(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentMenuItemRenderer)
    private itemRenderers: ExperimentMenuItemRenderer[],
    @multiInject(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentDefaultInputProvider)
    private defaultInputProviders: ExperimentDefaultInputProvider<unknown>[],
    @inject(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentMenuPanelRenderer)
    private menuPanelRenderer: ExperimentMenuPanelRenderer
  ) {}

  render = (props: ExperimentMenuRendererProps) => {
    return (
      <this.menuPanelRenderer.render
        childrenConstructors={this.itemRenderers.map(
          (renderer) => (propsFromParent) =>
            (
              <renderer.renderMenuItem
                key={getItemType(renderer)}
                onAdd={() => {
                  const defaultInput = this.defaultInputProviders.find(
                    (inputProvider) =>
                      getDefaultInputType(inputProvider) ===
                      getItemType(renderer)
                  );
                  if (!defaultInput) {
                    throw new Error(
                      `Find no default input provider for ${getItemType(
                        renderer
                      )}.`
                    );
                  }
                  props.onAdd(
                    encodeType(
                      getItemType(renderer),
                      defaultInput.defaultInput()
                    )
                  );
                  propsFromParent.onAdd();
                }}
              />
            )
        )}
      />
    );
  };
}

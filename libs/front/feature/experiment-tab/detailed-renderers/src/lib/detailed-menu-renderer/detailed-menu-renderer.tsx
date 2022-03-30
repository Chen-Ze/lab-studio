import {
  ExperimentMenuPanelRenderer,
  ExperimentMenuPanelRendererProps,
} from '@lab-studio/front/feature/experiment-tab/experiment-menu-renderer';
import { ExperimentMenu } from '@lab-studio/front/ui/experiment-tab/experiment-menu';
import { injectable } from 'inversify';

@injectable()
export class DetailedMenuRenderer implements ExperimentMenuPanelRenderer {
  render(props: ExperimentMenuPanelRendererProps) {
    return (
      <ExperimentMenu
        childrenConstructors={props.childrenConstructors.map(
          (ChildConstructor, i) => (childProp) =>
            <ChildConstructor key={i} onAdd={childProp.onClick} />
        )}
      />
    );
  }
}

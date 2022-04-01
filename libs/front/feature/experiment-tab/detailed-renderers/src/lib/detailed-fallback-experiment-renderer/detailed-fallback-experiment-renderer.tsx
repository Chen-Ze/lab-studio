import {
  ExperimentRenderer,
  ExperimentRendererProps,
} from '@lab-studio/front/feature/experiment-tab/experiment-renderer';
import { injectable } from 'inversify';

@injectable()
export class DetailedFallbackExperimentRenderer
  implements ExperimentRenderer<unknown, unknown>
{
  render(props: ExperimentRendererProps<unknown, unknown>) {
    return (
      <div>
        Unknown input type
        {JSON.stringify(props)}
      </div>
    );
  }
}

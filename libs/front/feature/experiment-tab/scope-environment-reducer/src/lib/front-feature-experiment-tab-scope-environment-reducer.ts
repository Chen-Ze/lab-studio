import { ExperimentEnvironmentReducer } from '@lab-studio/front/feature/experiment-tab/experiment-environment-reducer';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import { injectable } from 'inversify';
import * as R from 'ramda';
import 'reflect-metadata';

type Environment = ExperimentScope;

@injectable()
export class EnvironmentReducer
  implements
    ExperimentEnvironmentReducer<ExperimentMeasurement<unknown>, Environment>
{
  reduce(input: ExperimentMeasurement<unknown>, oldEnvironment: Environment) {
    const newInnerList = R.filter(
      (x) => !!x.declare,
      R.values(input.recipeOutput.innerOutputList)
    );
    const newInnerListVariables = R.pluck('declare', newInnerList) as string[];
    const newInnerListTypes = R.pluck('type', newInnerList);
    const newInnerVariables = R.zipObj(
      newInnerListVariables,
      newInnerListTypes
    );

    const newOuterList = R.filter(
      (x) => !!x.declare,
      R.values(input.recipeOutput.outerOutputList)
    );
    const newOuterListVariables = R.pluck('declare', newOuterList) as string[];
    const newOuterListTypes = R.pluck('type', newOuterList);
    const newOuterVariables = R.zipObj(
      newOuterListVariables,
      newOuterListTypes
    );

    return {
      innerEnvironment: {
        variables: R.mergeAll([oldEnvironment.variables, newInnerVariables]),
        columns: oldEnvironment.columns,
        instruments: R.mergeAll([
          oldEnvironment.instruments,
          input.recipeOutput.instrumentList || {},
        ]),
        addresses: oldEnvironment.addresses,
      },
      outerEnvironment: {
        variables: R.mergeAll([oldEnvironment.variables, newOuterVariables]),
        columns: oldEnvironment.columns,
        instruments: R.mergeAll([
          oldEnvironment.instruments,
          input.recipeOutput.instrumentList || {},
        ]),
        addresses: oldEnvironment.addresses,
      },
    };
  }
}

@injectable()
export class EnvironmentReducerFallback
  implements ExperimentEnvironmentReducer<unknown, unknown>
{
  reduce(input: unknown, oldEnvironment: unknown) {
    return {
      innerEnvironment: oldEnvironment,
      outerEnvironment: oldEnvironment,
    };
  }
}

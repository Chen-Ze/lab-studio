import {
  ExperimentWorker,
  ExperimentWorkerEnvironment,
} from '@lab-studio/api/experiment/experiment-worker';
import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import { RecipeOutputList } from '@lab-studio/shared/data/recipe/recipe-output';
import { Routine } from '@lab-studio/shared/data/sequence';
import { decodeType } from '@lab-studio/shared/util/types';
import * as R from 'ramda';

type RoutineWorkerGetter = (
  routine: Routine<ExperimentMeasurement<unknown>, string>
) => ExperimentWorker<unknown>;

type RoutineMap = {
  [key: string]: Routine<ExperimentMeasurement<unknown>, string>;
};

export class Ochestrator {
  constructor(
    private getWorkerByRoutine: RoutineWorkerGetter,
    private routines: RoutineMap,
    private onData: (
      data: Record<string, number> | Record<string, number>[]
    ) => void
  ) {}

  // TODO: environment should be scoped
  private environment: ExperimentWorkerEnvironment = {
    variables: {},
  };

  async start(id: string) {
    const routine = this.routines[id];
    const experimentMeasurement = decodeType(routine.input);
    const recipeOutput = experimentMeasurement.recipeOutput;
    const worker = this.getWorkerByRoutine(routine);

    const write = (
      list: Record<string, unknown>,
      recipeOutputList: RecipeOutputList
    ) => {
      const writeValues: {
        [key: string]: number | number[];
      } = {};
      for (const outputKey in list) {
        const recipeOutputForKey = recipeOutputList[outputKey];
        if (!recipeOutputForKey) continue;
        if (recipeOutputForKey.declare) {
          this.environment.variables[recipeOutputForKey.declare] = list[
            outputKey
          ] as number | number[];
        }
        if (recipeOutputForKey.write) {
          writeValues[recipeOutputForKey.write] = list[outputKey] as
            | number
            | number[];
        }
      }
      const writeArrayValues = R.mapObjIndexed(
        (value) => (value instanceof Array ? value : [value]),
        writeValues
      );
      const rowCount = Math.max(
        ...R.values(R.mapObjIndexed((value) => value.length, writeArrayValues)),
        0 // in case there is no entry
      );
      const writeArrayExtended: Record<string, number>[] = R.times((index) => {
        return R.reject(
          R.isNil,
          R.mapObjIndexed(
            (_value, key) => writeArrayValues[key][index],
            writeArrayValues
          )
        );
      }, rowCount);
      this.onData(writeArrayExtended);
    };

    await worker.execute(
      {
        recipe: experimentMeasurement.plainifiedRecipe,
        environment: this.environment,
      },
      {
        handover: async () => {
          for (const key of routine.subroutines) {
            await this.start(key);
          }
        },
        outputPrivate: (_recipe, list) =>
          write(list, recipeOutput.innerOutputList),
        outputPublic: (_recipe, list) =>
          write(list, recipeOutput.outerOutputList),
      }
    );
  }
}

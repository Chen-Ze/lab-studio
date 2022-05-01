import { ExperimentWorker } from '@lab-studio/api/experiment/experiment-worker';
import { Sequence } from '@lab-studio/shared/data/sequence';
import { getTypeName } from '@lab-studio/shared/util/types';
import { Inject, Injectable } from '@nestjs/common';
import { ExperimentWorkerGetter } from './experiment-worker-getter';
import * as randomWords from 'random-words';
import { Ochestrator } from './orchestrator/ochestrator';
import * as R from 'ramda';
import { interval, map, Observable, Subject, switchMap } from 'rxjs';
import { InstrumentControllerService } from '@lab-studio/api/instrument/instrument-controller';

const MIN_EXPERIMENT_ID_LENGTH = 2;
const ADDRESSES_POLLING_INTERVAL = 5000;

@Injectable()
export class ExperimentService {
  private ochestratorSubjects: Record<
    string,
    Subject<Record<string, number>[]>
  > = {};

  constructor(
    @Inject(ExperimentWorkerGetter)
    private workerGetter: ExperimentWorkerGetter,
    @Inject(InstrumentControllerService)
    private instrumentController: InstrumentControllerService
  ) {
    /* Do nothing */
  }

  // TODO: use BahaviorSubject
  private addressesObservable = interval(ADDRESSES_POLLING_INTERVAL).pipe(
    switchMap((_) => this.instrumentController.list())
  );

  printAllWorkers(sequence: Sequence) {
    for (const key of Object.keys(sequence)) {
      const routine = sequence[key];
      console.log(this.getWorkerByName(getTypeName(routine.routine.input)));
    }
  }

  startExperiment(sequence: Sequence): string {
    const id = getRandomId(
      MIN_EXPERIMENT_ID_LENGTH,
      Object.keys(this.ochestratorSubjects)
    );
    this.ochestratorSubjects[id] = new Subject<Record<string, number>[]>();
    const ochestrator = new Ochestrator(
      (routine) => {
        return this.getWorkerByName(getTypeName(routine.input));
      },
      R.mapObjIndexed((routineEntity) => routineEntity.routine, sequence),
      (data) => {
        const dataArray = data instanceof Array ? data : [data];
        this.ochestratorSubjects[id].next(dataArray);
      }
    );
    ochestrator.start('Root');
    return id;
  }

  observableById(id: string): Observable<Record<string, number>[]> {
    // TODO: remove
    this.ochestratorSubjects[id].subscribe((v) =>
      console.log(`line 54: ${JSON.stringify(v)}`)
    );
    return this.ochestratorSubjects[id].asObservable();
  }

  observableAddresses(): Observable<string[]> {
    return this.addressesObservable;
  }

  getWorker<TRecipe>(recipeType: {
    new (): TRecipe;
  }): ExperimentWorker<TRecipe> {
    return this.workerGetter.getWorker(recipeType);
  }

  getWorkerByName(typeName: string): ExperimentWorker<unknown> {
    return this.workerGetter.getWorkerByName(typeName);
  }
}

function getRandomId(minLength = 1, exclude?: string[]) {
  const generated = randomWords({ exactly: minLength, join: '-' });
  if (!exclude) return generated;
  if (exclude.indexOf(generated) < 0) return generated;
  return getRandomId(minLength + 1, exclude);
}

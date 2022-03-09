import { useState } from 'react';
import styled from 'styled-components';
import { injectable, injectAll, registry, container } from 'tsyringe';

/* eslint-disable-next-line */
export interface FrontUiExperimentTabExperimentRoutineProps { }

const StyledFrontUiExperimentTabExperimentRoutine = styled.div`
  color: pink;
`;

interface Responser {
  shouldResponse(str: string): boolean;
  echoWithPrefix(str: string): string;
}

@injectable()
export class AResponser implements Responser {
  shouldResponse(str: string) {
    return str.startsWith('A');
  }

  echoWithPrefix(str: string) {
    return `${str} starts with A`;
  }
}

@injectable()
export class BResponser implements Responser {
  shouldResponse(str: string) {
    return str.startsWith('B');
  }

  echoWithPrefix(str: string) {
    return `${str} starts with B`;
  }
}

@injectable()
export class CResponser implements Responser {
  shouldResponse(str: string) {
    return str.startsWith('C');
  }

  echoWithPrefix(str: string) {
    return `${str} starts with C`;
  }
}

@injectable()
class Renderer {
  constructor(@injectAll('Responser') private responserArray: Responser[]) {
    /* Do nothing */
  }

  render(str: string) {
    return (
      this.responserArray
        .filter((responser) => responser.shouldResponse(str))[0]
        ?.echoWithPrefix(str) || `Unsupported input ${str}`
    );
  }
}

container.register('Responser', { useValue: new AResponser() });
container.register('Responser', { useValue: new BResponser() });
container.register('Responser', { useValue: new CResponser() });

export function FrontUiExperimentTabExperimentRoutine(
  props: FrontUiExperimentTabExperimentRoutineProps
) {
  const [str, setStr] = useState('');

  return (
    <StyledFrontUiExperimentTabExperimentRoutine>
      <input value={str} onChange={(e) => setStr(e.currentTarget.value)} />
      <div>{container.resolve(Renderer).render(str)}</div>
    </StyledFrontUiExperimentTabExperimentRoutine>
  );
}

export default FrontUiExperimentTabExperimentRoutine;

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ExperimentsUtilProps {}

const StyledExperimentsUtil = styled.div`
  color: pink;
`;

export function ExperimentsUtil(props: ExperimentsUtilProps) {
  return (
    <StyledExperimentsUtil>
      <h1>Welcome to ExperimentsUtil!</h1>
    </StyledExperimentsUtil>
  );
}

export default ExperimentsUtil;

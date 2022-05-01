import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FrontExperimentsContainerProps {}

const StyledFrontExperimentsContainer = styled.div`
  color: pink;
`;

export function FrontExperimentsContainer(
  props: FrontExperimentsContainerProps
) {
  return (
    <StyledFrontExperimentsContainer>
      <h1>Welcome to FrontExperimentsContainer!</h1>
    </StyledFrontExperimentsContainer>
  );
}

export default FrontExperimentsContainer;

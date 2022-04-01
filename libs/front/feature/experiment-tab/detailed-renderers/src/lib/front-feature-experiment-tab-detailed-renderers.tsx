import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FrontFeatureExperimentTabDetailedRenderersProps {}

const StyledFrontFeatureExperimentTabDetailedRenderers = styled.div`
  color: pink;
`;

export function FrontFeatureExperimentTabDetailedRenderers(
  props: FrontFeatureExperimentTabDetailedRenderersProps
) {
  return (
    <StyledFrontFeatureExperimentTabDetailedRenderers>
      <h1>Welcome to FrontFeatureExperimentTabDetailedRenderers!</h1>
    </StyledFrontFeatureExperimentTabDetailedRenderers>
  );
}

export default FrontFeatureExperimentTabDetailedRenderers;

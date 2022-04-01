import styled from 'styled-components';

import { Route, Link } from 'react-router-dom';
import { ExperimentTab } from '../components/experiment-tab/experiment-tab';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Route path="/">
        <ExperimentTab />
      </Route>
      <Route path="/page-2">
        <div>
          <Link to="/">Click here to go back to root page.</Link>
        </div>
      </Route>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;

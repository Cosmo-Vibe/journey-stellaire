import { Layout } from './components/Layout/Layout';
import { Navigation } from './components/Navigation/Navigation';
import { useState } from 'react';
import { Stage } from './types/Stage';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import ThreeCanvas from './components/ThreeCanvas/ThreeCanvas';

const STAGES: Stage[] = [
  {
    id: 1,
    name: 'Nébuleuse',
    className: 'nebuleuse',
    stage: 'Amas Stellaire',
    description: 'Nébuleuse de l\'Aigle',
    texture: '/textures/1-NEBULA-AdobeStock_749681099.png',
    characteristics: {
      temperature: '10,000 K',
      duration: '1 million years',
      size: '10 light years'
    }
  },
  // ...rest of stages
];

function ErrorFallback({error}: {error: Error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function App() {
  const [activeStage, setActiveStage] = useState(1);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout>
        <ThreeCanvas
          stages={STAGES}
          activeStage={activeStage}
          onStageSelect={setActiveStage}
        />
        <Navigation
          stages={STAGES}
          activeStage={activeStage}
          onStageSelect={setActiveStage}
        />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;

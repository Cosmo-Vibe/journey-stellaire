import { FC, useRef, Suspense } from 'react';
import { Stage as StageType } from '../../types/Stage';
import { Stage } from './Stage';
import './StageContainer.css';
import { useFocusManagement } from '../../hooks/useFocusManagement';

interface StageContainerProps {
  stages: StageType[];
  activeStage: number;
  onStageSelect: (id: number) => void;
}

const LoadingFallback = () => (
  <div className="loading-state">
    <div className="spinner"></div>
    <p>Loading stages...</p>
  </div>
);

export const StageContainer: FC<StageContainerProps> = ({ stages, activeStage, onStageSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusManagement(activeStage, containerRef);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div 
        className="stage-container" 
        ref={containerRef}
        role="region" 
        aria-label="Stellar Evolution Stages"
      >
        {stages.map((stage, index) => (
          <Stage
            key={stage.id}
            stage={stage}
            isActive={stage.id === activeStage}
            onSelect={() => onStageSelect(stage.id)}
            tabIndex={index + 1}
          />
        ))}
      </div>
    </Suspense>
  );
};

import { FC, useEffect, useRef } from 'react';
import { Stage } from '../../types/Stage';
import './Navigation.css';
import useFocusManagement from '../../hooks/useFocusManagement';

interface NavigationProps {
  stages: Stage[];
  activeStage: number;
  onStageSelect: (id: number) => void;
}

export const Navigation: FC<NavigationProps> = ({ stages, activeStage, onStageSelect }) => {
  const navRef = useRef<HTMLElement>(null);
  useFocusManagement(activeStage, navRef);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const nextStage = Math.min(activeStage + 1, stages.length);
        onStageSelect(nextStage);
      } else if (e.key === 'ArrowLeft') {
        const prevStage = Math.max(activeStage - 1, 1);
        onStageSelect(prevStage);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeStage, stages.length, onStageSelect]);

  return (
    <nav className="navigation" ref={navRef} aria-label="Stage navigation">
      <ul role="tablist">
        {stages.map((stage) => (
          <li key={stage.id} role="tab">
            <button
              onClick={() => onStageSelect(stage.id)}
              className={`nav-item ${activeStage === stage.id ? 'active' : ''}`}
              aria-selected={activeStage === stage.id}
              aria-controls={`stage-${stage.id}`}
            >
              <div className="nav-content">
                <h3>{stage.name}</h3>
                <p>{stage.stage}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

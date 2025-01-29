import { FC, useState } from 'react';
import { Stage as StageType } from '../../types/Stage';
import { Modal } from '../UI/Modal/Modal';
import './Stage.css';

interface StageProps {
  stage: StageType;
  isActive: boolean;
  onSelect: () => void;
  tabIndex: number;
}

export const Stage: FC<StageProps> = ({ stage, isActive, onSelect, tabIndex }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.stage-details-button')) {
      setIsModalOpen(true);
    } else {
      onSelect();
    }
  };

  return (
    <>
      <div 
        className={`stage ${stage.className} ${isActive ? 'active' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={tabIndex}
        aria-label={`${stage.name} - ${stage.stage}`}
        aria-pressed={isActive}
      >
        <img 
          src={stage.texture} 
          alt={stage.name}
          className="stage-image"
        />
        <div className="stage-content">
          <h2>{stage.name}</h2>
          <p>{stage.stage}</p>
          <button 
            className="stage-details-button"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View details about ${stage.name}`}
          >
            Details
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={stage.name}
      >
        <div className="stage-details">
          <h3>{stage.stage}</h3>
          <p>{stage.description}</p>
          {stage.characteristics && (
            <div className="characteristics">
              <h4>Caractéristiques</h4>
              <ul>
                {stage.characteristics.temperature && (
                  <li>Température: {stage.characteristics.temperature}</li>
                )}
                {stage.characteristics.duration && (
                  <li>Durée: {stage.characteristics.duration}</li>
                )}
                {stage.characteristics.size && (
                  <li>Taille: {stage.characteristics.size}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

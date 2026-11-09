import React from 'react';
import SkillChip from './SkillChip';
import { cn } from './SkillChip';

/**
 * Detail panel shown below each layer card.
 * On desktop: all three are visible side by side.
 * On mobile: accordion — open/close via grid-template-rows.
 *
 * @param {Object}   props
 * @param {import('../data/techStack').Layer} props.layer        - Layer data
 * @param {boolean}  props.isActive                              - Drives red border + chip animation
 * @param {boolean}  props.isOpen                                - Mobile accordion open state
 * @param {boolean}  props.isMobile                              - Whether to use accordion
 * @param {Function} props.onClick                               - Click to select this layer
 * @param {string}   props.id                                    - Panel element id
 * @param {string}   props.labelledById                          - id of the card that labels this panel
 * @param {boolean}  [props.showPlaceholders=false]              - Whether to show ghost chips
 */
function LayerPanel({
  layer,
  isActive,
  isOpen,
  isMobile,
  onClick,
  id,
  labelledById,
  showPlaceholders = false,
}) {
  const panelContent = (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledById}
      className={cn('ts-panel', isActive && 'ts-panel--active')}
      onClick={onClick}
      // Make it keyboard-activatable as a secondary click target
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={-1} // panels are not in tab order; cards control selection
    >
      <h3 className="ts-panel__title">{layer.panelTitle}</h3>

      {layer.description && (
        <p className="ts-panel__desc">{layer.description}</p>
      )}

      <div className="ts-panel__chips">
        {layer.skills.map((skill, i) => (
          <SkillChip
            key={skill}
            label={skill}
            animate={isActive}
            index={i}
          />
        ))}
        {showPlaceholders && (
          <SkillChip label="[Add a skill]" ghost animate={false} />
        )}
      </div>
    </div>
  );

  if (!isMobile) {
    return panelContent;
  }

  // Mobile: accordion wrapper
  return (
    <div
      className={cn(
        'ts-panel-accordion',
        isOpen && 'ts-panel-accordion--open',
      )}
      aria-hidden={!isOpen}
      // inert on collapsed panels (removes from tab order + screen reader)
      {...(!isOpen ? { inert: '' } : {})}
    >
      <div className="ts-panel-accordion__inner">{panelContent}</div>
    </div>
  );
}

export default LayerPanel;

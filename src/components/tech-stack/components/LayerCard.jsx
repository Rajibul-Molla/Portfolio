import React from 'react';
import { cn } from './SkillChip';

/**
 * A single layer card rendered as a <button> for keyboard/screen-reader access.
 * Uses roving tabindex: only the active card has tabIndex=0.
 *
 * @param {Object}   props
 * @param {import('../data/techStack').Layer} props.layer   - Layer data
 * @param {boolean}  props.isActive                         - Whether this layer is selected
 * @param {Function} props.onClick                          - Click handler
 * @param {Function} props.onKeyDown                        - Keydown handler (arrow keys)
 * @param {string}   props.panelId                          - id of the associated panel element
 * @param {React.Ref} props.buttonRef                       - Forwarded ref for roving focus
 */
const LayerCard = React.memo(function LayerCard({
  layer,
  isActive,
  onClick,
  onKeyDown,
  panelId,
  buttonRef,
}) {
  return (
    <button
      ref={buttonRef}
      id={`ts-card-${layer.id}`}
      className={cn('ts-card', isActive && 'ts-card--active')}
      aria-pressed={isActive}
      aria-controls={panelId}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={isActive ? 0 : -1}
      type="button"
    >
      <span className="ts-card__eyebrow">{layer.eyebrow}</span>
      <span className="ts-card__title">{layer.title}</span>
      <span className="ts-card__subtitle">{layer.subtitle}</span>
    </button>
  );
});

export default LayerCard;

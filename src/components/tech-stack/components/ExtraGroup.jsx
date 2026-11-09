import React from 'react';
import SkillChip from './SkillChip';

/**
 * One of the three bottom groups (Tools, Languages, Other skills).
 *
 * @param {Object}  props
 * @param {import('../data/techStack').ExtraGroup} props.group
 * @param {boolean} [props.showPlaceholders=false] - Whether to show ghost chips
 */
function ExtraGroup({ group, showPlaceholders = false }) {
  return (
    <div className="ts-extra-group">
      <h3 className="ts-extra-group__title">{group.title}</h3>
      <div className="ts-extra-group__chips">
        {group.items.map((item) => (
          <SkillChip key={item} label={item} />
        ))}
        {showPlaceholders && group.ghost && (
          <SkillChip label={group.ghost} ghost />
        )}
      </div>
    </div>
  );
}

export default ExtraGroup;

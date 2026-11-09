import React from 'react';

/**
 * Tiny classname utility — avoids adding the `clsx` package.
 * Filters out falsy values and joins the rest with spaces.
 *
 * @param {...(string|boolean|null|undefined)} args
 * @returns {string}
 */
export function cn(...args) {
  return args.filter(Boolean).join(' ');
}

/**
 * A single skill chip or ghost-placeholder chip.
 *
 * @param {Object}  props
 * @param {string}  props.label          - Text inside the chip
 * @param {boolean} [props.ghost=false]  - Render as a ghost/placeholder chip
 * @param {boolean} [props.animate=false]- Animate entrance (stagger driven by index)
 * @param {number}  [props.index=0]      - Stagger index (0-based)
 */
const SkillChip = React.memo(function SkillChip({
  label,
  ghost = false,
  animate = false,
  index = 0,
}) {
  const style = animate
    ? {
        '--ts-anim-delay': `${index * 40}ms`,
        '--ts-anim-dur': '200ms',
      }
    : {};

  return (
    <span
      className={cn(
        'ts-chip',
        ghost && 'ts-chip--ghost',
        animate && 'ts-chip--animate',
      )}
      style={style}
      aria-hidden={ghost ? 'true' : undefined}
    >
      {label}
    </span>
  );
});

export default SkillChip;

import React, { useEffect, useRef, useState } from 'react';

/**
 * Horizontal arrow connector between two layer cards.
 * Renders a line with an arrowhead, a label above, and an animated dot.
 *
 * The dot's position is driven by CSS transition on the `left` property.
 * We store whether the dot should be at the end (isActive) or start.
 *
 * @param {Object}  props
 * @param {string}  props.label           - Label shown above the arrow ("request" | "query")
 * @param {boolean} props.showDot         - Whether the dot starts on this connector
 * @param {boolean} props.dotShouldTraverse - Whether dot should travel to end of this connector
 * @param {boolean} props.isMobile        - Render vertical layout for mobile
 */
function FlowConnector({ label, showDot, dotShouldTraverse, isMobile }) {
  const trackRef = useRef(null);
  const [dotLeft, setDotLeft] = useState(0);

  // Animate dot across when dotShouldTraverse becomes true
  // We read the track's rendered width once so the animation is accurate
  useEffect(() => {
    if (!trackRef.current) return;
    if (dotShouldTraverse) {
      const width = trackRef.current.offsetWidth;
      // On next frame so initial paint at 0 is committed first
      requestAnimationFrame(() => {
        setDotLeft(width - 4); // -4 to stop just before arrowhead
      });
    } else {
      setDotLeft(0);
    }
  }, [dotShouldTraverse]);

  if (isMobile) {
    return (
      /* Vertical connector for mobile */
      <div className="ts-connector" aria-hidden="true">
        <div className="ts-connector__inner">
          <div
            className="ts-connector__track"
            ref={trackRef}
            style={{ width: '1px', height: '32px' }}
          />
          <span className="ts-connector__label">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ts-connector" aria-hidden="true">
      <div className="ts-connector__inner">
        <span className="ts-connector__label">{label}</span>
        <div className="ts-connector__track" ref={trackRef}>
          {showDot && (
            <span
              className="ts-connector__dot"
              style={{ left: `${dotLeft}px` }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FlowConnector;

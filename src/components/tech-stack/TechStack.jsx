import React, { useCallback, useEffect, useRef, useState } from 'react';
import { layers, extraGroups } from './data/techStack';
import LayerCard from './components/LayerCard';
import FlowConnector from './components/FlowConnector';
import LayerPanel from './components/LayerPanel';
import ExtraGroup from './components/ExtraGroup';
import { useRevealOnce } from './hooks/useRevealOnce';
import './styles/techStack.css';

// Derived index map for quick lookup
const layerIds = layers.map((l) => l.id);

/**
 * Main Tech Stack section component.
 *
 * @param {Object}  props
 * @param {string}  [props.id="tech-stack"]          - HTML id for anchor navigation
 * @param {boolean} [props.showPlaceholders=false]   - Show ghost "Add a skill" chips
 */
function TechStack({ id = 'tech-stack', showPlaceholders = true }) {
  // Which layer is currently selected
  const [activeId, setActiveId] = useState('frontend');

  // Whether we're in mobile layout (≤ 767px)
  const [isMobile, setIsMobile] = useState(false);

  // Whether reduced motion is preferred
  const [reducedMotion, setReducedMotion] = useState(false);

  // Reveal animation
  const { ref: sectionRef, isVisible } = useRevealOnce({ threshold: 0.05 });

  // Roving tabindex refs: one per layer card
  const cardRefs = useRef(layers.map(() => React.createRef()));

  // Detect mobile breakpoint and reduced motion preference
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsMobile(mobileQuery.matches);
    setReducedMotion(motionQuery.matches);

    const onMobileChange = (e) => setIsMobile(e.matches);
    const onMotionChange = (e) => setReducedMotion(e.matches);

    mobileQuery.addEventListener('change', onMobileChange);
    motionQuery.addEventListener('change', onMotionChange);
    return () => {
      mobileQuery.removeEventListener('change', onMobileChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  // When activeId changes, focus the active card (roving tabindex)
  const prevActiveId = useRef(activeId);
  useEffect(() => {
    if (prevActiveId.current !== activeId) {
      prevActiveId.current = activeId;
      const idx = layerIds.indexOf(activeId);
      if (idx !== -1 && cardRefs.current[idx]?.current) {
        cardRefs.current[idx].current.focus();
      }
    }
  }, [activeId]);

  /** Select a layer by id */
  const selectLayer = useCallback((id) => {
    setActiveId(id);
  }, []);

  /**
   * Keyboard handler for arrow key navigation (roving tabindex pattern).
   * ArrowRight / ArrowDown moves to next layer; ArrowLeft / ArrowUp to previous.
   */
  const handleKeyDown = useCallback(
    (e, currentId) => {
      const idx = layerIds.indexOf(currentId);
      let nextIdx = idx;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIdx = (idx + 1) % layers.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIdx = (idx - 1 + layers.length) % layers.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIdx = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIdx = layers.length - 1;
      } else {
        return;
      }

      setActiveId(layerIds[nextIdx]);
    },
    []
  );

  const activeIdx = layerIds.indexOf(activeId);

  /**
   * Compute dot animation state for each connector.
   * Connector 0 = between layer 0 and layer 1 ("request").
   * Connector 1 = between layer 1 and layer 2 ("query").
   *
   * The dot starts at the left of connector 0.
   * - activeIdx === 0 (frontend): dot stays at start of connector 0
   * - activeIdx === 1 (backend):  dot travels to end of connector 0
   * - activeIdx === 2 (data):     dot travels through connector 0 AND connector 1
   *
   * We control this by:
   *  - showDot: always true for connector 0 (dot lives there at rest)
   *  - dotShouldTraverse: true when the selected layer is AFTER this connector
   *
   * For connector 1, we also need the dot to appear at the start when activeIdx >= 2.
   * We solve this by using showDot on connector 1 when activeIdx >= 2.
   */
  const getDotProps = (connectorIndex) => {
    if (reducedMotion) {
      return { showDot: false, dotShouldTraverse: false };
    }
    if (connectorIndex === 0) {
      return {
        showDot: activeIdx <= 1, // hide from connector 0 if dot has moved to connector 1
        dotShouldTraverse: activeIdx >= 1,
      };
    }
    if (connectorIndex === 1) {
      return {
        showDot: activeIdx >= 2, // dot appears on this connector only when data is active
        dotShouldTraverse: activeIdx >= 2,
      };
    }
    return { showDot: false, dotShouldTraverse: false };
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`ts-root${isVisible ? ' ts-visible' : ''}`}
      aria-labelledby="ts-section-heading"
    >
      <div className="ts-container">
        {/* ── Header ── */}
        <header className="ts-header">
          <h2 id="ts-section-heading" className="ts-section-title">
            Tech Stack
          </h2>
          <p className="ts-header-desc">
            Follow a request from the browser to the database. Select a layer to
            see what I use there.
          </p>
        </header>

        {/* ── Flow row (cards + connectors) ── */}
        {!isMobile ? (
          /* ── Desktop / tablet: horizontal 3-col grid ── */
          <>
            <div className="ts-flow-row" role="group" aria-label="Technology layers">
              {layers.map((layer, i) => (
                <React.Fragment key={layer.id}>
                  {/* Arrow connector BEFORE this card (except first) */}
                  {i > 0 && (
                    <FlowConnector
                      label={layer.connectorLabel}
                      isMobile={false}
                      {...getDotProps(i - 1)}
                    />
                  )}
                  <LayerCard
                    layer={layer}
                    isActive={activeId === layer.id}
                    onClick={() => selectLayer(layer.id)}
                    onKeyDown={(e) => handleKeyDown(e, layer.id)}
                    panelId={`ts-panel-${layer.id}`}
                    buttonRef={cardRefs.current[i]}
                  />
                </React.Fragment>
              ))}
            </div>

            {/* ── Panels row (3 columns with vertical connectors) ── */}
            <div className="ts-panels-row">
              {layers.map((layer) => (
                <div key={layer.id} className="ts-panel-wrapper">
                  {/* Vertical connector line */}
                  <div
                    className={`ts-vert-connector${activeId === layer.id ? ' ts-vert-connector--active' : ''}`}
                    aria-hidden="true"
                  />
                  <LayerPanel
                    layer={layer}
                    isActive={activeId === layer.id}
                    isOpen={true}
                    isMobile={false}
                    onClick={() => selectLayer(layer.id)}
                    id={`ts-panel-${layer.id}`}
                    labelledById={`ts-card-${layer.id}`}
                    showPlaceholders={showPlaceholders}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ── Mobile: vertical stack, accordion panels ── */
          <div role="group" aria-label="Technology layers">
            {layers.map((layer, i) => (
              <React.Fragment key={layer.id}>
                {/* Vertical arrow connector BEFORE this card (except first) */}
                {i > 0 && (
                  <FlowConnector
                    label={layer.connectorLabel}
                    isMobile={true}
                    showDot={false}
                    dotShouldTraverse={false}
                  />
                )}

                {/* Card */}
                <LayerCard
                  layer={layer}
                  isActive={activeId === layer.id}
                  onClick={() => selectLayer(layer.id)}
                  onKeyDown={(e) => handleKeyDown(e, layer.id)}
                  panelId={`ts-panel-${layer.id}`}
                  buttonRef={cardRefs.current[i]}
                />

                {/* Vertical connector to panel */}
                <div
                  className={`ts-vert-connector${activeId === layer.id ? ' ts-vert-connector--active' : ''}`}
                  aria-hidden="true"
                />

                {/* Accordion panel */}
                <LayerPanel
                  layer={layer}
                  isActive={activeId === layer.id}
                  isOpen={activeId === layer.id}
                  isMobile={true}
                  onClick={() => selectLayer(layer.id)}
                  id={`ts-panel-${layer.id}`}
                  labelledById={`ts-card-${layer.id}`}
                  showPlaceholders={showPlaceholders}
                />
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ── Bottom / Extra groups row ── */}
        <div className="ts-extra-row" aria-label="Additional skills">
          {extraGroups.map((group) => (
            <ExtraGroup
              key={group.id}
              group={group}
              showPlaceholders={showPlaceholders}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;

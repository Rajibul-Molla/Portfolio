/**
 * Tech Stack section – React Testing Library unit tests.
 *
 * Run with: npx vitest (or jest, depending on your setup)
 *
 * Note: These tests use RTL with jsdom. The IntersectionObserver is mocked
 * so useRevealOnce works in the test environment.
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import TechStack from '../TechStack';

// ── IntersectionObserver mock ──────────────────────────────────────────────
beforeAll(() => {
  // Immediately call the callback with isIntersecting=true so reveal fires
  global.IntersectionObserver = class {
    constructor(cb) {
      this._cb = cb;
    }
    observe(el) {
      this._cb([{ isIntersecting: true, target: el }]);
    }
    unobserve() { }
    disconnect() { }
  };

  // Mock matchMedia (jsdom doesn't implement it)
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// ── Tests ──────────────────────────────────────────────────────────────────

describe('TechStack', () => {
  /**
   * Test 1: Default active layer is Frontend.
   * The React card should have aria-pressed="true" on mount.
   */
  it('default active layer is Frontend (React card has aria-pressed true)', () => {
    render(<TechStack />);

    // The card for the "frontend" layer has id ts-card-frontend
    const reactCard = screen.getByRole('button', { name: /react/i });
    expect(reactCard).toHaveAttribute('aria-pressed', 'true');

    // Other cards should not be active
    const nodeCard = screen.getByRole('button', { name: /node\.js/i });
    expect(nodeCard).toHaveAttribute('aria-pressed', 'false');
  });

  /**
   * Test 2: Clicking the Database card updates aria-pressed.
   */
  it('clicking Database card sets it as active (aria-pressed true)', () => {
    render(<TechStack />);

    const dbCard = screen.getByRole('button', { name: /mongodb/i });
    fireEvent.click(dbCard);

    expect(dbCard).toHaveAttribute('aria-pressed', 'true');

    // Frontend should now be inactive
    const reactCard = screen.getByRole('button', { name: /react/i });
    expect(reactCard).toHaveAttribute('aria-pressed', 'false');
  });

  /**
   * Test 3: ArrowRight key moves selection to the next layer.
   * Starting from Frontend, ArrowRight should move to Backend.
   */
  it('ArrowRight moves selection from Frontend to Backend', () => {
    render(<TechStack />);

    const reactCard = screen.getByRole('button', { name: /react/i });

    // Verify it's active first
    expect(reactCard).toHaveAttribute('aria-pressed', 'true');

    // Fire ArrowRight key on the active (React) card
    fireEvent.keyDown(reactCard, { key: 'ArrowRight' });

    // Backend card should now be active
    const nodeCard = screen.getByRole('button', { name: /node\.js/i });
    expect(nodeCard).toHaveAttribute('aria-pressed', 'true');
    expect(reactCard).toHaveAttribute('aria-pressed', 'false');
  });
});

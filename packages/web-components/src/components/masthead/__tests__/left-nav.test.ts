/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { SIDE_NAV_USAGE_MODE } from '@carbon/web-components/es/components/ui-shell/side-nav.js';
import '../left-nav';
import C4DLeftNavOverlay from '../left-nav-overlay';

const template = (props?) => {
  const { expanded, usageMode } = props ?? {};
  return html`
    <c4d-left-nav
      ?expanded="${expanded}"
      usage-mode="${ifDefined(usageMode)}"></c4d-left-nav>
    <c4d-left-nav-overlay></c4d-left-nav-overlay>
  `;
};

describe('c4d-left-nav', function () {
  describe('Toggling', function () {
    it('should hide the overlay if not expanded', async function () {
      render(template(), document.body);
      await Promise.resolve();
      expect(
        (
          document.body.querySelector(
            'c4d-left-nav-overlay'
          ) as C4DLeftNavOverlay
        ).active
      ).toBe(false);
    });

    it('should show the overlay if not expanded', async function () {
      render(template({ expanded: true }), document.body);
      await Promise.resolve();
      expect(
        (
          document.body.querySelector(
            'c4d-left-nav-overlay'
          ) as C4DLeftNavOverlay
        ).active
      ).toBe(true);
    });

    it('should warn wrong usage mode', async function () {
      // Render with default (header-nav) first so the element is fully initialised
      render(template(), document.body);
      const leftNav = document.body.querySelector('c4d-left-nav') as any;
      await leftNav.updateComplete;
      // Now install the spy and change usageMode so updated() fires with changedProperties
      spyOn(console, 'warn');
      render(
        template({ usageMode: SIDE_NAV_USAGE_MODE.REGULAR }),
        document.body
      );
      await leftNav.updateComplete;
      // eslint-disable-next-line no-console
      expect(console.warn).toHaveBeenCalledWith(
        'c4d-left-nav supports only `header-nav` for its `usage-mode` attribute or `usageMode` property. The value is ignored:',
        SIDE_NAV_USAGE_MODE.REGULAR
      );
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});

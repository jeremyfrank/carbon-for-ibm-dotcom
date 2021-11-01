/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Tall)
 *
 * @type {string}
 * @private
 */
const _pathTall = '/iframe.html?id=components-lead-space--tall';

/**
 * Sets the correct path (Tall with image)
 *
 * @type {string}
 * @private
 */
const _pathTallImage = '/iframe.html?id=components-lead-space--tall-with-image';

/**
 * Sets the correct path (Centered)
 *
 * @type {string}
 * @private
 */
const _pathCentered = '/iframe.html?id=components-lead-space--centered';

/**
 * Sets the correct path (Centered with image)
 *
 * @type {string}
 * @private
 */
const _pathCenteredImage = '/iframe.html?id=components-lead-space--centered-with-image';

/**
 * Sets the correct path (Short)
 *
 * @type {string}
 * @private
 */
const _pathShort = '/iframe.html?id=components-lead-space--short';

/**
 * Sets the correct path (Short with image)
 *
 * @type {string}
 * @private
 */
const _pathShortWithImage = '/iframe.html?id=components-lead-space--short-with-image';

/**
 * Sets the correct path (Medium)
 *
 * @type {string}
 * @private
 */
const _pathMedium = '/iframe.html?id=components-lead-space--medium';

/**
 * Sets the correct path (Medium with image)
 *
 * @type {string}
 * @private
 */
const _pathMediumWithImage = '/iframe.html?id=components-lead-space--medium-with-image';

/**
 * Sets the correct path (Super)
 *
 * @type {string}
 * @private
 */
const _pathSuper = '/iframe.html?id=components-lead-space--super';

/**
 * Sets the correct path (Super with image)
 *
 * @type {string}
 * @private
 */
const _pathSuperWithImage = '/iframe.html?id=components-lead-space--super-with-image';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('dds-leadspace | tall', () => {
  it('should load title and copy - both left aligned', () => {
    cy.visit(`/${_pathTall}`);
    cy.viewport(1280, 780);

    cy.get('dds-leadspace-heading').then($title => {
      expect($title[0].getBoundingClientRect().left).to.equal(16);
    });

    cy.get('[data-autoid="dds--leadspace__desc"]').then($desc => {
      expect($desc[0].getBoundingClientRect().left).to.equal(16);
    });
  });

  it('should render 3 buttons with different icons (arrow right, left, and PDF)', () => {
    cy.visit(
      `/${_pathTall}&knob-Number%20of%20buttons_LeadSpace=3&knob-Icon%201_LeadSpace=ArrowRight20&knob-Button%201_LeadSpace=Button%201&knob-Icon%202_LeadSpace=ArrowDown20&knob-Icon%203_LeadSpace=Pdf20`
    );
    cy.viewport(1280, 780);

    cy.get('dds-button-group-item:nth-child(1) svg path').then($icon => {
      expect($icon).to.have.attr('d', 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z');
    });

    cy.get('dds-button-group-item:nth-child(2) svg path').then($icon => {
      expect($icon).to.have.attr('d', 'M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z');
    });

    cy.get('dds-button-group-item:nth-child(3) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M30 11L30 9 22 9 22 23 24 23 24 17 29 17 29 15 24 15 24 11 30 11zM8 9H2V23H4V18H8a2 2 0 002-2V11A2 2 0 008 9zm0 7H4V11H8zM16 23H12V9h4a4 4 0 014 4v6A4 4 0 0116 23zm-2-2h2a2 2 0 002-2V13a2 2 0 00-2-2H14z'
      );
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // cy.percySnapshot('dds-leadspace | tall | 3 buttons with different icons', {
    //   widths: [1280],
    // });
  });

  it('should load two buttons by default', () => {
    cy.visit(`/${_pathTall}`);
    cy.viewport(1280, 780);

    cy.get('dds-button-group-item').should('have.length', 2);
  });

  it('should load more than 2 buttons when customized and should all have links', () => {
    cy.visit(`/${_pathTall}&knob-Number%20of%20buttons_LeadSpace=3`);
    cy.viewport(1280, 780);

    cy.get('dds-button-group-item').should('have.length', 3);

    cy.get('dds-button-group-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load without a background image', () => {
    cy.visit(`/${_pathTall}`);
    cy.viewport(1280, 780);

    cy.get('dds-leadspace-image').should('not.exist');
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathTall}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');
      cy.wait(500);
      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathTall}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');
      cy.wait(500);

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathTall}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');
      cy.wait(500);

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-leadspace | tall with image', () => {
  it('should load with background image', () => {
    cy.visit(`/${_pathTallImage}`);
    cy.viewport(1280, 780);

    cy.wait(500);

    cy.get('dds-leadspace-image')
      .find('dds-image-item')
      .should('have.attr', 'srcset');

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-leadspace | tall with image | background image', {
    //   widths: [1280],
    // });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathTallImage}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall with image | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathTallImage}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall with image | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathTallImage}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall with image | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-leadspace | centered', () => {
  it('should load title and copy - both centered', () => {
    cy.visit(`/${_pathCentered}`);
    cy.viewport(1280, 780);

    cy.get('dds-leadspace-heading').then($title => {
      expect($title[0].getBoundingClientRect().left).to.equal(328);
    });

    cy.get('[data-autoid="dds--leadspace__desc"]').then($desc => {
      expect($desc[0].getBoundingClientRect().left).to.equal(328);
    });
  });

  it('should load two buttons by default', () => {
    cy.visit(`/${_pathCentered}`);
    cy.viewport(1280, 780);

    cy.get('dds-button-group-item').should('have.length', 2);
  });

  it('should load buttons centered aligned', () => {
    cy.visit(`/${_pathCentered}`);
    cy.viewport(1280, 780);

    cy.get('dds-button-group').then($button => {
      expect($button[0].getBoundingClientRect().left).to.equal(344);
    });
  });

  it('should render 3 buttons with different icons (arrow right, left, and PDF)', () => {
    cy.visit(
      `/${_pathCentered}&knob-Number%20of%20buttons_LeadSpace=3&knob-Icon%201_LeadSpace=ArrowRight20&knob-Button%201_LeadSpace=Button%201&knob-Icon%202_LeadSpace=ArrowDown20&knob-Icon%203_LeadSpace=Pdf20`
    );
    cy.viewport(1280, 780);

    cy.get('dds-button-group-item:nth-child(1) svg path').then($icon => {
      expect($icon).to.have.attr('d', 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z');
    });

    cy.get('dds-button-group-item:nth-child(2) svg path').then($icon => {
      expect($icon).to.have.attr('d', 'M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z');
    });

    cy.get('dds-button-group-item:nth-child(3) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M30 11L30 9 22 9 22 23 24 23 24 17 29 17 29 15 24 15 24 11 30 11zM8 9H2V23H4V18H8a2 2 0 002-2V11A2 2 0 008 9zm0 7H4V11H8zM16 23H12V9h4a4 4 0 014 4v6A4 4 0 0116 23zm-2-2h2a2 2 0 002-2V13a2 2 0 00-2-2H14z'
      );
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // cy.percySnapshot('dds-leadspace | centered | 3 buttons with different icons', {
    //   widths: [1280],
    // });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathCentered}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathCentered}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathCentered}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-leadspace | centered with image', () => {
  it('should load with background image', () => {
    cy.visit(`/${_pathCenteredImage}`);
    cy.viewport(1280, 780);

    cy.wait(500);

    cy.get('dds-leadspace-image')
      .find('dds-image-item')
      .should('have.attr', 'srcset');

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-leadspace | centered with image | background image', {
    //   widths: [1280],
    // });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathCenteredImage}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered with image | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathCenteredImage}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered with image | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathCenteredImage}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered with image | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-leadspace | short', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathShort}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathShort}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathShort}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-leadspace | short with image', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathShortWithImage}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short with image | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathShortWithImage}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short with image | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathShortWithImage}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short with image | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-leadspace | medium', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathMedium}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathMedium}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathMedium}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-leadspace | medium with image', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathMediumWithImage}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium with image | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathMediumWithImage}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium with image | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathMediumWithImage}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium with image | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-leadspace | super', () => {
  it('should load title and copy - both left aligned', () => {
    cy.visit(`/${_pathSuper}`);
    cy.viewport(1280, 780);

    cy.get('dds-leadspace-heading').then($title => {
      expect($title[0].getBoundingClientRect().left).to.equal(16);
    });

    cy.get('[data-autoid="dds--leadspace__desc"]').then($desc => {
      expect($desc[0].getBoundingClientRect().left).to.equal(16);
    });
  });

  it('should load two buttons by default', () => {
    cy.visit(`/${_pathSuper}`);
    cy.viewport(1280, 780);

    cy.get('dds-button-group-item').should('have.length', 2);
  });

  it('should render 3 buttons with different icons (arrow right, left, and PDF)', () => {
    cy.visit(
      `/${_pathSuper}&knob-Number%20of%20buttons_LeadSpace=3&knob-Icon%201_LeadSpace=ArrowRight20&knob-Button%201_LeadSpace=Button%201&knob-Icon%202_LeadSpace=ArrowDown20&knob-Icon%203_LeadSpace=Pdf20`
    );
    cy.viewport(1280, 780);

    cy.get('dds-button-group-item:nth-child(1) svg path').then($icon => {
      expect($icon).to.have.attr('d', 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z');
    });

    cy.get('dds-button-group-item:nth-child(2) svg path').then($icon => {
      expect($icon).to.have.attr('d', 'M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z');
    });

    cy.get('dds-button-group-item:nth-child(3) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M30 11L30 9 22 9 22 23 24 23 24 17 29 17 29 15 24 15 24 11 30 11zM8 9H2V23H4V18H8a2 2 0 002-2V11A2 2 0 008 9zm0 7H4V11H8zM16 23H12V9h4a4 4 0 014 4v6A4 4 0 0116 23zm-2-2h2a2 2 0 002-2V13a2 2 0 00-2-2H14z'
      );
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // cy.percySnapshot('dds-leadspace | super | 3 buttons with different icons', {
    //   widths: [1280],
    // });
  });

  it('should load more than 2 buttons when customized and should all have links', () => {
    cy.visit(`/${_pathSuper}&knob-Number%20of%20buttons_LeadSpace=3`);
    cy.viewport(1280, 780);

    cy.get('dds-button-group-item').should('have.length', 3);

    cy.get('dds-button-group-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathSuper}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathSuper}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathSuper}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-leadspace | super with image', () => {
  it('should load with background image', () => {
    cy.visit(`/${_pathSuperWithImage}`);
    cy.viewport(1280, 780);

    cy.wait(500);

    cy.get('dds-leadspace-image')
      .find('dds-image-item')
      .should('have.attr', 'srcset');

    cy.get('dds-leadspace-image').then($ele => {
      expect($ele[0].offsetHeight).to.equal(640);
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-leadspace | super with image | background image', {
    //   widths: [1280],
    // });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathSuperWithImage}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super with image | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathSuperWithImage}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super with image | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathSuperWithImage}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super with image | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

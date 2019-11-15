import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { ArrowRight20, ArrowDown20, Pdf20 } from '@carbon/icons-react';
import '@carbon/grid/scss/grid.scss';
import '../../../../../styles/scss/components/buttongroup/_buttongroup.scss';
import readme from '../README.md';
import { BUTTON_GROUP } from '../../../internal/FeatureFlags';

import ButtonGroup from '../ButtonGroup';

if (BUTTON_GROUP) {
  storiesOf('ButtonGroup', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const iconMap = {
        ArrowRight20,
        ArrowDown20,
        Pdf20,
      };

      const iconOptions = {
        None: null,
        'Arrow Right': 'ArrowRight20',
        'Arrow Down': 'ArrowDown20',
        PDF: 'Pdf20',
      };

      const primaryIcon =
        iconMap[
          select('Primary button icon', iconOptions, iconOptions['Arrow Right'])
        ];
      const secondaryIcon =
        iconMap[
          select('Secondary button icon', iconOptions, iconOptions['PDF'])
        ];

      const buttons = [
        {
          href: 'https://www.ibm.com',
          copy: text('Primary button copy', 'Primary action button'),
          renderIcon: primaryIcon || null,
        },
        {
          href: 'https://www.ibm.com',
          copy: text('Secondary button copy', 'Secondary action button'),
          renderIcon: secondaryIcon || null,
        },
      ];

      return (
        <div
          className="bx-grid"
          style={{
            padding: 2 + `rem`,
            backgroundColor: 'black',
          }}>
          <div className="bx--row">
            <div className="bx--col-lg-16 bx--col-md-6 bx--col-sm-16">
              <ButtonGroup buttons={buttons} />
            </div>
          </div>
          <div className="bx--row">
            <div className="bx--col-lg-12 bx--col-md-8 bx--col-sm-16">
              <ButtonGroup buttons={buttons} />
            </div>
          </div>
          <div className="bx--row">
            <div className="bx--col-lg-12 bx--col-md-4 bx--col-sm-16">
              <ButtonGroup buttons={buttons} />
            </div>
          </div>
        </div>
      );
    });
}

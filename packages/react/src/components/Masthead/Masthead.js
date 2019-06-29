/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

const Masthead = ({ type }) => {
  if (type == 'branded') {
    return (
      <div>
        <p>This is a branded masthead</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>This is the standard masthead</p>
      </div>
    );
  }
};

Masthead.propTypes = {
  /**
   * Specify Masthead type
   */
  type: PropTypes.string,
};

export default Masthead;

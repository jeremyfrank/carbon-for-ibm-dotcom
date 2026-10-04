/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// Capture unhandled rejections with full stack for debugging
window.addEventListener('unhandledrejection', function(event) {
  console.error('UNHANDLED REJECTION STACK:', event.reason && event.reason.stack ? event.reason.stack : event.reason);
});
// Capture synchronous errors thrown in event listeners
var _origOnerror = window.onerror;
window.onerror = function(msg, src, line, col, err) {
  if (err && err.stack) { console.error('WINDOW ONERROR STACK:', err.stack); }
  return _origOnerror ? _origOnerror.apply(this, arguments) : false;
};

// For generating coverage report for untested files
const srcContext = require.context(
  '../src/components',
  true,
  /^(?!.*story(-(angular|react|vue))?).*\.ts$/
);
srcContext.keys().forEach(srcContext);

const specContext = require.context('../src/components', true, /\.test\.ts$/);
specContext.keys().forEach(specContext);

import ReactOnRails from 'react-on-rails';

import HelloWorld from './HelloWorldJsx/components/HelloWorld';
import HelloTypescript from './HelloTypescript/components/HelloTypescript';
import './HelloReason/components/HelloReson.bs';


// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  HelloTypescript,
  // HelloReason calls register
});

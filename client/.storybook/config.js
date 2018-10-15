import { configure } from '@storybook/react';
import '../app/bundles/global';

const req = require.context('../app', true, /.stories.(ts|js)x?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

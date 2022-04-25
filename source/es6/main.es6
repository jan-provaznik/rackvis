import * as d3
  from 'd3';

import { default as d3png }
  from 'd3-svg-to-png';

import rackvisBootstrap 
  from 'vis/rack/rackvis';

import portvisBootstrap 
  from 'vis/port/portvis';

window.addEventListener('load', bootstrap);
function bootstrap (event) {
  rackvisBootstrap();
  portvisBootstrap();
}


import * as d3
  from 'd3';

import createExporter 
  from 'vis/tool/exporter';

// https://www.fs.com/de-en/products/72911.html

export default function rackvisBootstrap () {

  let rackvis = d3.select('.root')
    .append('div')
      .classed('rackvis', true);

  rackvis.append('h1')
    .text('rack 4.112');
  rackvis.append('button')
    .text('export')
    .call(createExporter, rackvis, 'rackvis-4.112');

  rackvis
    .call(visualiseRack4112);

}

function visualiseRack4112 (selection) {
  let contents = [
    { beg:  0, use: 4, label: 'UPS A', highlight: 1 },
    { beg:  4, use: 4, label: 'UPS B', highlight: 1 },

    { beg:  9,  use: 4, label: 'NODE 000' },
    { beg:  13, use: 4, label: 'NODE 001' },
    { beg:  17, use: 3, label: 'NODE 002' },
    { beg:  20, use: 3, label: 'NODE 003' },

    /*
    { beg: 34, use: 1, label: 'CORE' },
    { beg: 33, use: 1, label: 'TINY' },
    { beg: 32, use: 1, label: 'FAST' },
    { beg: 30, use: 2, label: 'SPIN' },
    */

    { beg: 29, use: 2, label: 'SPIN' },
    { beg: 31, use: 1, label: 'FAST' },
    { beg: 32, use: 1, label: 'TINY' },
    { beg: 33, use: 1, label: 'CORE' },


    { beg: 35, use: 1, label: 'RJ-45 PATCH PANEL', highlight: 1 },
    { beg: 36, use: 2, label: 'CABLE MANAGEMENT', highlight: 1 },

    { beg: 38, use: 1, label: 'CRS354-48G-4S+2Q+RM' },
    { beg: 39, use: 1, label: 'CRS326-24S+2Q+RM', disable: 1, future: 1 },
    { beg: 40, use: 1, label: 'FIBRE MANAGEMENT', highlight: 1 },
    { beg: 41, use: 1, label: 'CRS326-24S+2Q+RM' },
  ];

  selection.each(function (d) {
    visualiseRackContents(d3.select(this), 42, contents);
  });
}

function visualiseRackContents (root, units, data) {

  const unitW = 300;
  const unitH = 30;

  // label width
  const unitL = 60;
  const unitLP = 5;

  // padding
  const unitP = 2;

  const unitN = 30;
  const unitB = 5;

  //
  const margins = 30;

  //
  let ch = (unitH + unitP) * units;
  let sh = ch + margins + margins;

  let target = root
    .append('svg')
      .attr('width', '640')
      .attr('height', sh)

  // (debug) background 

  target
    .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', '640')
      .attr('height', sh)
      .attr('fill', '#fff');

  // :)

  let content = target
    .append('g')
      .attr('transform', 'translate(' + margins + ', ' + margins + ')');


  // layout

  let layout = content
    .append('g')
      .classed('layout', 1)

  layout
    .selectAll('g.layout-unit')
    .data(d3.range(0, units))
    .enter()
      .append('g')
        .classed('layout-unit', 1)
        .each(function (d, index) {

          let x = 0;
          let y = (unitP + unitH) * (units - index - 1);

          d3.select(this)
            .append('rect')
              .attr('x', x)
              .attr('y', y)
              .attr('width', unitL)
              .attr('height', unitH)
              .attr('fill', '#efefef');

          let tx = unitL * 0.5;
          let ty = unitH * 0.5;

          d3.select(this)
            .append('text')
              .attr('x', x + tx)
              .attr('y', y + ty)
              .attr('alignment-baseline', 'middle')
              .attr('text-anchor', 'middle')
              .attr('font-size', 'x-small')
              .attr('font-family', 'sans-serif')
              .attr('fill', '#000')
              .text(1 + d)

        })

  let devices = content
    .append('g')
      .classed('devices', 1);

  devices
    .selectAll('g.device')
    .data(data)
    .enter()
      .append('g')
        .classed('device', 1)
        .each(function (d, index) {

          let x = unitL + unitLP;
          let y = (unitP + unitH) * (units - d.beg - d.use);

          let rh = unitH * d.use + unitP * (d.use - 1);

          d3.select(this)
            .append('rect')
              .attr('x', x)
              .attr('y', y)
              .attr('width', unitW)
              .attr('height', rh)
              .attr('fill', function (d) {
                if (d.highlight)
                  return '#02a89e'

                if (d.disable)
                  return '#3f00ff'

                return '#333'
              });

          let tx = unitW * 0.5;
          let ty = rh * 0.5;

          d3.select(this)
            .append('text')
              .attr('x', x + tx)
              .attr('y', y + ty)
              .attr('alignment-baseline', 'middle')
              .attr('text-anchor', 'middle')
              .attr('font-size', 'small')
              .attr('font-family', 'monospace')
              .attr('fill', '#fff')
              .text(d.label);

          let lx = unitW + unitLP;

          if (d.use > 1) {

            d3.select(this)
              .append('line')
                .attr('x1', x + lx + unitB)
                .attr('x2', x + lx + unitB)
                .attr('y1', y)
                .attr('y2', y + rh)
                .attr('stroke-width', unitB)
                .attr('stroke', '#afafaf')

            d3.select(this)
              .append('text')
                .attr('x', x + lx + unitB + unitN)
                .attr('y', y + ty)
                .attr('alignment-baseline', 'middle')
                .attr('text-anchor', 'left')
                .attr('font-size', 'small')
                .attr('font-family', 'monospace')
                .attr('fill', '#000')
                .text(d.use + 'U');
          }

          if (d.future) {
            d3.select(this)
              .append('text')
                .attr('x', x + lx + unitB + unitN)
                .attr('y', y + ty)
                .attr('alignment-baseline', 'middle')
                .attr('text-anchor', 'left')
                .attr('font-size', 'small')
                .attr('font-family', 'monospace')
                .attr('fill', '#000')
                .text('PLANNED');
          }

        })


  /*
  d3.select('.tool')
    .append('input')
      .attr('value', 'rackvis')

  d3.select('.tool')
    .append('button')
      .text('Save to PNG')
      .on('click', function (event, d) {
        let name = d3
          .select('.tool')
            .select('input')
              .property('value');

        d3png('svg', name ?? 'no-name')
      })

  */
}


import * as d3
  from 'd3';

import createExporter 
  from 'vis/tool/exporter';

const PORTW   = 40
const PORTH   = 40
const PORTM   = 20
const GROUPM  = 20;
const ANNOH   = 40;
const SVGM    = 30;

export default function portvisBootstrap () {

  /* We want to visualise different things.
   * Easy, right?
   */

  // crs326-24s+2q+rm
  
  let vis326 = d3.select('.root')
    .append('div')
      .classed('portvis', true)

  vis326.append('h1')
    .text('crs326-24s+2q+rm');
  vis326.append('button')
    .text('export')
    .call(createExporter, vis326, 'portvis-326');
  vis326
    .call(visualiseCRS326);

  // crs354-48g-4s+2q+rm

  let vis354 = d3.select('.root')
    .append('div')
      .classed('portvis', true);

  vis354.append('h1')
    .text('crs354-48g-4s+2q+rm');
  vis354.append('button')
    .text('export')
    .call(createExporter, vis354, 'portvis-354');
  vis354
    .call(visualiseCRS354)
  
  /*
  let safedata = d3.select('.root')
    .append('div')
    .call(visualiseSafedata)
  */

}

function visualiseSafedata (selection) {

  let constructPort = function (value, offset) {
    let what = (value + offset + 1).toString();
    return {
      row: 0, col: value, 
      name: 'ether' + what,
      label: what
    };
  }
  
  const hardwareGroups = [
    { cols: 4, rows: 1, 
      data: d3.range(4).map(value => constructPort(value, 0))
    },
    { cols: 5, rows: 1, 
      data: d3.range(5).map(value => constructPort(value, 4))
    },
    { cols: 4, rows: 1, 
      data: d3.range(4).map(value => constructPort(value, 9))
    },
    { cols: 3, rows: 1, 
      data: d3.range(3).map(value => constructPort(value, 13))
    }
  ];

  const softwareGroups = [
    { label: 'wyvern (primary server, internet access)',
      ports: [ 'ether1' ]
    },
    { label: 'zealot (backup storage server)',
      ports: [ 'ether2' ]
    },

    { label: 'carrot',
      ports: [ 'ether5' ]
    },
    { label: 'cabbage',
      ports: [ 'ether6' ]
    },
    { label: 'laptop',
      ports: [ 'ether7' ]
    },

    { label: 'room: honza',
      ports: [ 'ether10' ]
    },
    { label: 'room: iva',
      ports: [ 'ether11' ]
    },
    { label: 'room: bedroom',
      ports: [ 'ether12' ]
    },
    { label: 'wlan extender',
      ports: [ 'ether13' ]
    },

    { label: 'cellar',
      ports: [ 'ether14' ]
    },
    { label: 'garden wifi',
      ports: [ 'ether15' ]
    },
  ]

  selection.each(function (d) {
    visualiseSwitch(d3.select(this), hardwareGroups, softwareGroups);
  });
}

function visualiseCRS354 (selection) {

  const hardwareGroups = constructCRS354();
  const softwareGroups = [
    { label: 'internet access (UPOL)',
      slave: 84,
      ports: [
        'ether1' , 'ether2' , 'ether3' , 'ether4', 
        'ether5' , 'ether6' , 'ether7',  'ether8', 
        'ether9' , 'ether10', 'ether11', 'ether12',
        'ether13', 'ether14', 'ether15', 'ether16',
        'ether17', 'ether18', 'ether19', 'ether20',
        'ether21', 'ether22', 'ether23', 'ether24',
      ]
    },
    { label: 'cluster network', color: '#02a89e',
      slave: 4000,
      ports: [
        'ether25', 'ether26', 'ether27', 'ether28',
        'ether29', 'ether30', 'ether31', 'ether32',
        'ether33', 'ether34', 'ether35', 'ether36',
      ]
    },
    { label: 'management network', color: null,
      slave: 2008,
      ports: [
        'ether37', 'ether38', 'ether39', 'ether40', 
        'ether41', 'ether42', 'ether43', 'ether44',
        'ether45', 'ether46', 'ether47', 'ether48'
      ]
    },

    { label: 'interconnect to CRS326 (@ 4.112), 1x 10 Gbps',
      trunk: [ 4000 ],
      ports: [
        'sfpplus4'
      ]
    }

    /*
    { label: 'uplink',
      trunk: [ 2008, 4000 ],
      ports: [ 'qsfpplus2' ]
    }
    */
  ]

  // =)

  selection.each(function (d) {
    visualiseSwitch(d3.select(this), hardwareGroups, softwareGroups)
  })
}

function visualiseCRS326 (selection) {

  const hardwareGroups = constructCRS326();
  const softwareGroups = [
    { label: 'core, 2x 10 Gbps',
      trunk: [ 2000, 2064, 2065, 2066, 2500, 4000 ],
      ports: [ 'sfpplus1', 'sfpplus2' ]
    },
    { label: 'core (SR-IOV), 1x 10 Gbps',
      trunk: [ 2064, 2065, 2066 ],
      ports: [ 'sfpplus3' ]
    },
    { label: 'core (SR-IOV), 1x 10 Gbps',
      trunk: [ 2064, 2065, 2066 ],
      ports: [ 'sfpplus4' ]
    },

    { label: 'tiny, 1x 10 Gbps',
      trunk: [ 2000, 2500, 4000 ],
      ports: [ 'sfpplus5' ]
    },

    { label: 'fast, 4x 10 Gbps',
      slave: 4000,
      ports: [ 'sfpplus9', 'sfpplus10', 'sfpplus11', 'sfpplus12' ]
    },
    { label: 'fast, 2x 10 Gbps',
      trunk: [ 2000 ],
      ports: [ 'sfpplus13', 'sfpplus14' ]
    },

    { label: 'spin, 2x 10 Gbps',
      trunk: [ 2000, 2064, 2500 ],
      ports: [ 'sfpplus15', 'sfpplus16' ]
    },

    { label: 'node 000',
      slave: 4000,
      ports: [ 'sfpplus17' ]
    },
    { label: 'node 001',
      slave: 4000,
      ports: [ 'sfpplus18' ]
    },
    { label: 'node 002',
      slave: 4000,
      ports: [ 'sfpplus19' ]
    },
    { label: 'node 003',
      slave: 4000,
      ports: [ 'sfpplus20' ]
    },

    { label: 'interconnect to CRS354 (@ 4.112), 1x 10 Gbps',
      trunk: [ 4000 ],
      ports: [ 'sfpplus23' ]
    },

    { label: 'interconnect to CRS305 (@ 6.034), 1x 10 Gbps',
      slave: 2500,
      ports: [ 'sfpplus24' ]
    },

    /*

    { label: 'interconnect to CRS354 (@ 4.112), 1x 40 Gbps',
      trunk: [ 2000, 2008, 2016 ],
      ports: [ 'qsfpplus1' ]
    },
    */

    { label: 'core, 1x 40 Gbps', color: '#9f29ff',
      slave: [ 4000 ],
      ports: [ 'qsfpplus2' ]
    },

  ];

  selection.each(function (d) {
    visualiseSwitch(d3.select(this), hardwareGroups, softwareGroups);
  })

}

function visualiseSwitch (root, hardwareGroups, softwareGroups) {

  console.log(root)

  let colormap = d3
    .scaleSequential(d3.interpolateSpectral)
      .domain([0, softwareGroups.length ]);

  softwareGroups.forEach(function (each, index) {
    each.color ??= colormap(index);
  });
  
  // (1) Determine SVG dimensions

  let totalW = 2 * SVGM
    + hardwareGroups.map(q => layoutGroupW(q)).reduce(plus, 0)
    + (hardwareGroups.length - 1) * GROUPM;

  let totalH = 3 * SVGM 
    + Math.max(... hardwareGroups.map(q => layoutGroupH(q)))
    + (2 * softwareGroups.length + 1) * ANNOH;

  // (2) Construct SVG

  let target = root
    .append('svg')
      .attr('width', totalW)
      .attr('height', totalH)

  // (3) Construct SVG background

  target
    .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', totalW)
      .attr('height', totalH)
      .attr('fill', '#fff');

  // (4) Construct SVG content group

  let content = target
    .append('g')
      .attr('transform', translate(SVGM, SVGM));

  // (5) Construct SVG device layout group

  let layout = content
    .append('g');

  // (>) Visualise the device

  buildLayout(layout.node(), hardwareGroups, softwareGroups)

  // (6) Construct the annotations (?)

  let legendGroups = content
    .append('g');

  legendGroups
    .selectAll('g.legend-groups')
    .data(softwareGroups).enter()
    .append('g')
      .classed('legend-groups', 1)
      .each(function (d, index) {

        let gy = 2 * GROUPM + Math.max(... hardwareGroups.map(q => layoutGroupH(q))) + index * ANNOH;

        d3.select(this)
          .attr('transform', translate(0, gy))

        d3.select(this)
          .append('rect')
            .attr('width', '30')
            .attr('height', '30')
            .attr('fill', d.color)

        d3.select(this)
          .append('text')
            .attr('x', 60)
            .attr('y', 15)
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'left')
            .attr('font-size', 'small')
            .attr('font-family', 'monospace')
            .attr('fill', '#000')
            .text(d.label)

        if (d.trunk) {
          d3.select(this)
            .append('text')
              .attr('x', 500)
              .attr('y', 15)
              .attr('alignment-baseline', 'middle')
              .attr('text-anchor', 'left')
              .attr('font-size', 'small')
              .attr('font-family', 'monospace')
              .attr('fill', '#000')
              .text(d.trunk.join(', '))
        }

        if (d.slave) {
          d3.select(this)
            .append('text')
              .attr('x', 500)
              .attr('y', 15)
              .attr('alignment-baseline', 'middle')
              .attr('text-anchor', 'left')
              .attr('font-size', 'small')
              .attr('font-family', 'monospace')
              .attr('fill', '#666')
              .text(d.slave)
        }

      });

  // (7)

  let legendPorts = content
    .append('g');

  legendPorts
    .selectAll('g.legend-ports')
    .data(softwareGroups).enter()
    .append('g')
      .classed('legend-ports', 1)
      .each(function (d, index) {

        let gy = 0 
          + 2 * GROUPM 
          + Math.max(... hardwareGroups.map(q => layoutGroupH(q))) 
          + softwareGroups.length * ANNOH
          + index * ANNOH + ANNOH

        d3.select(this)
          .attr('transform', translate(0, gy))

        d3.select(this)
          .append('rect')
            .attr('width', '30')
            .attr('height', '30')
            .attr('fill', d.color)

        d3.select(this)
          .append('text')
            .attr('x', 60)
            .attr('y', 15)
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'left')
            .attr('font-size', 'small')
            .attr('font-family', 'monospace')
            .attr('fill', '#000')
            .text(d.ports.join(', '))
      })

}

function buildLayout (parent, hardware, software) {

  let groupOffsets = hardware.map(layoutGroupW).reduce(function (accumulator, value) {
    return [
      ... accumulator,
      accumulator[accumulator.length - 1] + value + GROUPM
    ];
  }, [ 0 ]);

  /* Reshape information from softwareGroups into a port => softwareGroup maping. */

  let portMap = new Map();

  software.forEach(q => {
    q.ports.forEach(p => {
      portMap.set(p, q);
    });
  });

  /* Start buildin' */

  d3.select(parent)
    .selectAll('g.layout-group')
    .data(hardware).enter()
    .append('g')
      .classed('layout-group', 1)
      .each(function (g, index) {

        let gx = groupOffsets[index];

        d3.select(this)
          .attr('transform', translate(gx, 0));

        let gw = layoutGroupW(g);
        let gh = layoutGroupH(g);

        let portW = g.wide ? 2 * PORTW : PORTW;
        
        d3.select(this)
          .append('rect')
            .classed('layout-group-background', '1')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', gw)
            .attr('height', gh)
            .attr('fill', '#efefef');

        d3.select(this)
          .selectAll('rect.port-wrap')
          .data(g.data.filter(q => portMap.has(q.name))).enter()
          .append('rect')
            .classed('port-wrap', 1)
            .attr('x', d => d.col * portW + (d.col + 0.5) * PORTM)
            .attr('y', d => d.row * PORTH + (d.row + 0.5) * PORTM)
            .attr('width', portW + PORTM)
            .attr('height', PORTH + PORTM)
            .attr('fill', d => portMap.get(d.name).color)

        d3.select(this)
          .selectAll('rect.port-box')
          .data(g.data).enter()
          .append('rect')
            .classed('port-box', 1)
            .attr('x', d => d.col * portW + (d.col + 1) * PORTM)
            .attr('y', d => d.row * PORTH + (d.row + 1) * PORTM)
            .attr('width', portW)
            .attr('height', PORTH)
            .attr('fill', '#333')

        d3.select(this)
          .selectAll('text.port-label')
          .data(g.data).enter()
          .append('text')
            .classed('port-label', 1)
            .attr('x', d => d.col * portW + (d.col + 1) * PORTM + 0.5 * portW)
            .attr('y', d => d.row * PORTH + (d.row + 1) * PORTM + 0.5 * PORTH)
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .attr('font-size', 'small')
            .attr('font-family', 'monospace')
            .attr('fill', '#fff')
            .text(d => d.label);
        
      })
}

function layoutGroupW (g) {
  return g.cols * (g.wide ? 2 * PORTW : PORTW) + (1 + g.cols) * PORTM;
}

function layoutGroupH (g) {
  return g.rows * PORTH + (1 + g.rows) * PORTM;
}

function translate (dx, dy) {
  return 'translate(' + dx.toString() + ', ' + dy.toString() + ')';
}

function plus (target, value) {
  return target + value;
}

/* Mikrotik CRS354-48G-4S+2Q+RM */

function constructCRS354 () {
  return [
    { cols: 6, rows: 2,
      data: d3.range(12).map(v => constructCRS354Port('ether', v, 0))
    },
    { cols: 6, rows: 2,
      data: d3.range(12).map(v => constructCRS354Port('ether', v, 12))
    },
    { cols: 6, rows: 2,
      data: d3.range(12).map(v => constructCRS354Port('ether', v, 24))
    },
    { cols: 6, rows: 2,
      data: d3.range(12).map(v => constructCRS354Port('ether', v, 36))
    },
    { cols: 2, rows: 2,
      data: d3.range(4).map(v => constructCRS354Port('sfpplus', v, 0))
    },
    { cols: 1, rows: 2, wide: 1,
      data: d3.range(2).map(v => constructCRS354Port('qsfpplus', v, 0))
    }
  ];
}

function constructCRS354Port (prefix, index, offset) {
  let label = (index + offset + 1).toString();
  return {
    col: index / 2 | 0,
    row: 1 - index % 2,
    name: prefix.toString() + label,
    label: label
  };
}

/* Mikrotik CRS326-24S+2Q+RM */

function constructCRS326 () {
  return [
    { cols: 4, rows: 2,
      data: d3.range(8).map(v => constructCRS326Port('sfpplus', v, 0))
    },
    { cols: 4, rows: 2,
      data: d3.range(8).map(v => constructCRS326Port('sfpplus', v, 8))
    },
    { cols: 4, rows: 2,
      data: d3.range(8).map(v => constructCRS326Port('sfpplus', v, 16))
    },
    { cols: 1, rows: 2, wide: 1,
      data: d3.range(2).map(v => constructCRS326Port('qsfpplus', v, 0))
    }
  ];
}

function constructCRS326Port (prefix, index, offset) {
  let label = (index + offset + 1).toString();
  return {
    col: index / 2 | 0,
    row: 1 - index % 2,
    name: prefix.toString() + label,
    label: label
  };
}


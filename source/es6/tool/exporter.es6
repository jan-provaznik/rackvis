import * as d3
  from 'd3';

import { default as d3png }
  from 'd3-svg-to-png';

// https://stackoverflow.com/a/49663134

const selectorFor = function (el) {
  let path = [], parent;
  while (parent = el.parentNode) {
    let tag = el.tagName, siblings;
    path.unshift(
      el.id ? `#${el.id}` : (
        siblings = parent.children,
        [].filter.call(siblings, sibling => sibling.tagName === tag).length === 1 ? tag :
        `${tag}:nth-child(${1+[].indexOf.call(siblings, el)})`
      )
    );
    el = parent;
  };
  return `${path.join(' > ')}`.toLowerCase();
}

export default function createExporter (selection, root, name) {

  selection.each(function (d) {
    d3.select(this)
      .on('click', function (event, d) {
        let base = selectorFor(root.node());
        d3png(base + '> svg', name)
      });
  })

}


'use strict';

const debug = require('debug')('speed');
const symbol = Symbol.for('since-app-start');
const profilings = Object.create(null);

const sinceStart = () => {
  if (!(symbol in global)) {
    throw new ReferenceError('.start() should be called first');
  }
  return Date.now() - global[symbol];
};

const addEntry = name => {
  const ms = sinceStart();
  profilings[name] = ms;
  return `${name} ${ms} ms`;
};

module.exports = {
  profilings,
  sinceStart,
  addEntry,
  profile(name) {
    return debug(addEntry(name));
  },
  start() {
    if (symbol in global) return;
    global[symbol] = Date.now();
  }
};

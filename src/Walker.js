const {
  toPairs,
  compose,
  fromPairs,
  identity,
  map,
  reverse,
  multiply,
  tap,
  __
} = require('ramda');

const Schema = {
  ATOM: "ATOM"
};

class Walker {
  constructor(schema, fn) {
    this.schema = schema;
    this.fn = fn;
  }
  walk = obj => {
    // is atom
    if (this.schema === Schema.ATOM) {
      return this.fn(obj);
    }

    // is composite
    const childWalk = ([key, subObj]) => {
      console.log(key, subObj);
      return [key, this.schema[key].walk(subObj)];
    };
    return compose(this.fn, fromPairs, map(childWalk.bind(this)), toPairs)(obj);
  };
}

export { Walker, Schema };

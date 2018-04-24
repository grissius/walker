import {
  toPairs,
  compose,
  fromPairs,
  identity,
  map,
  reverse,
  multiply,
  tap,
  __,
  head
} from 'ramda';

const Schema = {
  ATOM: "ATOM"
};

class Walker {
  constructor(schema, fn) {
    this.schema = schema;
    this.fn = fn;
  };
  static of = (schema, fn = identity) => new Walker(schema, fn);
  walk = obj => {
    // is atom
    if (this.schema === Schema.ATOM) {
      return this.fn(obj);
    }
    if (obj instanceof Array) {
      const arrWalker = head(this.schema).walk;
      return compose(this.fn, map(arrWalker.bind(this)))(obj);
    }
    // is object
    const childWalk = ([key, subObj]) => {
      return [key, this.schema[key].walk(subObj)];
    };
    return compose(this.fn, fromPairs, map(childWalk.bind(this)), toPairs)(obj);
  };
}

export { Walker, Schema };

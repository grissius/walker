import { Walker, Schema } from './src/Walker';

import {
  reverse,
  multiply,
  curry,
  type,
  compose,
  reduce,
  values,
  and
} from 'ramda';


const johnDoe = {
  name: "John Doe",
  age: 15,
  address: { street: "Avenue" }
};

// Reverse names, multiply age
// If function not set, it is identity
const userWalker = Walker.of(
  {
    name: Walker.of(Schema.ATOM, reverse),
    age: Walker.of(Schema.ATOM, multiply(2)),
    address: Walker.of(
      {
        street: Walker.of(Schema.ATOM, reverse)
      }
    )
  });
console.log(userWalker.walk(johnDoe))


// Validate user types
const isTypeOf = curry((t, val) => type(val) === t.name);
const logicalAndValues = compose(reduce(and, true), values);
const userValidateWalker = Walker.of(
  {
    name: Walker.of(Schema.ATOM, isTypeOf(String)),
    age: Walker.of(Schema.ATOM, isTypeOf(Number)),
    address: Walker.of(
      {
        street: Walker.of(Schema.ATOM, isTypeOf(String))
      },
      logicalAndValues
    )
  },
  logicalAndValues
);

console.log(userValidateWalker.walk(johnDoe));
import { Walker, Schema } from './src/Walker';

import {
  reverse,
  multiply,
  curry,
  type,
  compose,
  reduce,
  values,
  and,
  toUpper,
  join,
  concat,
  __,
  toString
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

// Arrays
const colorsWalker = Walker.of({
  names: Walker.of([
    Walker.of(Schema.ATOM, toUpper)
  ]),
  data: Walker.of([
    Walker.of({
      hex: Walker.of(Schema.ATOM, concat('#')),
      rgb: Walker.of([
        Walker.of(
          Schema.ATOM,
          compose(concat(__, ' / 255'), toString)
        )
      ], join('; ')),
    })
  ])
})

const colorData = {
  names: ['red', 'green', 'blue'],
  data: [
    {
      hex: 'e02228',
      rgb: [224, 34, 40]
    },
    {
      hex: '52f170',
      rgb: [82, 241, 112]
    },
    {
      hex: '312dc9',
      rgb: [49, 45, 201]
    },
  ]
};
console.log(colorsWalker.walk(colorData));

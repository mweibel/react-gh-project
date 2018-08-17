import { immutableUpdateObjectInList } from './immutableHelpers'

it('should update an object in list immutably', () => {
  const testData = [
    {
      list: [{hello: 'world'}],
      index: 0,
      update: {hello: 'mailonline'},
      expected: [{hello: 'mailonline'}]
    },
    {
      list: [{hello: 'world'}],
      index: 0,
      update: {hello: 'mailonline', something: 'else'},
      expected: [{hello: 'mailonline', something: 'else'}]
    },
    {
      list: [{a: 1}, {b: 2}, {c: 3}],
      index: 3,
      update: {d: 4},
      expected: [{a: 1}, {b: 2}, {c: 3}, {d: 4}],
    },
    {
      list: [{a: 1}],
      index: 5,
      update: {d: 4},
      expected: [{a: 1}, {d: 4}],
    }
  ]

  for (const { list, index, update, expected } of testData) {
    Object.freeze(list)
    Object.freeze(expected)

    expect(immutableUpdateObjectInList(list, index, update)).toEqual(expected)
  }
})
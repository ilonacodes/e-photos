import { counter } from './reducer'

describe("reducer/counter", () => {
  it("starts from zero", () => {
    const actual = counter()
    const expected = 0
    expect(actual).toEqual(expected)
  })

  it("increases by one", () => {
    const actual = counter(42, { type: 'INCREASE_COUNTER' })
    const expected = 43
    expect(actual).toEqual(expected)
  })
})

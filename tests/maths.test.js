// test('hello world!', () => {

// })

// test('somethings went wrong', () => {
//     throw new Error("Fail")
// })

const {calculateTip, fahranhitToCelcuis, celcuisToFahranhit, add} = require('../src/math/math')

test('should calculate with tip', () => {
  const total = calculateTip(10,0.3)
  expect(total).toBe(13)
})


test('should calcute with default tip', () => {
  const total = calculateTip(10)
  expect(total).toBe(12.5)
})

test('should convert 32 F to 0 C', () => {
    const temp = fahranhitToCelcuis(32)
    expect(temp).toBe(0)
})

test('should convert 0 C to 32 F', () => {
    const temp = celcuisToFahranhit(0)
    expect(temp).toBe(32)
})

// test('should async', (done) => {
//   setTimeout(()=>{
//     expect(1).toBe(2)
//     done()
//   }, 2000)
// })


test('should add', (done) => {
  add(2, 5).then((sum) => {
    expect(sum).toBe(7)
    done()
  })
})

test('should add async/await', async () => {
  const sum = await add(2, 7)
  expect(sum).toBe(9)
})

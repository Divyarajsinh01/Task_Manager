require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('651fcbc0d812e5581910fdfb').then((task) => {
//     console.log(task)
//     return Task.countDocuments({complete : false})
// }).then((res) => {
//     console.log(res)
// }).catch((e)=> {
//     console.log(e)
// })

const removeById = async (id) => {
    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({complete : false})
    return count
}

removeById('651fd0283a580146b8678a7a').then((count) => {
    console.log(count)
}).catch((e)=> {
    console.log(e)
})
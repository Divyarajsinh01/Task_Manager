require('../src/db/mongoose')

const { findByIdAndUpdate, count } = require('../src/models/task')
const User = require('../src/models/user')

// User.findByIdAndUpdate('6523cdc64c49e09e684cd97d', {age : 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age : 1})
// }).then((results) => {
//     console.log(results)
// }).catch((e) => {
//     console.log(e)
// })

const upadateAge = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count,user
}

upadateAge('6523cdc64c49e09e684cd97d', 3).then((result) => {
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
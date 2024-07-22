const { MongoClient, ObjectId, Timestamp } = require('mongodb');
const URL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

// MongoClient.connect(URL, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to the database', error);
//     }
//     console.log('Database connected!!');
//     const db = client.db(dbName)
//     db.collection('user').insertOne({
//       name:"virat",
//       age: 26
//     })
// });

// insert one data to collection

// const main = async() => {
//    try {
//     const client = await MongoClient.connect(URL)
//     console.log('database connected!!!')
//     const db = client.db(dbName)
//     const res = await db.collection('user').insertOne({
//       name: 'rohit',
//       age: 20
//     })

//     console.log(res)
    
//    } catch (error) {
//     console.log('error')
//    } 
// }

// main()


// MongoClient.connect(URL).then((client)=>{
//    console.log('db connected!!!')
//    const db = client.db(dbName)
//    db.collection('user').insertOne({
//       name: 'rahul',
//       age: 12
//    }).then((result)=>{
//        console.log(result.insertedId)
//    }).catch((error)=>{
//       console.log('unable to insert')
//    })
// }).catch(error=>{
//    console.log("error")
// })



// insert many data to collection

// MongoClient.connect(URL).then((client) => {
//    console.log('db connected')
//    const db = client.db(dbName)
//    db.collection('user').insertMany([
//       {
//          name: 'raj',
//          age: 20
//       },
//       {
//          name: 'shiavm',
//          age: 22
//       }
//    ])
// }).catch((error)=> {
//    console.log(error)
// })


//challage 

// MongoClient.connect(URL).then((client)=> {
//    console.log('db connected')
//    const db = client.db(dbName)
//    db.collection('user-task').insertMany([
//       {
//          description: 'somethigs',
//          complete: true
//       },
//       {
//          description: 'some option',
//          complete: false
//       }
//    ])
// }).catch((error)=>{
//    console.log(error)
// })

//object id 

// const id = new ObjectId()

//console results give us new object id
// console.log(id)

// Timestamp give us time of creating object id
// console.log(id.getTimestamp())

// this console results print the buffer data
// console.log(id.id)

//this console results print the length of objectId
// console.log(id.id.length)


//find and finOne data

// MongoClient.connect(URL).then((client)=>{
//    const db =client.db(dbName)
//    db.collection('user').findOne({name : 'shiavm'})
//    .then(user=> {
//       console.log(user)
//    }).catch(err=>{
//       console.log('err')
//    })
// })

// //find method with toarry methods
// MongoClient.connect(URL).then((client)=>{
//    const db =client.db(dbName)
//    db.collection('user').find({name : 'rahul'}).toArray()
//    .then(user=> {
//       console.log(user)
//    }).catch(err=>{
//       console.log('err')
//    })
// })


//find with count methods 
// MongoClient.connect(URL).then((client)=>{
//    const db =client.db(dbName)
//    db.collection('user').find({name : 'rahul'}).count()
//    .then(count=> {
//       console.log(count)
//    }).catch(err=>{
//       console.log('err')
//    })
// })

//update doc with updateOne methods

// MongoClient.connect(URL).then((client)=>{
//   console.log('db connected!!!')
//   const db = client.db(dbName)
//   db.collection('user').updateOne({
//     _id: new ObjectId('651ea61c1893c86a606bc31b')
//   },
//   //set operator use for update name
//   // {
//   //   $set: {
//   //     name: 'Ram'
//   //   }
//   // }

//   // inc opartor increment age by 2

//   {
//     $inc:{
//       age: 2
//     }
//   }
//   ).then((result)=>{
//     console.log(result)
//   }).catch((error)=>{
//     console.log('error')
//   })
// }).catch((error)=>{
//   console.log('error')
// })


// update docs with updateMany methods

// MongoClient.connect(URL).then((client)=>{
//   const db = client.db(dbName)
//   db.collection('user-task').updateMany({
//      complete: true
//   },{
//     $set: {
//       complete: false
//     }
//   }).then((result)=>{
//     console.log(result)
//   }).catch((error)=>{
//     console.log(error)
//   })
// }).catch((error)=>{
//   console.log(error)
// })

// MongoClient.connect(URL).then((client)=>{
//   const db = client.db(dbName)
//   const desc = ["somethigs", "some option"]
//   const updesc = ["clean home", "car-service"]
  
//   desc.forEach((description, index)=>{
//     db.collection('user-task').updateMany({
//       description: description,
//       complete: false
//     },{
//       $set:{
//         description: updesc[index],
//         complete: true
//       }
//     }).then(result=> {
//       console.log(result)
//     }).catch(error=>{
//       console.log('error')
//     })
//   })
// }).catch((error)=>{
//   console.log('error')
// })

//delete docs
// MongoClient.connect(URL).then((client)=>{
//    const db =client.db(dbName)
//    db.collection('user').deleteMany({name : 'rrr'})
//    .then(result=> {
//       console.log(result)
//    }).catch(err=>{
//       console.log('err')
//    })
// })

MongoClient.connect(URL).then((client)=>{
   const db =client.db(dbName)
   db.collection('user-task').deleteOne({complete: false})
   .then(result=> {
      console.log(result)
   }).catch(err=>{
      console.log('err')
   })
})


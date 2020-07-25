const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');

const fs = require('fs');
const faker = require("faker");
const csvWriter = require('csv-write-stream');

mongoose.Promise = global.Promise;
const DATABASE_URL = 'mongodb+srv://dbUser:BU9YOGrDvruqyfTW@cluster0.tjhwd.mongodb.net/sharity_db?retryWrites=true&w=majority';

mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then((yay) => {console.log("connected to mongo db")})
.catch((err) => {console.log("connection to mongo failed")});

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true,},
    location: {type: String, required: true, },
    profilePic: {type: String, required: false},
    userType: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

// const itemSchema = mongoose.Schema({
//     image: {type: String, required: true},
//     name: {type: String, required: true},
//     price: {type: Number, required: true},
//     description: {type: String, required: true},
//     seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
//     shortDescription: {type: String, required: true},
//     publishedOn: {type: Date, default: Date.now },
// });


// const Item = mongoose.model('Item', itemSchema);


// seed db with 50 individulas and 50 charities

const writer = csvWriter();
  const desiredProducts = 1000;
//   const genearteUsersData = () => {
//     writer.pipe(fs.createWriteStream('./testData.csv'));
//     for(let i = 0; i < desiredProducts; i++) {
//         // if(i%2 === 0 ){
//         //   //let be a charity
//         //   let userType = "charity";
//         //   let name = faker.company.name();
//         // } else {
//         //   let userType = undefined;
//         //   let name = undefined;
//         // }
//         writer.write({
//           email: faker.internet.email(),
//           password: faker.internet.password(),
//           name: faker.internet.userName(),
//           location: faker.address.zipCode(),
//           profilePic: faker.image.avatar(),
//           userType: ["charity", "individual"][Math.floor(Math.random() * 2)]
//         })
//         console.log(i);
//     }
//     writer.end();
//     console.log('I think I am done?');
// };

// genearteUsersData();

const genearteProductsData = () => {
  writer.pipe(fs.createWriteStream('./productsData.csv'));
  for(let i = 0; i < desiredProducts; i++) {
      // if(i%2 === 0 ){
      //   //let be a charity
      //   let userType = "charity";
      //   let name = faker.company.name();
      // } else {
      //   let userType = undefined;
      //   let name = undefined;
      // }
      writer.write({
        donor: faker.internet.userName(),
        name: faker.commerce.productName(),
        claimedBy:[null, faker.company.companyName()][Math.floor(Math.random() * 2)],
        pickedUp: [true, false][Math.floor(Math.random() * 2)],
        Description: faker.lorem.sentence(), 
        pictures: [faker.image.abstract(), faker.image.animals(), faker.image.food(), faker.image.sports()],
        estimatedValue: faker.commerce.price(),
        itemCondition: ["Poor", "Fair", "Good", "Great", "New"][Math.floor(Math.random() * 5)],
        Location: faker.address.zipCode(),
        dateCreated: faker.date.recent(),
        category: ["Electronics", "Home Goods", "Furniture", "Clothing", "Toys and Games", "Office Supplies", "Other"][Math.floor(Math.random() * 7)],
        
      })
      console.log(i);
  }
  writer.end();
  console.log('I think I am done?');
};

// console.log(faker.image.imageUrl());
genearteProductsData();

app.get('/', (req, res) => {
  console.log("avatar", faker.image.avatar());  
  // Test
  //   .findOne()
  //   .then((product) => {
  //     console.log(product);
  //   })
  //   .catch((err) => {
  //       console.log("err", err);
  //   });
    res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
'use strict';


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

// connect express server to mongodb server
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }); //deprecation warnings


//  create collections
//  create schema and model
// Schema: determines how the shape of our data will look like (blueprint)
const bookSchema = new mongoose.Schema({
    name : String,
    description : String,
    imgUrl : String
});

const userSchema = new mongoose.Schema({
    email: String,
    books: [bookSchema] 
})

// build a model from our schema
// schema: drawing phase
// model: creation phase
const myBookModel = mongoose.model('book', bookSchema);
const myUserModel = mongoose.model('user', userSchema)

function seedBookCollection() {
    const book = new myBookModel({
        name:'' ,
        description:'' ,
        imgUrl: ''
    })
    const book1 = new myBookModel({
        name:'' ,
        description:'' ,
        imgUrl: ''
    })
    const book2 = new myBookModel({
        name:'' ,
        description:'' ,
        imgUrl: ''
    })
    // const mefleh = new myCatModel({
    //     catName: 'mefleh',
    //     breed: 'persian'
    // })

    // console.log(sherry)
    // console.log(mefleh)

    //  to actually save them >> save()
    // sherry.save();
    // mefleh.save();
}

//  seedBookCollection();

function userCollectionSeed() {
    const mohammed = new myUserModel({
        email: 'mmohiesen996@gmail.com',
        books: [
            {
                name: 'Underland',
                description: 'A beautifully written and profound book, which takes the form of a series of',
                imgUrl: 'https://i.guim.co.uk/img/media/fbc5236944ba71d93f7d0535d3e28e5eb5404e7d/0_0_3250_5000/master/3250.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=187d9b1d691e472f28a31ffa235b938a'
            }
            ,
            {
                name: 'Nothing to Envy',
                description: 'Los Angeles Times journalist Barbara Demick interviewed around 100 North Korean defectors for this propulsive work of narrative non-fiction, but she focuses on just six, all from the north-eastern city of Chongjin – closed to foreigners and less media-ready than Pyongyang',
                imgUrl: 'https://i.guim.co.uk/img/media/01a20399ae85404d2e1c28a288c1c52e9f5781f4/0_0_191_293/master/191.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=9b1bcc2e35c4bad233f257cc742acc8d'
            }
        ]
    })
    console.log(mohammed);
    const fatima = new myUserModel({
        email: 'falhmood66@gmail.com',
        books: [
            {
                name: 'Light',
                description: 'One of the most underrated prose writers demonstrates the literary firepower of science fiction at its best.',
                imgUrl:'https://i.guim.co.uk/img/media/94560f671d3027e1ee4449f6cb4c4cf33d63a723/0_0_323_499/master/323.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=e822521726816f24ea93b4a7e1cc68fd'

            }
            ,
            {
                name : 'Chronicles: Volume One',
                description: 'Dylan’s reticence about his personal life is a central part of the singer-songwriter’s brand, so the gaps and omissions in this memoir come as no surprise. The result is both sharp and dreamy',
                imgUrl:'https://i.guim.co.uk/img/media/eec342b926fd7028814f86dc3080e63b3c9a75fb/0_0_1500_900/master/1500.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=62b26cab157f5e615b849f385d5ca8a9' 
            }
        ]
    })
    const amara = new myUserModel({
        email: 'amaraalbalkhi94@gmail.com',
        books: [
            {
                name: 'Light',
                description: 'One of the most underrated prose writers demonstrates the literary firepower of science fiction at its best.',
                imgUrl:'https://i.guim.co.uk/img/media/94560f671d3027e1ee4449f6cb4c4cf33d63a723/0_0_323_499/master/323.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=e822521726816f24ea93b4a7e1cc68fd'

            }
            ,
            {
                name : 'Chronicles: Volume One',
                description: 'Dylan’s reticence about his personal life is a central part of the singer-songwriter’s brand, so the gaps and omissions in this memoir come as no surprise. The result is both sharp and dreamy',
                imgUrl:'https://i.guim.co.uk/img/media/eec342b926fd7028814f86dc3080e63b3c9a75fb/0_0_1500_900/master/1500.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=62b26cab157f5e615b849f385d5ca8a9' 
            }
        ]
    })
    // fatima.save();
    // mohammed.save();
    amara.save();
    console.log(fatima);
}


// userCollectionSeed();
//  proof of life
app.get('/', homePageHandler);
app.get('/books',getBooksHandler);
app.post('/books',createBookHandler);
app.delete('/books:id',deleteBookHandler);


function homePageHandler(req, res) {
    res.send('you are doing great')
}


// http://localhost:3001/cat?name=razan
function getBooksHandler(req,res) {
    let userEmail = req.query.email;
    // let {name} = req.query
    myUserModel.find({email:userEmail},function(err,userData){
        if(err) {
            console.log('did not work')
        } else {
            console.log(userData)
            console.log(userData[0])
            console.log(userData[0].books)
            res.send(userData[0].books)
        }
    })
}

function createBookHandler(req,res) {
    let { email, imgUrl, name, description } = req.body;
    // let {name} = req.query
    myUserModel.find({email:email},async (err,userData) =>{
        if(err) {
            console.log('did not work')
        } else {
            console.log(userData)
            userData[0].books.push({
                name: name,
                imgUrl: imgUrl,
                description: description
            })
            await userData[0].save();
            res.send(userData[0].books)
        }
    })
}

function deleteBookHandler(req,res) {
    let {id } = req.params;
    let {email} = req.query;
    myUserModel.find({email:email}, async (err,userData) =>{
        if(err) {
            console.log('did not work')
        } else {
            console.log(userData)
            let userBooks = userData[0].books.filter((item)=>{
                if(item._id != id) {
                    return item;
                }
            })
            userData[0].books = userBooks;
            await userData[0].save();
            res.send(userData[0].books)
        }
    })
}




app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

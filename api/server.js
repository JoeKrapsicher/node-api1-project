// BUILD YOUR SERVER HERE

//IMPORT AT THE TOP
const { dodgerblue } = require("color-name");
const express = require("express")
const User = require("./users/model")
// const {find, findById} = require('./users/model')
// INSTANCE OF EXPRESS APP
const server = express();
// GLOBAL MIDDLEWARE
server.use(express.json())
//ENDPOINTS


//52:13


//- `find` Resolves to the list of users (or empty array).
//    [GET] /api/dogs (R of CRUD, fetch all users)

server.get("/api/users", (req,res)=> {
    User.find()
        .then(users => {
            console.log(users);
            res.status(200).json(users)
        })
        .catch(err => { res.status(500).json({message:err.message})})
})


//- `findById` Takes an `id` and resolves to the user with that id (or null if the id does not exist).
//    [GET] /api/user/:id (R of CRUD, fetch user by :id)
server.get("/api/users/:id", (req,res)=> {
    const idVar = req.params.id
    console.log(idVar)
    User.findById(idVar)
        .then(users => {
            if(!users){
                res.status(404).json(`User ${idVar} does not exist`)
            }else{
                res.json(users)
            }
        })
        .catch(err => { res.status(500).json({message:err.message})})
})

//- `insert` Takes a new user `{ name, bio }` and resolves to the the newly created user `{ id, name, bio }`.
//    [POST] /api/user (C of CRUD, create new user from JSON payload)
server.post("/api/users", (req,res)=> {
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(422).json({message: "Name and Bio must be requied"})
    }else{
        User.insert(newUser)
            .then(user => {
                res.json(user)
            })
            .catch(err => { res.status(500).json({message:err.message})
        })
    }
})


//- `update` Takes an `id` and an existing user `{ name, bio }` and resolves the updated user `{ id, name, bio}` (or null if the id does not exist).
//    [PUT] /api/user/:id (U of CRUD, update user with :id using JSON payload)
server.put("/api/users/:id", async (req,res)=> {
    const {id} = req.params
    const changes = req.body
    try {
        if(!changes.name || !changes.bio){
            res.status(422).json({message: "Name and Bio are required"})
        }else{
            const updatedUser = await User.update(id,changes)
            if(!updatedUser){
                res.status(200).json(updatedUser)
            }
        }
    }catch(err) {
        res.status(500).json({message:err.message})
    }
})

//- `remove` Takes an `id`  and resolves to the deleted user `{ id, name, bio }`. 
//    // [DELETE] /api/user/:id (D of CRUD, remove user with :id)
server.delete("/api/users/:id", async (res,req)=> {
    try{
        console.log("I'm deleting")
        const {id} = req.params
        const deletedUser = await User.remove(id)
        res.status(201).json(deletedUser)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


server.use("*", (req,res)=> {
    res.status(200).json({message:"Why hello there..."})
})
module.exports = {

}; // EXPORT YOUR SERVER instead of {}

module.exports = server
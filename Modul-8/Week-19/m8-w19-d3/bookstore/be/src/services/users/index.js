const express = require("express")
const q2m = require("query-to-mongo")
const { adminOnly } = require("../auth")
const authenticate = require("../authTools")

const UserSchema = require("./schema")

const usersRouter = express.Router()

usersRouter.get("/",  adminOnly, async (req, res, next) => {
  try {
    const query = q2m(req.query)

    const users = await UserSchema.find(query.criteria, query.options.fields)
      .skip(query.options.skip)
      .limit(query.options.limit)
      .sort(query.options.sort)

    res.send({
      data: users,
      total: users.length,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

usersRouter.get("/me",  async (req, res, next) => {
  try {
    console.log(req.user)
    res.send(req.user)
  } catch (error) {
    next("While reading users list a problem occurred!")
  }
})

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UserSchema(req.body)
    const { _id } = await newUser.save()

    res.status(201).send(_id)
  } catch (error) {
    next(error)
  }
})

usersRouter.put("/me",  async (req, res, next) => {
  try {
    const updates = Object.keys(req.body)

    try {
      updates.forEach((update) => (req.user[update] = req.body[update]))
      await req.user.save()
      res.send(req.user)
    } catch (e) {
      res.status(400).send(e)
    }
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/me",  async (req, res, next) => {
  try {
    await req.user.remove()
    res.send("Deleted")
  } catch (error) {
    next(error)
  }
})



usersRouter.post("/login", async(req, res, next) =>{
  try{
       const {email, password} = req.body;
       const user = await UserSchema.findByCredentials(email, password);
       console.log("useeeeeeeeer", user)
       
       // generate token and send it to the client:
      const toke = await authenticate(user);
      res.send(token)
  }catch(error){}
})

module.exports = usersRouter

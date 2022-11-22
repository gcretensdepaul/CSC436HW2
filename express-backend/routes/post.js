const express = require("express");

const jwt = require("jsonwebtoken");

const Todo = require("../models/Todo");


const privateKey = "a";

const router = express.Router();

router.use(function (req, res, next) {
	if (req.header("Authorization")) {
		try {
			req.payload = jwt.verify(req.header("Authorization"), privateKey, {
				algorithms: ["RS256"],
			});
		} catch (error) {
			return res.status(401).json({ error: error.message });
		}
	} else {
		return res.status(401).json({ error: "Unauthorized" });
	}
	next();
});

router.post("/", async function (req, res) {
	const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
		author: req.payload.id,
		dateCreated: req.body.dateCreated,
		complete: req.body.complete,
		dateCompleted: req.body.dateCompleted
    
    });
	return todo
		.save()
		.then((savedTodo) => {
			return res.status(201).json({
				_id: savedTodo._id,
	            title: savedTodo.title,
	            description: savedTodo.description,
                author: savedTodo.author,
                dateCreated: savedTodo.dateCreated, 
                complete: savedTodo.complete,
                dateCompleted: savedTodo.dateCompleted
			});
		})
    .catch((error) => {
	    return res.status(500).json({ error: "Something went wrong." });
    });
});

router.get("/", async function (req, res, next) {
    const todos = await Todo.find().where("author").equals(req.payload.id).exec();
    return res.status(200).json({ todos: todos });
});
	
router.get("/:id", async function (req, res, next) {
	const todo = await Todo.findOne().where("_id").equals(req.params.id).exec();
	//const posts = await Post.find().exec();
	return res.status(200).json(todo);
});

router.delete("/delete/:_id", async function(req, res, next){
	const todo = await Todo.findOneAndDelete().where("_id").equals(req.params._id).exec();
	return res.status(200).json(todo);
});

router.patch("/patch/:_id", async function(req, res){
	const todo = await Todo.findByIdAndUpdate().where("_id").equals(req.params._id).exec();
	if (todo) {
		todo.complete = req.body.complete;
		todo.dateCompleted = req.body.dateCompleted;
		todo.save();
		return res.status(200).json(todo)
	}
	else{
		return res.status(400).json({error: "Error updating todo."})
	}
});
     

module.exports = router;
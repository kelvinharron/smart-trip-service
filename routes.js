var express = require("express");
var router = express.Router();

// middle ware specific to router
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();

});

router.get("/events", function (req, res, next) {

    router.route("/tasks/:userId").get(taskController.getTasks);
    router.route("/task/:taskId").get(taskController.getTask);
    router.route("/addTask").post(taskController.addTask);
    router.route("/updateTask/:taskId").post(taskController.updateTask);
    router.route("/deleteTask/:taskId").get(taskController.deleteTask);

});
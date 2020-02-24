const express = require('express');
const mongoose = require('mongoose');
const taskMongoose = require('./models/taskMongo');

//Connect
mongoose.connect('mongodb://localhost:32778/tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('ALL ok, mongo started')
})
.catch( () => {
    console.log('ERROR!!!')
});

const app = express();

//Для шаблонизатора
const consolidate = require('consolidate');
const path = require('path');

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

//For JSON
app.use(express.json());
//For forms - POST
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
    let tasks = await taskMongoose.find();
    tasks = JSON.parse(JSON.stringify(tasks))
    res.render('user', {tasks});
});

app.post('/addTask', async (req, res) => {
    const task = new taskMongoose({
        title: req.body.postTitle
    });
    const taskAfterSave = await task.save();
    res.redirect('/');
});
app.post('/delTask', async (req, res) => {
    const task = await taskMongoose.deleteOne({_id: {$in: req.body.taskId}});
    res.redirect('/')
})
app.post('/setStatus', async (req, res) => {
    const task = await taskMongoose.updateOne(
        { _id: req.body.taskId },
        { $set: {
            statusTask: req.body.taskStatus
        }}
    )
})
app.listen(4000, () => {
    console.log('Server works!');
});
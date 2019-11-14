// mongo connection string :mongodb+srv://Chie7tain:<password>@cluster0-khf8o.mongodb.net/test?retryWrites=true&w=majority
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const app = express();

mongoose.connect('mongodb+srv://Chie7tain:eNJ3vSp4UoORQTJN@cluster0-khf8o.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{
    console.log('Successfully connected to MongoDB Atlas');
})
.catch(
    (error)=>{
        console.log('Unable to connect to MondoDB Atlas!');
        console.error(error);
        
    }
);

// this code helps to relax CORS security feature in order for the two origins to communicate

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST , PUT, DELETE, PATCH,OPTIONS');
    next();
});
app.use(bodyParser.json());
// this post route helps to post recipe to the database
app.post('/api/recipes', (req,res,next)=>{
    const recipe = new Recipe({
        title: req.body.title,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        time: req.body.time,
        difficulty: req.body.difficulty
    });
    recipe.save().then(
        ()=>{
            res.status(201).json({
                message: 'Post saved successfully'
            });
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error: error
            });
        }
    );
});

// this is a put(update) route used to modify the recipe aka put (update) request
app.put('/api/recipes/:id',(req,res,next)=>{
    const recipe = new Recipe({
        _id: req.params.id,
        title: req.body.title,
        instructions:req.body.instructions,
        ingredients: req.body.ingredients,
        time: req.body.time,
        difficulty: req.body.difficulty,
    });
    Recipe.updateOne({_id: req.params.id}, recipe).then(
        ()=>{
            res.status(201).json({
                message: 'Recipe updated Successfully!'
            });
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error: error
            });
        }
    );
});

// this route deletes recipe(items) from our database
app.delete('/api/recipes/:id',(req,res,next)=>{
    Recipe.deleteOne({_id: req.params.id}).then(
        ()=>{
            res.status(200).json({
                message: "Deleted!"
            });
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error: error
            });
        }
    );
});

// this route helps to retrive a single recipe from our database
app.get('/api/recipes/:id',(req,res,next)=>{
    Recipe.findOne({
        _id: req.params.id
    }).then(
        (recipe) =>{
            res.status(200).json(recipe);
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error: error
            });
        }
    );
});


// this get route helps to retrieve all the recipes
app.use('/api/recipes',(req,res,next)=>{
    Recipe.find().then(
        (recipes)=>{
            res.status(200).json(recipes);
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error: error
            });
        }
    );
});
module.exports = app;
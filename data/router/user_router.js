const express = require('express');

const Users = require('../helpers/userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query);
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Error getting users'
        });

    }
});

router.get('/:id', middleware, async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);

        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message: 'User not found'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Error getting user'
        });
    }
});

router.get('/:id/post', async (req, res) => {
    try {
        const post = await Users.getUserPosts(req.params.id);
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({message: 'User post not found'})
        }
    } catch (error) {
        
    }
})

router.post('/',middleware, async (req, res) => {
    try {
        const user = await Users.insert(req.body);
            res.status(201).json(user);
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Error posting user'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = await Users.remove(req.params.id);
        if(id > 0){
            res.status(200).json({message: 'User has been deleted'})
        }else{
            res.status(404).json({message: 'User not found'})
        }   
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Error removing user',
        });
    }
});

router.put('/:id',middleware, async (req, res) => {
    try {
        const user = await Users.update(req.params.id, req.body);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'User could not be found' });
        }
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error updating the user',
        });
      }
});

function middleware(req, res ,next) {
    const uppercase = req.body.name[0].toUpperCase() + req.body.name.slice(1);
    console.log(uppercase)
    if (req.body.name == uppercase) {
        next();
    } else {
        res.status(400).json({message:'That didn\'t work'})
    }
}

module.exports = router;
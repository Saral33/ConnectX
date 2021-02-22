const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const Profile = require('../../models/profile');
const User = require('../../models/usermodel');
const Post = require('../../models/post')

router.post('/',auth,async(req,res)=>{

try{
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user.id
    });
     const post = await newPost.save();
    res.json(post);

} catch(e){
    console.error(e.message);
    res.send('server error')
}
});

router.get('/', auth, async(req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

router.get('/:id', auth, async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg: 'No post found'})
        res.json(post)
    } catch (error) {
        if (error.kind == 'ObjectId')
      return res.status(400).json({ msg: 'There is no post with that id' });
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

router.delete('/:id', auth, async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(!post) return res.status(404).json({msg: 'No post found'})

        if(post.user.toString()!== req.user.id) return res.status(400).json({msg:'Not Authorized'})
       
        await post.remove();
        res.json({msg:'Post removed'})
    } catch (error) {
        if (error.kind == 'ObjectId')
      return res.status(400).json({ msg: 'There is no post with that id' });
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

router.put('/like/:id', auth,async (req,res)=>{
    try {
      const post = await Post.findById(req.params.id);

      if(post.likes.filter(like => like.user.toString()== req.user.id).length>0){
       return res.status(400).json({ msg: 'Post is alredy liked' });
      }
      post.likes.unshift({user: req.user.id});

      await post.save();
      res.json(post.likes)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

router.put('/unlike/:id', auth, async (req,res)=>{
    try {
      const post = await Post.findById(req.params.id);

      if(post.likes.filter(like => like.user.toString()== req.user.id).length===0){
       return res.status(400).json({ msg: 'You have to like post first' });
      }
     const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(req.user.id);
     post.likes.splice(removeIndex,1)

      await post.save();
      res.json(post.likes)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

router.post('/comment/:id',auth,async(req,res)=>{

    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const newComment = ({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: user.id
        });
        post.comments.unshift(newComment)
        await post.save()

        res.json(post.comments);
    
    } catch(e){
        console.error(e.message);
        res.send('server error')
    }
    });

    router.delete('/comment/:id/:comment_id', auth , async(req,res)=>{
        try {
           const post= await Post.findById(req.params.id);
           const comment = post.comments.find(comment=> comment.id=== req.params.comment_id)
           
           if(!comment) return res.status(404).json({msg:'No comment found'});

           if(comment.user.toString()!== req.user.id) return  res.status(404).json({msg:'Not authorized'});

           const removeIndex = post.comments.map(comment=> comment.user.toString()).indexOf(req.user.id);
           post.comments.splice(removeIndex,1)

           await post.save();
           res.json(post.comments)
        } catch (e) {
        console.error(e.message);
        res.send('server error')
        }
    })

module.exports = router
const express = require('express')
const db = require('../data/db')

const router = express.Router()

router.get("/", (req, res) => {
    db.find(req.query)
        .then(posts => res.status(200).json(posts))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Post info could not be retrieved."})
        })
})

router.post("/", (req, res) => {
    const newPost = req.body
    if (!newPost.title || !newPost.contents) {
        res.status(400).json({errorMessage: "Provide a title and contents"})
    } else {
        db.insert(newPost)
            .then(item => {
                res.status(201).json(item)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ errorMessage: "Somethin' went wrong, bucko" })
            })
    }
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(item => {
            if (item.length !== 0) {
                res.status(200).json(item)
            } else {
                res.status(404).json({ errorMessage: "Post not found." })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Somethin' went wrong, bucko" })
        })
})

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
        .then(item => {
            if(item) {
                res.status(204).json({ item })
            } else {
                res.status(404).json({ errorMessage: "Post not found." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "somethin' went wrong, bucko" })
        })
})

router.get("/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
        .then(item => {
            if(item) {
                res.status(200).json(item)
            } else {
                res.status(404).json({ errorMessage: "Post not found." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: "Somethin' went wrong, bucko" })
        })
})

router.post("/:id/comments", (req, res) => {
    const comment = req.body;
    if(!comment.text) {
        res.status(400).json({ errorMessage: "Please input text." })
    } else {
        db.insertComment(comment)
            .then(item => {
                if(item) {
                    res.status(201).json(item)
                } else {
                    res.status(404).json({ errorMessage: "Post not found." })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ errorMessage: "Somethin' went wrong, bucko" })
            })
    }
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const post = req.body;

    if(!post.title || !post.contents) {
        res.status(400).json({ errorMessage: "Provide a title and contents" })
    } else {
        db.update(id, post)
            .then(item => {
                if(item){
                    res.status(200).json(post)
                } else {
                    res.status(404).json({ errorMessage: "Post not found." })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: "Somethin' went wrong, bucko." })
            })
    }

})




module.exports = router
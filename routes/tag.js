var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
    
var Tag;

    //Get an existing tag
    //------------------------------GET----------------------- 
router.get('/:id', function (req, res, next){
        Tag.findOne({_id:req.params.id}, function (err, tag){
            if(tag === undefined || err){return res.status(400).end('Wrong tag id');}
            res.send(tag);
        });
    })

    //Delete a tag
    //-------------------------------DELETE---------------------------
router.delete('/:id', function (req, res, next){
        Tag.remove({_id:req.params.id}, function (err){
            if(err){ return res.status(400).end('wrong tag id');}
            res.send({msg: "tag with id" + req.params.id + " has succesfully been deleted."});
        });
    })

    //Update a tag
    //------------------------------PUT--------------------------------
router.put('/:id', function (req, res, next){
    var db = req.db;
    var id = req.params.id;
    var body = req.body;
    Tag.findById(id, function (err, tag) {
        if (err) {
            return res.status(400).end('Wrong input'+err);
        } else {
            for(var key in body) {
                tag[key] = body[key];
            }
            tag.save(function (err) {
                if (err) {
                    return res.status(400).end('wrong input params'+err);
                } else {
                    res.send("Updated tag with id " + id + "succesfully");
                }
            });
        }
    });
});

module.exports = function(TagSchema) {
    Tag = TagSchema;
    return router;
}
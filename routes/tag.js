var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
    
var Tag;

    //get all the tags
    //-----------------------------GET------------------------
router.get('/', function (req,res,next){
        Tag.find(function(err, result){
            res.json(result);
        });
    })
    //Post a new tag
    //------------------------------POST--------------------------
router.post('/', function (req, res, next){
        var tag = new Tag(req.body);

        tag.save(function (err){
            if(err){
                res.send(err);
            } else {
                res.send({msg: "tag with id" + tag._id + " has succesfully been added"});
            }
        });
    });
    
    //Get an existing tagtag
    //------------------------------GET----------------------- 
router.get('/:id', function (req, res, next){
        Tag.findOne({_id:req.params.id}, function (err, tag){
            res.send(tag);
        });
    })

    //Delete a tag
    //-------------------------------DELETE---------------------------
router.delete('/:id', function (req, res, next){
        Tag.remove({_id:req.params.id}, function (err){
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
            res.send(err);
        } else {
            for(var key in body) {
                tag[key] = body[key];
            }
            console.log(tag);
            tag.save(function (err) {
                if (err) {
                    res.send(err);
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
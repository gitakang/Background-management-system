const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

mongoose.connect("mongodb://localhost:27017/position_project");

const schema = mongoose.Schema({
    logoname:String,
    positionname:String,
    companyname:String,
    work:String,
    typeposition:String,
    address:String,
    money:Number
});

const Position  = mongoose.model("position",schema);

const PositionModel = {
    save : function (positionInfo, success, error){
        const pos = new Position(positionInfo);
        pos.save((err,data)=>{
             if (err){
                 error(err);
                 return;
             }
             success(data);
        });
    },
    findBypage:function (pageIndex,success,error) {
        const pageSize = 5;
        Position.find()
                .limit(pageSize)
                .skip((pageIndex - 1) * pageSize)
                .then(success,error);
    },
    findAll:function(success,error){
        Position.find().count().then(success,error);
    },
    findid:function(id,success,error){
        Position.find({_id:ObjectId(id)}).then(success,error);
    },
    modify:function(list,success,error){
       Position.update({_id:ObjectId(list.id)},{logoname:list.logoname, 
                                                positionname:list.positionname, 
                                                companyname:list.companyname,
                                                work:list.work,
                                                typeposition:list.typeposition,
                                                address:list.address,
                                                money:list.money},
                                                {upsert:true}).then(success,error);
    },
    delete:function(id,success,error){
        Position.remove({_id:ObjectId(id)}).then(success,error);
    }
}
module.exports = PositionModel;
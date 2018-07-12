//用户相关的控制器
//引入用户模型模块

const UserModel = require("../models/UserModel");

var UserController = {
    login:function(req,res,next){
        //获取用户名和密码
        const {username,password} = req.body;
        //验证用户名和密码
        UserModel.find({username,password},(data)=>{
            if(data.length ===1){
                req.session.loginUser = data[0].username;
                res.json({
                    res_code:0,
                    res_error:"",
                    res_body:{username:data[0].username,email:data[0].email}
                });
            }else{
                res.json({
                    res_code:-2,
                    res_error:"用户名或密码错误",
                    res_body:{}
                });
            }
        },(err)=>{
            res.json({
                res_code:-1,
                res_error:err,
                res_body:{}
            });
        });
    },
    //用户注册方法
    register:function(req,res,next){
        //获取post
        const {username,password,email} = req.body;
        UserModel.save({username,password,email},(msg)=>{
            res.json({
                res_code : 0,
                res_error : "",
                res_body : msg
            });
        },(err)=>{
            res.json({
                res_code:-1,
                res_error:err,
                res_body:{}
            });
        });
    },
    checkLogin:function(req,res,next){
        var user = req.session.loginUser;
        if (user){
            res.json({
                res_code : 0,
                res_error : "",
                res_body:{
                    username :user
                }
            });
        }else{
            res.json({
                res_code:-1,
                res_error:"用户登录失效",
                res_body:{}
            })
        }
    },
    logout:function(req,res,next){
        req.session = null;
        res.json({
            res_code : 0,
            res_error: "",
            res_body : {}
        });
    }
};
module.exports = UserController;

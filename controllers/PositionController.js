const PositionModel = require("../models/PositionModel");
const fs = require("fs");
const PositionController = {
	// 添加职位信息
	add : function(req, res, next) {
		// 获取请求中传递的职位信息数据
		// get
		// const {position, company, salary} = req.query;
		// post
		const {positionname,companyname,work,typeposition,address,money} = req.body;
        let logoname = "";
            if(req.file)
				logoname = "/upload/" + req.file.filename;

        PositionModel.save({logoname,positionname,companyname,work,typeposition,address,money}, (data)=>{
			// success 回调函数
			res.json({
				res_code : 0,
				res_error :"",
				res_body : data
			});
		}, (err)=>{
			// error 回调函数
			res.json({
				res_code : -1,
				res_error : err,
				res_body : {}
			});
		});

		// res.send('在控制器中添加职位信息');
		// res.json({position, company, salary});
	},

	list: function (req,res,next) {
		const {pageIndex} = req.query;
		PositionModel.findBypage(pageIndex,(data) =>{
			res.json({
				res_code : 0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code :-1,
				res_error :err,
				res_body :{}
			})
		});
	},
	all:function(req,res,next){
		PositionModel.findAll((data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			});
		},(err)=>{
			res.json({
				res_code : -1,
				res_error : err,
				res_body:{}
			})
		});
	},
	findid:function(req,res,next){
		const {id} = req.query;
		PositionModel.findid(id,(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})	
		});
	},
	modify:function(req,res,next){
		const {imgsrc,positionname,companyname,work,typeposition,address,money,id} = req.body;
        let logoname = "";
			logoname = req.file ? "/upload/" + req.file.filename : imgsrc;
		PositionModel.modify({logoname,positionname,companyname,work,typeposition,address,money,id},(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		});
	},
	delete:function(req,res,next){
		let {logoname,id} = req.query;
		let filepath = "../project/public" + logoname;
		fs.unlink(filepath, function(err){
		if(err){
		throw err;
		}
		console.log('文件:'+filepath+'删除成功！');
		});
		PositionModel.delete(id,(data)=>{
			res.json({
				res_code:0,
				res_error:"",
				res_body:data
			})
		},(err)=>{
			res.json({
				res_code:-1,
				res_error:err,
				res_body:{}
			})
		});
	}
};

module.exports = PositionController;
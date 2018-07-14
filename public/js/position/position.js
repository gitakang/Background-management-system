function Position(){
	this.check();
    this.loadHeader();
	this.addListener();
	this.loadPages();
}
$.extend(Position.prototype,{
	//检查用户是否登录
	check:function(){
		$.get("/api/users/check",(data)=>{
			if(data.res_code === -1)
			location = "/index.html";
			else
			this.loadListPosition(1);
		},"json");
	},
	//加载头部并且把所有的模态框都加载出来
    loadHeader:function(){
		//加载头部
        new Header();
		$("#position-nav").find("ul").eq(0).find("li").removeClass('active').next().addClass('active');
		//加载添加模态框
		new AddModal();
		//加载修改模态框
		new ModModal();
		
    },
    // 注册事件监听
	addListener : function () {
		const  that = this;
		//点击添加弹出添加模态框
		$(".btn_add_pos").on("click", $.proxy(this.handleAddPosition, this));
		//点击页数实现翻页
		$(".pagination").on("click","li",function () {
			const currentPage = $(this).find("a").text();
			that.loadListPosition(currentPage);
			$(".pagination li").removeClass("active");
			$(this).addClass("active");
		});
		//点击修改弹出修改模态框
		$(".pos_list").on("click",".mod_pos_list",function(){
			$(".modModal").modal();
			that.modModalList($(this).data("id"));
		});
		//点击关闭按钮清空模态框的数据
		$("#addModal").on("click",".close_add,.btn_close_add",$.proxy(this.clearForm,this));

		//点击修改模态框中的提交按钮 修改数据
		$(".submit_list").on("click",that.ModifyPosition);

		//点击删除弹出删除确认模态框
		$(".pos_list").on("click",".del_pos_list",function(){
			let id = $(this).data("id"),
				src = $(this).data("src");
				$(".confirm").data("id",id);
				$(".confirm").data("src",src);
		});
		//点击确认模态框的确认按钮删除数据
		$(".confirm").on("click",function(){
			let id = $(this).data("id"),
				logoname = $(this).data("src");
				doms = $(".del_pos_list"),
				page = $(".pagination .active a").text();
				$.get("/api/positions/delete",{id:id,logoname,logoname},(data)=>{
					if(data.res_code === 0){
						$("#delModal").modal("hide");
						for (let i = 0; i < doms.length; i++){
							if(id === $(doms).eq(i).data("id")){
								$(doms).eq(i).parents("tr").remove();
								that.loadListPosition(page);
								return;
							}
						}
					}
				});
		});
	},
	//添加的模态框实现功能
	handleAddPosition:function(){
		var formDate = new FormData($(".add_pos_form").get(0));
		$.ajax({
			type:"post",
			url:"/api/positions/add",
			data:formDate,
			processData : false,
			contentType:false,
			dataType:"json",
			success :(data)=>{
				if(data.res_code ===0){
					//隐藏修改模态框
					$("#addModal").modal("hide");
					let page = $(".pagination .active a").text();
					this.loadListPosition(page);
					this.clearForm();
				}else{
					$(".add_pos_error").removeClass("hide");
				}
			}
		});
	},
	//翻页实现的功能
	loadListPosition: function(currentPage){
		currentPage = currentPage || 1;
		$.get("/api/positions/list",{pageIndex:currentPage},function(data){
		
			if (data.res_code === 0){
				const html = template("position_list_temp",{list: data.res_body});
				$(".pos_tab tbody").html(html);
			}
		},"json");
	},
	//显示总共页数的功能
	loadPages:function(){
		$.get("/api/positions/all",function(data){
			if (data.res_code ===0){
				let amount = data.res_body,
					  pages = Math.ceil(amount/5),
					  html = "";
				for(let i = 1; i <= pages;i++){
					html += `<li class=""><a href="#">${i}</a></li>`;
				}
				$(".pagination").html(html).find("li:first").addClass("active");
			}
		});
	},
	//修改模态框实现的功能   根据_id把内容加载到模态框里面
	modModalList : function(id){
			$("#modexampleInputFile").val("");
		$.get("/api/positions/findid",{id:id},function(data){
			if(data.res_code ===0){
				let list = data.res_body[0];
				let pos = $(".mon_position");
				$(pos).find(".mod_src").val(list.logoname).parent().removeClass("hide");
				$(pos).find("#list_id").val(list._id);
				$(pos).find("#modUsername").val(list.positionname);
				$(pos).find("#modcompany").val(list.companyname);
				$(pos).find("#modexperience").val(list.work);
				$(pos).find("#modtype").val(list.typeposition);
				$(pos).find("#modlocatioon").val(list.address);
				$(pos).find("#modSalary").val(list.money);
			}
		});
	},
	//修改数据
	ModifyPosition : function (){
		let formDate = new FormData($(".mon_position").get(0));
		$.ajax({
			type:"post",
			url:"/api/positions/modify",
			data:formDate,
			processData : false,
			contentType:false,
			dataType:"json",
			success :(data)=>{
				if(data.res_code ===0){
					$("#modModal").modal("hide");
					let page = $(".pagination .active").text();
					this.loadListPosition(page);
					this.clearForm();
				}else{
					$(".mod_pos_error").removeClass("hide");
				}
			}
		});
	},
	//添加模态框初始化
	clearForm:function(){
		$(".add_pos_form").get(0).reset();
		$(".mon_position").get(0).reset();
	}
});
new Position();

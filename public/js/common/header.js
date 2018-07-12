//构造函数
function Header(){
this.createDom();
this.loadLoginModal();
this.loadRegisterModal();
this.addListener();
this.checkLogin();
this.positionCenter();
}
//头部布局结构模板
Header.template = `<nav class="navbar navbar-inverse">
                    <div class="navbar-header">
                      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                      </button>
                      <a class="navbar-brand" href="/">职位管理系统</a>
                    </div>
                    <div class="collapse navbar-collapse" id="position-nav">
                      <ul class="nav navbar-nav">
                        <li class="active"><a href="/">首页</a></li>
                        <li class="pos_center"><a href="#">职位管理</a></li>
                      </ul>
                      <ul class="nav navbar-nav navbar-right">
                        <li data-toggle="modal" data-target="#logModal"><a href="#">登录</a></li>
                        <li data-toggle="modal" data-target="#regModal"><a href="#">注册</a></li>
                      </ul>
                      <ul class="nav navbar-nav navbar-right hide login_success">
                        <li><a href="#">欢迎您：</a></li>
                        <li class="logout_link"><a href="#">退出</a></li>
                      </ul>
                    </div>
                  </div>
                </nav>`;
//原型继承
$.extend(Header.prototype,{
    createDom:function () {
        $(Header.template).appendTo(".header");
    },
    loadLoginModal:function(){
        new LoginModal();
    },
    loadRegisterModal:function(){
        new RegisterModal()
    },
    addListener : function () {
      $(".logout_link").on("click",this.handleLogout);
    },
    handleLogout:function(){
      $.get("/api/users/logout",function(){
        location.reload();
      });
    },
    checkLogin:function(){
      $.get("/api/users/check",function(data){
        if(data.res_code === 0){
          $(".login_success").removeClass("hide").prev("ul").hide();
				  $(".login_success a:first").text("欢迎您：" + data.res_body.username);
        }
      },"json");
    },
    positionCenter:function(){
      $(".pos_center").on("click",this.checkLog);
    },
    checkLog:function(){
      $.get("/api/users/check",function(data){
        if(data.res_code ===0){
          location = "/html/position.html";
        }else{
          $('#logModal').modal();
          $(".btn_login").on("click",function(){
            $.post("/api/users/login",$(".login_form").serialize(),function(data){
              if(data.res_code === 0){
                $(".login_success").removeClass("hide").prev("ul").hide();
                $(".login_success a:first").text("欢迎您：" + data.res_body.username);
                $("#logModal").modal("hide");
                location = "/html/position.html";
                console.log(665)
              }else{
                $(".login_error").removeClass("hide");
              }
            },"json");
          })
        }
      });
    }
});

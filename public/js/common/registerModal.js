function RegisterModal(){
    this.loadRegisterModal();
    this.addLisenter();
}
RegisterModal.template=`<div class="modal fade" id="regModal" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                        <h4 class="modal-title" id="regModalLabel">用户注册</h4>
                      </div>
                      <div class="modal-body">
                          <form class="reg_form">
                            <div class="form-group">
                              <div class="alert hide clear alert-danger add_pos_error" role="alert"></div>
                              <label for="regUsername">用户名</label> 
                              <span class="hide clear user_success" style="margin-left:20px; color:#3c763d;">用户名可用！</span> 
                              <span class="hide clear user_danger" style="margin-left:20px; color:#a94442;">用户名已被注册！</span> 
                              <input type="email" class="form-control" name="username" id="regUsername" placeholder="请输入用户名（必须是字母组成的6到18位！）">
                            </div>
                            <div class="form-group">
                              <label for="regPassword">密码</label>
                              <span class="hide clear pwd_danger" style="margin-left:20px; color:#a94442;">密码格式有误！</span> 
                              <input type="password" class="form-control" name="password" id="regPassword" placeholder="请输入密码（密码必须由字母数字组成的6到12位！）">
                            </div>
                            <div class="form-group">
                              <label for="regAgainPassword">确认密码</label>
                              <span class="hide clear pwd_repeat_danger" style="margin-left:20px; color:#a94442;">密码必须和上面一致！</span>
                              <input type="password" class="form-control" id="regAgainPassword" placeholder="再次输入密码">
                            </div>
                            <div class="form-group">
                              <label for="regemil">邮箱</label>
                              <span class="hide clear email_danger" style="margin-left:20px; color:#a94442;">邮箱格式有误！</span>
                              <input type="email" class="form-control" name="email" id="regemil" placeholder="输入e-mail地址">
                            </div>
                          </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default btn_close" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary btn_register">注册</button>
                      </div>
                    </div>
                    </div>
                </div>`;
$.extend(RegisterModal.prototype,{
    //把模态框添加到body中
    loadRegisterModal:function(){
        $(RegisterModal.template).appendTo('body');
    },
    //注册事件监听
    addLisenter:function(){
      $(".btn_register").on("click",$.proxy(this.registerUser,this));
      $("#regUsername").on("blur",$.proxy(this.checkUsername,this));
      $("#regPassword").on("blur",$.proxy(this.checkPassword,this));
      $("#regAgainPassword").on("blur",$.proxy(this.repeatPassword,RegisterModal));
      $("#regemil").on("blur",$.proxy(this.emailCheck,this));
  },
  //验证用户名是否存在
  checkUsername:function(){
    let reg = /^[a-zA-Z][a-zA-Z]{5,16}$/,
        username = $("#regUsername").val();
    if(reg.test(username)){
      $.get("/api/users/checkUsername",{username:username},(data)=>{
        if(data.res_body.length === 0){
          //用户名可以注册
            $(".user_danger").addClass("hide");
            $(".user_success").removeClass("hide").text("用户名可用！");
        }else{
          //用户名已被注册
          $(".user_success").addClass("hide");
          $(".user_danger").removeClass("hide").text("用户名已被注册！");
        }
      });
    }else{
        //用户名的格式错误
      $(".user_success").addClass("hide");
      $(".user_danger").removeClass("hide").text("用户名格式有误！");
    }
    if(username == ""){
      //用户名不能为空
      $(".user_success").addClass("hide");
      $(".user_danger").removeClass("hide").text("用户名不能为空！");
    }
    $(".add_pos_error").addClass("hide");
  },
  //验证密码的格式是否正确
  checkPassword:function(){
    let reg = /^[a-zA-Z0-9]{6,12}$/,
        password = $("#regPassword").val(),
        reapassword = $("#regAgainPassword").val();
    if(!reg.test(password)){
        $(".pwd_danger").removeClass("hide");
    }else{
      $(".pwd_danger").addClass("hide");
    }
    if(password === reapassword)
    $(".pwd_repeat_danger").addClass("hide");
    else if(password !== reapassword && reapassword !=="")
    $(".pwd_repeat_danger").removeClass("hide").text("密码必须和上面一致！");
    $(".add_pos_error").addClass("hide");
  },
  //验证密码是否与重复的密码一致
  repeatPassword:function () {
    let password = $("#regPassword").val();
        reapassword = $("#regAgainPassword").val();
    if(password !== reapassword){
      $(".pwd_repeat_danger").removeClass("hide").text("密码必须和上面一致！");
    }else if(reapassword === "")
    $(".pwd_repeat_danger").removeClass("hide").text("密码不能为空！");
    else{
      $(".pwd_repeat_danger").addClass("hide");
    }
    $(".add_pos_error").addClass("hide");
  },
  //验证邮箱的格式是否正确
  emailCheck:function(){
    let email = $("#regemil").val(),
        reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(!reg.test(email)){
        $(".email_danger").removeClass("hide").text("邮箱格式有误！");
      }else {
        $(".email_danger").addClass("hide");
      }
      if(email === "")
      $(".email_danger").removeClass("hide").text("邮箱不能为空！");
      $(".add_pos_error").addClass("hide");
  },
  //实现注册功能
  registerUser:function(){
    let regusername = /^[a-zA-Z][a-zA-Z]{5,16}$/,
        username = $("#regUsername").val(),
        regpassword = /^[a-zA-Z0-9]{6,12}$/,
        password = $("#regPassword").val(),
        reapassword = $("#regAgainPassword").val(),
        email = $("#regemil").val(),
        regemail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(regusername.test(username) && regpassword.test(password) && password === reapassword && regemail.test(email)){
        $.post("/api/users/register", $(".reg_form").serialize(),function(data){
          if (data.res_code === 0){
              $(".reg_form input").val("");
              $("#regModal").modal("hide");
          }else {
              $(".add_pos_error").removeClass("hide").text("注册失败！");
          }
      },"json");
    } else {
      $(".add_pos_error").removeClass("hide").text("填写格式有误，请重新填写！");
    }
  }
});

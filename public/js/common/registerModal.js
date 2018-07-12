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
                              <label for="regUsername">用户名</label>
                              <input type="email" class="form-control" name="username" id="regUsername" placeholder="请输入用户名">
                            </div>
                            <div class="form-group">
                              <label for="regPassword">密码</label>
                              <input type="password" class="form-control" name="password" id="regPassword" placeholder="请输入密码">
                            </div>
                            <div class="form-group">
                              <label for="regAgainPassword">确认密码</label>
                              <input type="password" class="form-control" id="regAgainPassword" placeholder="再次输入密码">
                            </div>
                            <div class="form-group">
                              <label for="regemil">邮箱</label>
                              <input type="email" class="form-control" name="email" id="regemil" placeholder="输入e-mail地址">
                            </div>
                          </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary btn_register">注册</button>
                      </div>
                    </div>
                    </div>
                </div>`;
$.extend(RegisterModal.prototype,{
    loadRegisterModal:function(){
        $(RegisterModal.template).appendTo('body');
    },
    //注册事件监听
    addLisenter:function(){
      $(".btn_register").on("click",$.proxy(this.registerUser,this));
  },
  registerUser:function (){
      $.post("/api/users/register", $(".reg_form").serialize(),function(data){
          if (data.res_code === 0){
              $("#regModal").modal("hide");
          }else {
              $(".add_pos_error").removeClass("hide");
          }
      },"json");
  }

});

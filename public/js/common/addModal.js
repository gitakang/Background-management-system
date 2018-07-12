function AddModal(){
    this.createDom();
}
AddModal.template = `<div class="modal fade" id="addModal">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                                <h4 class="modal-title">职位信息</h4>
                              </div>
                              <div class="modal-body">
                                  <form class="add_pos_form">
                                    <div class="form-group">
                                        <label for="addexampleInputFile">公司logo</label>
                                        <input type="file" class="form-control" name="logoname" id="addexampleInputFile">
                                    </div>
                                    <div class="form-group">
                                      <label for="addUsername">职位名称</label>
                                      <input type="text" class="form-control" name="positionname" id="addUsername" placeholder="请输入职位名称">
                                    </div>
                                    <div class="form-group">
                                      <label for="addcompany">公司名称</label>
                                      <input type="text" class="form-control" name="companyname" id="addcompany" placeholder="请输入公司名称">
                                    </div>
                                    <div class="form-group">
                                      <label for="addexperience">工作经验</label>
                                      <input type="text" class="form-control" name="work" id="addexperience" placeholder="请输入工作经验">
                                    </div>
                                    <div class="form-group">
                                      <label for="addtype">职位类型</label>
                                      <input type="text" class="form-control" name="typeposition" id="addtype" placeholder="请输入职位类型">
                                    </div>
                                    <div class="form-group">
                                      <label for="addlocatioon">工作地点</label>
                                      <input type="text" class="form-control" name="address" id="addlocatioon" placeholder="请输入工作地点">
                                    </div>
                                    <div class="form-group">
                                      <label for="addSalary">岗位薪资</label>
                                      <input type="text" class="form-control" name="money" id="addSalary" placeholder="请输入岗位薪资">
                                    </div>
                                  </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary btn_add_pos">提交</button>
                              </div>
                            </div>
                        </div>
                    </div>`;

$.extend(AddModal.prototype,{
    createDom:function(){
        $(AddModal.template).appendTo('body');
    }
});

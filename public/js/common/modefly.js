function ModModal(){
    this.createDom();
}
ModModal.template = `<div class="modal fade" id="modModal" tabindex="-1" role="dialog">
                          <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                                  <h4 class="modal-title" id="modModalLabel">职位信息</h4>
                                </div>
                                <div class="modal-body">
                                    <form class="mon_position">
                                      <div class="form-group">
                                          <label for="modexampleInputFile">公司logo</label>
                                          <span class="hide" style="margin-left:50px;">图片名称：<input class="mod_src" name="imgsrc" readonly></span>
                                          <input name="logoname" type="file" class="form-control" id="modexampleInputFile">
                                          <input  type="text" class="form-control hide" id="list_id" name="id">
                                      </div>
                                      <div class="form-group">
                                        <label for="modUsername">职位名称</label>
                                        <input name="positionname" type="text" class="form-control" id="modUsername" placeholder="请输入职位名称">
                                      </div>
                                      <div class="form-group">
                                        <label for="modcompany">公司名称</label>
                                        <input name="companyname" type="text" class="form-control" id="modcompany" placeholder="请输入公司名称">
                                      </div>
                                      <div class="form-group">
                                        <label for="modexperience">工作经验</label>
                                        <input name="work" type="text" class="form-control" id="modexperience" placeholder="请输入工作经验">
                                      </div>
                                      <div class="form-group">
                                        <label for="modtype">职位类型</label>
                                        <input name="typeposition" type="text" class="form-control" id="modtype" placeholder="请输入职位类型">
                                      </div>
                                      <div class="form-group">
                                        <label for="modlocatioon">工作地点</label>
                                        <input name="address" type="text" class="form-control" id="modlocatioon" placeholder="请输入工作地点">
                                      </div>
                                      <div class="form-group">
                                        <label for="modSalary">岗位薪资</label>
                                        <input name="money" type="text" class="form-control" id="modSalary" placeholder="请输入岗位薪资">
                                      </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                  <button type="button" class="btn btn-primary submit_list">提交</button>
                                </div>
                              </div>
                          </div>
                      </div>`;

$.extend(ModModal.prototype,{
    createDom:function(){
        $(ModModal.template).appendTo('body');
    }
});

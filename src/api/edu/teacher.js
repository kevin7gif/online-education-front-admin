import request from '@/utils/request'

export default {

  /**
   * 分页查询讲师
   * @param current 当前页
   * @param limit 每页记录数
   * @param teacherQuery 查询条件
   * @returns {*}
   */
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      // 此处url之所以用`(tab键上面的符号) 是因为这个不是字符串，而是一个变量，这个变量是一个对象，这个对象里面有一个url属性
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      // teacherQuery条件对象，后端使用RequestBody获取数据
      data: teacherQuery// data表示把对象转换成json进行传递到接口里面
    })
  },
  /**
   * 根据讲师id删除讲师
   * @param id
   * @returns {*}
   */
  deleteTeacherById(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  /**
   * 添加讲师
   * @param teacher
   * @returns {*}
   */
  addTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  /**
   * 根据讲师id查询讲师
   * @param id
   * @returns {*}
   */
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  /**
   * 修改讲师
   * @param teacher
   * @returns {*}
   */
  updateTeacherInfo(teacher) {
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}

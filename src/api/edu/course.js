import request from '@/utils/request'
export default {
  // 添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  // 查询所有讲师
  getListTeacher() {
    return request({
      url: `/eduservice/teacher/findAll`,
      method: 'get'
    })
  },
  // 根据课程id查询课程基本信息
  getCourseInfoById(courseId) {
    return request({
      url: `/eduservice/course/getCourseInfo/${courseId}`,
      method: 'get'
    })
  },
  // 修改课程信息
  updateCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  // 课程确认信息显示
  getPublishCourseInfo(courseId) {
    return request({
      url: `/eduservice/course/getPublishCourseInfo/${courseId}`,
      method: 'get'
    })
  },
  // 课程最终发布
  publishCourse(courseId) {
    return request({
      url: `/eduservice/course/publishCourse/${courseId}`,
      method: 'post'
    })
  },
  // 课程列表
  getCourseListPage(current, limit, courseQuery) {
    return request({
      url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
      method: 'post',
      data: courseQuery
    })
  },
  // 删除课程
  deleteCourse(courseId) {
    return request({
      url: `/eduservice/course/deleteCourse/${courseId}`,
      method: 'delete'
    })
  }
}

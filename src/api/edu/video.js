import request from '@/utils/request'
export default {
  // 1.添加小节
  addVideo(video) {
    return request({
      url: `/eduservice/video/addVideo`,
      method: 'post',
      data: video
    })
  },
  // 2.修改小节
  updateVideo(video) {
    return request({
      url: `/eduservice/video/updateVideo`,
      method: 'post',
      data: video
    })
  },
  // 3.删除小节
  deleteVideo(videoId) {
    return request({
      url: `/eduservice/video/${videoId}`,
      method: 'delete'
    })
  },
  // 4.根据id查询小节
  getVideoById(videoId) {
    return request({
      url: `/eduservice/video/${videoId}`,
      method: 'get'
    })
  },
  // 5.删除阿里云视频
  deleteAliyunVod(videoId) {
    return request({
      url: `/eduvod/video/removeAlyVideo/${videoId}`,
      method: 'delete'
    })
  }
}

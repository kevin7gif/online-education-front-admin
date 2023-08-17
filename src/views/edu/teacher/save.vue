<template>
  <div class="app-container">
    讲师添加
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0" :max="10" controls-position="right"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>

        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调
        <input type="file" name="file"/> 文件上传
      -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'Save',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: '/static/01.jpg'
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false, // 是否显示图片上传组件
      imagecropperKey: 0, // 图片上传组件的key
      BASE_API: process.env.BASE_API // 获取环境变量(dev.env.js)中的BASE_API
    }
  },
  // 多次路由跳转到同一页面时，created只会执行一次，所以需要使用watch监听路由参数的变化
  watch: {
    // 监听路由参数的变化，如果发生变化，重新初始化页面
    $route(to, from) { // to:要去的路由信息，from:当前的路由信息
      this.init()
    }
  },
  created() { // 页面渲染之前执行
    // 判断路径是否有id值，以此来判断是进行修改操作还是新增操作
    this.init()
  },
  methods: {
    // 关闭图片上传弹框
    close() {
      this.imagecropperShow = false
      // 重新渲染图片上传组件
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 图片上传成功后的回调
    cropSuccess(data) {
      this.imagecropperShow = false
      // 先进行字段判断
      // 上传之后接口返回图片地址
      this.teacher.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 页面初始化
    init() {
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        // 调用根据id查询的方法
        this.getInfo(id)
      } else { // 路径没有id值，做添加
        // 清空表单，只给排序字段一个默认值
        this.teacher = { sort: 0 }
      }
    },
    saveOrUpdate() {
      // 判断是进行修改还是添加
      if (!this.teacher.id) {
        // id为空，则是添加
        // 判断字段是不是为空
        if (!this.teacher.avatar) {
          this.$message({
            message: '请上传头像',
            type: 'warning'
          })
          return
        } else if (!this.teacher.name) {
          this.$message({
            message: '请填写讲师名称',
            type: 'warning'
          })
          return
        } else if (!this.teacher.career) {
          this.$message({
            message: '请填写讲师资历',
            type: 'warning'
          })
          return
        } else if (!this.teacher.intro) {
          this.$message({
            message: '请填写讲师简介',
            type: 'warning'
          })
          return
        } else if (!this.teacher.level) {
          this.$message({
            message: '请选择讲师级别',
            type: 'warning'
          })
          return
        } else {
          // 一切字段都正常，则执行添加操作
          this.saveTeacher()
        }
      } else {
        // 修改
        this.updateTeacher()
      }
    },
    // 修改讲师
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher).then(response => {
        this.$message({// 提示消息
          message: '修改成功',
          type: 'success'
        })
        // 路由跳转到列表页面
        this.$router.push({ path: '/teacher/table' })
      })
    },
    // 添加讲师
    saveTeacher() {
      teacherApi.addTeacher(this.teacher).then(response => {
        this.saveBtnDisabled = false// 保存成功，按钮恢复可用
        this.$message({// 提示消息
          message: '保存成功',
          type: 'success'
        })
        // 路由跳转到列表页面
        this.$router.push({ path: '/teacher/table' })
      })
    },
    // 根据讲师id查询讲师
    getInfo(id) {
      teacherApi.getTeacherInfo(id).then(response => {
        this.teacher = response.data.teacher
      })
    }
  }
}
</script>

<style scoped>

</style>

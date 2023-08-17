<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" width="400" align="center"/>

      <el-table-column label="课程状态" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'已发布':'未发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" align="center"/>

      <el-table-column prop="gmtCreate" label="添加时间" width="220" align="center"/>

      <el-table-column prop="viewCount" label="浏览数量" width="90" align="center" />

      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/edit/'+scope.row.id">
            <el-button type="text" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
          </router-link>
          <router-link :to="'/course/edit/'+scope.row.id">
            <el-button type="text" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除课程信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
import course from '@/api/edu/course'

export default {
  data() {
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 5, // 每页记录数
      total: 0, // 总记录数
      courseQuery: {} // 条件封装对象
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.getList()
  },
  methods: {
    // 课程列表的方法
    getList(page = 1) {
      this.page = page
      course.getCourseListPage(this.page, this.limit, this.courseQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    resetData() { // 清空的方法
      // 表单输入项数据清空
      this.courseQuery = {}
      // 查询所有课程数据
      this.getList()
    },
    removeDataById(id) { // 根据id删除课程信息
      this.$confirm('此操作将永久删除该课程信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认删除
        course.deleteCourse(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新列表
          this.getList()
        })
      }).catch(() => { // 取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  }
}
</script>

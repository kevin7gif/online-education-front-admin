<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
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

      <el-table-column prop="name" label="名称" width="80" align="center"/>

      <el-table-column label="头衔" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="简介" align="center"/>

      <el-table-column prop="gmtCreate" label="添加时间" width="160" align="center"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
      @current-change="getList"/> <!--当前页码变化时触发-->

  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import teacher from '@/api/edu/teacher' // 引入teacher.js文件

export default {
  name: 'List',
  data() {
    return {
      list: null, // 讲师列表数据
      page: 1, // 当前页码
      limit: 8, // 每页条数
      total: 0, // 总记录数
      teacherQuery: {} // 查询条件对象
    }
  },
  created() { // 一进入页面就要调用
    this.getList()
  },
  methods: {
    // 得到讲师列表
    getList(page = 1) {
      this.page = page
      teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then(resp => {
          this.list = resp.data.rows
          this.total = resp.data.total
          console.log(resp)
        })
        .cache(err => {
          console.log(err)
        })
    },
    // 清空查询条件
    resetData() {
      this.teacherQuery = {}// 清空查询条件对象
      this.getList()// 重新查询列表
    },
    // 根据id删除讲师
    removeDataById(id) {
      this.$confirm('此操作将永久删除讲师信息，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacher.deleteTeacherById(id)
          .then(resp => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          })
      })
    }
  }
}
</script>

<style scoped>

</style>

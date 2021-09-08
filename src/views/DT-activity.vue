<template>
  <el-container>
    <el-header>
      <el-button size="mini" type="button" icon="el-icon-plus" @click="AdddialogVisible = true" circle/>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="a_name" label="活动名称" width="180"/>
        <el-table-column prop="startTime" label="开始时间" width="180"/>
        <el-table-column prop="endTime" label="结束时间" width="180"/>
        <el-table-column prop="number" label="参与人数" width="180"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"
                       circle/>
            <el-button size="mini" type="primary" icon="el-icon-edit"
                       @click="handleEdit(scope.$index, scope.row);EditdialogVisible = true" circle/>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <!--新增表单-->
    <el-dialog title="新增活动信息" :visible.sync="AdddialogVisible" width="30%">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称" prop="a_name">
          <el-input v-model="form.a_name"/>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="参与人数" prop="number">
          <el-input v-model="form.number"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent();AdddialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'DT-activity',
  mounted: function () {
    this.$http('post', '/api/query', { tableName: 'DT_activity' }).then(response => {
      this.tableData = response
    })
  },
  data () {
    return {
      AdddialogVisible: false,
      form: {
        a_name: '',
        startTime: '',
        endTime: '',
        number: ''
      },
      tableData: null,
      rules: {
        sno: [
          {
            required: true,
            message: '请输入学生ID',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 5,
            message: '长度在 1 到 5 个字符',
            trigger: 'blur'
          }
        ],
        sname: [
          {
            required: true,
            message: '请输入学生姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],
        sage: [
          {
            required: true,
            message: '请输入年龄',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 3,
            message: '请输入正确年龄',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 新增
    addStudent () {
      this.$http('post', '/api/insert', {
        tableName: 'DT_activity',
        form: this.form
      }).then(() => {
        this.$http('post', '/api/query', { tableName: 'DT_activity' }).then(response => {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.tableData = response
        })
      })
    },
    // 删除
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http('post', '/api/delete', { sno: row.sno }).then(response => {
          this.tableData.splice(index, 1)
          if (response !== null) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '删除失败',
              type: 'warning'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改前查询学生信息
    handleEdit (index, row) {
      this.$http('post', '/api/Studentquery', { sno: row.sno }).then(response => {
        this.form = response[0]
      })
    },
    // 提交
    editStudent () {
      this.$http('post', '/api/update', this.form).then(response => {
        location.reload()
      })
    }
  }
}
</script>

<style scoped>

</style>

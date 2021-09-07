<template>
  <el-container>
    <el-header>
      <el-button size="mini" type="button" icon="el-icon-plus" @click="AdddialogVisible = true" circle>
      </el-button>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="sno" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="sname" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="sage" label="年龄" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"
                       circle>
            </el-button>
            <el-button size="mini" type="primary" icon="el-icon-edit"
                       @click="handleEdit(scope.$index, scope.row);EditdialogVisible = true" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <!--新增表单-->
    <el-dialog title="新增学生信息" :visible.sync="AdddialogVisible" width="30%">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="ID" prop="sno">
          <el-input v-model="form.sno"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="form.sname"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="sage">
          <el-input v-model="form.sage" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent();AdddialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改表单-->
    <el-dialog title="修改学生信息" :visible.sync="EditdialogVisible" width="30%">
      <el-form ref="form" :model="{form}" label-width="80px">
        <el-form-item label="ID" prop="sno">
          <el-input v-model="form.sno" disabled>{{ this.form.sno }}</el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="form.sname">{{ this.form.sname }}</el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="sage">
          <el-input v-model="form.sage" oninput="value=value.replace(/[^\d]/g,'')">{{ this.form.sage }}</el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStudent();EditdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>

export default {
  mounted: function () {
    this.$http('get', '/student/query').then(response => {
      this.tableData = response
    })
  },
  data () {
    return {
      AdddialogVisible: false,
      EditdialogVisible: false,
      form: {
        sno: '',
        sname: '',
        sage: ''
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
      this.$http('post', '/student/insert', this.form)
      location.reload()
    },
    // 删除
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http('post', '/student/delete', { sno: row.sno }).then(response => {
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
      this.$http('post', '/student/Studentquery', { sno: row.sno }).then(response => {
        this.form = response[0]
      })
    },
    // 提交
    editStudent () {
      this.$http('post', '/student/update', this.form).then(response => {
        location.reload()
      })
    }
  }
}
</script>

<style scoped>

</style>

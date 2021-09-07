<template>
  <el-container>
    <el-header>
      <el-button size="mini" type="button" icon="el-icon-plus" @click="AdddialogVisible = true" circle>
      </el-button>
    </el-header>
    <el-table :data="tableData" height="250" style="width: 100%">
      <el-table-column fixed prop="name" label="姓名" width="90" align="center"/>
      <el-table-column prop="sno" label="学号" width="100" align="center"/>
      <el-table-column prop="org_name" label="支部名称" width="140" align="center"/>
      <el-table-column prop="college" label="学院" width="130" align="center"/>
      <el-table-column prop="grade" label="年级" width="100" align="center"/>
      <el-table-column prop="sex" label="性别" width="50" align="center"/>
      <el-table-column prop="nation" label="民族" width="80" align="center"/>
      <el-table-column prop="birthday" label="出生日期" width="100" align="center"/>
      <el-table-column prop="card" label="身份证号码" width="180" align="center"/>
      <el-table-column prop="nativtion" label="籍贯" width="90" align="center"/>
      <el-table-column prop="address" label="住址" width="210" align="center"/>
      <el-table-column prop="telephone" label="联系电话" width="110" align="center"/>
      <el-table-column prop="workplace" label="工作单位及职务" width="150" align="center"/>
      <el-table-column prop="sqrd_time" label="申请入党时间" width="140" align="center"/>
      <el-table-column prop="jjfz_time" label="确认为入党积极分子时间" width="180" align="center"/>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"
                     circle>
          </el-button>
          <el-button size="mini" type="primary" icon="el-icon-edit"
                     @click="handleEdit(scope.$index, scope.row);EditdialogVisible = true" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增表单-->
    <el-dialog title="新增学生信息" :visible.sync="AdddialogVisible" width="70%">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="学号" prop="sno">
          <el-input v-model="form.sno"></el-input>
        </el-form-item>
        <el-form-item label="支部名称" prop="org_name">
          <el-input v-model="form.org_name"></el-input>
        </el-form-item>
        <el-form-item label="支部书记" prop="org_present">
          <el-input v-model="form.org_present"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="form.college"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="form.grade"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="form.nation"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-input v-model="form.birthday"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="card">
          <el-input v-model="form.card"></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="nativtion">
          <el-input v-model="form.nativtion"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item label="工作地址及职务" prop="workplace">
          <el-input v-model="form.workplace"></el-input>
        </el-form-item>
        <el-form-item label="申请入党时间" prop="sqrd_time">
          <el-input v-model="form.sqrd_time"></el-input>
        </el-form-item>
        <el-form-item label="确认为积极分子时间" prop="jjfz_time">
          <el-input v-model="form.jjfz_time"></el-input>
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
  name: 'DT-jjfz',
  mounted: function () {
    this.$http('get', '/student/query', localStorage.getItem('Authorization')).then(response => {
      this.tableData = response
    })
  },
  data () {
    return {
      AdddialogVisible: false,
      EditdialogVisible: false,
      form: {
        sno: '',
        org_name: '',
        org_present: '',
        college: '',
        grade: '',
        name: '',
        sex: '',
        nation: '',
        birthday: '',
        card: '',
        nativtion: '',
        address: '',
        telephone: '',
        workplace: '',
        sqrd_time: '',
        jjfz_time: ''
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
el-container {
  height: 100%;
}
</style>

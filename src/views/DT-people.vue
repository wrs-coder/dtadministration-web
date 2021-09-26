<template>
  <el-container>
    <el-header style="height: 10%">
      <el-button size="mini" type="button" icon="el-icon-plus" @click="AdddialogVisible = true" circle/>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select" clearable>
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="姓名" value="name"></el-option>
            <el-option label="学号" value="uuid"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchStudent(select,search)"></el-button>
        </el-input>
      </div>
    </el-header>
    <el-table :data="tableData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名:">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="学号:">
              <span>{{ props.row.uuid }}</span>
            </el-form-item>
            <el-form-item label="支部名称:">
              <span>{{ props.row.org_name }}</span>
            </el-form-item>
            <el-form-item label="性别:">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="民族:">
              <span>{{ props.row.nation }}</span>
            </el-form-item>
            <el-form-item label="出生日期:">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="身份证号码:">
              <span>{{ props.row.card }}</span>
            </el-form-item>
            <el-form-item label="籍贯:">
              <span>{{ props.row.nativtion }}</span>
            </el-form-item>
            <el-form-item label="住址:">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="联系电话:">
              <span>{{ props.row.telephone }}</span>
            </el-form-item>
            <el-form-item label="工作单位及职务:">
              <span>{{ props.row.workplace }}</span>
            </el-form-item>
            <el-form-item label="类别:">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="申请入党时间:">
              <span>{{ props.row.sqrd_time }}</span>
            </el-form-item>
            <el-form-item label="确认为入党积极分子时间:">
              <span>{{ props.row.jjfz_time }}</span>
            </el-form-item>
            <el-form-item label="列为发展对象时间:">
              <span>{{ props.row.fzdx_time }}</span>
            </el-form-item>
            <el-form-item label="入党时间:">
              <span>{{ props.row.rd_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150" align="center"/>
      <el-table-column prop="uuid" label="学号" width="150" align="center"/>
      <el-table-column prop="type" label="类别" width="150" align="center"/>
      <el-table-column prop="org_name" label="支部名称" width="150" align="center"/>
      <el-table-column prop="sex" label="性别" width="100" align="center"/>
      <el-table-column prop="nativtion" label="籍贯" width="100" align="center"/>
      <el-table-column prop="address" label="住址" width="250" align="center"/>
      <el-table-column prop="telephone" label="联系电话" width="200" align="center"/>
      <el-table-column label="操作" align="center">
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
    <el-dialog title="新增学生信息" :visible.sync="AdddialogVisible">
      <el-form :rules="addRules" ref="form" :model="form" label-width="150px">
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="学号" prop="uuid">
              <el-input v-model="form.uuid" oninput="value=value.replace(/[^\d]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="支部名称" prop="org_name">
              <el-select v-model="form.org_name" placeholder="请选择所在支部名称" style="width: 100%;">
                <el-option label="本科生第一党支部" value="本科生第一党支部"/>
                <el-option label="本科生第二党支部" value="本科生第二党支部"/>
                <el-option label="本科生第三党支部" value="本科生第三党支部"/>
                <el-option label="本科生第四党支部" value="本科生第四党支部"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="支部书记" prop="org_present">
              <el-select v-model="form.org_present" placeholder="请选择支部书记" style="width: 100%;">
                <el-option label="杨莉" value="杨莉"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择性别" style="width: 100%;">
                <el-option label="男" value="男"/>
                <el-option label="女" value="女"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="民族" prop="nation">
              <el-input v-model="form.nation"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.birthday"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="身份证号" prop="card">
              <el-input v-model="form.card"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="籍贯" prop="nativtion">
              <el-input v-model="form.nativtion"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="住址" prop="address">
              <el-input v-model="form.address"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="联系电话" prop="telephone">
              <el-input v-model="form.telephone" oninput="value=value.replace(/[^\d]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="类别" prop="type">
              <el-select v-model="form.type" placeholder="请选择性别" style="width: 100%;">
                <el-option label="积极分子" value="积极分子"/>
                <el-option label="发展对象" value="发展对象"/>
                <el-option label="预备党员" value="预备党员"/>
                <el-option label="正式党员" value="正式党员"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="申请入党时间" prop="sqrd_time">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.sqrd_time"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="确认为积极分子时间" prop="jjfz_time">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.jjfz_time"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="列为发展对象时间" prop="fzdx_time">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.fzdx_time"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="入党时间" prop="rd_time">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.rd_time"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="工作地址及职务" prop="workplace">
              <el-input v-model="form.workplace"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent();AdddialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改表单-->
    <el-dialog title="修改学生信息" :visible.sync="EditdialogVisible">
      <el-form :rules="editRules" ref="editForm" :model="editForm" label-width="150px">
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="学号" prop="uuid">
              <el-input v-model="editForm.uuid" :disabled="true" oninput="value=value.replace(/[^\d]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="支部名称" prop="org_name">
              <el-select v-model="editForm.org_name" placeholder="请选择所在支部名称" style="width: 100%;">
                <el-option label="本科生第一党支部" value="本科生第一党支部"/>
                <el-option label="本科生第二党支部" value="本科生第二党支部"/>
                <el-option label="本科生第三党支部" value="本科生第三党支部"/>
                <el-option label="本科生第四党支部" value="本科生第四党支部"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="支部书记" prop="org_present">
              <el-select v-model="editForm.org_present" placeholder="请选择支部书记" style="width: 100%;">
                <el-option label="杨莉" value="杨莉"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="editForm.name"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="editForm.sex" placeholder="请选择性别" style="width: 100%;">
                <el-option label="男" value="男"/>
                <el-option label="女" value="女"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="民族" prop="nation">
              <el-input v-model="editForm.nation"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="editForm.birthday"
                              style="width: 100%;"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="身份证号" prop="card">
              <el-input v-model="editForm.card"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="籍贯" prop="nativtion">
              <el-input v-model="editForm.nativtion"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="住址" prop="address">
              <el-input v-model="editForm.address"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="联系电话" prop="telephone">
              <el-input v-model="editForm.telephone" oninput="value=value.replace(/[^\d]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="类别" prop="type">
              <el-select v-model="editForm.type" placeholder="请选择性别" style="width: 100%;">
                <el-option label="积极分子" value="积极分子"/>
                <el-option label="发展对象" value="发展对象"/>
                <el-option label="预备党员" value="预备党员"/>
                <el-option label="正式党员" value="正式党员"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="申请入党时间" prop="sqrd_time">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="editForm.sqrd_time"
                              style="width: 100%;"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="确认为积极分子时间" prop="jjfz_time">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="editForm.jjfz_time"
                              style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="列为发展对象时间" prop="fzdx_time">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="editForm.fzdx_time"
                              style="width: 100%;"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="入党时间" prop="rd_time">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="editForm.rd_time"
                              style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="工作地址及职务" prop="workplace">
              <el-input v-model="editForm.workplace"/>
            </el-form-item>
          </el-col>
        </el-row>
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
  name: 'DT-people',
  mounted: function () {
    this.$http('post', '/api/query', { tableName: 'DT_people' }).then(response => {
      this.tableData = response
    })
  },
  data () {
    return {
      search: '',
      select: '',
      AdddialogVisible: false,
      EditdialogVisible: false,
      editForm: {},
      form: {
        uuid: '',
        org_name: '',
        org_present: '',
        name: '',
        sex: '',
        nation: '',
        birthday: '',
        card: '',
        nativtion: '',
        address: '',
        telephone: '',
        workplace: '',
        type: '',
        sqrd_time: '',
        jjfz_time: '',
        fzdx_time: '',
        rd_time: ''
      },
      tableData: null,
      addRules: {
        uuid: [
          {
            required: true,
            message: '请输入学生学号',
            trigger: 'blur'
          }
        ],
        org_name: [
          {
            required: true,
            message: '请选择支部名称',
            trigger: 'change'
          }
        ],
        org_present: [
          {
            required: true,
            message: '请选择支部书记',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        nation: [
          {
            required: true,
            message: '请输入民族',
            trigger: 'blur'
          }
        ],
        birthday: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        card: [
          {
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
          }
        ],
        nativtion: [
          {
            required: true,
            message: '请输入籍贯',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入住址',
            trigger: 'blur'
          }
        ],
        telephone: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          }
        ],
        workplace: [
          {
            required: true,
            message: '请输入工作地址及职务',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }
        ],
        sqrd_time: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }
        ]
      },
      editRules: {
        uuid: [
          {
            required: true,
            message: '请输入学生学号',
            trigger: 'blur'
          }
        ],
        org_name: [
          {
            required: true,
            message: '请选择支部名称',
            trigger: 'change'
          }
        ],
        org_present: [
          {
            required: true,
            message: '请选择支部书记',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        nation: [
          {
            required: true,
            message: '请输入民族',
            trigger: 'blur'
          }
        ],
        birthday: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        card: [
          {
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
          }
        ],
        nativtion: [
          {
            required: true,
            message: '请输入籍贯',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入住址',
            trigger: 'blur'
          }
        ],
        telephone: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          }
        ],
        workplace: [
          {
            required: true,
            message: '请输入工作地址及职务',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }
        ],
        sqrd_time: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 搜索
    searchStudent (select, search) {
      this.$http('post', '/api/search', {
        type: select,
        content: search,
        tableName: 'DT_people'
      }).then(response => {
        this.tableData = response
      })
    },
    // 新增
    addStudent () {
      this.$http('post', '/api/insertPeople', this.form).then(() => {
        this.$http('post', '/api/query', { tableName: 'DT_people' }).then(response => {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.tableData = response
          this.$refs.form.resetFields()
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
        const queryList = {
          name: row.uuid,
          tableName: 'DT_people'
        }
        this.$http('post', 'api/StudentQuery', { queryList: queryList }).then(response => {
          const deleteList = {
            uuid: response[0].uuid,
            tableName: 'DT_people'
          }
          this.$http('post', '/api/delete', { deleteList: deleteList }).then(response => {
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
      const queryList = {
        name: row.uuid,
        tableName: 'DT_people'
      }
      this.$http('post', '/api/StudentQuery', { queryList: queryList }).then(response => {
        this.editForm = response[0]
      })
    },
    // 提交
    editStudent () {
      this.$http('post', '/api/updatePeople', this.editForm).then(response => {
        this.$http('post', '/api/query', { tableName: 'DT_people' }).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.tableData = response
        })
      })
    }
  }
}
</script>

<style scoped>
.el-input .el-select {
  width: 100px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

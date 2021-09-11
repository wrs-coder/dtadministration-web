<template>
  <el-container>
    <el-header>
      <el-button size="mini" type="button" icon="el-icon-plus" @click="AdddialogVisible = true" circle/>
    </el-header>
    <el-table :data="tableData" height="250" style="width: 100%">
      <el-table-column fixed prop="name" label="姓名" width="90" align="center"/>
      <el-table-column prop="uuid" label="学号" width="100" align="center"/>
      <el-table-column prop="org_name" label="支部名称" width="140" align="center"/>
      <el-table-column prop="sex" label="性别" width="50" align="center"/>
      <el-table-column prop="nation" label="民族" width="80" align="center"/>
      <el-table-column prop="birthday" label="出生日期" width="120" align="center"/>
      <el-table-column prop="card" label="身份证号码" width="180" align="center"/>
      <el-table-column prop="nativtion" label="籍贯" width="90" align="center"/>
      <el-table-column prop="address" label="住址" width="210" align="center"/>
      <el-table-column prop="telephone" label="联系电话" width="110" align="center"/>
      <el-table-column prop="workplace" label="工作单位及职务" width="150" align="center"/>
      <el-table-column prop="type" label="类别" width="150" align="center"/>
      <el-table-column prop="sqrd_time" label="申请入党时间" width="140" align="center"/>
      <el-table-column prop="jjfz_time" label="确认为入党积极分子时间" width="180" align="center"/>
      <el-table-column prop="fzdx_time" label="列为发展对象时间" width="180" align="center"/>
      <el-table-column prop="rd_time" label="入党时间" width="180" align="center"/>
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
              <el-input v-model="editForm.uuid" oninput="value=value.replace(/[^\d]/g,'')"/>
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
el-container {
  height: 100%;
}
</style>

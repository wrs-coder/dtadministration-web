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
      <el-form :rules="rules" ref="form" :model="form" label-width="190px">
        <el-row>
          <el-col span="10">
            <el-form-item label="学号">
              <el-input v-model="form.uuid"/>
            </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="支部名称">
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
          <el-col span="10">
            <el-form-item label="支部书记">
              <el-select v-model="form.org_present" placeholder="请选择支部书记" style="width: 100%;">
                <el-option label="杨莉" value="杨莉"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="姓名">
              <el-input v-model="form.name"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="10">
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="请选择性别" style="width: 100%;">
                <el-option label="男" value="男"/>
                <el-option label="女" value="女"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="民族">
              <el-input v-model="form.nation"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="10">
            <el-form-item label="出生日期">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.birthday"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="身份证号">
              <el-input v-model="form.card"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="10">
            <el-form-item label="籍贯">
              <el-input v-model="form.nativtion"/>
            </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="住址">
              <el-input v-model="form.address"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="10">
            <el-form-item label="联系电话">
              <el-input v-model="form.telephone"/>
            </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="类别">
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
          <el-col span="10">
            <el-form-item label="申请入党时间">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.sqrd_time"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="确认为积极分子时间">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.jjfz_time"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="10">
            <el-form-item label="列为发展对象时间">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.fzdx_time"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col span="10">
            <el-form-item label="入党时间">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.rd_time"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="20">
            <el-form-item label="工作地址及职务">
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
    <el-dialog title="修改学生信息" :visible.sync="EditdialogVisible" width="30%">
      <el-form ref="form" :model="{form}" label-width="80px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="学号">
              <el-input v-model="form.uuid">{{ this.form.uuid }}</el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="支部名称">
              <el-select v-model="form.org_name" placeholder="请选择所在支部名称" style="width: 100%;">
                {{ this.form.org_name }}
                <el-option label="本科生第一党支部" value="本科生第一党支部"/>
                <el-option label="本科生第二党支部" value="本科生第二党支部"/>
                <el-option label="本科生第三党支部" value="本科生第三党支部"/>
                <el-option label="本科生第四党支部" value="本科生第四党支部"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="支部书记">
              <el-select v-model="form.org_present" placeholder="请选择支部书记" style="width: 100%;">
                {{ this.form.org_present }}
                <el-option label="杨莉" value="杨莉"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="姓名">
              <el-input v-model="form.name"> {{ this.form.name }}</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="请选择性别" style="width: 100%;">
                {{ this.form.sex }}
                <el-option label="男" value="男"/>
                <el-option label="女" value="女"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="民族">
              <el-input v-model="form.nation">{{ this.form.nation }}</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="出生日期">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.birthday"
                              style="width: 100%;">{{ this.form.birthday }}
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证号">
              <el-input v-model="form.card">{{ this.form.card }}</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="籍贯">
              <el-input v-model="form.nativtion">{{ this.form.nativtion }}</el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="住址">
              <el-input v-model="form.address">{{ this.form.address }}</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="联系电话">
              <el-input v-model="form.telephone">{{ this.form.telephone }}</el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="类别">
              <el-select v-model="form.type" placeholder="请选择性别" style="width: 100%;">
                {{ this.form.type }}
                <el-option label="积极分子" value="积极分子"/>
                <el-option label="发展对象" value="发展对象"/>
                <el-option label="预备党员" value="预备党员"/>
                <el-option label="正式党员" value="正式党员"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="申请入党时间">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.sqrd_time"
                              style="width: 100%;">{{ this.form.sqrd_time }}
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="确认为积极分子时间">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.jjfz_time"
                              style="width: 100%;">{{ this.form.jjfz_time }}
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="列为发展对象时间">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.fzdx_time"
                              style="width: 100%;">{{ this.form.fzdx_time }}
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="入党时间">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="form.rd_time"
                              style="width: 100%;">{{ this.form.rd_time }}
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="工作地址及职务">
              <el-input v-model="form.workplace">{{ this.form.workplace }}</el-input>
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
      rules: {
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
        this.$http('post', 'api/Studentquery', { queryList: queryList }).then(response => {
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
      this.$http('post', '/api/Studentquery', { queryList: queryList }).then(response => {
        this.form = response[0]
      })
    },
    // 提交
    editStudent () {
      this.$http('post', '/api/updatePeople', this.form).then(response => {
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

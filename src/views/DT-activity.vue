<template>
  <el-container>
    <el-header>
      <el-button size="mini" type="button" icon="el-icon-plus" @click="addEvent();AdddialogVisible = true" circle/>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="活动名称" width="180" align="center"/>
        <el-table-column prop="startTime" label="开始时间" width="180" align="center"/>
        <el-table-column prop="endTime" label="结束时间" width="180" align="center"/>
        <el-table-column label="详情" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="showMessage(scope.$index, scope.row);dialogTableVisible = true">详情
            </el-button>
            <el-dialog title="详情" :visible.sync="dialogTableVisible">
              <el-table :data="gridData">
                <el-table-column property="name" label="姓名" width="150"></el-table-column>
                <el-table-column property="type" label="类别" width="150"></el-table-column>
                <el-table-column property="sno" label="学号"></el-table-column>
              </el-table>
            </el-dialog>
          </template>
        </el-table-column>
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
      <el-form :rules="addRules" ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始时间" v-model="form.startTime"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束时间" v-model="form.endTime"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="参与人员" prop="member">
          <el-select v-model="form.member" multiple placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.name"
              :value="item.uuid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent();AdddialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改表单-->
    <el-dialog title="修改活动信息" :visible.sync="EditdialogVisible" width="30%">
      <el-form :rules="editRules" ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="editForm.name"/>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始时间" v-model="editForm.startTime"
                              style="width: 100%;"/>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束时间" v-model="editForm.endTime"
                              style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="参与人员" prop="member">
          <el-input v-model="editForm.member" oninput="value=value.replace(/[^\d]/g,'')"/>
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
  name: 'DT-activity',
  mounted: function () {
    this.$http('post', '/api/query', { tableName: 'DT_activity' }).then(response => {
      this.tableData = response
    })
  },
  data () {
    return {
      AdddialogVisible: false,
      EditdialogVisible: false,
      dialogTableVisible: false,
      options: {},
      editForm: {},
      form: {
        name: '',
        startTime: '',
        endTime: ''
      },
      tableData: null,
      gridData: null,
      addRules: {
        name: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'change'
          }
        ],
        endTime: [
          {
            required: true,
            message: '请选择结束时间',
            trigger: 'change'
          }
        ],
        member: [
          {
            required: true,
            message: '请选择人员',
            trigger: 'blur'
          }
        ]
      },
      editRules: {
        name: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'change'
          }
        ],
        endTime: [
          {
            required: true,
            message: '请选择结束时间',
            trigger: 'change'
          }
        ],
        member: [
          {
            required: true,
            message: '请选择人员',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 查询人员信息
    addEvent () {
      this.$http('post', '/api/query', { tableName: 'DT_people' }).then(response => {
        this.options = response
      })
    },
    // 展示活动详情
    showMessage (index, row) {
      const queryList = {
        name: row.name,
        tableName: 'DT_activity'
      }
      this.$http('post', '/api/StudentQuery', { queryList: queryList }).then(response => {
        this.gridData = response
      })
    },
    // 新增活动
    addStudent () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.member) {
            this.form.member = this.form.member.join(',')
          }
        }
      })
      this.$http('post', '/api/insertActivity', {
        name: this.form.name,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        member: this.form.member
      }).then(() => {
        this.$http('post', '/api/query', { tableName: 'DT_activity' }).then(response => {
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
          name: row.name,
          tableName: 'DT_activity'
        }
        this.$http('post', 'api/StudentQuery', { queryList: queryList }).then(response => {
          const deleteList = {
            uuid: response[0].uuid,
            tableName: 'DT_activity'
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
    // 修改前查询活动信息
    handleEdit (index, row) {
      const queryList = {
        name: row.name,
        tableName: 'DT_activity'
      }
      this.$http('post', '/api/StudentQuery', { queryList: queryList }).then(response => {
        this.editForm = response[0]
      })
    },
    // 提交
    editStudent () {
      this.$http('post', '/api/updateActivity', this.editForm).then(response => {
        this.$http('post', '/api/query', { tableName: 'DT_activity' }).then(response => {
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

</style>

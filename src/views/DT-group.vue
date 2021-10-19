<template>
  <el-container>
    <el-header style="height: 10%">
      <el-button size="mini" type="button" icon="el-icon-plus" @click="AdddialogVisible = true" circle/>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180"/>
        <el-table-column prop="type" label="批次类型" width="180"/>
        <el-table-column prop="time" label="建立时间" width="180"/>
        <el-table-column prop="number" label="批次人数" width="180"/>
        <el-table-column prop="file" label="附件" width="180"/>
        <el-table-column label="详情" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="showMessage(scope.$index, scope.row);dialogTableVisible = true">详情
            </el-button>
            <el-dialog title="详情" :visible.sync="dialogTableVisible">
              <el-table :data="gridData">
                <el-table-column property="uuid" label="学号" width="150" align="center"/>
                <el-table-column property="name" label="姓名" width="150" align="center"/>
                <el-table-column property="sex" label="性别" width="100" align="center"/>
                <el-table-column property="type" label="类别" width="150" align="center"/>
                <el-table-column property="org_name" label="支部名称" align="center"/>
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
    <el-dialog title="新增批次" :visible.sync="AdddialogVisible" width="30%">
      <el-form :rules="addRules" ref="form" :model="form" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="批次类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型" style="width: 100%;">
            <el-option label="入党积极分子" value="入党积极分子"/>
            <el-option label="发展对象" value="发展对象"/>
            <el-option label="预备党员" value="预备党员"/>
          </el-select>
        </el-form-item>
        <el-form-item label="建立时间" required>
          <el-form-item prop="time">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始时间" v-model="form.time"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="批次人数" prop="number">
          <el-input v-model="form.number" oninput="value=value.replace(/[^\d]/g,'')"/>
        </el-form-item>
        <el-form-item label="附件">
          <FileUpload></FileUpload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGroup();AdddialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改表单-->
    <el-dialog title="修改活动信息" :visible.sync="EditdialogVisible" width="30%">
      <el-form :rules="editRules" ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name"/>
        </el-form-item>
        <el-form-item label="批次类型" prop="type">
          <el-select v-model="editForm.type" placeholder="请选择类型" style="width: 100%;">
            <el-option label="入党积极分子" value="入党积极分子"/>
            <el-option label="发展对象" value="发展对象"/>
            <el-option label="预备党员" value="预备党员"/>
          </el-select>
        </el-form-item>
        <el-form-item label="建立时间" required>
          <el-form-item prop="time">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始时间" v-model="editForm.time"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="批次人数" prop="number">
          <el-input v-model="editForm.number" oninput="value=value.replace(/[^\d]/g,'')"/>
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
import FileUpload from '../components/fileUpload.vue'

export default {
  name: 'DT-group',
  mounted: function () {
    this.$http('post', '/api/query', { tableName: 'DT_group' }).then(response => {
      this.tableData = response
    })
  },
  components: {
    FileUpload
  },
  data () {
    return {
      AdddialogVisible: false,
      EditdialogVisible: false,
      dialogTableVisible: false,
      tableData: null,
      gridData: null,
      form: {
        name: '',
        type: '',
        time: '',
        number: ''
      },
      editForm: {},
      addRules: {},
      editRules: {}
    }
  },
  methods: {
    // 新增批次
    addGroup () {
      const insertList = {
        name: this.form.name + this.form.type,
        type: this.form.type,
        time: this.form.time,
        number: this.form.number
      }
      this.$http('post', '/api/insertGroup', insertList).then(() => {
        this.$http('post', '/api/query', { tableName: 'DT_group' }).then(response => {
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
          tableName: 'DT_group'
        }
        this.$http('post', 'api/StudentQuery', { queryList: queryList }).then(response => {
          const deleteList = {
            uuid: response[0].uuid,
            tableName: 'DT_group'
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
        tableName: 'DT_group'
      }
      this.$http('post', '/api/StudentQuery', { queryList: queryList }).then(response => {
        this.editForm = response[0]
      })
    },
    // 展示活动详情
    showMessage (index, row) {
      const queryList = {
        name: row.name,
        tableName: 'DT_group'
      }
      this.$http('post', '/api/StudentQuery', { queryList: queryList }).then(response => {
        this.gridData = response
      })
    }
  }
}
</script>

<style scoped>

</style>

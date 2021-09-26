<template>
  <el-container>
    <el-header style="height: 10%">
      <el-button size="mini" type="button" icon="el-icon-plus" @click="AdddialogVisible = true" circle/>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select" clearable>
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="批次名称" value="name"></el-option>
            <el-option label="建立时间" value="time"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchStudent(select,search)"></el-button>
        </el-input>
      </div>
    </el-header>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="批次名称" width="180"/>
        <el-table-column prop="type" label="批次类型" width="180"/>
        <el-table-column prop="time" label="建立时间" width="180"/>
        <el-table-column prop="people" label="批次人数" width="180">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="showRow(scope.$index, tableData)"
              type="text"
              size="small">
              {{ form.number }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="file" label="附件" width="180"/>
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
        <el-form-item label="批次名称" prop="name">
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
        <el-form-item label="附件资料" prop="file">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent();AdddialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改表单-->
    <el-dialog title="修改批次信息" :visible.sync="EditdialogVisible" width="30%">
      <el-form :rules="editRules" ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="批次名称" prop="name">
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
        <el-form-item label="附件资料" prop="file">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStudent();EditdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批次详情 -->
    <el-dialog title="批次详情" :visible.sync="DiscribedialogVisible">
      <el-descriptions class="margin-top" title="带边框列表" :column="3" :size="size" border>
        <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            居住地
          </template>
          苏州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
          </template>
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            联系地址
          </template>
          江苏省苏州市吴中区吴中大道 1188 号
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'DT-group',
  mounted: function () {
    this.$http('post', '/api/query', { tableName: 'DT_group' }).then(response => {
      this.tableData = response
    })
  },
  data () {
    return {
      AdddialogVisible: false,
      EditdialogVisible: false,
      DiscribedialogVisible: false,
      search: '',
      select: '',
      size: '',
      editForm: {},
      form: {
        name: '',
        type: '',
        time: '',
        number: ''
      },
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      tableData: null,
      addRules: {
        name: [
          {
            required: true,
            message: '请输入批次名称',
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
        time: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        number: [
          {
            required: true,
            message: '请输入人数',
            trigger: 'blur'
          }
        ]
      },
      editRules: {
        name: [
          {
            required: true,
            message: '请输入批次名称',
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
        time: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        number: [
          {
            required: true,
            message: '请输入人数',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 查看批次详细信息
    showRow (index, tableData) {
    },
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
    },
    // 文档上传操作
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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

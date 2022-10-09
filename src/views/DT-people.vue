<template>
  <el-container>
    <el-header style="height: 10%">
      <el-button size="mini" type="button" icon="el-icon-plus" @click="AdddialogVisible = true" circle/>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select" clearable @keyup.enter.native="searchStu(select,search)">
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
      <el-table-column prop="name" label="姓名" width="100" align="center"/>
      <el-table-column prop="uuid" label="学号" width="150" align="center"/>
      <el-table-column prop="type" label="类别" width="150" align="center"/>
      <el-table-column prop="org_name" label="支部名称" width="150" align="center"/>
      <el-table-column prop="sex" label="性别" width="100" align="center"/>
      <el-table-column prop="nativtion" label="籍贯" width="100" align="center"/>
      <el-table-column prop="address" label="住址" width="240" align="center"/>
      <el-table-column prop="telephone" label="联系电话" width="200" align="center"/>
      <el-table-column label="操作"  width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" circle/>
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row);EditdialogVisible = true" circle/>
        </template>
      </el-table-column>
    </el-table>
    <!--新增表单-->
    <el-dialog title="新增学生信息" :visible.sync="AdddialogVisible">
      <el-form :rules="addRules" ref="form" :model="form" label-width="150px">
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="学号" prop="uuid">
              <el-input v-model="form.uuid" placeholder="请输入学号" oninput="value=value.replace(/[^\d]/g,'')"/>
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
                <el-option label="王彩霞" value="王彩霞"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"/>
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
              <NationSelect :nationV='form.nation' @nationvalue='nationvalueChange'></NationSelect>
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
              <el-input v-model="form.card" placeholder="请输入身份证号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="籍贯" prop="nativtion">
              <el-input v-model="form.nativtion" placeholder="请输入籍贯"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="住址" prop="address">
              <el-input v-model="form.address" placeholder="请输入住址"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="联系电话" prop="telephone">
              <el-input v-model="form.telephone" placeholder="请选择联系电话" oninput="value=value.replace(/[^\d]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="类别" prop="type">
              <el-select v-model="form.type" placeholder="请选择性别" style="width: 100%;">
                <el-option label="积极分子" value="积极分子"/>
                <el-option label="发展对象" value="发展对象"/>
                <el-option label="中共预备党员" value="中共预备党员"/>
                <el-option label="党员" value="党员"/>
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
              <el-input v-model="form.workplace" placeholder="请输入工作地址及职务"/>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="批次" prop="group">
              <el-input v-model="form.group"/>
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
                <el-option label="王彩霞" value="王彩霞"/>
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
              <el-select v-model="editForm.nation" placeholder="请选择民族">
                <el-option v-for="item in nationList" :key="item.value" :label="item.info" :value="item.value"></el-option>
              </el-select>
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
                <el-option label="中共预备党员" value="中共预备党员"/>
                <el-option label="党员" value="党员"/>
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
          <el-col :xs="4" :md="10" :lg="12">
            <el-form-item label="批次" prop="group">
              <el-select v-model="form.group" placeholder="请选择">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.name"
                  :value="item.uuid">
                </el-option>
              </el-select>
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
import NationSelect from '../components/nationSelect'
export default {
  name: 'DT-people',
  components: { NationSelect },
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
      nationList: [
        {
          id: 1,
          info: '汉族',
          value: '汉族'
        },
        {
          id: 2,
          info: '壮族',
          value: '壮族'
        },
        {
          id: 3,
          info: '满族',
          value: '满族'
        },
        {
          id: 4,
          info: '回族',
          value: '回族'
        },
        {
          id: 5,
          info: '苗族',
          value: '苗族'
        },
        {
          id: 6,
          info: '维吾尔族',
          value: '维吾尔族'
        },
        {
          id: 7,
          info: '土家族',
          value: '土家族'
        },
        {
          id: 8,
          info: '彝族',
          value: '彝族'
        },
        {
          id: 9,
          info: '蒙古族',
          value: '蒙古族'
        },
        {
          id: 10,
          info: '藏族',
          value: '藏族'
        },
        {
          id: 11,
          info: '布依族',
          value: '布依族'
        },
        {
          id: 12,
          info: '侗族',
          value: '侗族'
        },
        {
          id: 13,
          info: '瑶族',
          value: '瑶族'
        },
        {
          id: 14,
          info: '朝鲜族',
          value: '朝鲜族'
        },
        {
          id: 15,
          info: '白族',
          value: '白族'
        },
        {
          id: 16,
          info: '哈尼族',
          value: '哈尼族'
        },
        {
          id: 17,
          info: '哈萨克族',
          value: '哈萨克族'
        },
        {
          id: 18,
          info: '黎族',
          value: '黎族'
        },
        {
          id: 19,
          info: '傣族',
          value: '傣族'
        },
        {
          id: 20,
          info: '畲族',
          value: '畲族'
        },
        {
          id: 21,
          info: '傈僳族',
          value: '傈僳族'
        },
        {
          id: 22,
          info: '仡佬族',
          value: '仡佬族'
        },
        {
          id: 23,
          info: '东乡族',
          value: '东乡族'
        },
        {
          id: 24,
          info: '高山族',
          value: '高山族'
        },
        {
          id: 25,
          info: '拉祜族',
          value: '拉祜族'
        },
        {
          id: 26,
          info: '水族',
          value: '水族'
        },
        {
          id: 27,
          info: '佤族',
          value: '佤族'
        },
        {
          id: 28,
          info: '纳西族',
          value: '纳西族'
        },
        {
          id: 29,
          info: '羌族',
          value: '羌族'
        },
        {
          id: 30,
          info: '土族',
          value: '土族'
        },
        {
          id: 31,
          info: '仫佬族',
          value: '仫佬族'
        },
        {
          id: 32,
          info: '锡伯族',
          value: '锡伯族'
        },
        {
          id: 33,
          info: '柯尔克孜族',
          value: '柯尔克孜族'
        },
        {
          id: 34,
          info: '达斡尔族',
          value: '达斡尔族'
        },
        {
          id: 35,
          info: '景颇族',
          value: '景颇族'
        },
        {
          id: 36,
          info: '毛南族',
          value: '毛南族'
        },
        {
          id: 37,
          info: '撒拉族',
          value: '撒拉族'
        },
        {
          id: 38,
          info: '布朗族',
          value: '布朗族'
        },
        {
          id: 39,
          info: '塔吉克族',
          value: '塔吉克族'
        },
        {
          id: 40,
          info: '阿昌族',
          value: '阿昌族'
        },
        {
          id: 41,
          info: '普米族',
          value: '普米族'
        },
        {
          id: 42,
          info: '鄂温克族',
          value: '鄂温克族'
        },
        {
          id: 43,
          info: '怒族',
          value: '怒族'
        },
        {
          id: 44,
          info: '京族',
          value: '京族'
        },
        {
          id: 45,
          info: '基诺族',
          value: '基诺族'
        },
        {
          id: 46,
          info: '德昂族',
          value: '德昂族'
        },
        {
          id: 47,
          info: '保安族',
          value: '保安族'
        },
        {
          id: 48,
          info: '俄罗斯族',
          value: '俄罗斯族'
        },
        {
          id: 49,
          info: '裕固族',
          value: '裕固族'
        },
        {
          id: 50,
          info: '乌孜别克族',
          value: '乌孜别克族'
        },
        {
          id: 51,
          info: '门巴族',
          value: '门巴族'
        },
        {
          id: 52,
          info: '鄂伦春族',
          value: '鄂伦春族'
        },
        {
          id: 53,
          info: '独龙族',
          value: '独龙族'
        },
        {
          id: 54,
          info: '塔塔尔族',
          value: '塔塔尔族'
        },
        {
          id: 55,
          info: '赫哲族',
          value: '赫哲族'
        },
        {
          id: 56,
          info: '珞巴族',
          value: '珞巴族'
        }
      ],
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
        rd_time: '',
        group: ''
      },
      tableData: null,
      options: [],
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
    // 接收民族改变值
    nationvalueChange (data) {
      this.form.nation = data
    },
    // 回车搜索
    searchStu (select, search) {
      this.searchStudent(select, search)
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

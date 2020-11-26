<template>
  <div class="app-container">
    <div class="toolbar">
      <i class="el-icon-edit" />
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      :header-cell-style="{background:'#d9e1ee',color:'#606266'}"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="省份">
        <template slot-scope="scope">
          {{ scope.row.province }}
        </template>
      </el-table-column>
      <el-table-column label="市" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区/县" align="center">
        <template slot-scope="scope">
          {{ scope.row.county }}
        </template>
      </el-table-column>
      <el-table-column label="乡/镇" align="center">
        <template slot-scope="scope">
          {{ scope.row.town }}
        </template>
      </el-table-column>
      <el-table-column label="社区/村" align="center">
        <template slot-scope="scope">
          {{ scope.row.community }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editdataWindow(scope.row)">编辑</el-button>
          <el-button type="text" size="small">详细地址</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="690px"
    >
      <address-select :key="timer" :addressform="addressform" @submitFn="getAddressData" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, saveOrUpdateCommunityAddress } from '@/api/basicinfo/address'
import { AddressSelect } from '@/components'
export default {
  components: {
    AddressSelect
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      timer: '',
      list: null,
      listLoading: true,
      form: null,
      addressform: {
        province: '',
        city: '',
        county: '',
        town: '',
        community: ''
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {

  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList({
        'pageIndex': 1,
        'pageSize': 20,
        'username': 'admin'
      }).then(response => {
        this.list = response.data.rows
        this.listLoading = false
      })
    },
    editdataWindow(data) {
      // 传时间戳保证子组件重新渲染
      this.timer = new Date().getTime()
      // 缓存当前打开的地址信息
      this.addressform = data
      this.dialogFormVisible = true
    },
    // 从子组件接收提交的地址数据
    getAddressData(data) {
      // 合并对象，保留编辑地址的id
      this.addressform = { ...this.addressform, ...data }
    },
    // 提交编辑数据
    submitData() {
      this.dialogFormVisible = false
      this.addressform
      // saveOrUpdateCommunityAddress(this.addressform).then(response => {
      //   this.fetchData()
      // })
    }
  }
}
</script>
<style scoped>
.toolbar {
  width: 20%;
  float: right;
}
</style>

<template>
  <div>
    <el-form :label-width="formLabelWidth">
      <el-form-item label="省市区">
        <el-select v-model="province" style="width:167px;margin-right: 25px;">
          <el-option v-for="option in list" :key="option.name" :value="option.name">
            {{ option.name }}
          </el-option>
        </el-select>
        <el-select v-model="city" style="width:167px;margin-right: 25px;">
          <el-option v-for="option in cityArr" :key="option.code" :value="option.name">
            {{ option.name }}
          </el-option>
        </el-select>
        <el-select v-model="county" style="width:167px;margin-right: 25px;">
          <el-option v-for="option in countyArr" :key="option.code" :value="option.name">
            {{ option.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="市">

      </el-form-item>
      <el-form-item label="区/县">

      </el-form-item> -->
      <el-form-item label="乡/镇" class="form-inline">
        <el-select v-model="town" style="width:167px;margin-right: 25px;">
          <el-option v-for="option in townArr" :key="option.code" :value="option.name">
            {{ option.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="社区/村" style="float:right">
        <el-select v-model="community" style="width:167px;margin-right: 25px;">
          <el-option v-for="option in communityArr" :key="option.code" :value="option.name">
            {{ option.name }}
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import addresslist from './addressdata'
export default {
  name: 'AddressSelect',
  props: {
    addressform: Object
  },
  data() {
    return {
      // formdata: this.addressform,
      list: addresslist.addresslist,
      province: this.addressform.province,
      city: this.addressform.city,
      county: this.addressform.county,
      town: this.addressform.town,
      community: this.addressform.community,
      cityArr: [],
      countyArr: [],
      townArr: [],
      communityArr: [],
      formLabelWidth: '70px'
    }
  },
  watch: {
    province() {
      this.updateCity()
      this.updateCounty()
      this.updateTown()
      this.updateCommunity()
    },
    city() {
      this.updateCounty()
      this.updateTown()
      this.updateCommunity()
    },
    county() {
      this.updateTown()
      this.updateCommunity()
    },
    town() {
      this.updateCommunity()
    },
    community() {
      // 当社区更改时，向父组件提交表单数据
      this.$emit('submitFn', {
        province: this.province,
        city: this.city,
        county: this.county,
        town: this.town,
        community: this.community
      })
    }

  },
  beforeMount() {
    this.updateCity()
  },
  mounted() {
    this.updateCity()
    this.updateCounty()
    this.updateTown()
    this.updateCommunity()
  },
  methods: {
    updateCity() {
      if (this.province) {
        this.list.forEach((item, index) => {
          if (item.name === this.province) {
            this.cityArr = item.childs
            // this.city = item.childs[0].name
          }
        })
      }
    },
    updateCounty() {
      if (this.city) {
        this.cityArr.forEach((item, index) => {
          if (item.name === this.city) {
            this.countyArr = item.childs
            // this.county = item.childs[0].name
          }
        })
      }
    },
    updateTown() {
      if (this.county) {
        this.countyArr.forEach((item, index) => {
          if (item.name === this.county) {
            this.townArr = item.childs
            // this.town = item.childs[0].name
          }
        })
      }
    },
    updateCommunity() {
      if (this.town) {
        this.townArr.forEach((item, index) => {
          if (item.name === this.town) {
            this.communityArr = item.childs
            // this.community = item.childs[0].name
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.form-inline {
  display: inline-block;
}
</style>

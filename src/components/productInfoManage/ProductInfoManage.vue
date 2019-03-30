<template>
  <div>
    <div class="head">
      <h1 class="head-title">{{$route.meta.title}}</h1>
      <div class="head-action">
        <el-button type="primary" @click="addFundDig=true">产品品类管理</el-button>
      </div>
    </div>

    <div class="content">
      <data-tables-server  :data="ProductInfosData.content" stripe style="width: 100%" :total="ProductInfosData.total" @query-change="getData" ref="multipleTable" v-loading="loading" :pagination-props="{ pageSizes: [5, 10, 20] }"
                                :page-size="10">
        <el-table-column prop="name" width="150" label="产品名称" ></el-table-column>
        <el-table-column prop="product_code" label="产品编码" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="delFund(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </data-tables-server>
    </div>

  

      
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api from "@/utils/api";

export default {
  components: {},
  data() {
    return {
  
      addDig:false,
      updateDig:false,
  
      loading: false,
      tableProps: {
        border: false, //去掉边框
        stripe: false //去掉斑马纹
      },
      save_id: null,
      previewcol: false,
      //存放弹出框的数据
      colshowlog: {}
    };
  },
  computed: {
    ...mapState([
      'ProductInfosData'
    ])
  },
  methods: {
   ...mapActions([
          'getProductInfos'
      ]),
    async addFund(fund){
        this.loading=true;
        console.log(fund.name)
        const data=await api.addFund(fund)
        console.log(data)
        this.getData();
        this.curFund.id=0;
        this.curFund.name='';
        this.curFund.remark='';
        this.loading=false;
         this.addFundDig=false;
    },
    async editFund(fund){
        this.updateFundDig=true;
        this.curFund=fund;
        console.log(fund.id)
    },
    async updateFund(fund){
        
        this.loading = true
        await api.updateFund(fund)
        this.curFund.id=0
        this.curFund.name=''
        this.curFund.remark='';
        this.getData();
        this.loading = false
        this.updateFundDig=false;
    },
    async delFund(fund){
        this.$confirm('真的要删除此基金吗？', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.loading = true
                    const data = await api.deleteFund(fund.id)
                    console.log(data)
                    this.getData()
                    this.loading = false
                }).catch(() => {

                })
    },
    
    async getData(queryInfo) {
      console.log(this.$store.state.test)
      console.log(this.ProductInfosData)
      console.log(queryInfo)

      this.ProductInfosData.queryData={
        name:'all',
        alcoholic:'all',
        pageNo:1
      }
      // if (this.ProductInfosData.length == 0) {
      //   this.loading = true;
      // }
      // this.UsersData.queryData={
      //   offset:queryInfo.page,
      // }
      await api.getProductInfos(this.ProductInfosData.queryData);
      // console.log(data);
     

      this.loading = false;
    },
    manageData(row){
      this.$router.push({
        name: 'EditFundData',
        params:{
          id: row.id
        }
      })
    },
    manageReport(row){
      this.$router.push({
        name: 'EditFundReport',
        params:{
          id: row.id
        }
      })
    },
    manageCompany(row){
      this.$router.push({
        name: 'Company',
        params:{
          id: row.id
        }
      })
    }
    
  },
  mounted() {
    this.getData();
    console.log(this.FundData);
  },
  filters: {
    ellipsis:(value)=>{
      if (!value) return ''
      if (value.length > 20) {
        return value.slice(0,20) + '...'
      }
      return value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.AddGroup {
  color: rgb(60, 152, 255);
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
  &-div {
    margin-top: 10px;
    &-input {
      width: 40%;
    }
    &-add {
      color: rgb(60, 152, 255);
      font-size: 14px;
      margin-top: 10px;
      cursor: pointer;
      margin-left: 15px;
    }
  }
}

.class_input_width {
  width: 350px;
}

.operation_box span {
  cursor: pointer;
  color: #8e9ebb;
  margin-right: 10px;
}
.head {
  height: 70px;
  background-color: #fff;
  line-height: 70px;
  padding: 0 30px;
  margin-top: 10px;
  display: flex;

  & h1 {
    font-size: 20px;
    color: rgb(16, 16, 16);
    font-weight: 400;
    width: 180px;
  }

  &-action {
    flex: 1;
    text-align: right;

    &-search {
      width: 240px;
      margin-right: 10px;
    }
  }
}

.content {
  background-color: #fff;
  overflow: hidden;
  margin: 10px;
  padding: 15px;
  border-radius: 4px;

  &-select {
    padding: 10px 15px;
    background-color: rgb(246, 247, 248);
    position: relative;

    .line {
      position: absolute;
      width: 1px;
      height: 24px;
      background: rgb(187, 187, 187);
      left: 110px;
      top: 18px;
    }

    &-button {
      display: inline-block;
      margin-left: 60px;
    }
  }
}
</style>

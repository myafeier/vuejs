<template>
  <div>
    <div class="head">
      <h1 class="head-title">{{$route.meta.title}}</h1>
      <div class="head-action">
        <el-button type="primary" @click="addFundDig=true">新建基金</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="FundData.ListData" stripe style="width: 100%">
        <el-table-column prop="name" width="150" label="基金名称" ></el-table-column>
        <el-table-column prop="remark" label="基金注释" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="manageData(scope.row)" type="text" size="small">管理基金净值</el-button>
            <el-button @click="manageCompany(scope.row)" type="text" size="small">管理企业</el-button>
            <el-button @click="editFund(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="delFund(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新建基金" :visible.sync="addFundDig" class="previewcol">
        <div class="cl-box" style="width:100%;">
                <div class="cl-row">
                    <div class="cl-td">
                        <p>基金名称</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="curFund.name" placeholder="输入基金名称"></el-input>
                    </div>
                </div>
                <div class="cl-row">
                    <div class="cl-td">
                        <p>基金注释</p>
                    </div>
                    <div class="cl-td">
                        <el-input  type="textarea" v-model="curFund.remark" placeholder="输入基金注释"></el-input>
                    </div>
                </div>
            
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addFundDig = false">取 消</el-button>
            <el-button type="primary" @click="addFund(curFund)">提交</el-button>
        </div>
    </el-dialog>

    <el-dialog title="编辑基金" :visible.sync="updateFundDig" class="previewcol">
        <div class="cl-box" style="width:100%;">
                <div class="cl-row">
                    <div class="cl-td">
                        <p>基金名称</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="curFund.name" placeholder="输入姓名"></el-input>
                    </div>
                </div>
                <div class="cl-row">
                    <div class="cl-td">
                        <p>基金注释</p>
                    </div>
                    <div class="cl-td">
                        <el-input  type="textarea" v-model="curFund.remark" placeholder="输入基金注释"></el-input>
                    </div>
                </div>
              
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="updateFundDig = false">取 消</el-button>
            <el-button type="primary" @click="updateFund(curFund)">提交</el-button>
        </div>
    </el-dialog>
    
  </div>
</template>

<script>
// import { mapState, mapActions } from "vuex";
import api from "@/utils/api";

export default {
  components: {},
  data() {
    return {
      curFund:{
          id: 0,
          name:'',
          remark:''
      },
      addFundDig:false,
      updateFundDig:false,
      FundData: {
        ListData: [],
        total: 0
      },
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
  computed: {},
  methods: {
   
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
    
    async getData() {
      if (this.FundData.length == 0) {
        this.loading = true;
      }
      const data = await api.getFunds();
      console.log(data);
      if (data != null) {
        this.FundData.ListData = data;
      }

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

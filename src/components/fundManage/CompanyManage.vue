<template>
  <div>
    <div class="head">
      <h1 class="head-title">{{$route.meta.title}}</h1>
      <div class="head-action">
        <el-button type="primary" @click="addDig=true">新建企业</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="CompanyData.ListData" stripe style="width: 100%">
        <el-table-column prop="name" label="企业名称" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="manageReport(scope.row)" type="text" size="small">管理企业财报</el-button>
            <el-button @click="manageNews(scope.row)" type="text" size="small">管理企业新闻</el-button>
            <!-- <el-button @click="editCompany(scope.row)" type="text" size="small">编辑</el-button> -->
            <el-button @click="delCompany(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新建企业" :visible.sync="addDig" class="previewcol">
        <div class="cl-box" style="width:100%;">
                <div class="cl-row">
                    <div class="cl-td">
                        <p>企业名称</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="curCompany.name" placeholder="输入企业名称"></el-input>
                    </div>
                </div>

            
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addDig = false">取 消</el-button>
            <el-button type="primary" @click="addCompany(curCompany)">提交</el-button>
        </div>
    </el-dialog>

    <el-dialog title="编辑企业" :visible.sync="updateDig" class="previewcol">
        <div class="cl-box" style="width:100%;">
                <div class="cl-row">
                    <div class="cl-td">
                        <p>企业名称</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="curCompany.name" placeholder="输入企业名称"></el-input>
                    </div>
                </div>
          
              
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="updateDig = false">取 消</el-button>
            <el-button type="primary" @click="updateCompany(curCompany)">提交</el-button>
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
      curCompany:{
          id: 0,
          name:'',
      },
      addDig:false,
      updateDig:false,
      CompanyData: {
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
  computed: {
    currentFundId:function(){
      return parseInt(this.$route.params.id)
    }
  },
  methods: {
    initCurrentData(){
        this.curCompany.id=0;
        this.curCompany.name='';
    },
    async addCompany(company){
        this.loading=true;
        console.log(company.name)
        company.fund_id=this.currentFundId
        const data=await api.addCompany(company)
        console.log(data)
        this.getData();
        this.initCurrentData();
        this.loading=false;
         this.addDig=false;
    },
    async editCompany(company){
        this.updateDig=true;
        this.curcompany=company;
        console.log(company.id)
    },
    async updateCompany(company){
        
        this.loading = true
        await api.updateCompany(company)
        this.initCurrentData();
        this.getData();
        this.loading = false
        this.updateDig=false;
    },
    async delCompany(company){
        this.$confirm('真的要删除此基金吗？', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.loading = true
                    const data = await api.deleteCompany(company.id)
                    console.log(data)
                    this.getData()
                    this.loading = false
                }).catch(() => {

                })
    },
    
    async getData() {
      if(!this.$route.params.id){
        return
      }
      if (this.CompanyData.length == 0) {
        this.loading = true;
      }
      const data = await api.getCompanys(this.$route.params.id);
      console.log(data);
      if (data != null) {
        this.CompanyData.ListData = data;
      }

      this.loading = false;
    },

    manageReport(row){
      this.$router.push({
        name: 'EditFundReport',
        params:{
          id: row.id
        }
      })
    },
    manageNews(row){
      this.$router.push({
        name: 'EditFundNews',
        params:{
          id: row.id
        }
      })
    }
    
  },
  mounted() {
    this.getData();
    console.log(this.CompanyData);
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

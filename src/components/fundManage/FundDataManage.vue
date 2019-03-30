<template>
  <div>
    <div class="head">
      <h1 class="head-title">{{$route.meta.title}}</h1>
      <div class="head-action">
        <el-button type="primary" @click="addFundDataDig=true">新建基金数据</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="curFundData.chart_data" stripe style="width: 100%">
        <el-table-column prop="date" label="时间" width="100" ></el-table-column>
        <el-table-column prop="percent" label="百分比" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editFundData(scope)" type="text" size="small">编辑</el-button>
            <el-button @click="delFundData(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新建基金数据" :visible.sync="addFundDataDig" class="previewcol">
        <div class="cl-box" style="width:100%;">
                <div class="cl-row">
                    <div class="cl-td">
                        <p>时间</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="fundData.date" placeholder="显示在x轴的时间，尽量简短，如：19-01"></el-input>
                    </div>
                </div>
                <div class="cl-row">
                    <div class="cl-td">
                        <p>百分比</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="fundData.percent" placeholder="百分比数字，整数">
                        <template slot="append">%</template>
                        </el-input>
                    </div>
                </div>
            
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addFundDataDig = false">取 消</el-button>
            <el-button type="primary" @click="addFundData(fundData)">提交</el-button>
        </div>
    </el-dialog>

    <el-dialog title="编辑基金" :visible.sync="updateFundDataDig" class="previewcol">
        <div class="cl-box" style="width:100%;">
                <div class="cl-row">
                    <div class="cl-td">
                        <p>时间</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="fundData.date" placeholder="显示在x轴的时间，尽量简短，如：19-01"></el-input>
                    </div>
                </div>
                <div class="cl-row">
                    <div class="cl-td">
                        <p>百分比</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="fundData.percent" placeholder="百分比数字，整数">
                        <template slot="append">%</template>
                        </el-input>
                    </div>
                </div>
              
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="updateFundDataDig = false">取 消</el-button>
            <el-button type="primary" @click="updateFundData()">提交</el-button>
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
      fundData:{
        index:0,
        date:'',
        percent:0
      },
      curFundData:{
          id: 0,
          chart_data:[]
      },
      addFundDataDig:false,
      updateFundDataDig:false,
      
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
    chart_data(){
      console.log("computed:",this.curFundData.chart_data)
      return this.curFundData.chart_data
    }
  },
  watch:{
    chart_data:(newV,oldV)=>{
      console.log(newV,oldV)
      // console.log(newV.length())
    }
  },
  methods: {
   
    async addFundData(fundData){

      let t={}
      t.date=fundData.date
      t.percent=parseInt(fundData.percent)
      this.curFundData.chart_data.push(t)
        this.loading=true;
       
        const data=await api.updateFundData(this.curFundData)
        console.log(data)
        this.getData();
        this.fundData.id=0
        this.fundData.name='' 
        this.fundData.index=0

        this.loading=false;
         this.addFundDataDig=false;
    },
    async editFundData(scope){
        
        this.updateFundDataDig=true;
        this.fundData.date=scope.row.date;
        this.fundData.index=scope.$index;
        this.fundData.percent=scope.row.percent;
        
    },
    async updateFundData(){
    
        this.curFundData.chart_data[this.fundData.index].date=this.fundData.date
        this.curFundData.chart_data[this.fundData.index].percent=parseInt(this.fundData.percent)
       
        
        this.loading = true
        await api.updateFundData(this.curFundData)
        this.fundData.id=0
        this.fundData.name='' 
        this.fundData.index=0
        this.getData();
        this.loading = false
        this.updateFundDataDig=false;
    },
    async delFundData(scope){
        this.$confirm('真的要删除此数据吗？', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {

                    this.curFundData.chart_data.splice(scope.$index,1)

                    this.loading = true
                    const data = await api.updateFundData(this.curFundData)
                    console.log(data)
                    this.getData()
                    this.loading = false
                }).catch(() => {

                })
    },
    
    async getData() {
      if (this.$route.params.id) {
        this.loading = true;

        const data=await  api.getFund(this.$route.params.id)
        if(data!=null){
          this.curFundData.id=data.id
          if(data.chart_data!=null){
          this.curFundData.chart_data=data.chart_data
          }
        }
      }else{
        this.curFundData.id=0
        this.curFundData.chart_data=[]
      }
    }

    
  },
  mounted() {
    this.getData();
    console.log(this.FundData);
  }
};
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

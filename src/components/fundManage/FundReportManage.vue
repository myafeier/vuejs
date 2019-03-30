<template>
  <div>
    <div class="head">
      <h1 class="head-title">{{$route.meta.title}}</h1>
      <div class="head-action">
        <el-button type="primary" @click="addDataDig=true">新建企业财报</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="Datas.company_reports" stripe style="width: 100%">
        <el-table-column prop="id" label="公司ID"></el-table-column>
        <el-table-column prop="report_name" label="财报名称"></el-table-column>
        <el-table-column prop="create_date" label="财报生成时间"></el-table-column>
        <el-table-column prop="yin_ye_e" label="营业额"></el-table-column>
        <el-table-column prop="mao_li" label="毛利"></el-table-column>
        <el-table-column prop="jing_li" label="净值"></el-table-column>
        <el-table-column prop="mao_li_lv" label="毛利率"></el-table-column>
        <el-table-column prop="jing_li_lv" label="净利率"></el-table-column>
        <el-table-column prop="deng_zhi_xiang_mu" label="等值项目"></el-table-column>
        <el-table-column prop="liu_dong_bi_lv" label="流动比率"></el-table-column>
        <el-table-column prop="zi_chan_fu_zhai_bi_lv" label="资产负债比率"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="delData(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新建企业财报" :visible.sync="addDataDig" class="previewcol">
      <div class="cl-box" style="width:100%;">
        <div class="cl-row">
          <div class="cl-td">
            <p>报表名称</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.report_name" placeholder="报表名称"></el-input>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>报表时间</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.create_date" placeholder="报表时间"></el-input>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>营业额</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.yin_ye_e" placeholder="营业额"></el-input>
          </div>
        </div>

        <div class="cl-row">
          <div class="cl-td">
            <p>毛利</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.mao_li" placeholder="毛利"></el-input>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>净利</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.jing_li" placeholder="净利"></el-input>
          </div>
        </div>

        <div class="cl-row">
          <div class="cl-td">
            <p>毛利率</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.mao_li_lv" placeholder="毛利率"></el-input>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>净利率</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.jing_li_lv" placeholder="净利率"></el-input>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>等值项目</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.deng_zhi_xiang_mu" placeholder="等值项目"></el-input>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>流动比率</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.liu_dong_bi_lv" placeholder="流动比率"></el-input>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>资产负债比率</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.zi_chan_fu_zhai_bi_lv" placeholder="资产负债比率"></el-input>
          </div>
        </div>

      
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDataDig = false">取 消</el-button>
        <el-button type="primary" @click="addData(curData)">提交</el-button>
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
      Datas: {
        company_id: 0,
        company_reports:[]
      },
      curData: {
          id: 0,
          company_id:0,
          report_name: "",
          create_date: "",
          yin_ye_e: "",
          mao_li: "",
          jing_li: "",
          mao_li_lv: "",
          jing_li_lv: "",
          deng_zhi_xiang_mu: "",
          liu_dong_bi_lv: "",
          zi_chan_fu_zhai_bi_lv: ""
      },
      addDataDig: false,
      updateDataDig: false,
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
    currentCompanyId:function(){
      return parseInt(this.$route.params.id)
    }
  },
  watch: {

  },
  methods: {
    initCurData(){
      this.curData.id = 0;
      this.curData.company_id=0
      this.curData.report_name=''
      this.curData.create_date=''
      this.curData.yin_ye_e=''
      this.curData.mao_li=''
      this.curData.jing_li=''
      this.curData.mao_li_lv=''
      this.curData.jing_li_lv=''
      this.curData.deng_zhi_xiang_mu=''
      this.curData.liu_dong_bi_lv=''
      this.curData.zi_chan_fu_zhai_bi_lv=''
    },
    async addData(data) {
      data.company_id=this.currentCompanyId
  
      this.loading = true;

      const result = await api.addCompanyReport(data);
      console.log(result);
      this.initCurData()
      this.getData();


      this.loading = false;
      this.addDataDig = false;
    },
    async delData(scope) {
      this.$confirm("真的要删除此数据吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {

          this.loading = true;
          const data = await api.deleteCompanyReport(scope.id);
          console.log(data);
          this.getData();
          this.loading = false;
        })
        .catch(() => {});
    },

    async getData() {
      if (this.currentCompanyId) {
        this.loading = true;

        const data = await api.getCompnayReports(this.currentCompanyId);
        if (data != null) {
            this.Datas.company_reports = data
            this.Datas.company_id=this.currentCompanyId
        }
      } else {
        this.Datas.company_id = 0;
        this.Datas.company_reports = [];
      }
    }
  },
  mounted() {
    this.getData();
    console.log(this.Datas);
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

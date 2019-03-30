<template>
  <div>
    <div class="head">
      <h1 class="head-title">{{$route.meta.title}}</h1>
      <div class="head-action">
        <el-button type="primary" @click="addDataDig=true">新建企业新闻</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="Datas.company_news" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" width="150"></el-table-column>
        <el-table-column prop="image_url" label="配图" width="80">
            <template slot-scope="scope">
              <img  :src="scope.row.image_url" alt="" style="width: 50px;height: 50px">
            </template>
        </el-table-column>
        <el-table-column prop="introduction" label="简介" ></el-table-column>

        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope">
            <el-button @click="delData(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>ohmohmoo
      </el-table>
    </div>

    <el-dialog title="新建企业新闻" :visible.sync="addDataDig" class="previewcol">
      <div class="cl-box" style="width:100%;">
        <div class="cl-row">
          <div class="cl-td">
            <p>新闻标题</p>
          </div>
          <div class="cl-td">
            <el-input v-model="curData.title" placeholder="新闻标题"></el-input>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>新闻简介</p>
          </div>
          <div class="cl-td">
            <el-input  type="textarea" v-model="curData.introduction" placeholder="新闻简介"></el-input>
          </div>
        </div>
        <div class="cl-row">
          <div class="cl-td">
            <p>配图</p>
          </div>
          <div class="cl-td">
            <el-upload
              class="avatar-uploader"
              :action="postImageUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="curData.image_url" :src="curData.image_url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>


      
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDataDig = false">取 消</el-button>
        <el-button type="primary" @click="addData()">提交</el-button>
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
        company_news:[]
      },
      curData: {
          id: 0,
          company_id:0,
          title: "",
          introduction: "",
          image_url: "",
         
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
    },
    postImageUrl:function(){
      console.log(api.api_url+'/image/upload')
      return api.api_url+'/image/upload'
    }
  },
  watch: {
    
  },
  methods: {
      handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        this.curData.image_url = res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isJPG&&!isPNG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 1MB!');
        }
        return (isJPG||isPNG) && isLt1M;
      },
    initCurData(){
          this.curData.id=0;
          this.company_id=0;
          this.curData.title= ""
          this.curData.introduction=""
          this.curData.image_url=""
    },
    async addData() {
      this.curData.company_id=this.currentCompanyId
  
      this.loading = true;

      const result = await api.addCompanyNew(this.curData);
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
          const data = await api.deleteCompanyNew(scope.id);
          console.log(data);
          this.getData();
          this.loading = false;
        })
        .catch(() => {});
    },

    async getData() {
      if (this.currentCompanyId) {
        this.loading = true;

        const data = await api.getCompnayNews(this.currentCompanyId);
        if (data != null) {
            this.Datas.company_news = data
            this.Datas.company_id=this.currentCompanyId
        }
      } else {
        this.Datas.company_id = 0;
        this.Datas.company_news = [];
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

.avatar-uploader .el-upload {
    border: 1px dashed #ffffff;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

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

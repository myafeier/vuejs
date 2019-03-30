<template>
  <div>
    <div class="head">
      <h1 class="head-title">{{$route.meta.title}}</h1>
      <div class="head-action">
        <el-button type="primary" @click="addUserDig=true">新建账号</el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="UsersData.ListData" stripe style="width: 100%">
        <el-table-column prop="id_card" label="身份证" ></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="delUser(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新建用户" :visible.sync="addUserDig" class="previewcol">
        <div class="cl-box" style="width:100%;">
                <div class="cl-row">
                    <div class="cl-td">
                        <p>姓名</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="curUser.name" placeholder="输入姓名"></el-input>
                    </div>
                </div>
                <div class="cl-row">
                    <div class="cl-td">
                        <p>身份证</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="curUser.id_card" placeholder="请输入身份证号"></el-input>
                    </div>
                </div>
                <div class="cl-row">
                    <div class="cl-td">
                        <p>可查看基金</p>
                    </div>
                    <div class="cl-td" style="text-align:left;">
                       <el-checkbox-group v-model="curUser.fund_ids">
                        <el-checkbox v-for="fund in all_funds"  :label="fund.id" :key="fund.id" >{{fund.name}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addUserDig = false">取 消</el-button>
            <el-button type="primary" @click="addUser(curUser)">提交</el-button>
        </div>
    </el-dialog>

    <el-dialog title="编辑用户" :visible.sync="updateUserDig" class="previewcol">
        <div class="cl-box" style="width:100%;">
                <div class="cl-row">
                    <div class="cl-td">
                        <p>姓名</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="curUser.name" placeholder="输入姓名"></el-input>
                    </div>
                </div>
                <div class="cl-row">
                    <div class="cl-td">
                        <p>身份证</p>
                    </div>
                    <div class="cl-td">
                        <el-input v-model="curUser.id_card" placeholder="请输入身份证号"></el-input>
                    </div>
                </div>
                <div class="cl-row">
                    <div class="cl-td">
                        <p>可查看基金</p>
                    </div>
                    <div class="cl-td" style="text-align:left;">
                       <el-checkbox-group v-model="curUser.fund_ids">
                        <el-checkbox v-for="fund in all_funds"  :label="fund.id" :key="fund.id" >{{fund.name}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="updateUserDig = false">取 消</el-button>
            <el-button type="primary" @click="updateUser(curUser)">提交</el-button>
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
      curUser:{
          id: 0,
          phone:'',
          name:'',
          stat:0,
      },

      addDig:false,
      updateDig:false,
      UsersData: {
        ListData: [],
        total: 0
      },
      loading: false,
      tableProps: {
        border: false, //去掉边框
        stripe: false //去掉斑马纹
      },
      //分页设置
      paginationDef: {
        pageSize: 10,
        pageSizes: [10, 20, 50]
      },
      dialogVisible: false,
      save_id: null,
      previewcol: false,
      //存放弹出框的数据
      colshowlog: {}
    };
  },
  computed: {},
  watch:{
    checkedFunds:(val)=>{
      this.curUser.funds
      console.log(val)
    }
  },
  methods: {
    deletes(row) {
      this.$confirm("真的要删除此账号吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.loading = true;
          const data = await api.deleteAdmins(row.ID);
          if (data.status) {
            this.$message({
              message: data.msg,
              type: "success"
            });
          } else {
            this.$message.error(data.msg);
          }
          this.getData();
          this.loading = false;
        })
        .catch(() => {});
    },
    async addUser(user){
        this.loading=true;
        console.log(user.name)
        console.log(this.curUser.id_card)
        const data=await api.addUser(user)
        console.log(data)
        this.id=0
        this.curUser.id_card=''
        this.curUser.name=''
        this.funds=[]
        this.addUserDig=false;
        this.getData();
        this.loading=false;
    },
    async editUser(user){
        this.updateUserDig=true;
        this.curUser=user;
        this.curUser.fund_ids=user.fund_ids||[]
        console.log(this.curUser)
    },
    async updateUser(user){
        this.curUser={}
        this.loading = true
        await api.updateUser(user)
        
        this.getData();
        this.loading = false
        this.updateUserDig=false;
    },
    async delUser(user){
        this.$confirm('真的要删除此用户吗？', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.loading = true
                    const data = await api.deleteUser(user.id)
                    console.log(data)
                    this.getData()
                    this.loading = false
                }).catch(() => {

                })
    },
    details(scope) {
      this.colshowlog = scope.row;
      this.previewcol = true;
    },
    async getData() {
      if (this.UsersData.length == 0) {
        this.loading = true;
      }
      const data = await api.getUsers();
      console.log(data);
      if (data != null) {
        this.UsersData.ListData = data.data||[];
      }
      

      this.loading = false;
    },
    goSeed() {
      this.$router.push({
        name: "AddUsers"
      });
    },
    edit(row) {
      this.$router.push({
        name: "EditUsers",
        params: {
          id: row.ID
        }
      });
    }
  },
  mounted() {
    this.getData();
    console.log(this.UsersData);
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

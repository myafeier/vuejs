<template>
  <div class="loginBox">
    <div class="login_main">
      <div class="login">
        <h1 style="color: #002446">源之链</h1>
        <h3 class="logoText">admin panel</h3>
        <div class="form text-center loginForm">
          <el-row>
            <el-col class="margin-bottom">
              <el-input
                class="inputTypein"
                v-model="Toform.phone"
                placeholder="请输入账号"
                prefix-icon="el-icon-erp-icon-account"
              ></el-input>
            </el-col>
            <el-col class="margin-bottom">
              <el-input
                class="inputTypein"
                v-model="Toform.password"
                placeholder="请输入密码"
                prefix-icon="el-icon-erp-icon-lock"
                show-password>
              ></el-input>
            </el-col>
            <el-col class="margin-bottom">
              <el-button type="primary" class="loginBtn" @click="login" :loading="loading">登录</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import api from "@/utils/api";
import { setCookie } from "@/utils";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      Toform: {
        phone: "",
        password: ""
      }
    };
  },
  computed: {},
  methods: {
    // ...mapActions([
    // 	'getUserProfile'
    // ]),
    async login() {
      if (this.Toform.phone == "") {
        this.$message({
          type: "info",
          message: "请输入用户名"
        });
        return false;
      }

      if (this.Toform.password == "") {
        this.$message({
          type: "info",
          message: "请输入密码"
        });
        return false;
      }


      this.loading = true;
      const data = await api.getToken(this.Toform);
      this.loading = false;
      console.log(data);
      if(!data){
        return
      }
  
      setCookie("token", data, null);
      //   await this.getUserProfile()
      this.$router.replace({
        name: "Home"
      });
      
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/login_bg.svg);
  filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.loginForm {
}

.logoText {
  margin-bottom: 1.6rem;
  color: rgb(140, 141, 143);
  font-weight: normal;
}

.login_main {
  margin-top: -10%;
}

.login {
  padding: 40px;
  width: 300px;
  text-align: center;
}

.logoImg {
  width: 150px;
}

.loginBtn {
  width: 100%;
}
</style>

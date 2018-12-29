<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" :plain="true" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import store from "../../vuex/vuex.js";
export default {
  data: function() {
    return {
      ruleForm: {
        username: "admin",
        password: "888888"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let that = this;
          that.$axios
            .get("api/management/admin/public!doLogin.action", {
              params: {
                loginName: that.ruleForm.username,
                password: that.ruleForm.password,
                rememberMe: "1"
              }
            })
            .then(function(res) {
              if (res.status == 200) {
                console.log(res)
                let menuList = [];
                res.data.menu.forEach(item => {
                	if (item.parentId == 2 || item.parentId == 3 || item.parentId == 4 || item.parentId == 5) {
                		menuList.push({
                			id: item.id,
                			name: item.name,
                			enname: item.enname,
                			children: []
                		})
                	}
                })
                menuList.forEach(item => {
                	let pId = item.id
                	res.data.menu.forEach(item2 => {
                		if (item2.parentId == pId) {
                			item.children.push({
                				id: item2.id,
                				name: item2.name,
                				enname: item2.enname
                			})
                		}
                	})
                })
                localStorage.setItem("ms_username", that.ruleForm.username);
                localStorage.setItem("menuList", JSON.stringify(menuList))
                that.$router.push('/');
              } else {
                that.$message.error("账号或密码错误!");         
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    // this.setCookie()
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
<template>
		<div class="login-wrap">
			<img class="bgPic" src="../../images/loginBg.jpg">
		<div class="ms-login">
			<div class="ms-title">后台管理系统</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="ruleForm.username" placeholder="username">
						<el-button slot="prepend" icon="el-icon-my-yonghu"></el-button>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
						<el-button slot="prepend" icon="el-icon-my-quanxian"></el-button>
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
					username: "",
					password: ""
				},
				rules: {
					username: [{
						required: true,
						message: "请输入用户名",
						trigger: "blur"
					}],
					password: [{
						required: true,
						message: "请输入密码",
						trigger: "blur"
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						let that = this;
						that.$axios
							.post("/management/admin/public!doLogin.action", this.$qs.stringify({
								loginName: that.ruleForm.username,
									password: that.ruleForm.password,
									rememberMe: "1"
							}))
							.then(function(res) {
								if (res.data.status == 1) {
									let menuList = res.data.menu;
									that.$router.push('/welcome');
									sessionStorage.setItem("ms_username", that.ruleForm.username);
									sessionStorage.setItem("menuList", JSON.stringify(menuList))
									sessionStorage.setItem("btnPermissions", (res.data.controlbtn))
									that.$router.push('/welcome');
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
		/* background: url(../../images/loginBg.jpg) center/cover; */
	}
.login-wrap .bgPic{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
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
		background: rgba(0, 0, 0, 0.15);
		overflow: hidden;
		z-index: 999;
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

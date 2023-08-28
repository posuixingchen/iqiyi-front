<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">全栈后台管理系统-注册</span>
            </div>
            <el-form :model="registerUser" :rules="rules" class="registerForm" ref="registerForm" label-width="100px">
                <el-form-item calss="item" prop="name">
                    <span slot="label">
                        <span style="color: white">用户名</span>
                    </span>
                    <el-input v-model="registerUser.name" placeholder="请输入用户名" style="opacity:0.8"></el-input>
                </el-form-item>

                <el-form-item calss="item" prop="password">
                    <span slot="label">
                        <span style="color: white">密码</span>
                    </span>
                    <el-input v-model="registerUser.password" placeholder="请输入密码" type="password" style="opacity:0.8">
                    </el-input>
                </el-form-item>

                <el-form-item calss="item" prop="confirmPassword">
                    <span slot="label">
                        <span style="color: white">确认密码</span>
                    </span>
                    <el-input v-model="registerUser.confirmPassword" placeholder="请再次输入密码" type="password"
                        style="opacity:0.8">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>已有账号？现在<router-link to="/login">登录</router-link>
                    </p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
import { register } from '../api/user'
export default {
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.registerUser.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            registerUser: {
                name: "",
                password: "",
                confirmPassword: "",
            },
            rules: {
                name: [
                    { required: true, message: "用户名不能为空", trigger: "change" },
                    { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
                ],

                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                ],

                confirmPassword: [
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" },
                    { validator: validatePass2, trigger: "blur" }
                ],
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    register(this.registerUser).then((response) => {
                        const { code } = response.data
                        if (code === '00000') {
                            this.$message.success('恭喜，注册成功！')
                            this.$router.push('/login')
                        } else {
                            this.$message({
                                type: "error",
                                message: '错误提交申请'
                            })
                            return false
                        }
                    })
                }
            })
        }
    }
}
</script>


<style lang="less" scoped>
.register {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/images/background.png) no-repeat center center;
    background-size: 100% 100%;

}

.form_container {
    width: 370px;
    height: 210px;
    position: absolute;

    padding: 25px;
    border-radius: 5px;
    text-align: center;
    left: 35%;
    top: 25%;
    opacity: 0.8;
}

.form_container .manage_tip .title {
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #fff;
}

.registerForm {
    margin-top: 20px;
    // background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
    background-color: rgb(94, 90, 90);
    // opacity: 0.5;
}

.submit_btn {
    width: 100%;
}

.tiparea {
    text-align: center;
    font-size: 12px;
    color: #fff;
}

.item .el-form-item__label {
    color: #fff
}

.tiparea p a {
    color: #409eff;
}

// 改变input里的字体颜色
/deep/input::-webkit-input-placeholder {
    color: white;
    font-size: 15px;
}


// 改变input框背景颜色
/deep/.el-input__inner {
    background-color: transparent !important;
    // background-color:#4d4f50;
    color: white; // 输入字体颜色
    // opacity: 0.5;
    border: 1px solid white;
}
</style>
    
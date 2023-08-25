<template>
    <el-row class="home" style="padding-right:10px">
        <el-col :span="8" style="margin-top: 20px">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/huahang.png" alt="">
                    <div class="userinfo">
                        <p class="name">{{ user.name }}</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间:<span>2023-6-1</span></p>
                    <p>上次登录地点:<span>廊坊</span></p>
                </div>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left:10px">

        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: window.sessionStorage.getItem('name'),
            },
        }
    },
    mounted() {
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
p {
    margin: 0;
    padding: 0;
}

.user {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .role {
            color: #999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999;

        span {
            color: #666;
            margin-left: 60px;
        }
    }
}
</style>
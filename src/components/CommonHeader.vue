<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right: 20px;" @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <!-- <h3 style="color: #fff">首页</h3> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}
                </el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini" @command="setDialogInfo">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/huahang.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'CommonHeader',
    data() {
        return {
        }
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },

        setDialogInfo(cmdItem) {
            // console.log(cmdItem)
            switch (cmdItem) {
                case "info":
                    this.showInfoList();
                    break;
                case "logout":
                    this.logout();
                    break;
            }
        },

        showInfoList() {
            // console.log('个人信息')
            this.$router.push('/')
        },
        logout() {
            // console.log('退出系统')
            // 清除token
            localStorage.removeItem('mytoken')
            this.$store.dispatch('clearCurrentState')
            this.$router.push('/login')
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        }),
        user() {
            return this.$store.getters.user
        }
    }
}
</script>

<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }

    .l-content {
        display: flex;
        align-items: center;

        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;

                &.is-link {
                    color: #666;
                }
            }

            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 40px;
        }
    }
}
</style>
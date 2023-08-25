<template>
    <header>
        <div class="l-content">
            <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <!-- <h3 style="color: #fff">首页</h3> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}
                </el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini" @command="setDialogInfo">
                <span>
                    <img class="user" :src="userImg" alt="">

                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">{{ user.name }}</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'CommenHeader',
    data() {
        return {
            userImg: require("../assets/images/user.png")
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
header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;

}

.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 40px;
    }
}
</style>
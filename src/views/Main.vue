<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <common-aside />
            </el-aside>
            <el-container>
                <el-header>
                    <common-header />
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
    data() {
        return {
            isCollapse: true
        }
    },
    components: {
        CommonAside,
        CommonHeader,
        CommonTag
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang="less" scoped>
.el-header {
    padding: 0;
}
</style>
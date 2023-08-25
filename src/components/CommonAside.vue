<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <h3>{{ isCollapse ? '爱奇艺' : '爱奇艺后台管理系统' }}</h3>
        <!-- <template v-for="item in menu"> -->
        <router-link v-for="(item, index) in noChirdren" :to="item.path" :key="item.path">
            <el-menu-item :index="index.toString()" @click="clickMenu(item)">
                <i :class="'el-icon-' + item.icon"></i>
                <!-- <span slot="title">{{ item.label }}</span> -->
                {{ item.label }}
            </el-menu-item>
        </router-link>
        <el-submenu v-for="item in hasChirdren" :index="item.path" :key="item.path">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </template>

            <el-menu-item-group>
                <router-link v-for="(subItem, subIndex) in item.children" :to="subItem.path" :key="subItem.path">
                    <el-menu-item :index="(subIndex + 3).toString()">
                        <i :class="'el-icon-' + subItem.icon"></i>
                        {{ subItem.label }}
                    </el-menu-item>
                </router-link>
            </el-menu-item-group>
        </el-submenu>

    </el-menu>
</template>
  
<script>

export default {
    name: "CommonAside",
    data() {
        return {
            // isCollapse: false,
            menu: [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/count',
                    name: 'count',
                    label: '统计信息',
                    icon: 's-data',
                    url: 'Count/Count'
                },

                {
                    path: '/movie',
                    name: 'movie',
                    label: '电影列表',
                    icon: 'film',
                    url: 'Movie/Movie'
                },

                {
                    path: '/edit',
                    label: '编辑列表',
                    icon: 's-operation',
                    children: [
                        {
                            path: '/editMovie',
                            name: 'editMovie',
                            label: '编辑电影',
                            icon: 'edit-outline',
                            url: 'edit/editMovie'
                        },

                        {
                            path: '/editActor',
                            name: 'editActor',
                            label: '编辑演员',
                            icon: 'edit-outline',
                            url: 'edit/editActor'
                        },

                        {
                            path: '/editMovieActor',
                            name: 'editMovieActor',
                            label: '编辑电影与演员',
                            icon: 'edit-outline',
                            url: 'edit/editMovieActor'
                        },

                        {
                            path: '/editRecommend',
                            name: 'editRecommend',
                            label: '编辑电影推荐',
                            icon: 'edit-outline',
                            url: 'edit/editRecommend'
                        },
                    ]
                },
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {
            this.$store.commit('selectMenu', item)
        }
    },
    computed: {
        noChirdren() {
            return this.menu.filter(item => !item.children)
        },
        hasChirdren() {
            return this.menu.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse;
        }
    }

}
</script>
  
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    border-right: none;
    height: 100vh;

    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        margin: 0;
        padding: 0
    }
}
</style>
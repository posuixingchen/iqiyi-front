<template>
    <div class="tabs">
        <el-tag size="small" v-for="(item, index) in tags" :key="item.name" :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'" @click="changeMenu(item)"
            @close="handleClose(item, index)">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'CommonTag',
    data() {
        return {}
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        ...mapMutations({
            close: 'closeTag'
        }),
        changeMenu(item) {
            this.$router.push({ name: item.name })
            // console.log(item.name)
            // console.log(this.$route.name)
        },
        handleClose(item, index) {
            const length = this.tags.length - 1
            // console.log(length)
            // console.log(index)
            // console.log(this.tags)
            // this.close(item)
            this.$store.commit('closeTag', item)
            if (item.name !== this.$route.name) {
                return
            }
            if (index === length) {
                // console.log(this.tags)
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }


        }
    }
}
</script>

<style lang="less">
.tabs {
    padding: 20px;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>
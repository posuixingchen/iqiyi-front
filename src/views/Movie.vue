<template>
    <div v-if="tableData != ''">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="电影名" width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div align="center">
                            <img :src="'data:image/png;base64,' + scope.row.pic"
                                style="width:250px; height:250px; padding: 0px 0px; align-content: center;">
                        </div>
                        <p>电影名: {{ scope.row.name }}</p>
                        <p>导演: {{ scope.row.director }}</p>
                        <p>主演:
                            <span v-for="(actor, index) in scope.row.actors">{{ actor.name }}</span>
                            <span v-if="index === scope.row.actors.length - 1"></span>
                            <span v-else>/</span>
                        </p>
                        <p>简介: {{ scope.row.description }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="主演" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px" v-for-key="(actor, index) in scope.row.actors">{{ actor.name }}</span>
                    <span v-if="index === scope.row.actors.length - 1"></span>
                    <span v-else>/</span>
                </template>
            </el-table-column>
            <el-table-column label="上映日期" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.pub_date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电影时长" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.time_length }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电影评分" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.rating }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">播放</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
import { findMovie } from '../api/movie'
export default {
    data() {
        return {
            tableData: [],
        }
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
    created() {
        findMovie().then((response) => {
            console.log(response.data);
            this.tableData = response.data.data
        })
    }
}
</script>
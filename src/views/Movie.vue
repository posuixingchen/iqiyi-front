<template>
    <div>
        <el-row style="text-align:left padding-left:10px ">
            <el-button type="primary" @click="addMovie">添加电影</el-button>
        </el-row>
        <el-dialog title="添加电影" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <!-- 新增电影的表单信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="电影名" prop="name">
                    <el-input placeholder="请输入电影名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="导演" prop="director">
                    <el-input placeholder="请输入导演" v-model="form.director"></el-input>
                </el-form-item>
                <el-form-item label="电影时长" prop="time_length">
                    <el-input placeholder="请输入电影时长" v-model="form.time_length"></el-input>
                </el-form-item>
                <el-form-item label="上映日期" prop="pub_date">
                    <el-date-picker v-model="form.pub_date" type="date" placeholder="选择上映日期" value-format="yyyy-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="评分" prop="rating">
                    <el-input placeholder="请输入评分" v-model="form.rating"></el-input>
                </el-form-item>
                <el-form-item label="电影类型" prop="categoryStr">
                    <el-checkbox-group v-model="form.categoryStr">
                        <el-checkbox v-for="cate in cateList" :key="cate.id" :label="cate.id" name="categoryStr">{{
                            cate.catname
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="电影简介" prop="description">
                    <el-input autosize type="textarea" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="电影缩略图" prop="pic">
                    <el-upload :limit="1" action="http://localhost:8081/movie/saveMovie" list-type="picture-card"
                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="false"
                        :on-change="fileChange" :file-list="fileList" ref="upload" :data="form" name="file">
                        <i class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>

                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisibleImage">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit()">提 交</el-button>
            </span>
        </el-dialog>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="电影名" width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" width="300">
                        <div align="center">
                            <img :src="'data:image/png;base64,' + scope.row.pic"
                                style="width:250px; height:250px; padding: 0px 0px; align-content: center;">
                        </div>
                        <p>电影名: {{ scope.row.name }}</p>
                        <p>导演: {{ scope.row.director }}</p>
                        <p>主演:<span v-for="(actor, index) in scope.row.actors" :key="index">{{ actor.name }}
                                <span v-if="index === scope.row.actors.length - 1"></span>
                                <span v-else>/</span>
                            </span></p>
                        <p>简介: {{ scope.row.description }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="主演" width="180">
                <template slot-scope="scope">
                    <span v-for="(actor, index) in scope.row.actors" :key="index">{{ actor.name }}
                        <span v-if="index === scope.row.actors.length - 1"></span>
                        <span v-else>/</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="pub_date" label="上映日期" width="180"></el-table-column>
            <el-table-column prop="time_length" label="电影时长" width="180"></el-table-column>
            <el-table-column prop="rating" label="电影评分" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button size="mini">播放</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
import { upLoad, findCategory, findMovie, deleteMovie } from '../api/movie'
export default {
    data() {
        return {
            disabled: false,
            dialogVisible: false,
            dialogImageUrl: '',
            dialogVisibleImage: false,
            tableData: [],
            cateList: [],
            form: {
                name: '',
                director: '',
                pub_date: '',
                time_length: '',
                rating: '',
                categoryStr: [],
                description: '',
                file: '',
                pic: '',
            },
            fileList: [],
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                director: [
                    { required: true, message: '请输入导演' }
                ],
                pub_date: [
                    { required: true, message: '请选择上映日期' }
                ],
                time_length: [
                    { required: true, message: '请输入电影时长' }
                ],
                rating: [
                    { required: true, message: '请输入电影评分' }
                ],
                categoryStr: [
                    { required: true, message: '请选择电影类型' }
                ],
                description: [
                    { required: true, message: '请输入电影简介' }
                ],
            },
        }
    },
    methods: {
        //获取所有的电影列表
        getMovie() {
            findMovie().then((response) => {
                console.log(response.data);
                this.tableData = response.data.data
            })
        },
        //获取所有的类型
        getCategory() {
            findCategory().then((response) => {
                console.log(response.data);
                this.cateList = response.data.data
            })
        },
        //打开新增电影的弹窗
        addMovie() {
            this.dialogVisible = true
        },
        //改变文件的状态
        fileChange(file, fileList) {
            this.fileList = fileList
        },
        //单独上传文件
        // handleFileUpload() {
        //     this.form.file = this.fileList[0].raw;
        //     // 调用后端服务器的接口
        //     upLoad(this.form.file).then((res) => {
        //         console.log(res.data.data)
        //         this.form.pic = res.data.data
        //     }).catch((e) => {
        //         this.$message.error(e.message);
        //         this.$refs.upload.clearFiles();
        //     })
        // },
        //提交新增的电影
        submit() {
            this.$refs.form.validate((valid) => {
                // console.log(valid, 'valid')
                if (valid) {
                    this.form.file = this.fileList[0].raw;
                    this.$refs.upload.submit();
                    // 后续对表单数据的处理
                    // saveMovie(this.form).then(() => {
                    //     // 重新获取列表的接口
                    //     this.getMovie()
                    // })
                    // 清空表单的数据
                    this.$refs.form.resetFields()
                    // 关闭弹窗
                    this.dialogVisible = false
                    this.getMovie()
                }
            })
        },
        //关闭新增电影弹窗
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        cancel() {
            this.handleClose()
        },
        //编辑电影
        handleEdit(index, row) {
            var data = JSON.parse(JSON.stringify(row))
            var editid = data.id
            this.$router.push({ path: "/editMovie", query: { id: editid } })
        },
        //删除电影
        handleDelete(index, row) {
            var data = JSON.parse(JSON.stringify(row))
            var deleteid = data.id
            this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteMovie(deleteid).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 重新获取列表的接口
                    this.getMovie()
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //删除缩略图
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleImage = true;
        },
    },
    // mounted() {
    //     this.getMovie();
    // },
    created() {
        this.getMovie();
        this.getCategory()
    }
}
</script>
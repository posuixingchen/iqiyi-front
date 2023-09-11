<template>
    <div>
        <el-row style="text-align:left padding-left:10px ">
            <el-button type="primary" @click="addActor">添加演员</el-button>
        </el-row>
        <el-dialog title="添加演员" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <!-- 新增演员的表单信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="演员名" prop="name">
                    <el-input placeholder="请输入演员名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="选择生日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio prop="男" label="男"></el-radio>
                        <el-radio prop="女" label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="演员地区" prop="regionStr">
                    <el-checkbox-group v-model="form.regionStr">
                        <el-checkbox v-for="region in regionList" :key="region.id" :label="region.id" name="regionStr">{{
                            region.name
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="演员简介" prop="description">
                    <el-input autosize type="textarea" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="演员缩略图" prop="pic">
                    <el-upload :limit="1" action="http://localhost:8081/actor/saveActor" list-type="picture-card"
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
            <el-table-column label="演员名" width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" width="300">
                        <div align="center">
                            <img :src="'data:image/png;base64,' + scope.row.pic"
                                style="width:250px; height:250px; padding: 0px 0px; align-content: center;">
                        </div>
                        <p>演员名: {{ scope.row.name }}</p>
                        <p>性别: {{ scope.row.sex }}</p>
                        <p>地区: <span v-for="(region, index) in scope.row.regions" :key="index">{{ region.name }}
                                <span v-if="index === scope.row.regions.length - 1"></span>
                                <span v-else>/</span>
                            </span></p>
                        <p>简介: {{ scope.row.description }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="180"></el-table-column>
            <el-table-column prop="birthday" label="生日" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
import { findAllRegion, findActor, deleteActor } from '../api/actor'
export default {
    data() {
        return {
            disabled: false,
            dialogVisible: false,
            dialogImageUrl: '',
            dialogVisibleImage: false,
            tableData: [],
            regionList: [],
            form: {
                name: '',
                birthday: '',
                sex: '',
                description: '',
                pic: '',
                regionStr: [],
                file: '',
            },
            fileList: [],
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                sex: [
                    { required: true, message: '请选择性别' }
                ],
                birthday: [
                    { required: true, message: '请选择生日' }
                ],
                regionStr: [
                    { required: true, message: '请选择演员地区' }
                ],
                description: [
                    { required: true, message: '请输入演员简介' }
                ],
            },
        }
    },
    methods: {
        //获取所有的演员列表
        getActor() {
            findActor().then((response) => {
                console.log(response.data);
                this.tableData = response.data.data
            })
        },
        //获取所有的类型
        getRegion() {
            findAllRegion().then((response) => {
                console.log(response.data);
                this.regionList = response.data.data
            })
        },
        //打开新增演员的弹窗
        addActor() {
            this.dialogVisible = true
        },
        //改变文件的状态
        fileChange(file, fileList) {
            this.fileList = fileList
        },
        //提交新增的演员
        submit() {
            this.$refs.form.validate((valid) => {
                // console.log(valid, 'valid')
                if (valid) {
                    this.form.file = this.fileList[0].raw;
                    this.$refs.upload.submit();
                    // 后续对表单数据的处理
                    // saveMovie(this.form).then(() => {
                    //     // 重新获取列表的接口
                    //     this.getActor()
                    // })
                    // 清空表单的数据
                    this.$refs.form.resetFields()
                    // 关闭弹窗
                    this.dialogVisible = false
                    this.getActor()
                }
            })
        },
        //关闭新增演员弹窗
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        cancel() {
            this.handleClose()
        },
        //编辑演员
        handleEdit(index, row) {
            var data = JSON.parse(JSON.stringify(row))
            var editid = data.id
            this.$router.push({ path: "/editActor", query: { id: editid } })
        },
        //删除演员
        handleDelete(index, row) {
            var data = JSON.parse(JSON.stringify(row))
            var deleteid = data.id
            this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteActor(deleteid).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 重新获取列表的接口
                    this.getActor()
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
        this.getActor();
        this.getRegion();
    }
}
</script>
<template>
    <div style="width:60%">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="电影名" prop="name">
                <el-input placeholder="请输入电影名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio prop="男" label="男"></el-radio>
                    <el-radio prop="女" label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <el-date-picker v-model="form.birthday" type="date" placeholder="选择生日" value-format="yyyy-MM-DD">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地区" prop="regionStr">
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
                <el-upload :multiple="false" :limit="1" action="http://localhost:8081/actor/updateActor"
                    list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :auto-upload="false" :on-change="fileChange" :file-list="fileList" ref="upload" :data="form"
                    name="file">
                    <i class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" v-if="form.pic !== ''" width="100%"
                            :src="'data:image/png;base64' + form.pic" alt="">
                        <img class="el-upload-list__item-thumbnail" v-else width="100%" :src="dialogImageUrl" alt="">
                        <span class="el-upload-list__item-actions">
                            <span @click="handlePictureCardPreview(file)" class="el-upload-list__item-preview">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" @click="handleRemove(file)" class="el-upload-list__item-delete">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisibleImage">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm(form)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
import { findActorOne } from '../api/actor'
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
                id: '',
                name: '',
                sex: '',
                birthday: '',
                regionStr: [],
                description: '',
                file: '',
                pic: '',
            },
            fileList: [{ url: '', name: '' }],
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
        getActor() {
            var actorid = this.$route.query.id
            console.log(actorid)
            findActorOne(actorid).then((response) => {
                console.log(response.data);
                this.regionList = response.data.data.allRegion
                this.form.id = response.data.data.actor.id
                this.form.name = response.data.data.actor.name
                this.form.sex = response.data.data.sex
                this.form.birthday = response.data.data.actor.birthday
                // this.$set(this.form, "birthday", response.data.data.actor.birthday)
                this.form.description = response.data.data.actor.description
                this.form.pic = response.data.data.actor.pic
                let regionList = response.data.data.actor.regions
                for (let i = 0; i < regionList.length; i++) {
                    this.form.regionStr[i] = regionList[i].id
                }
            })
        },
        //删除缩略图
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.form.pic = '';
            this.fileList = fileList;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleImage = true;
        },
        //改变文件的状态
        fileChange(file, fileList) {
            this.fileList = fileList
            this.handlePictureCardPreview(file)
        },
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.form.file = this.fileList[0].raw;
                    this.$refs.upload.submit();
                    console.log(this.form)
                    this.$message.success('提交成功');
                    this.$router.push('/movie')
                } else {
                    this.$message.error('提交未通过')
                }
            })
        },
        resetForm() {
            this.$refs.form.clearFields();
        },
    },
    mounted() {
    },
    created() {
        this.getActor()
    }
}
</script>
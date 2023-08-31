<template>
    <div style="width:60%">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
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
                <el-upload :multiple="false" :limit="1" action="http://localhost:8081/movie/updateMovie"
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
import { findMovieOne } from '../api/movie'
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
                id: '',
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
            fileList: [{ url: '', name: '' }],
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
            var movieid = this.$route.query.id
            console.log(movieid)
            findMovieOne(movieid).then((response) => {
                console.log(response.data);
                this.cateList = response.data.data.allCategory
                this.form.id = response.data.data.movie.id
                this.form.name = response.data.data.movie.name
                this.form.director = response.data.data.movie.director
                // this.form.pub_date = response.data.data.movie.pub_date
                this.$set(this.form, "pub_date", response.data.data.movie.pub_date)
                this.form.time_length = response.data.data.movie.time_length
                this.form.rating = response.data.data.movie.rating
                this.form.description = response.data.data.movie.description
                this.form.pic = response.data.data.movie.pic
                let cateList = response.data.data.movie.categories
                for (let i = 0; i < cateList.length; i++) {
                    this.form.categoryStr[i] = cateList[i].id
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
        this.getMovie()
    }
}
</script>
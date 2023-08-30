<template>
    <el-form ref="form" :rules="rules" :inline="true" :model="form">
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
            <el-upload :limit="1" action="#" list-type="picture-card" :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove" :auto-upload="false" :on-change="fileChange" :file-list="fileList" ref="upload"
                :data="form">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisibleImage">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
    </el-form>
</template>
  
<script>
import { upLoad, findCategory, findMovieOne, saveMovie } from '../api/movie'
export default {
    data() {
        return {
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
            findMovieOne(this.$refs.query.id).then((response) => {
                console.log(response.data);
                this.cateList = response.data.allCategory
                this.form.id = response.data.movie.id
                this.form.name = response.data.movie.name
                this.form.director = response.data.movie.director
                this.form.pub_date = response.data.movie.pub_date
                this.form.time_length = response.data.movie.time_length
                this.form.rating = response.data.movie.rating
                this.form.description = response.data.movie.description
                this.form.pic = response.data.movie.pic
                let cateList = response.data.movie.categories
                for (let i = 0; i < cateList.length; i++) {
                    this.form.categoryStr[i] = cateList[i].id
                }
            })
        },
        //删除缩略图
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleImage = true;
        },
        //改变文件的状态
        fileChange(file, fileList) {
            this.fileList = fileList
        },
    },
    mounted() {
    },
    created() {
        this.getMovie()
    }
}
</script>
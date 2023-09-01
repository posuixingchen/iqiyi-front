<template>
    <div style="width:80%">
        <el-form ref="mandcform" :rules="rules" :model="movieactorform" label-width="120px">
            <el-select v-model="movieactorform.id" filterable placeholder="请选择电影名">
                <el-option v-for="item in movieList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
            <el-form-item label="请选择演员" prop="actorStr">
                <el-checkbox-group v-model="movieactorform.actorStr">
                    <el-checkbox v-for="actor in actorList" :key="actor.id" :label="actor.id" name="actorStr">{{
                        actor.name
                    }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(mandcform)">提交</el-button>
                <el-button @click="resetForm(mandcform)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
import { findActor } from '../api/actor'
import { findMovie } from '../api/movie'
import { saveMovieActor } from '../api/movieActor'
export default {
    data() {
        return {
            movieList: [],
            actorList: [],
            movieactorform: {
                id: '',
                actorStr: [],
            },
            rules: {
                actorStr: [
                    { required: true, message: '请选择演员' }
                ],
            },
        }
    },
    methods: {
        //获取所有的电影列表
        getMovie() {
            findMovie().then((response) => {
                console.log(response.data);
                this.movieList = response.data.data
            })
        },

        //获取所有的演员列表
        getActor() {
            findActor().then((response) => {
                console.log(response.data);
                this.actorList = response.data.data
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.movieactorform)
                    saveMovieActor(this.movieactorform).then((response) => {
                        console.log(response)
                        this.resetForm()
                    })
                    this.$message.success('提交成功');
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
        this.getMovie();
        this.getActor();
    }
}
</script>
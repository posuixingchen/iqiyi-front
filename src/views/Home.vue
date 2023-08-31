<template>
    <el-row class="home" style="padding-right:10px">
        <el-col :span="8" style="margin-top: 20px">
            <el-card class="box-card" style="height: 40%;">
                <div class="user">
                    <img src="../assets/images/huahang.png" alt="">
                    <div class="userinfo">
                        <p class="name">{{ user.name }}</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间:<span>2023-6-1</span></p>
                    <p>上次登录地点:<span>廊坊</span></p>
                </div>
            </el-card>
            <el-card style="margin-top:20px;height:60%;">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val" />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left:10px">
            <el-card style="height:50vh">
                <div ref="echarts1" style="height:50vh"></div>
            </el-card>
            <div class="graph">
                <el-card style="height:30vh; width:100%">
                    <div ref="echarts2" style="height:30vh"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { findUserStatus } from '../api/homeandcount'
import * as echarts from 'echarts'
import 'echarts/lib/component/grid'

export default {
    data() {
        return {
            tableData: [],
            tableLabel: {
                weekday: '日期',
                newin: '新用户',
                active: '活跃用户'
            },
            user: {
                name: window.sessionStorage.getItem('name'),
            },
        }
    },
    mounted() {
        findUserStatus().then((response) => {
            const { code, data } = response.data
            console.log(data)
            if (code === '00000' && data && data.length != "") {
                this.tableData = data
            } else {
                this.tableData = [];
            }

            //折线图
            const echarts1 = echarts.init(this.$refs.echarts1)
            const echarts1Option = {
                xAxis: {
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周末'],
                },
                yAxis: {},
                legend: {
                    data: Object.keys(this.tableData[0])
                },
                series: [],
            }
            Object.keys(this.tableData[0]).forEach(key => {
                echarts1Option.series.push({
                    name: key,
                    data: this.tableData.map(item => item[key]),
                    type: 'line'
                })
            })
            // const xAxis = Object.keys(orderData.data[0])
            // const xAxisData = {
            //     data: xAxis
            // }
            // echarts1Option.xAxis = xAxisData
            // echarts1Option.yAxis = {}
            // echarts1Option.legend = xAxisData
            // echarts1Option.series = []
            // xAxis.forEach(key => {
            //     echarts1Option.series.push({
            //         name: key,
            //         data: orderData.data.map(item => item[key]),
            //         type: 'line'
            //     })
            // })
            // console.log(echarts1Option)
            echarts1.setOption(echarts1Option)

            //柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            const echarts2Option = {
                legend: {
                    textstyle: {
                        color: '#333'
                    },
                },
                grid: {
                    left: "20%",
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    data: this.tableData.map(item => item.weekday),
                    axisLine: {
                        Linestyle: {
                            color: '#17b3a3',
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: '#333',
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            Linestyle: {
                                color: '#17b3a3',
                            }
                        }
                    }
                ],
                color: ['#2ec7c9', '#b6a2de'],
                series: [
                    {
                        name: '新增用户',
                        data: this.tableData.map(item => item.newin),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: this.tableData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            }
            echarts2.setOption(echarts2Option)

        })
    },
}
</script>
<style lang="less" scoped>
p {
    margin: 0;
    padding: 0;
}

.user {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .role {
            color: #999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999;

        span {
            color: #666;
            margin-left: 60px;
        }
    }
}

.graph {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>
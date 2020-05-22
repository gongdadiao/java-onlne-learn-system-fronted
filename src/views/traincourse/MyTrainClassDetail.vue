<template>
    <div>
      <template>
        <el-table
          :data="dataSource"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            width="180">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="描述"
            width="180">
          </el-table-column>
          <el-table-column
            prop="code"
            label="代码"
            width="360">
          </el-table-column>
        </el-table>
      </template>
      <a-button @click="$refs.selectQuestion.showModal()">添加题目</a-button>
      <select-questions ref="selectQuestion" v-bind:class-id="this.$route.params.id"></select-questions>
    </div>
</template>

<script>
  import {courseDetail} from '../../api/train'
  import SelectQuestions from './SelectQuestions'

  export default {
    name: 'MyTrainClassDetail',
    components:{
      SelectQuestions
    },
    data() {
      return {
        dataSource:[],
      };
    },
    methods:{

    },
    mounted() {
      var that=this
      courseDetail(this.$route.params.id)
        .then(resp=>{
          if(resp.code==0){
            var ls=resp.data.questionList
            for (const item of ls) {
              that.dataSource.push({
                title:item.qtitle,
                desc:item.qdesc,
                code: (item.qrealAnswer==null)?'暂无':item.qrealAnswer.substr(0,100)+'...'
              })
            }
            this.$message.success('获取题目列表成功')
          }else{
            this.$message.info('获取详情失败')
          }
        })
    }
  }
</script>

<style scoped>

</style>
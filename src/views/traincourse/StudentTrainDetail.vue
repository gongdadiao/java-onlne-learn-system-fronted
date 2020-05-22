<template>
    <div>
      <a-card :title="dataSource[questionIndex].title" style="width: 1000px">
        <a-form :form="form">
          <a-form-item
            label="题目"
          >
            {{ dataSource[questionIndex].content }}
          </a-form-item>
          <a-form-item label="作答区">
            <a-textarea v-model="myAnswer[questionIndex].code"></a-textarea>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="submitCode">运行</a-button>
          </a-form-item>
          <a-form-item>
            <a-button @click="upQuestion">上一题</a-button>
            <a-button @click="downQuestion">下一题</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
</template>

<script>
  import {getTrainStudentDetail,submitCodes} from '../../api/train'

  export default {
    name: 'StudentTrainDetail',
    data(){
      return{
        form: this.$form.createForm(this),
        dataSource:null,
        myAnswer:[],
        questionList:[],
        questionIndex:0
      }
    },
    mounted() {
      var that=this
      getTrainStudentDetail(this.$route.params.id)
        .then(resp=>{
          if(resp.code==0){
            that.dataSource=resp.data
            for (const item of that.dataSource) {
              that.myAnswer.push({
                code:item.inicode,
                questionId:item.id
              })
            }
          }else{
            that.$message.info('获取课程详情失败')
          }
        })
    },
    methods:{
      submitCode(){
        var that=this
        submitCodes(this.myAnswer[this.questionIndex])
          .then(resp=>{
            if(resp.code==0){
              that.$message.success("恭喜你，通过该题目啦！！")
            }else{
              that.$message.info(resp.data)
            }
          })
      },
      upQuestion(){
        if(this.questionIndex-1<0)
          return
        this.questionIndex--
      },
      downQuestion(){
        if(this.questionIndex+1>=this.dataSource.length)
          return
        this.questionIndex++
      }
    }
  }
</script>

<style scoped>

</style>
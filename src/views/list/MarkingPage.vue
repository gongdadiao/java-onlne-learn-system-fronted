<template>
    <div>
      <template>
        <template v-for="(item,index) in this.otherQuestions">
          <a-card  style="width: 700px">
            <div>
              <a-form>
                <a-form-item>
                  问题: {{item.questionContent}}
                </a-form-item>
                <a-form-item>
                  学生答案：{{item.userAnswer}}
                </a-form-item>
                <a-form-item>
                  正确答案:{{item.answer}}
                </a-form-item>
              </a-form>
            </div>
          </a-card>
        </template>
        <template v-for="(item,index) in this.wendaQuestions">
          <a-card  style="width: 300px">
            <div>
              <a-form>
                <a-form-item>
                  问题：{{item.questionContent}}
                </a-form-item>
                <a-form-item>
                  学生答案：{{item.userAnswer}}
                </a-form-item>
                <a-form-item>
                  <div>
                    判定得分：
                    <a-input-number v-model="item.finalScore" :min="0" :max="10"  />
                    {{value}}
                  </div>
                </a-form-item>
                <a-form-item>
                  教师评价:<a-input v-model="item.answer"></a-input>
                </a-form-item>
              </a-form>
            </div>
          </a-card>
          <br />
        </template>
        <template>
          <a-button @click="finishMarking">确定</a-button>
        </template>
      </template>
    </div>
</template>
<script>

  import {getAdminRecordDetail,submitMarked} from '../../api/exam'
  export default {
    data() {
      return {
        questions:[],
        exam:null,
        wendaQuestions:[],
        otherQuestions:[]
      };
    },
    mounted() {
      var that=this
      getAdminRecordDetail({id:this.$route.params.id})
        .then(resp=>{
          if(resp.code==0){
            that.exam=JSON.parse(resp.data)
            console.log(that.exam)
            that.wendaQuestions=that.exam.wendaList
            if(that.exam.danxuanList!=null)
              that.otherQuestions=that.otherQuestions.concat(that.exam.danxuanList)
            if(that.exam.tiankongList!=null)
              that.otherQuestions=that.otherQuestions.concat(that.exam.tiankongList)
            if(that.exam.duoxuanList!=null)
              that.otherQuestions=that.otherQuestions.concat(that.exam.duoxuanList)
            if(that.exam.panduanList!=null)
              that.otherQuestions=that.otherQuestions.concat(that.exam.panduanList)
          }
        })
    },
    methods:{
      finishMarking(){
        for (const item of this.wendaQuestions) {
          this.exam.examFinalScore+=item.finalScore
        }

        var that=this
        submitMarked(this.$route.params.id,this.exam)
          .then(resp=>{
            if(resp.code==0){
              this.$confirm('批改成功', '提示', {
                confirmButtonText: '确定'
              }).then(() => {
                that.$router.back()
              }).catch(() => {
                that.$router.push('/')
              })
            }else{
              this.$message.error('批改失败')
              that.$router.push('/')
            }
          })
      },
    }
  };
</script>
<style>


</style>
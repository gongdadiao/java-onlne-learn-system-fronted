<template>
  <div>
    <div v-if="status=='done'" >
      <div>您的得分是:{{ exam.examFinalScore }}</div>
      <template v-for="(item,index) in exam.danxuanList">
        <a-card  style="width: 80%" >
          <a-form>
            <a-layout-content :style="{ margin: '24px 16px 0',height: '84vh', overflow: 'initial' }">
              <div :style="{ padding: '24px', background: '#fff',height: '84vh'}">
                <strong>[{{ item.questionType }}] </strong> {{ item.questionContent }}
                <br><br>
                <!-- 单选题 --> <!-- key不重复只需要在一个for循环中保证即可 -->
                <a-radio-group>
                  <a-radio v-for="(option,index) in item.questionDescription.split('#$')" :key="index" :style="optionStyle" :value="String.fromCharCode(65+index)">
                    {{String.fromCharCode(65+index)}}:{{ option }}
                  </a-radio>
                </a-radio-group>
                <p>你的答案是:{{ item.userAnswer }}</p>
                <p>答案是：{{ item.answer }}</p>
              </div>
            </a-layout-content>
          </a-form>
        </a-card>
      </template>

      <template v-for="(item,index) in exam.panduanList">
        <a-card  style="width: 80%" >
          <a-form>
            <a-layout-content :style="{ margin: '24px 16px 0',height: '84vh', overflow: 'initial' }">
              <div :style="{ padding: '24px', background: '#fff',height: '84vh'}">
                <strong>[{{ item.questionType }}] </strong> {{ item.questionContent }}
                <br><br>
                <a-radio-group >
                  <a-radio :style="optionStyle" value="right">
                    正确
                  </a-radio>
                  <a-radio  :style="optionStyle" value="wrong">
                    错误
                  </a-radio>
                </a-radio-group>
                <p>你的答案是:{{ item.userAnswer }}</p>
                <p>答案是：{{ item.answer }}</p>
              </div>
            </a-layout-content>
          </a-form>
        </a-card>
      </template>

      <template v-for="(item,index) in exam.duoxuanList">
        <a-card  style="width: 80%" >
          <a-form>
            <a-layout-content :style="{ margin: '24px 16px 0',height: '84vh', overflow: 'initial' }">
              <div :style="{ padding: '24px', background: '#fff',height: '84vh'}">
                <strong>[{{ item.questionType }}] </strong> {{ item.questionContent }}
                <br><br>
                <template>
                  <a-checkbox-group  >
                    <a-row>
                      <template v-for="(option,index) in item.questionDescription.split('#$')" >
                        <a-checkbox :key="index" :style="optionStyle" :value=String.fromCharCode(65+index) >
                          {{String.fromCharCode(65+index)}}:{{ option }}
                        </a-checkbox>
                      </template>
                    </a-row>
                  </a-checkbox-group>
                  <p>你的答案是:{{ item.userAnswer }}</p>
                  <p>答案是：{{ item.answer }}</p>
                </template>
              </div>
            </a-layout-content>
          </a-form>
        </a-card>
      </template>

    </div>
    <div v-if="status!='done'">
      <template >
        <a-card  style="width: 80%" v-for="(item,index) in this.questions">
          <a-form>
            <a-layout-content :style="{ margin: '24px 16px 0',height: '84vh', overflow: 'initial' }">
              <div :style="{ padding: '24px', background: '#fff',height: '84vh'}">
                <strong>[{{ item.questionTypeName }}] </strong> {{ item.questionContent }}
                <br><br>
                <!-- 单选题 --> <!-- key不重复只需要在一个for循环中保证即可 -->
                <a-radio-group  v-model="item.questionAnswers" v-if="item.questionTypeName === 'danxuan'">
                  <a-radio v-for="(option,index) in item.questionSelections.split('#$')" :key="index" :style="optionStyle" :value="String.fromCharCode(65+index)">
                    {{String.fromCharCode(65+index)}}:{{ option }}
                  </a-radio>
                </a-radio-group>

                <!-- 判断 -->
                <a-radio-group  v-model="item.questionAnswers"  v-if="item.questionTypeName === 'panduan'">
                  <a-radio :style="optionStyle" value="right">
                    正确
                  </a-radio>
                  <a-radio  :style="optionStyle" value="wrong">
                    错误
                  </a-radio>
                </a-radio-group>
                <!-- 多选题 -->
                <template v-if="item.questionTypeName === 'duoxuan'">
                  <a-checkbox-group   v-model="item.checkValues"  >
                    <a-row>
                      <template v-for="(option,index) in item.questionSelections.split('#$')" >
                        <a-checkbox :key="index" :style="optionStyle" :value=String.fromCharCode(65+index) >
                          {{String.fromCharCode(65+index)}}:{{ option }}
                        </a-checkbox>
                      </template>
                    </a-row>
                  </a-checkbox-group>
                </template>
              </div>
            </a-layout-content>

          </a-form>
        </a-card>
        <br />
      </template>
      <a-button type="primary" @click="submitHomework">提交</a-button>
    </div>
  </div>
</template>
<script>
  import { getHomework,submitHomework } from '../../api/resource'
  export default {
    name: 'HomeworkDetail',
    data(){
      return{
        questions:[],
        exam:null,
        status:'doing',
        optionStyle: {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
          marginLeft: '0px'
        }
      }
    },
    methods:{
      submitHomework(){
        for (const item of this.questions) {
          if(item.questionTypeName=='duoxuan'){
            item.questionAnswers=''
            for (const val of item.checkValues) {
              item.questionAnswers+=(','+val)
            }
            if(item.questionAnswers!=''){
              item.questionAnswers = item.questionAnswers.substr(1)
            }
          }
        }
        var that = this
        submitHomework(this.$route.params.id,this.questions)
          .then(resp=>{
            if(resp.code==0){
              //上交成功
              this.$confirm('提交作业成功，请等待批改结果', '提示', {
                confirmButtonText: '确定'
              }).then(() => {
                that.$router.push('/')
              }).catch(() => {
                that.$router.push('/')
              })
            }else{
              that.$notify.error({
                title: '提交错误',
                message: '再提交一下看看，反正服务器不想承担错误'
              });
            }
          })
      },
      onQuestionCheckBoxChange(item){

      }
    },
    mounted() {
      var that=this
      getHomework(this.$route.params.id)
        .then(resp=>{
          if(resp.code==0){
            that.questions=JSON.parse(resp.data)
          }else if(resp.code==1){
            this.$confirm('作业已完成', '提示', {
              confirmButtonText: '确定'
            }).then(() => {
              that.status='done'
              that.exam=JSON.parse(resp.data)
              console.log(that.exam)
            }).catch(() => {
              that.$router.push('/')
            })
          }else{
            this.$message.error('出现错误了哦，这是一条错误消息');
          }
        })
    }
  }
</script>

<style scoped>

</style>
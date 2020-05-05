<template>
  <div>
    <template style="position: center">
      <template>
        <a-card hoverable style="width: 500px;">
          <img
            alt="example"
            :src=this.classdetail.classAvatar
            slot="cover"
          />
          <a-card-meta title="课程名称">
            <template slot="description">{{ classdetail.classTitle }}</template>
          </a-card-meta>
          <a-card-meta title="课程描述">
            <template slot="description">{{ classdetail.classDesc }}</template>
          </a-card-meta>
          <a-card-meta title="起止时间">
            <template slot="description">
              <p>{{ classdetail.startTime }}-{{ classdetail.endTime }}</p>
              <p>{{ classdetail.term }}</p>
            </template>
          </a-card-meta>
          <a-card-meta title="目标">
            <template slot="description">{{ classdetail.goal }}</template>
          </a-card-meta>
          <a-card-meta title="大纲">
            <template slot="description">{{ classdetail.outline }}</template>
          </a-card-meta>
          <a-card-meta title="老师信息">
            <template slot="description">
              <p>{{ classdetail.teacherName }}</p>
              <p><a-avatar :src="classdetail.teacherAvatar"/></p>
              <p>{{ classdetail.teacherDesc }}</p>
            </template>
          </a-card-meta>
        </a-card>
      </template>
      <a-button v-show="btn_active" type="primary" @click="joinCourse" style="position: center;width: 300px">立即参加</a-button>
    </template>
  </div>
</template>

<script>
  import {getClassPreViewData,joinCourse} from '../../api/classes'

  export default {
    name: 'PreViewCourse',
    data(){
      return {
        classdetail:null,
        btn_active:true
      }
    },
    methods:{
      joinCourse(){
        var that=this
        joinCourse(this.$route.params.id)
          .then(resp=>{
            if(resp.code==0){
              this.$message.info("选课成功")
              this.btn_active=false
            }else{
              this.$message.info("选课失败（您可能已经选择了该课程）")
              this.btn_active=false
            }
          })
      }
    },
    mounted() {
      console.log('一次测试')
      var that=this
      getClassPreViewData(this.$route.params.id)
        .then(resp=>{
          if(resp.code===0){
            that.classdetail = resp.data
          }else{
            this.$message.info('获取信息失败')
          }
        })
    }
  }
</script>

<style scoped>

</style>
<template>
  <div>
    <section class="container">
      <section class="row courseshareintroduction">
        <!-- 头部课程信息-->
        <section class="course-introduction boxstyle clearfix">
          <div class="course-introduction-infor pull-left">
            <div class="course-title clearfix">
              <p class="pull-left">{{ classdetail.classTitle }}</p>
              <span class="pull-left">{{ classdetail.classType }}</span>
            </div>
            <div class="course-btn">
              <a v-if="btn_active==true" class="course-btn-style btn-join active" @click="joinCourse">加入学习</a>
              <a v-if="btn_active==false" class="course-btn-style btn-join active">已加入，开始学习</a>
            </div>
            <div class="course-text">
              <p>{{ classdetail.classDesc }}</p>
            </div>
          </div>
          <div class="pull-right">
            <div class="course-img">
            </div>
          </div>
        </section>
        <!-- 下部内容-->
        <div class="clearfix">
          <!-- 左侧内容-->
          <section class="course-primary boxstyle pull-left">
            <!-- 课程介绍-->
            <div class="course-primary-text">
              <div class="title">课程介绍</div>
              <div class="content">
                <p class="text">“{{ classdetail.classTitle }}”的课程性质与介绍：
                  {{ classdetail.classDesc }} ----由{{ classdetail.teacherName }}老师主讲这一门课程</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </section>
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
              this.$message.success("选课成功")
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
  @import "../../assets/css/bootstrap.min.css";
  @import "../../assets/css/courseShareIntroduction.css";
  @import "../../assets/css/font-awesome.min.css";
</style>
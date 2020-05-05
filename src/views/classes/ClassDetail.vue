<template>
    <div>
      <template>
        <a-tabs>
          <a-tab-pane tab="课件" key="1">
            <template>
              <div>
                <el-menu   style="width: 80%;text-align: center">
                  <template v-for="(item,index) in this.dataSources.chapter.data">
                    <el-submenu :index="index.toString()">
                      <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>{{ item.title }}</span>
                      </template>
                      <template v-for="(subitem,subindex) in item.term">
                        <el-menu-item :index='subindex.toString()'>{{ subitem.title }}  ({{ subitem.type }})</el-menu-item>
                      </template>
                      <el-menu-item key="8888888" @click="addChapterClick(item)">添加小节</el-menu-item>
                    </el-submenu>
                  </template>
                  <el-menu-item key='9999999' @click="$refs.createTheme.create()">添加章节</el-menu-item>
                </el-menu>
              </div>
            </template>
          </a-tab-pane>
          <a-tab-pane tab="公告" key="2">
            <annoucement v-bind:class-id="this.$route.params.id"></annoucement>
          </a-tab-pane>
          <a-tab-pane tab="讨论" key="3">Content of tab 3</a-tab-pane>
          <a-tab-pane tab="考核" key="4">Content of tab 3</a-tab-pane>
          <a-tab-pane tab="名单" key="5">
            <student-list :class-id=this.$route.params.id ></student-list>
          </a-tab-pane>
          <a-tab-pane tab="批改" key="6">
            <template>
              <teacher-record-list v-bind:class-id="this.$route.params.id"></teacher-record-list>
            </template>
          </a-tab-pane>
          <a-button slot="tabBarExtraContent">Extra Action</a-button>
        </a-tabs>
      </template>
      <create-theme v-bind:class-id="this.$route.params.id" ref="createTheme"></create-theme>
      <step-by-step-chapter-modal v-bind:theme-id="chooseThemeId" ref="createChapter"></step-by-step-chapter-modal>
    </div>
</template>

<script>
  import CreateTheme from './modules/CreateTheme'
  import { getCourseInfo } from '../../api/classes'
  import StepByStepChapterModal from './modules/StepByStepChapterModal'
  import TeacherRecordList from '../list/TeacherRecordList'
  import Annoucement from '../annoucement/Annoucement'
  import StudentList from './StudentList'

  export default {
    name: 'ClassDetail',
    components:{
      CreateTheme,
      StepByStepChapterModal,
      TeacherRecordList,
      Annoucement,
      StudentList
    },
    data(){
      return {
        chooseThemeId:'',
        dataSources:{
          chapter:{
            data:[]
          }
        },
        loadingMore: false,
        showLoadingMore: true,
        loadTime:0
      }
    },
    mounted() {
      getCourseInfo(this.$route.params.id)
        .then(resp=>{
          if(resp.code==0){
            this.dataSources=resp.data
          }else{
            this.$message.info("获取信息失败")
          }
        })
    },
    methods:{
      addChapterClick(item){
        this.chooseThemeId=item.id
        console.log(item)
        this.$refs.createChapter.create()
      }
    },
    watch: {
      openKeys(val) {
        console.log('openKeys', val);
      },
    }
  }
</script>

<style scoped>

</style>
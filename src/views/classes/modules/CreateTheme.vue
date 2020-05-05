<template>
  <a-modal
    title="创建章节"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="章节名">
          <a-input v-model="themeSelection.title"></a-input>
        </a-form-item>
        <a-form-item label="章节描述">
          <a-input v-model="themeSelection.desc"></a-input>
        </a-form-item>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button @click="submitTheme">添加</a-button>
    </template>
  </a-modal>
</template>

<script>
  import { addCourseTheme,addCourseChapter } from '../../../api/classes'

  export default {
    name: 'CreateTheme',
    props:['classId'],
    data(){
      return{
        confirmLoading:false,
        visible:false,
        form: this.$form.createForm(this),
        themeSelection:{
          title:'请输入章节名',
          desc:'描述'
        }
      }
    },
    methods:{
      handleCancel(){
        this.visible=false
      },
      create(){
        this.visible=true
      },
      submitTheme(){
        if(this.classId==''){
          this.$message.info("课堂id产生错误")
          return
        }
        let submit={
          themeClassId:this.classId,
          themeName:this.themeSelection.title,
          themeSeq:0,
          themeDescription:this.themeSelection.desc
        }
        addCourseTheme(submit)
          .then(resp=>{
            if(resp.code==0){
              this.$message.success("添加章节成功")
            }else{
              this.$message.info("添加章节失败")
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
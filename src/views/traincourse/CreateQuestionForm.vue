<template>
  <a-modal
    title="Title"
    :visible="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item label="题目">
              <a-input
                v-decorator="['title', { rules: [{ required: true, message: '请输入名称' }] }]"
              />
            </a-form-item>
            <a-form-item label="描述">
              <a-input
                v-decorator="['desc', { rules: [{ required: true, message: '请输入描述' }] }]"
              />
            </a-form-item>
            <a-form-item label="内容">
              <a-textarea
                v-decorator="['content', { rules: [{ required: true, message: '请输入内容' }] }]"
              />
            </a-form-item>
            <a-form-item label="初始代码">
              <a-textarea
                v-decorator="['code', { rules: [{ required: true, message: '请输入初始代码' }] }]"
              />
            </a-form-item>
            <a-form-item label="答案代码">
              <a-textarea
                v-decorator="['ans', { rules: [{ required: true, message: '请输入答案代码' }] }]"
              />
            </a-form-item>
            <a-form-item label="添加测试">
              <template>
                <a-upload
                  action="#"
                  :default-file-list="fileList"
                  :before-upload="addFile"
                >
                  <a-button> <a-icon type="upload" /> 上传 </a-button>
                </a-upload>
              </template>
            </a-form-item>
            <a-form-item>
              <a-button @click="submitQuestion">创建</a-button>
            </a-form-item>
          </a-form>

  </a-modal>
</template>

<script>
  import {submitCheckFiles,createQuestion } from '../../api/train'
  export default {
    name: 'CreateQuestionForm',
    data() {
      return {
        visible: false,
        confirmLoading: false,
        fileList:[],
        questionId:null,
        form: this.$form.createForm(this),
      };
    },
    methods:{
      async addFile(file) {
        console.log(file)
        this.fileList.push(file)
      },
      submitQuestion() {
        var that=this
        this.form.validateFields((errors, values) => {
          if(!errors){
            console.log(values)
            let submit={
              ans:values.ans,
              code:values.code,
              content:values.content,
              desc:values.desc,
              title:values.title
            }
            createQuestion(submit)
              .then(resp=>{
                if(resp.code==0){
                  var questionId=resp.data
                  var formData = new FormData();
                  for (var i = 0; i < that.fileList.length; i++) {
                    formData.append('files', that.fileList[i]);
                  }
                  submitCheckFiles(questionId,formData)
                    .then(resp=>{
                      if(resp.code==0){
                        that.$message.success('题目创建成功')
                      }else{
                        _this.$message.info('题目创建失败')
                      }
                    })
                }else{
                  that.$message.info('题目创建失败')
                }
              })
          }
        })
      },
      showModal() {
        this.visible = true;
      },
      handleOk(e) {},
      handleCancel(e) {
        this.visible = false;
      },

      uploadFile() {
        var _this = this;
        var formData = new FormData();
        for (var i = 0; i < this.fileList.length; i++) {
          formData.append('files', this.fileList[i]);
        }
        submitCheckFiles(formData)
          .then(resp=>{
            if(resp.code==0){

            }else{
              _this.$message.info('上传失败')
            }
          })
      }
    }
  }
</script>


<style scoped>
  .upload-list{margin:0;padding:0;list-style:none;}
  .upload-list-li{position: relative;margin-top:5px;line-height: 1.8}
  .upload-list-li:hover{background-color: #f5f7fa;}
  .upload-list-li-name{position:relative;margin-right: 40px;display: block;}
  .fa-file-text-o{margin-right:7px;}
  .upload-list-li-label{position:absolute;right:5px;top:0;}
  .file-box{
    padding:5px 15px;
    border-radius:3px;
    background-color:#409eff;
    border-color:#409eff;
    color:#000;display:inline-block;position: relative;
  }
  .file-btn{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    outline: none;
    background-color: transparent;
    filter:alpha(opacity=0);
    -moz-opacity:0;
    -khtml-opacity: 0;
    opacity: 0;
  }
</style>

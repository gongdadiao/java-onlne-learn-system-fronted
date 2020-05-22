<template>
  <div>
    <div class="lesson-detail-teacher">
      <img class="avatar" :src="teacher.avatar" alt="">
      <p class="name">
        {{ teacher.name }}
      </p>
      <p class="job">
        {{ teacher.job }}
      </p>
      <p class="introduce">
        {{ teacher.introduce }}
      </p>
      <a-button type="primary" @click="openMail">发送消息</a-button>
    </div>
    <a-modal
      title="Title"
      :visible="visible"
      @ok="handleOk"

      @cancel="handleCancel"
    >
      <template>
        <a-form>
          <a-form-item label="主题" >
            <a-input v-model="mailForm.title"  />
          </a-form-item>
          <a-form-item  label="内容" >
            <a-textarea v-model="mailForm.content"  />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="sendMsg">
              发送
            </a-button>
          </a-form-item>
        </a-form>
      </template>
    </a-modal>
  </div>
</template>
<script>
  import {sendMailMsg} from '../../../api/classes'

  export default {
  props: {
    teacher: {
      type: Object
    },
    classId: {
      type: String
    },
    sendId: {
      type: String
    },
    recId: {
      type: String
    }
  },
  data(){
    return{
      visible:false,
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      mailForm: {
        title: '',
        content: '',
        sendorId:this.$props.sendId,
        receivorId:this.$props.recId,
        classId:this.$props.classId
      }
    }
  },
  methods: {
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    openMail(){
      this.visible=true
    },
    sendMsg() {
      sendMailMsg(this.mailForm)
        .then(resp=>{
          if(resp.code==0){
            this.$message.success("发送成功")
          }else{
            this.$message.info('发送失败')
          }
        })
      this.visible=false
    }
  }
}
</script>
<style lang="stylus" scoped>
  .lesson-detail-teacher
    margin-top: 24px;
    margin-bottom: 40px;
    padding: 24px 36px 36px;
    background-color: #eff2f5;
    border-radius: 8px;
    box-sizing: border-box;
    text-align: center;
    .avatar
      width: 64px;
      height: 64px;
      border-radius: 50%;
    .name
      font-size: 16px;
      color: #07111b;
      line-height: 28px;
    .job
      margin-bottom: 12px;
      font-size: 12px;
      color: #4d555d;
      line-height: 24px;
    .introduce
      font-size: 12px;
      color: #4d555d;
      line-height: 20px;
</style>
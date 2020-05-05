<template>
    <div>
      <a-list
        class="comment-list"
        itemLayout="horizontal"
        style="background: white"
      >
        <a-list-item v-for="(item,index) in this.msgs">
          <a-comment>
          <span @click="replyMsg(item)" slot="actions" key="comment-nested-reply-to">回复</span>
          <a slot="author">{{ item.name }}</a>
          <a-avatar
            slot="avatar"
            :src=item.avartar
            :alt=item.name
          />
          <p slot="content">
          {{ item.mtitle }} <br/>
          {{ item.mcontent }}<br/>{{ item.createTime|moment("YYYY-MM-DD HH:mm:ss") }}
          </p>
        </a-comment>
        </a-list-item>
      </a-list>
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
  import { getMailMsg,sendMailMsg } from '../../../api/classes'

  export default {
    name: 'index',
    data(){
      return{
        msgs:null,
        visible: false,
        mailForm: {
          title: '',
          content: '',
          sendorId: null,
          receivorId: null,
          classId: null
        }
      }
    },
    mounted() {
      var that=this
      getMailMsg()
        .then(resp=>{
          if(resp.code===0){
            that.msgs=resp.data
          }else{
            that.$message.info('获取消息失败')
          }
      })
    },
    methods:{
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
      sendMsg() {
        var that=this
        sendMailMsg(this.mailForm)
          .then(resp=>{
            if(resp.code===0){
              this.$message.success("发送成功")
            }else{
              this.$message.info('发送失败')
            }
          })
        this.visible=false
      },
      replyMsg(item){
        /*
       createTime: "2020-04-23T03:31:17.000+0000"
        mreceiverId
        msenderId
         */
        this.mailForm.receivorId=item.msenderId
        this.mailForm.sendorId=item.mreceiverId
        this.mailForm.classId=item.mclassId
        this.visible=true
      }
    }
  }
</script>

<style scoped>

</style>
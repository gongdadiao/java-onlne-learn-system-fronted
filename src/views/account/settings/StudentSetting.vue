<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical" :form="form">
          <a-form-item
            label="真实姓名"
          >
            <a-input
              v-decorator="['realName', {rules: [{ required: true, message: '请输入姓名' }], validateTrigger: ['change', 'blur']}]"
              placeholder="输入你本名" />
          </a-form-item>
          <a-form-item
            label="学号"
            :required="false"
          >
            <a-input
              v-decorator="['studentId', {rules: [{ required: true, message: '请输入学号' }], validateTrigger: ['change', 'blur']}]"
              placeholder="你的学号" />
          </a-form-item>
          <a-form-item
            label="年级"
          >
            <a-input
              v-decorator="['grade', {rules: [{ required: true, message: '请输入年级' }], validateTrigger: ['change', 'blur']}]"
              placeholder="输入年级" />
          </a-form-item>

          <a-form-item
            label="学校"
            :required="false"
           >
            <a-input
              v-decorator="['school', {rules: [{ required: true, message: '请输入学校' }], validateTrigger: ['change', 'blur']}]"
              placeholder="你在读的学校" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSubmitSettings">提交</a-button>
<!--            <a-button style="margin-left: 8px">保存</a-button>-->
          </a-form-item>
        </a-form>

      </a-col>
    </a-row>
  </div>
</template>

<script>
  import {SubmitStudentSettings} from '../../../api/user'

export default {
  components: {},
  data () {
    return {
      form: this.$form.createForm(this),
    }
  },
  mounted() {
  },
  methods: {
    handleSubmitSettings(){
      var that=this
      const { form: { validateFields }, $router, $message } = this
      validateFields({ force: true }, (err, values) => {
        values.avartar=that.avartar_url
        SubmitStudentSettings(values)
          .then(resp=>{
            if(resp.code==0){
              this.$message.info(resp.msg)
            }else {
              this.$message.info('设置失败')
            }
          })
      })

    },

    handleUploadChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        this.avartar_url=this.qiniu_url + info.file.response.key
        getBase64(info.file.originFileObj, imageUrl => {
          this.option.img=imageUrl
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>

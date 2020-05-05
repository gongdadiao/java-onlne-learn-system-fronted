<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical" :form="form">
          <a-form-item
            label="昵称"
          >
            <a-input
              v-decorator="['nickName', {rules: [{ required: true, message: '请输入昵称' }], validateTrigger: ['change', 'blur']}]"
              placeholder="给自己起个名字" />
          </a-form-item>
          <a-form-item
            label="Bio"
          >
            <a-textarea
              v-decorator="['bio', {rules: [{ required: true, message: '请输入描述' }], validateTrigger: ['change', 'blur']}]"
              rows="4" placeholder="You are not alone."/>
          </a-form-item>

          <a-form-item
            label="电子邮件"
            :required="false"
           >
            <a-input
              v-decorator="['email', {rules: [{ required: true, message: '请输入邮箱',type:'email' }], validateTrigger: ['change', 'blur']}]"
              placeholder="exp@admin.com"/>
          </a-form-item>

          <a-popover  placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
            <template slot="content">
              <div :style="{ width: '240px' }">
                <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
                <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor "/>
                <div style="margin-top: 10px;">
                  <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            </template>
            <a-form-item
              label="设置密码">
              <a-input
                style="width: 700px;"
                size="large"
                type="password"
                @click="handlePasswordInputClick"
                autocomplete="false"
                placeholder="至少6位密码，区分大小写"
                v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
              ></a-input>
            </a-form-item>
          </a-popover>

          <a-form-item >
            <a-input
              style="width: 700px;"
              size="large"
              type="password"
              autocomplete="false"
              placeholder="确认密码"
              v-decorator="['password2', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
            ></a-input>
          </a-form-item>
<!--          <a-form-item-->
<!--            label="登录密码"-->
<!--            :required="false"-->
<!--          >-->
<!--            <a-input placeholder="密码"/>-->
<!--          </a-form-item>-->

          <a-form-item>
            <a-button type="primary" @click="handleSubmitSettings">提交</a-button>
            <a-button style="margin-left: 8px">保存</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <a-upload
          listType="picture-card"
          :showUploadList="false"
          action='http://up-z1.qiniup.com'
          :data="qiniuData"
          @change="handleUploadChange"
          class="ant-upload-preview"
          :before-upload="beforeAvartarUpload"
        >
          <div  >
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src=imageUrl />
        </div>
        </a-upload>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import {getToken}  from '../../../api/token'
  import {SubmitSettings} from '../../../api/user'
  import { mixinDevice } from '../../../utils/mixin.js'

  const levelNames = {
    0: '低',
    1: '低',
    2: '中',
    3: '强'
  }
  const levelClass = {
    0: 'error',
    1: 'error',
    2: 'warning',
    3: 'success'
  }
  const levelColor = {
    0: '#ff0000',
    1: '#ff0000',
    2: '#ff7e05',
    3: '#52c41a'
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
export default {
  components: {},
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  mixins: [mixinDevice],
  data () {
    return {
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      avartar_url:null,
      imageUrl:'/avatar2.jpg',
      qiniuData: {
        token: '',
        key: ''
      },
      qiniu_url:this.$store.state.qiniuUrl,
      form: this.$form.createForm(this),
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  mounted() {
  },
  methods: {
    handlePasswordLevel (rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      console.log('value', value)
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    handlePasswordInputClick () {
      if (!this.isMobile()) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    async beforeAvartarUpload(info) {
      var type = ''
      let name = info.name.toString()
      for (var i = name.length - 1; i >= 0; i--) {
        if (name.charAt(i) != '.') {
          type = name.charAt(i) + type
        } else
          break
      }
      var that = this
      console.log(type)
      await getToken(type)
        .then(resp => {
          that.qiniuData.key = resp.key
          that.qiniuData.token = resp.token
        })
    },
    handleSubmitSettings(){
      var that=this
      const { form: { validateFields }, $router, $message } = this
      validateFields({ force: true }, (err, values) => {
        values.avartar=that.avartar_url
        SubmitSettings(values)
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
  },
  watch: {
    'state.passwordLevel' (val) {
      console.log(val)
    }
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

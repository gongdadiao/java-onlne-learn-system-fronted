<template>
  <a-modal
    title="创建课程"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-steps :current="currentStep" :style="{ marginBottom: '28px' }" size="small">
        <a-step title="课程描述"/>
        <a-step title="课程设置"/>
        <!--        <a-step title="上传资源"/>-->
      </a-steps>
      <a-form :form="form">
        <!-- step1 -->
        <div v-show="currentStep === 0">
          <a-form-item
            label="课程名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-model="courseSelection.name" v-decorator="['name',{rules:[{required:true,message:'不能为空'}]}]"/>
          </a-form-item>
          <a-form-item
            label="课程简述"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-textarea :rows="2" v-model="courseSelection.desc"></a-textarea>
          </a-form-item>
          <a-form-item
            label="课程小图"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <div class="clearfix">
              <!-- 上传数据 -->
              <a-upload
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                action='http://up-z1.qiniup.com'
                :data="qiniuData"
                @change="handleUploadChange"
                :before-upload="beforeUpload"
              >
                <a-avatar v-if="imageUrl!=''" :src="imageUrl" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </div>
          </a-form-item>
        </div>
        <div v-show="currentStep === 1">
          <a-form-item
            label="时间范围"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-range-picker @change="onDateChange">
              <template slot="dateRender" slot-scope="current">
                <div class="ant-calendar-date" :style="getCurrentStyle(current)">
                  {{ current.date() }}
                </div>
              </template>
            </a-range-picker>
          </a-form-item>
          <a-form-item
            label="课程类型"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-select v-model="courseSelection.classType" defaultValue="教学" style="width: 120px">
              <a-select-option value="教学">教学</a-select-option>
              <a-select-option value="实训">实训</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="推荐专栏"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-select v-model="courseSelection.type" defaultValue="1" style="width: 120px" >
              <a-select-option value='1' >基础课程</a-select-option>
              <a-select-option value="2">专项发展</a-select-option>
              <a-select-option value="3">前沿技术</a-select-option>
              <a-select-option value="4">实战推荐</a-select-option>
              <a-select-option value="5">技能提升</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="学期"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-select v-model="courseSelection.term" defaultValue="大一上学期" style="width: 120px" >
              <a-select-option value="大一上学期">大一上学期</a-select-option>
              <a-select-option value="大一下学期">大一下学期</a-select-option>
              <a-select-option value="大二上学期">大二上学期</a-select-option>
              <a-select-option value="大二下学期">大二下学期</a-select-option>
              <a-select-option value="大三上学期" >大三上学期</a-select-option>
              <a-select-option value="大三下学期" >大三下学期</a-select-option>
              <a-select-option value="大四上学期" >大四上学期</a-select-option>
              <a-select-option value="大四下学期" >大四下学期</a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="back" @click="backward" v-if="currentStep > 0" :style="{ float: 'left' }">上一步</a-button>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleNext(currentStep)">
        {{ currentStep === 1 && '完成' || '下一步' }}
      </a-button>
    </template>
  </a-modal>
</template>

<script>
  import {getToken} from '../../../api/token'
  import {addOneCourse} from '../../../api/classes'
  import TagSelectOption from '../../../components/TagSelect/TagSelectOption'
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const stepForms = [
    ['name', 'elapse', 'desc', 'avatar'],
    ['radioScore', 'checkScore', 'judgeScore'],
    ['option']
  ]
  export default {
    name: 'CreateCourse',
    components: { TagSelectOption },
    data(){
      return {
        percent:0,
        mockData: [],
        targetKeys: [],
        titles:['待选','已选'],
        disabled: false,
        showSearch: false,
        headers: {
          authorization: 'authorization-text',
        },
        courseSelection:{
          avartar:'',
          name:'',
          desc:'',
          term:'',
          startTime:'',
          endTime:'',
          type:'',
          classType:''
        },
        qiniu_url:this.$store.state.qiniuUrl,
//----------------------------------------------
        imageUrl: '',
        loading:false,
//-------------------
        canClick: true,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        size: 'default',
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        },
        visible: false,
        confirmLoading: false,
        currentStep: 0,
        mdl: {},
        form: this.$form.createForm(this),
        qiniuData: {
          token: '',
          key: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      onDateChange(dates, dateStrings) {
        console.log(dates, dateStrings);
        this.courseSelection.startTime=dateStrings[0]
        this.courseSelection.endTime=dateStrings[1]
      },
      getCurrentStyle(current, today) {
        const style = {};
        if (current.date() === 1) {
          style.border = '1px solid #1890ff';
          style.borderRadius = '50%';
        }
        return style;
      },
      handleUploadChange(info) {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        if (info.file.status === 'done') {
          this.courseSelection.avartar = this.qiniu_url + info.file.response.key
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl;
            this.loading = false;
          });
        }
      },
      async beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          this.$message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!');
        }
        //设置上传文件的类型
        var type = ''
        let name = file.name.toString()
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
        return isJpgOrPng && isLt2M;
      },
      submitCourseeAdd(){
        let submit={
          avartar:this.courseSelection.avartar,
          desc:this.courseSelection.desc,
          title:this.courseSelection.name,
          term:this.courseSelection.term,
          startTime:this.courseSelection.startTime,
          endTime:this.courseSelection.endTime,
          type:this.courseSelection.type,
          classType:this.courseSelection.classType
        }
        var that=this
        addOneCourse(submit)
          .then(resp=>{
            console.log(resp)
            if(resp.code===0){
              this.$notification.success({
                message: '创建成功',
                description: '课程创建成功'
              })
              // 关闭弹出框
              this.visible = false
            }
          }).catch(err => {
          // 失败就弹出警告消息
          this.$notification.error({
            message: '课程创建失败',
            description: err.message
          })
        })
      },

      triggerDisable(disabled) {
        this.disabled = disabled;
      },

      triggerShowSearch(showSearch) {
        this.showSearch = showSearch;
      },
      getRowSelection({ disabled, selectedKeys, itemSelectAll, itemSelect }) {
        return {
          getCheckboxProps: item => ({ props: { disabled: disabled || item.disabled } }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter(item => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, selectedKeys)
              : difference(selectedKeys, treeSelectedKeys);
            itemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            itemSelect(key, selected);
          },
          selectedRowKeys: selectedKeys,
        };
      },
      create () {
        this.visible=true
      },
      popupScroll () {
        console.log('popupScroll')
      },
      handleNext (step) {
        // 处理下一步或者完成事件
        const { form: { validateFields } } = this
        const currentStep = step + 1
        if (currentStep <= 1) {
          // stepForms
          validateFields(stepForms[this.currentStep], (errors, values) => {
            if (!errors) {
              this.currentStep = currentStep
            }
          })
          return
        }
        // last step，最后一步，代表完成考试编写，需要点击"完成"创建考试
        this.confirmLoading = true
        validateFields((errors, values) => { // values就是表单中校验的值，后面提交到后端接口时主要就是用这个values
          this.submitCourseeAdd()
          this.confirmLoading = false
        })
      },
      backward () {
        this.currentStep--
      },
      handleCancel () {
        // clear form & currentStep
        this.visible = false
        this.currentStep = 0
      },
    }
  }
</script>

<style scoped>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>

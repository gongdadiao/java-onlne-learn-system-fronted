<template>
  <a-modal
    title="创建小节"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="submitChapter"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="小节名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-model="chapterSelection.title" v-decorator="['name',{rules:[{required:true,message:'不能为空'}]}]"/>
        </a-form-item>
        <a-form-item
          label="选择资料"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <template>
            <a-cascader
              :options="resoptions"
              :displayRender="displayRender"
              expandTrigger="hover"
              placeholder="Please select"
              @change="onChange"
            />
          </template>
        </a-form-item>
<!--        <a-form-item-->
<!--          label="选择资料"-->
<!--          :labelCol="labelCol"-->
<!--          :wrapperCol="wrapperCol"-->
<!--        >-->
<!--          <a-select-->
<!--            placeholder="please select"-->
<!--            v-model="chapterSelection.type"-->
<!--          >-->
<!--            <a-select-option value="文档">文档资料</a-select-option>-->
<!--            <a-select-option value="幻灯片">幻灯片资料</a-select-option>-->
<!--            <a-select-option value="视频">视频资料</a-select-option>-->
<!--            <a-select-option value="源码">源码资料</a-select-option>-->
<!--            <a-select-option value="考试">考试</a-select-option>-->
<!--          </a-select>-->
<!--        </a-form-item>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  // import pick from 'lodash.pick'
  import difference from 'lodash/difference';
  import { getResListForChoose,getUrl } from '../../../api/resource'
  import { addCourseChapter } from '../../../api/classes'
  import TagSelectOption from '../../../components/TagSelect/TagSelectOption'

  export default {
    name: 'StepByStepResourceModal',
    components: { TagSelectOption },
    props:['theme-id'],
    data () {
      return {
        resoptions: [
          // {
          //   value: 'zhejiang',
          //   label: 'Zhejiang',
          //   children: [
          //     {
          //       value: 'hangzhou',
          //       label: 'Hangzhou'
          //     },
          //   ],
          // },
          // {
          //   value: 'jiangsu',
          //   label: 'Jiangsu',
          //   children: [
          //     {
          //       value: 'nanjing',
          //       label: 'Nanjing'
          //     },
          //   ],
          // },
        ],
        headers: {
          authorization: 'authorization-text',
        },
        chapterSelection:{
          title:'',
          resId:'',
          themeId:'',
          type:'',
          seq:0
        },
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
        mdl: {},
        form: this.$form.createForm(this)
      }
    },
    mounted() {
      var that=this
      getResListForChoose()
        .then(resp=>{
          if(resp.code==0){
            that.resoptions=resp.data
          }else{
            this.$message.info("获取资源列表失败")
          }
        })
    },
    methods: {
      onChange(value) {
        console.log(value);
        var v1=value[0]
        var v2=value[1]
        for (const val of this.resoptions) {
          if(val.value==v1){
            for (const val1 of val.children) {
              if(val1.value==v2){
                this.chapterSelection.type=val1.type
                this.chapterSelection.resId=v2
                return
              }
            }
            return
          }
        }
      },
      submitChapter(){
        console.log(this.$props.themeId)
        this.chapterSelection.themeId=this.$props.themeId
        var that=this
        addCourseChapter(that.chapterSelection)
          .then(resp=>{
            if(resp.code==0){
              this.$message.success("添加小节成功")
              this.$emit("getClassInfo")
            }else{
              this.$message.info("添加小节失败")
            }
          })
      },
      displayRender({ labels }) {
        return labels[labels.length - 1];
      },
      selectResType(value){
        if(value=='homework'){
          this.getMock()
        }
      },
      handleChange(targetKeys, direction, moveKeys) {
        this.targetKeys = targetKeys;
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
      handleCancel () {
        // clear form & currentStep
        this.visible = false
        this.currentStep = 0
      },
    }
  }
</script>

<style scoped>
</style>

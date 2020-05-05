<template>
  <a-modal
    title="添加题目"
    :visible="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-transfer
      :dataSource="mockData"
      :titles="['未选', '已选']"
      :targetKeys="targetKeys"
      :selectedKeys="selectedKeys"
      @change="handleChange"
      @selectChange="handleSelectChange"
      @scroll="handleScroll"
      :render="item => item.title"
      :disabled="disabled"
    />
  </a-modal>
</template>

<script>
  import {questionList,selectQuestions} from '../../api/train'

  export default {
    name: 'SelectQuestions',
    props:['classId'],
    data() {
      return {
        mockData:[],
        targetKeys: [],
        selectedKeys: [],
        disabled: false,
        visible: false,
        confirmLoading: false,
      }
    },
    mounted(){
      var that=this
      questionList()
        .then(resp=>{
          if(resp.code==0){
            var dataList=[]
            var i=0
            for (const item of resp.data) {
              dataList.push({
                key:item.qid.toString(),
                title:item.qtitle,
                description:item.qdesc,
                disabled:false
              })
              i++
            }
            that.mockData=dataList
          }else{
            that.$message.info('获取题目列表失败')
          }
        })
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        var that=this
        selectQuestions(this.$props.classId,this.targetKeys)
          .then(resp=>{
            if(resp.code==0){
              that.$message.success('选题成功')
            }else{
              this.$message.info('选题目失败')
            }
          })
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.visible = false;
      },
      handleChange(nextTargetKeys, direction, moveKeys) {
        this.targetKeys = nextTargetKeys;

        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
      },
      handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
      },
      handleScroll(direction, e) {
        console.log('direction:', direction);
        console.log('target:', e.target);
      },
      handleDisable(disabled) {
        this.disabled = disabled;
      },
    },
  }
</script>

<style scoped>

</style>
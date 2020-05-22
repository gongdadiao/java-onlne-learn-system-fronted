<template>
    <div class="pr-6 pl-6 newComponents">
        <AnnoucementList v-bind:class-id="this.$props.classId"></AnnoucementList>
<!--        <NewAnnoucement :defaultMsg="'在这里编辑公告'" ref="ue"></NewAnnoucement>-->
      <a-card size="small" title="编辑公告" style="margin: auto;width: 100%;" >

        <template >
          <a-input size="small"  v-model="atitle" />
          <br/>
          <br/>
          <a-select  style="width: 120px" v-model="atype" >
            <a-select-option value="紧急">紧急</a-select-option>
            <a-select-option value="普通">普通</a-select-option>
            <a-select-option value="置顶">置顶</a-select-option>
          </a-select>
          <br/>
          <br/>
          <a-textarea  v-model="acontent" :rows="4" />
          <br/>
          <br/>
          <a-button type="primary" @click="submitAnnounce">发布</a-button>
        </template>
      </a-card>
    </div>
  </template>
  <script>
    import { setAnnounce,getAnnounceList } from '../../api/announces'
    import AnnoucementList from "./child-components/AnnoucementList"
    export default{
      name:"Annoucement",
      props:['classId'],
      data(){
        return{
          atitle:'标题',
          acontent:'请输入',
          atype:'普通',
          variant:''
        }
      },
      methods:{
        submitAnnounce(){
          if(this.atitle===''){
            this.$message.info('请输入标题')
            return
          }
          if(this.acontent===''){
            this.$message.info('请输入内容')
            return
          }
          if(this.atype===''){
            this.$message.info('请输入类型')
            return
          }
          var variant='info'
          if(this.atype==='紧急'){
            variant='danger'
          }
          else if(this.atype==='置顶'){
            variant='warning'
          }
          var that=this
          setAnnounce({
            name:that.atitle,
            type:that.atype,
            content:that.acontent,
            variant:variant,
            classId:this.$props.classId
          }).then(resp=>{
            if(resp.code==0){
              that.$message.info('添加成功')
            }else{
              that.$message.info('添加失败')
            }
          })
        }
      },
      components: {
        AnnoucementList
      }
    }
  </script>
  <style scoped>
  
  </style>
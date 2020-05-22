<template>
  <div>
    <b-card header-tag="header" class="animated fadeInDown">
        <template slot="header">
            <i class="iconfont icon-news1"></i> &nbsp 公告栏
          </template>
          <b-list-group>
              <b-list-group-item v-for="(item, index) in anns" :key="index" @click="showAnnounce(item)">
                <b-badge :variant="item.annVariant" pill class="px-3 py-2">{{item.annType}}</b-badge>
                <span class="pl-4">{{item.annTitle}}</span>
              </b-list-group-item>
            </b-list-group>
    </b-card>
    <a-modal
      :title="ModalTitle"
      :visible="visible"
      @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal>
  </div>
</template>
<script>
  import { setAnnounce,getAnnounceList } from '../../../api/announces'

  export default{
    name:"AnnoucementList",
    props:['classId'],
    methods:{
      showAnnounce(item){
        this.visible=true
        // this.$message.info("展示")
        this.ModalTitle=item.annTitle
        this.ModalText=item.annContent
      },
      handleCancel(e) {
        this.visible = false
      }
    },
    mounted(){
      var that=this
      getAnnounceList(this.$props.classId)
        .then(resp=>{
          if(resp.code==0){
            that.anns=resp.data
          }else{
            this.$message.info("获取公告失败")
          }
        })
    },
    data(){
      return {
        ModalTitle:'公告',
        visible:false,
        ModalText:'',
        anns:null,
      }
    }
  }
</script>
<style scoped>

</style>
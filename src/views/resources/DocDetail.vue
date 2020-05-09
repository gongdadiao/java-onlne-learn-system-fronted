<template>
    <div v-if="dataSource!=''" style="width: 1300px;height: 1000px">
      <object width="100%" height="100%" id="_1585109740848">
        <embed :src=dataSource
               width="100%"
               height="100%"
        >
      </object>
    </div>
</template>

<script>
  import {getUrl} from '../../api/resource'

  export default {
    name: 'DocDetail',
    data(){
      return {
        preHead: "https://view.officeapps.live.com/op/view.aspx?src=",
        dataSource: ''
      }
    },
    mounted(){
      var that=this
      getUrl(this.$route.params.id)
        .then(resp=>{
          if(resp.code==0){
            that.dataSource="https://view.officeapps.live.com/op/view.aspx?src="+resp.data
            console.log(that.dataSource)
          }else{
            this.$message.info("获取资源失败")
          }
        })
    }
  }
</script>

<style scoped>

</style>
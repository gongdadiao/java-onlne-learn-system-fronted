<template>
    <div>
      <pre>
        <code>
          {{ codeSource }}
        </code>
      </pre>
    </div>
</template>

<script>
  import { axios } from '../../utils/request'
  import {getUrl} from '../../api/resource'

  export default {
    name: 'YuanmaDetail',
    data(){
      return{
        codeSource:''
      }
    },
    mounted(){
      var that=this
      getUrl(this.$route.params.id)
        .then(resp=>{
          if(resp.code==0){
            axios({
              url:resp.data,
              methods:'get'
            })
              .then(res=>{
                that.codeSource=res
              })
          }else{
            this.$message.info("获取资源失败")
          }
        })
    },
  }
</script>

<style scoped>

</style>
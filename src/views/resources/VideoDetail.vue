<template>
  <div class='demo'>
    <template v-if="show">
      <vue-aliplayer-v2 :source="source" ref="VueAliplayerV2" id="player-1194076936807170050" :options="options"  />
    </template>
  </div>
</template>
<script>
  import {getUrl} from '../../api/resource'

  export default {
    name: 'VideoDetail',
    data(){
      return{
        options: {
          source: null
        },
        source: null,
        show: true
      }
    },
    mounted(){
      var that=this
        getUrl(this.$route.params.id)
          .then(resp=>{
            if(resp.code==0){
              that.options.source=resp.data
              that.source=resp.data
              // that.$refs.VueAliplayerV2.$props.source=resp.data
              // that.$refs.VueAliplayerV2.$props.options=that.options
              // that.replay()
            }else{
              this.$message.info("获取资源失败")
            }
          })
    },
    methods:{
        play(){
          this.$refs.VueAliplayerV2.play()
        },
        pause(){
          this.$refs.VueAliplayerV2.pause();
        },
        replay(){
          this.$refs.VueAliplayerV2.replay();
        },
        getCurrentTime(){
          this.$refs.VueAliplayerV2.getCurrentTime();
        }
    }
}
</script>
<style >
  * {
    margin: 0;
    padding: 0;
  }
  .remove-text{
    text-align: center;
    padding: 20px;
    font-size: 24px;
  }
  .player-btns{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    span {
      margin: 0 auto;
      display: inline-block;
      padding: 5px 10px;
      width: 150px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #eee;
      background: #e1e1e1;
      border-radius: 10px;
      text-align: center;
      margin: 5px;
      cursor: pointer;
    }
  }
  .source-box{
    padding: 5px 10px;
    margin-bottom: 20px;
    .source-label{
      margin-right: 20px;
      font-size: 16px;
      display: block;
    }
    #source{
      margin-top: 10px;
    }
    .source-input{
      margin-top: 10px;
      padding: 5px 10px;
      width: 80%;
      border: 1px solid #ccc;
    }
  }
</style>

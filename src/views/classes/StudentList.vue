<template>
  <div>
    <a-list class="demo-loadmore-list" :loading="loading" itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions" @click="removeStudent(item.userId)" >delete</a>
        <a-list-item-meta
          :description=item.studentId
        >
          <a slot="title">{{ item.nickName }}</a>
          <a-avatar
            slot="avatar"
            :src=item.avartar
          />
        </a-list-item-meta>
        <div>
          <p>{{ item.school }}</p>
          <p>{{ item.realName }}</p>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
  import { getThisClassStudentList } from '../../api/student'
  import {removeStudent} from '../../api/classes'

  export default {
    name: 'StudentList',
    props:['classId'],
    data(){
      return{
        loading: true,
        data: [],
      }
    },
    mounted(){
      var that=this
      getThisClassStudentList(this.$props.classId)
        .then(res => {
          if(res.code!=0){
            return
          }
          this.loading = false;
          this.data = res.data;
        });
    },
    methods:{
      removeStudent(id){
        removeStudent(id)
          .then(resp=>{
            if(resp.code==0){
              this.$message.success("删除成功")
            }else{
              this.$message.info('删除错误')
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
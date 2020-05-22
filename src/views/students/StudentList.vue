<template>
    <div>
      <el-container>
        <el-aside style="width: 600px">
          <template>
          <a-list class="demo-loadmore-list" :loading="loading" itemLayout="horizontal" :dataSource="data">
            <div
              v-if="showLoadingMore"
              slot="loadMore"
              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
            >
              <a-spin v-if="loadingMore" />
              <a-button v-else @click="onLoadMore">loading more</a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a slot="actions">delete</a>
              <a-list-item-meta
                :description=item.desc
              >
                <a slot="title">{{ item.nickName }}</a>
                <a-avatar
                  slot="avatar"
                  :src=item.avartar
                />
              </a-list-item-meta>
              <div>
                <p>{{ item.school }}</p>
                <p>{{ item.studentId }}</p>
                <p>{{ item.realName }}</p>
              </div>
            </a-list-item>
          </a-list>
        </template>
        </el-aside>
        <el-container>
          <template>
          <div style="top:100px;width:300px">
            <el-form :model="form" label-width="220px" style="height: 1000px">
              <el-form-item >
                <el-upload class="upload-demo"
                           multiple
                           drag
                           action="#"
                           :before-upload="beforeUpload"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    <p>批量添加学生</p>
                    <p>将文件拖到此处 或 <em>点击上传</em></p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </template>
        </el-container>
      </el-container>
     </div>
</template>

<script>
  import { getStudentList,submitExcelfile } from '../../api/student'

  export default {
    data() {
      return {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
        loadTime:0
      };
    },
    mounted() {
      var that=this
      getStudentList({
        page:that.loadTime,
        size:8
      })
        .then(res => {
          if(res.code!=0){
            return
          }
        this.loading = false;
        this.data = res.data;
        this.loadTime++
      });

    },
    methods: {
      beforeUpload(file){
        var formdata = new FormData();
        formdata.append('file',file);
        submitExcelfile(formdata)
          .then(resp=>{
            if(resp.code==0){
              this.$message.success("添加成功")
            }else{
              this.$message.info("添加失败")
            }
          })
      },
      onLoadMore() {
        this.loadingMore = true;
        var that=this
        getStudentList({
          page:that.loadTime,
          size:8
        })
          .then(res => {
            if(res.code!=0){
              this.loadingMore = false;
              return
            }
            var tmp=[]
            tmp = res.data
            if(tmp.length<=0){
              this.loadingMore = false;
              return
            }
          this.data = this.data.concat(res.data);
          this.loadingMore = false;
          this.$nextTick(() => {
            window.dispatchEvent(new Event('resize'));
          });
          this.loadTime++
        });

      },
    },
  };
</script>

<style scoped>
  .demo-loadmore-list {
    min-height: 350px;
    width: 600px;
    background: white;
  }
</style>
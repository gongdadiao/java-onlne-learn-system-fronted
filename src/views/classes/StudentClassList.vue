<template>
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="教学课程" key="1">
        <div class="card-list" ref="content">
          <a-list
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :hoverable="true" @click="openClasses(item.cid)">
          <a-card-meta>
            <div style="margin-bottom: 3px" slot="title">{{ item.ctitle }}</div>
            <a-avatar class="card-avatar" slot="avatar" :src="item.cavartar" size="large"/>
            <div class="meta-content" slot="description">{{ item.cdescription }}</div>
          </a-card-meta>
          <template class="ant-card-actions" slot="actions">
            <a>{{ item.cterm }}</a>
            <a>{{ item.startTime }}</a>
          </template>
        </a-card>
      </a-list-item>
      </a-list>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="实训课程" key="2">
        <div class="card-list" ref="content">
          <a-list
        :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
        :dataSource="trainSource"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :hoverable="true" @click="openTrainClasses(item.cid)">
            <a-card-meta>
              <div style="margin-bottom: 3px" slot="title">{{ item.ctitle }}</div>
              <a-avatar class="card-avatar" slot="avatar" :src="item.cavartar" size="large"/>
              <div class="meta-content" slot="description">{{ item.cdescription }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a>{{ item.cterm }}</a>
              <a>{{ item.startTime }}</a>
            </template>
          </a-card>
        </a-list-item>
      </a-list>
        </div>
     </a-tab-pane>
    </a-tabs>

</template>

<script>
  import { getStudentClassesCardList,getStudentTrainClassesCardList } from '../../api/classes'

  export default {
    name: 'index',
    components:{

    },
    data () {
      return {
        description: '这是您选择的课程信息',
        extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
        dataSource: [],
        trainSource:[]
      }
    },
    mounted () {
      var that=this
      // 从后端数据获取考试列表，适配前端卡片
      getStudentClassesCardList()
        .then(res => {
        console.log(res)
        if (res.code === 0) {
          that.dataSource = res.data
        } else {
          this.$notification.error({
            message: '获取课程列表失败',
            description: res.msg
          })
        }
      }).catch(err => {
        // 失败就弹出警告消息
        this.$notification.error({
          message: '获取课程列表失败',
          description: err.message
        })
      })
      getStudentTrainClassesCardList()
        .then(res => {
          console.log(res)
          if (res.code === 0) {
            this.trainSource = res.data
          } else {
            this.$notification.error({
              message: '获取课程列表失败',
              description: res.msg
            })
          }
        }).catch(err => {
        // 失败就弹出警告消息
        this.$notification.error({
          message: '获取课程列表失败',
          description: err.message
        })
      })
    },
    methods:{
      openClasses(id){
        console.log("点击课程"+id)
        const routeUrl = this.$router.resolve({
          path: `/classes/studentdetail/`+id
        })
        this.$router.push(routeUrl.href)
        //this.$router.push('/classes/detail/'+id )
      },
      openTrainClasses(id){
        console.log("点击课程"+id)
        const routeUrl = this.$router.resolve({
          path: `/train/studentdetail/`+id
        })
        this.$router.push(routeUrl.href)
        //this.$router.push('/classes/detail/'+id )
      }
    }
  }
</script>

<style lang="less" scoped>
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }

  .ant-card-actions {
    background: #f7f9fa;

    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }

  .meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
<template>
  <div class="lesson-detail">
    <!-- 头部 -->
    <lesson-detail-header v-if="detail.base" :base="detail.base" />

    <!-- 内容部分 -->
    <lesson-detail-content :class-id="this.$route.params.id" :rec-id="this.detail.teacher.teacherId" :send-id="this.detail.userId"  v-if="Object.keys(detail).length" :data="detail" />
  </div>
</template>
<script>
import LessonDetailHeader from './lesson-detail-header.vue'
import LessonDetailContent from './lesson-detail-content.vue'
import { getLessonDetail } from '../../../api/resource'
import { ERR_OK } from '../../../api/config.js'

export default {
  data () {
    return {
      detail: {}, // 课程详情数据
    }
  },
  mounted () {
    this.getLessonDetailData()
  },
  methods: {
    // 获取课程详情
    getLessonDetailData () {
      console.log(this.$route.params.id)
      getLessonDetail(this.$route.params.id).then(res => {
        //console.log(res)
        //let { code, data } = res
        var code=res.code
        var data=res.data
        if (code === ERR_OK) {
          this.detail = data
        }
      })
    }
  },
  components: {
    LessonDetailHeader,
    LessonDetailContent
  }
}
</script>
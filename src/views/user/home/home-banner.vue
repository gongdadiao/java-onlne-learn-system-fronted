<template>
  <ul class="course-banner">
    <li v-for="(item,index) in banner" :key="index" class="banner-item">
      <span class="icon" />
      <p class="title">
        {{ item.title }}
      </p>
      <p class="desc">
        {{ item.desc }}
      </p>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      banner: []
    }
  },
  created () {
    this.banner = [
      { id: 1, title: 'Java大数据攻城狮', desc: '更具挑战性的Java职业' },
      { id: 2, title: 'SSM后台开发', desc: '一套完备的解决方案' },
      { id: 3, title: 'SpringBoot工程师', desc: '迅速崛起的主流框架' },
      { id: 4, title: 'Java小程序开发', desc: '初学者的最爱' },
      { id: 5, title: 'Android攻城狮', desc: '最受欢迎移动端开发语言' }
    ]
  }
}
</script>
<style lang="stylus" scoped>
  @import '../../../assets/stylus/variables.styl';
  .course-banner
    position: absolute;
    left: 216px;
    right: 0;
    bottom: 0;
    padding: 0 18px;
    height: 128px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom-right-radius: 8px;
    &::after
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 68px;
      height: 68px;
      background: url('https://www.imooc.com/static/img/index/new/new-path.png') no-repeat;
    .banner-item
      flex: 1;
      height: 100%;
      cursor: pointer;
      &:hover
        .icon
          margin-top: 18px;
      .icon
        display: block;
        margin: 22px auto 5px;
        width: 36px;
        height: 36px;
        background: url('https://www.imooc.com/static/img/index/new/path-2019.png')
        background-size: 100%;
        transition: all 0.1s;
      &:nth-child(1)
        .icon
          background-position: center 0;
      &:nth-child(2)
        .icon
          background-position: center -36px;
      &:nth-child(3)
        .icon
          background-position: center -72px;
      &:nth-child(4)
        .icon
          background-position: center -108px;
      &:nth-child(5)
        .icon
          background-position: center -144px;
      &:nth-child(6)
        .icon
          background-position: center -182px;
      & > p
        text-align: center;
      .title
        margin-bottom: 2px;
        color: $font-first-color;
        font-size: 14px;
      .desc
        line-height: 24px;
        font-size: 12px;
        color: $font-four-color;
</style>

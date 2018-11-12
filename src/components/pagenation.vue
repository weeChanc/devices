<template>
  <div v-if="total > 0" style="display: flex; flex-direction: column;justify-content: center;align-items: center">
    <img class="up icon" src="../assets/arrow-up.png" @click="changePage(currentPage-1)"/>
    <!--<span v-for="cur in total" :class="{'page-actived': currentPage === cur,page:true}"  @click="changePage(cur)"-->
    <!--v-if="cur > currentPage && cur - currentPage < 6 || (total-cur <  5 && cur - currentPage < 5  )   ">{{cur}}</span>-->

    <template v-if="currentPage + 5 < total && currentPage - 5 > 0">
      <span class="page" @click="changePage(1)">1</span>
       <span>--</span>
      <span v-for="i in 10" @click="changePage(currentPage+i-5)" :class="{'page-actived': i === 5 ,page:true}">{{currentPage+i-5}}</span>
      <span>--</span>
      <span class="page" @click="changePage(total)">{{total}}</span>
    </template>

    <template v-if="currentPage - 5 <= 0 && currentPage + 5 < total">
      <span v-for="i in 10" @click="changePage(i)" :class="{'page-actived': i === currentPage ,page:true}">{{i}}</span>
      <span>--</span>
      <span class="page" @click="changePage(total)">{{total}}</span>
    </template>

    <template v-if="currentPage - 5 >= 0 && currentPage + 5 >= total">
      <span class="page" @click="changePage(1)">1</span>
      <span>--</span>
      <span v-for="i in 10" @click="changePage(total -10 + i )" :class="{'page-actived': total-10+i === currentPage ,page:true}">{{i+total-10}}</span>
    </template>

    <img class="down icon" src="../assets/arrow-up.png" style="transform: rotate(180deg)"
         @click="changePage(currentPage+1)"/>
  </div>
</template>

<script>
  export default {
    name: "pagenation",
    props: ['total'],
    data() {
      return {
        currentPage: 1
      }
    },
    methods: {
      changePage(page) {
        if (page < 1 || page > this.total) return;
        this.currentPage = page
        this.$emit('change', page)
      }
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: startbucks ;
    src: url("../assets/font-family/starbucks.otf");
  }
  .icon {
    width: 18px;
    height: 18px;
    cursor: pointer;
    transition: all .32s;
  }

  .page {
    transition: all .12s;
    line-height: 1.4;
    cursor: pointer;
    font-family: startbucks,sans-serif ;
    user-select:none;
  }

  .page:not(.page-actived):hover{
    color: rgba(251, 182, 17, 0.79);
    font-weight: 600;
    font-size: 18px
  }

  .page-actived {
    color: #fbbc05;
    font-weight: 600;
    font-size: 18px
  }
</style>

<template>
  <searchDialog v-show="showThis">
    <h2 slot="header">搜索</h2>
    <div slot="main" class="main">
      <div class="search">
        <input type="text" title="" v-model="searchMessage">
        <img src="../assets/search.png" @click="search"/>
      </div>
      <p>搜索条件：
        <input type="radio" title="" value="0" v-model="conditions">工位号&nbsp;
        <input type="radio" title="" value="1" v-model="conditions">地点
      </p>
    </div>
    <div slot="footer">
      <button @click="closeDialog">关闭</button>
    </div>
  </searchDialog>
</template>

<script>
  import SearchDialog from '@/components/searchdialog'

  export default {
    components: {SearchDialog},
    props: ['isShow'],
    name: "search",
    data() {
      return {
        showThis: null,
        searchMessage: '',
        conditions: 0
      }
    },
    mounted() {
      this.showThis = this.isShow
    },
    methods: {
      closeDialog() {
        this.showThis = false;
      },
      search() {
        const {searchMessage, conditions} = this;
        if (searchMessage !== '') {
          this.$emit('search', conditions, searchMessage);
        }
      }
    },
    watch: {
      showThis: function (value) {
        this.$emit('closeDialog', value)
      },
      isShow: function (value) {
        this.showThis = value
      }
    }

  }
</script>

<style>
  h2 {
    margin: 0;
    color: #1da769;
  }

  .main {
    padding: 20px 0;
  }

  .main > p {
    margin-top: 10px;
    line-height: 20px;
  }

  .search {
    position: relative;
  }

  .search img {
    width: 25px;
    height: 25px;
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 6px;
  }

  .search input[type='text'] {
    outline: none;
    border: none;
    background-color: rgb(158, 255, 196);
    border-radius: 5px;
    width: 210px;
    height: 35px;
    text-indent: 10px;
    padding-right: 40px;
  }

  input[type='radio'] {
    vertical-align: middle;
    outline: none;
    margin-right: 2px;
  }

  button {
    border-radius: 5px;
    padding: 5px 15px;
    outline: none;
    background-color: #31b880;
    color: #fff;
    cursor: pointer;
    border: none;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>

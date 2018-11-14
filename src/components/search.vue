<template>
  <div v-show="showThis">
    <div class="mask" @click.stop="closeDialog">
    </div>
    <div class="dialog">
      <h2>搜索</h2>
      <div class="main">
        <div class="search">
          <input type="text" title="" v-model="searchMessage" v-focus @keyup.enter="closeDialog">
          <img src="../assets/cancel-circle.png" @click="clean"/>
        </div>
        <p>搜索条件：
          <input type="radio" title="" value="number" v-model="conditions" >工位号&nbsp;
          <input type="radio" title="" value="floor" v-model="conditions">地点
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {

    props: ['isShow'],
    name: "search",
    data() {
      return {
        showThis: null,
        searchMessage: '',
        conditions: 'number',
        timerId: 0
      }
    },
    mounted() {
      this.showThis = this.isShow
    },
    methods: {
      closeDialog() {
        this.showThis = false;
      },
      clean() {
        this.searchMessage = ''
      }
    },
    watch: {
      showThis: function (value) {
        this.$emit('closeDialog', value)
      },
      isShow: function (value) {
        this.showThis = value
      },
      searchMessage: function (value) {
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
          this.$emit('search', this.conditions, value);
        }, 500)

      },
      conditions: function (value) {
        this.$emit('search', value, this.searchMessage);
      }
    },
    directives: {
      focus: function (el) {
        el.focus();
      }
    }

  }
</script>

<style>
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .dialog {
    height: 200px;
    background-color: #fff;
    border-radius: 20px;
    border: 2px solid #31b880;
    position: fixed;
    top: 50%;
    margin-top: -125px;
    left: 50%;
    margin-left: -200px;
    padding: 20px 30px;
    z-index: 100;
  }

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
    width: 15px;
    height: 15px;
    cursor: pointer;
    position: absolute;
    right: 7px;
    top: 10px;
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

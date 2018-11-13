<template>
  <div>
    <aside class="siderbar">
      <img src="../assets/search.png" width="32px" height="32px" style="margin-top: 42px;cursor: pointer;"
           @click="openDialog">
      <img src="../assets/gantan.png" width="32px" height="32px" style="margin-top: 22px;cursor: pointer;">
      <pagenation :total="total" style="margin-top: 22px" @change="getInfo"></pagenation>
    </aside>

    <section class="app-main">
      <div style="padding-left: 42px;padding-top: 22px">
        <template v-for="(item,index) in infos">
          <device :index="index" :info="item"></device>
        </template>
      </div>
      <search :isShow="isShow" @closeDialog="closeDialog" @search="getSearch"></search>
    </section>

  </div>
</template>

<script>
  import Device from "@/components/device";
  import Pagenation from "@/components/pagenation";
  import Search from "@/components/search";

  export default {
    name: 'Main',
    components: {Pagenation, Device, Search},
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        infos: [],
        total: 0,
        isShow: false
      }
    },
    created() {
      this.$http.get('/nbiot/getNbInfo').then(res => {
        this.total = res.totalPages
        this.infos = res.content
      }).catch(err => {
        this.$toast.error("查询失败,请检查网络状态")
      })
    },
    methods: {
      getInfo(page) {
        this.$http.get('/nbiot/getNbInfo?page=' + (page - 1)).then(res => {
          this.total = res.totalPages;
          this.infos = res.content;
        }).catch(err => {
          this.$toast.error("查询失败,请检查网络状态")
        })
      },
      openDialog() {
        this.isShow = true;
      },
      closeDialog(value) {
        this.isShow = value;
      },
      getSearch(conditions, searchMessage) {

        const url = conditions === 0 ? '' : '';
        // this.$http.post(url).then(res => {
        //
        // }).catch(err => {
        //
        // })
      }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .device {
    margin-right: 22px;
    margin-bottom: 22px;

  }

  .siderbar {
    width: 80px;
    height: 100%;
    position: fixed;
    background-color: #31b880;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    color: white;
    align-items: center;
  }

  .app-main {
    margin-left: 64px;
    height: 100%;
    border: solid 1px transparent;
  }
</style>

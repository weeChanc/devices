<template>
  <div class="mask">
    <div class="dialog">
      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "searchDialog"
  }
</script>

<style>
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .dialog{
    height: 200px;
    background-color: #fff;
    border-radius: 20px;
    border: 2px solid #31b880;
    position: absolute;
    top: 50%;
    margin-top: -125px;
    left: 50%;
    margin-left: -200px;
    padding: 20px 30px;
  }
</style>

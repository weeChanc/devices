<template>
  <section class="login">
    <div class="login-box">
      <h1>请登录</h1>
      <mu-text-field v-model="account" label="UserName" label-float help-text="用户名为6-12长度的字符" autofocus
                     icon="account_circle" @keyup.enter.native="login"> </mu-text-field>
      <br/>
      <mu-text-field v-model="password" label="Password" label-float error-text="请输入密码" icon="locked" type="password" @keyup.enter.native="login"></mu-text-field>
      <br/>
      <mu-button color="#009688" @click="login" >登&nbsp录</mu-button>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        password: '',
        account: ''
      }
    },
    methods:{
      login(){
        this.$http.post('/nbiot/login',{
          account: this.account,
          password: this.password
        }).then(res => {
          if(res.message){
            this.$toast.error("登录失败,请检查账号与密码")
          }else{
            this.$toast.success('登录成功');
            window.localStorage.setItem("isLogin","true")
            this.$store.state.isLogin = true
            this.$router.push('/');
          }
        }).catch(err => {
          this.$toast.error("登录失败,请检查账号与密码")
        })
        // if(this.account === "admin" && this.password === "admin"){
        //   this.$toast.success('登录成功');
        //   this.$store.state.isLogin = true
        //   this.$router.push('/');
        // }else{
        //   this.$toast.error('账号或密码错误')
        // }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .login {
    background: url("../assets/bg.jpg") center center no-repeat;
    background-size: cover;
    height: 100%;
    .login-box {
      background: white;
      box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.50);
      border-radius: 2px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      h1{
        text-align: center;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      @media (max-width: 450px) {
        width: 90%;
        height: 380px;
      }
      
      @media (min-width: 450px) {
        width: 450px;
        height: 450px;
      }
      
    }
  }
</style>

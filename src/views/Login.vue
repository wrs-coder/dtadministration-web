<template>
  <div class="main">
    <div class="inside">
      <div class="container">
        <div class="card login">
          <div class="card-body">
            <h2 class="card-title text-center"><span class="log"> Welcome! </span></h2>
            <img src="../assets/img/avatar.png" class="img-fluid avatar" alt="avatar">
            <form class="text-center">
              <div class="form-group">
                <span class="input input--hoshi">
                  <input class="input__field input__field--hoshi" type="text" v-model="form.username"
                         placeholder="请输入用户名"/>
                  <label class="input__label input__label--hoshi input__label--hoshi-color-1">
                    <span class="input__label-content input__label-content--hoshi"></span>
                  </label>
                </span>
                <span class="input input--hoshi">
                  <input class="input__field input__field--hoshi" type="password" v-model="form.password"
                         placeholder="请输入密码"/>
                  <label class="input__label input__label--hoshi input__label--hoshi-color-1">
                    <span class="input__label-content input__label-content--hoshi"></span>
                  </label>
                </span>
                <p v-if="errorText" class="text-danger">{{ errorText }} </p>
              </div>
              <button class="btnSubmit" @click.prevent="login()">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      errorText: null
    }
  },
  methods: {
    login () {
      this.$http('post', '/api/login', {
        form: this.form
      }).then(response => {
        if (Object.keys(response).length !== 0) {
          window.sessionStorage.setItem('Authorization', response.token)
          this.$router.push({ path: '/HelloPage' })
        } else {
          this.errorText = '用户名或密码错误!'
          this.form.username = ''
          this.form.password = ''
        }
      })
    }
  }
}
</script>

<style>
* {
  font-family: 'Lato', sans-serif;
}

.main {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.inside {
  display: table-cell;
  vertical-align: middle;
}

.container {
  margin-left: auto;
  margin-right: auto;
  width: auto;
}

.card {
  border-radius: 10px !important;
  -webkit-box-shadow: 10px 13px 54px -20px rgba(51, 51, 51, 1);
  -moz-box-shadow: 10px 13px 54px -20px rgba(51, 51, 51, 1);
  box-shadow: 10px 13px 54px -20px rgba(51, 51, 51, 1);
}

.card-title {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.5vw;
  font-weight: 800;
}

.log {
  margin-top: 2vw;
  display: inline-block;
  border-bottom: 2px solid #00b7ef;
  padding-bottom: 2px;
}

.avatar {
  margin: 2vw auto .5vw;
}

/***** HOSHI Start ****/

.input {
  position: relative;
  z-index: 1;
  display: inline-block;
  margin: 1em;
  max-width: 400px;
  width: calc(100% - 2em);
  vertical-align: top;
}

.input__field {
  position: relative;
  display: block;
  padding: 0.8em;
  width: 60%;
  border: none;
  border-radius: 0;
  background: #f0f0f0;
  color: #595F6E;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-appearance: none; /* for box shadows to show on iOS */
}

.input__field:focus {
  outline: none;
}

.input--hoshi {
  overflow: hidden;
}

.input__field--hoshi {
  margin-top: 1em;
  padding: 1em 0.25em;
  width: 100%;
  background: transparent;
  color: #111;
}

.input__label--hoshi {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 0.25em;
  width: 100%;
  height: calc(100% - 1.5em);
  text-align: left;
  pointer-events: none;
}

.input__label-content--hoshi {
  position: absolute;
}

.input__label--hoshi::before,
.input__label--hoshi::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 10px);
  border-bottom: 1px solid #B9C1CA;
}

.input__label--hoshi::after {
  margin-top: 2px;
  border-bottom: 4px solid red;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
}

.input__label--hoshi-color-1::after {
  border-color: hsl(200, 100%, 50%);
}

.input__field--hoshi:focus + .input__label--hoshi::after,
.input--filled .input__label--hoshi::after {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.input__field--hoshi:focus + .input__label--hoshi .input__label-content--hoshi,
.input--filled .input__label-content--hoshi {
  -webkit-animation: anim-1 0.3s forwards;
  animation: anim-1 0.3s forwards;
}

@-webkit-keyframes anim-1 {
  50% {
    opacity: 0;
    -webkit-transform: translate3d(1em, 0, 0);
    transform: translate3d(1em, 0, 0);
  }
  51% {
    opacity: 0;
    -webkit-transform: translate3d(-1em, -40%, 0);
    transform: translate3d(-1em, -40%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, -40%, 0);
    transform: translate3d(0, -40%, 0);
  }
}

@keyframes anim-1 {
  50% {
    opacity: 0;
    -webkit-transform: translate3d(1em, 0, 0);
    transform: translate3d(1em, 0, 0);
  }
  51% {
    opacity: 0;
    -webkit-transform: translate3d(-1em, -40%, 0);
    transform: translate3d(-1em, -40%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, -40%, 0);
    transform: translate3d(0, -40%, 0);
  }
}

/***** HOSHI END *****/

.btnSubmit {
  width: 60%;
  height: calc(100% - 1em);
  font-weight: 600;
  padding: 2vh 1vw;
  text-transform: uppercase;
  color: white;
  border-radius: 5px;
  background-color: #00b7ef;
  box-shadow: 0 20px 30px -6px rgba(30, 161, 255, 0.5);
  outline: none;
  border: none;
  cursor: pointer;
  transition: all .2s ease-in-out;
  margin-bottom: 2vw;
}

.btnSubmit:hover {
  transform: translatey(3px);
  box-shadow: none;
}

.login {
  max-width: 460px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.text-danger {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: red;
}
</style>

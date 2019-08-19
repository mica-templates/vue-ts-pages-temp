<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld
      test="dddd"
      text="adsfasdf"
      msg="Welcome to Your Vue.js + TypeScript App"
      msg1="Welcome to Your Vue.js + TypeScript App"
      msg2="Welcome to Your Vue.js + TypeScript App"
    ></HelloWorld>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

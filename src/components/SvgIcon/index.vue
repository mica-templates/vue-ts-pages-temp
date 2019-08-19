<template>
  <svg class="__icon" aria-hidden="true">
    <use :xlink:href="fullName"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'SvgIcon',
})
export default class Icon extends Vue {
  @Prop({ default: '' })
  name!: string;
  get fullName() {
    return `#icon__${this.name}`;
  }
}
</script>

<style scoped lang="scss">
.__icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

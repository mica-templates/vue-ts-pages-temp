import SvgIcon from './SvgIcon/index.vue';
import { VueConstructor } from 'vue';

const install = (Vue: VueConstructor) => {
  Vue.component(SvgIcon.name, SvgIcon);
};

export default { install };

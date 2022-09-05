import Vue from 'vue';
import { Button, Select } from 'element-ui';
// element-ui 的 全局配置
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button)
Vue.use(Select)
Vue.prototype.$message = Message; // message 组件的全局使用
import Vue from 'vue';
// 导入 element-ui
import { Button, Checkbox, Col, Dialog, Form, FormItem, Input, Row, Select, Upload } from 'element-ui';
// 导入 Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
// element-ui 的 全局配置
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Upload)
// Vue.prototype.$message = Message; // message 组件的全局使用
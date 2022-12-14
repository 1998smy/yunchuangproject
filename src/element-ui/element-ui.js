import Vue from 'vue';
// 导入 element-ui
import { Alert, Aside, Autocomplete, Breadcrumb, BreadcrumbItem, Button, Card, Checkbox, Col, Container, DatePicker, Dialog, Dropdown, DropdownItem, DropdownMenu, Footer, Form, FormItem, Header, Input, Link, Main, Menu, MenuItem, MenuItemGroup, Message, MessageBox, Option, Pagination, Radio, RadioButton, RadioGroup, Row, Select, Submenu, Table, TableColumn, TabPane, Tabs, Tooltip, Tree, Upload } from 'element-ui';
// 导入 Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
// element-ui 的 全局配置
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tooltip)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Autocomplete)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Alert)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Link)
Vue.use(Tree)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(DatePicker)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.prototype.$message = Message; // message 组件的全局使用
Vue.prototype.$confirm = MessageBox.confirm  // 全局配置
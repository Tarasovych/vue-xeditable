import Editable from './Editable.vue'

let style = document.createElement('style');
style.innerHTML = '.vue-editable-value {color: #17c;border-bottom: 1px dashed #07c;line-height: 22px;}';
document.body.appendChild(style);
Vue.component('editable', Editable);

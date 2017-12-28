# vue-xeditable
[![](https://badge.juejin.im/entry/5a44aadaf265da4327188822/likes.svg?style=flat-square)](https://juejin.im/post/59c08ed2f265da06611f67c4)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/Kar-Wai-Wong/vue-xeditable/master/LICENSE)

Vue Editable Component, base on X-Editable

# Example
[DEMO PAGE](https://kar-wai-wong.github.io/vue-xeditable/)

# Use Setup

install vue-editable
```
npm install vue-xeditable --save
```

## Vue mount
```
import Editable from './Editable.vue'

new Vue({
  el: '#app',
  components: {
    'editable': Editable
  },
  data: {
    value1: 'value'
  }
})


<editable v-model='value1'></editable>
```

## Base
Credit by [X-editable](https://vitalets.github.io/x-editable/docs.html).

# Support Types
**text**, **textarea**, **number**, **text**, **wysihtml5**, lots else.

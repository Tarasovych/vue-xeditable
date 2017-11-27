<template>
  <a href="javascript:;"
     :data-type="type"
     :disabled='disabled'
     :emptytext='emptytext'>{{value}}</a>
</template>
<script>
  import './editable/css/bootstrap.min.css'
  import './editable/css/bootstrap-editable.css'
  import './editable/css/bootstrap-wysihtml5.css'

  import './editable/js/bootstrap.min.js'
  import './editable/js/bootstrap-editable.js'
  import './editable/js/wysihtml5.js'

  export default {
    props:{
      type: {
        type: String,
        default: 'text'
      },
      value: {
        type: String,
        default: ''
      },
      ajaxOptions: {
        type: Object,
        default: function() {
          return {
            type: 'put',
            dataType: 'json'
          }
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      emptytext: {
        type: String,
        default: '无'
      },
      placeholder: {
        type: String,
        default: ''
      },
      display: {
        type: Boolean,
        default: true
      },
      shown: {
        type: Function,
        default: function() {}
      },
      hidden: {
        type: Function,
        default: function() {}
      },
      option: {
        type: Object,
        default: function() { return { } }
      }
    },
    watch: {
      display: function (value) {
        let input_el = $(this.$el)
        let action = value ? 'show' : 'hide'
        input_el.editable(action)
      }
    },
    data() {

    },
    created() {
    },
    mounted(){
      let self = this;
      let el = $(this.$el)
      if (el.data('editable')) el.editable().destroy()
      let defaultOption = {
        mode: 'inline',
        onblur: 'submit',
        showbuttons: false,
        clear: false
      }
      let option = Object.assign(defaultOption, this.ajaxOptions, this.option)
      el.editable(option).on('shown', function(e,editble){
        self.shown();
      }).on('hidden', function(e, reason){
        self.hidden();
      }).on('save', function(e, params) {
        if (params.newValue == self.value) return
        self.handleChange(params.newValue)
      });
    },
    methods: {
      handleChange(value) {
        let self = this;
        this.value = value;
        self.$emit('input', self.value);
        self.$emit('change', self.value);
      }
    }
  }
</script>

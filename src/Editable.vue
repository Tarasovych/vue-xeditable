<template>
  <a href="javascript:;"
     :data-type="type"
     :disabled='disabled'
     :emptytext='emptytext' v-html='value'></a>
</template>
<script>
  export default {
    props:{
      contentEditable: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'text'
      },
      value: {
        type: String,
        default: ''
      },
      source: {
        type: Array,
        default: function() { return [] }
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
      return {}
    },
    created() {
    },
    mounted(){
      this.create_editable_el();
    },
    methods: {
      create_editable_el() {
        let self = this;
        let el = $(this.$el)
        if (el.data('editable')) {
          el.data().editable.destroy()
          debugger
        }
        let defaultOption = {
          mode: 'inline',
          onblur: 'submit',
          showbuttons: false,
          clear: false
        }
        if (this.type == 'wysihtml5') {
          defaultOption.wysihtml5 = {
            'font-styles': false,
            color: true,
            emphasis: true,
            html: false,
            image: false,
            link: false,
            blockquote: false,
            fa: true,
            lists: true,
            stylesheets: ["https://images.cdn.uniqueway.com/wysiwyg-color.css"],
            events: {},
            supportTouchDevices: true,
            parserRules: {
              classes: {
                'wysiwyg-color-clear': 1,
                'wysiwyg-color-first': 1,
                'wysiwyg-color-second': 1,
                'wysiwyg-color-three': 1
              },
              tags: {
                strong: {},
                b:      {},
                i:      {},
                br:     {},
                em:     {},
                p:      {},
                span:   {},
                ul:     {},
                ol:     {},
                li:     {},
                div:  "span",
                h1:  "span",
                h2:  "span",
                h3:  "span",
                h4:  "span",
                h5:  "span",
                a:   "span",
                img: {
                  remove: 1
                }
              }
            },
            locale: 'en'
          }
        }
        defaultOption.emptytext = this.emptytext
        let option = Object.assign(defaultOption, {ajaxOptions: this.ajaxOptions}, this.option)
        if (this.source) {
          option.source = this.source
        }
        el.editable(option).on('shown', function(e,editble){
          self.shown();
        }).on('hidden', function(e, reason){
          self.hidden();
        }).on('save', function(e, params) {
          if (params.newValue == self.value) return
          self.handleChange(params.newValue)
        });
      },
      handleChange(value) {
        let self = this;
        this.value = value;
        self.$emit('input', self.value);
        self.$emit('change', self.value);
        setTimeout(function(){
          $(self.$el).editable('setValue', self.value)
        }, 100)
      }
    }
  }
</script>

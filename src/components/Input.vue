<template>
  <div :class="['input', customClass, inputClass]">
    <input type="text"
      v-model="value"
      :placeholder="placeholder"
      @focus="focusFun"
      @input="inputFun"
      @blur="blurFun"
    />
  </div>
</template>

<script>
import './style.scss'

export default {
  name: 'Input',
  props: {
    placeholder: {
			type: String
		},
    customClass: {
      type: String,
      default:'',
    }
  },
  data() {
    return {
      value: '',
      inputFocusAnimation: false
    }
  },
  methods: {
    scrollIntoView (time = 0) {
      if (/iphone/i.test(navigator.userAgent)) {
        // return
      }
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        setTimeout(() => {
          this.$refs.input.scrollIntoViewIfNeeded(true)
        }, time)
      }
    },
    focusFun: function() {
      this.inputFocusAnimation = true;
      this.$emit('focus');
    },
    inputFun: function() {
      this.$emit('input', this.value);
    },
    blurFun: function() {
      this.inputFocusAnimation = false;
      this.$emit('blur', this.value);
    },
  },
  computed: {
    inputClass: function () {
      return {
        focus: this.inputFocusAnimation,
      }
    }
  }
}
</script>

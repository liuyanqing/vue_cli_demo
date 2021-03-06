<template>
  <div :class="['input', customClass, inputClass]">
    <input
      type="text"
      v-model="currentValue"
      :name="name"
      :placeholder="placeholder"
      :maxlength="max"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :pattern="pattern"
      @focus="focusHandler"
      @blur="onBlur"
      @keyup="onKeyUp"
      ref="input"
    />
  </div>
</template>

<script>
import './style.scss';

export default {
  name: 'Input',
  props: {
    customClass: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    value: [String, Number],
    name: String,
    min: Number,
    max: Number,
    mask: String,
    autocomplete: {
      type: String,
      default: 'off',
    },
    autocapitalize: {
      type: String,
      default: 'off',
    },
    autocorrect: {
      type: String,
      default: 'off',
    },
    spellcheck: {
      type: String,
      default: 'false',
    },
  },
  beforeDestroy () {
    // Android
    window.removeEventListener('resize', this.scrollIntoView)
  },
  data() {
    return {
      inputFocusAnimation: false,
      currentValue: this.value === undefined || this.value === null ? '' : this.value
    };
  },
  watch: {
    value: function (newValue, oldValue) {
      this.currentValue = newValue === undefined || newValue === null ? '' : newValue;
    }
  },
  methods: {
    scrollIntoView(time = 0, isAndroid = true) {
      if (/iphone/i.test(navigator.userAgent)) {
        // return
      }
      if (
        document.activeElement.tagName === 'INPUT'
        || document.activeElement.tagName === 'TEXTAREA'
      ) {
        setTimeout(() => {
          this.$refs.input.scrollIntoViewIfNeeded(isAndroid);
        }, time);
      }
    },
    maskValue(val) {
      const val1 = this.mask ? '11' : val;
      return val1;
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
    focusHandler($event) {
      this.$emit('onFocus', this.currentValue, $event);
      this.isFocus = true;
      this.scrollIntoView(500, false)
    },
    onBlur($event) {
      this.isFocus = false;
      this.$emit('onBlur', this.currentValue, $event);
    },
    onKeyUp(e) {
      if (e.key === 'Enter') {
        e.target.blur();
        this.$emit('onEnter', this.currentValue, e);
      } else {
        this.$emit('onChange', this.currentValue);
      }
    },
  },
  computed: {
    inputClass() {
      return {
        focus: this.inputFocusAnimation,
      };
    },
    pattern() {
      return '[0-9]*';
    },
  },
};
</script>

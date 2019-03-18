<template>
  <div :class="['input', inputClass]">
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
export default {
  name: 'Input',
  props: {
    placeholder: {
			type: String
		},
  },
  data() {
    return {
      value: '',
      inputFocusAnimation: false
    }
  },
  methods: {
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
<style lang="less" scoped>
  .input {
    background: #f6f6f6;
    border-radius: 15px;
    padding: 0 15px;
    input {
      background: transparent;
      outline: none;
      border: none;
    }
  }
</style>

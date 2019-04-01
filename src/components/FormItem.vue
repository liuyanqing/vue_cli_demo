<template>
  <div :class="['formItem',{'formItem-link':isLink}]" :href="linkUrl||'javascript:;'" :style="{'background-color':bgColor}">
    <div class="formItem-box">
      <div class="formItem-left">
        <slot name="label">{{label}}</slot>
      </div>
      <div class="formItem-right">
        <slot name="field">{{field}}</slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FormItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    field: {
      type: String,
      default: ""
    },
    isLink: {
      type: Boolean,
      default: false
    },
    linkUrl: {
      type: String,
      default: null
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: "#FFFFFF"
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.formItem {
  margin-bottom: 16px;
  line-height: 18px;
}
.formItem-left {
  margin-bottom: 4px;
  color: #999;
}
</style>


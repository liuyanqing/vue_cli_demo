<template>
  <div>
    <Input 
      v-model="input" 
      placeholder="edit me"
      @input="inputFun"
      @blur="blurFun"
    />
    <p>Message is: {{ input }}</p>
    <nut-imagepicker
      @imgMsg="imgMsg"
      :max="1"
    >
    </nut-imagepicker>
    <nut-button
      block
      shape="circle"
      :class="classObject"
      @click="clickHandler"
    >
      预约专属服务
    </nut-button>
  </div>
</template>

<script>
import Input from './Input.vue'
export default {
  name: 'Form',
  components: {
    Input,
  },
  data() {
    return {
      input: '',
      isActive: true,
      error: null
    }
  },
  methods: {
    // code 1 自动上传  2 不上传只展示图片  3 删除图片  4 预览图片
    imgMsg:(data) => {
      if(data.code == 1) {
        alert('upload');
      }
    },
    clickHandler() {
      alert('我点击了按钮');
    },
    inputFun(val) {
      console.log(val)
    },
    blurFun(val) {
      console.log('blur')
      this.input = val
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  }
}
</script>
<style lang="less">
input {
    padding: 10px;
}
</style>

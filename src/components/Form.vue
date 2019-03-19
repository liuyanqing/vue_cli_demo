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
    <nut-cell :showIcon="true" :isLink="true" @click.native="switchPicker('isVisibleDate')">
      <span slot="title">
        <label>日期选择</label>
      </span>
      <span slot="sub-title">有默认值，限制开始结束时间~~~</span>
      <div slot="desc" class="selected-option">
        <span class="show-value">{{datetime ? datetime : '请选择'}}</span>
      </div>
    </nut-cell>
    <nut-datepicker 
      :is-visible="isVisibleDate"
      title="请选择日期" 
      type="date"
      startDate="1991-11-10"
      defaultValue="2018-11-02"
      @close="switchPicker('isVisibleDate')"
      @choose="setChooseValue"
    >
    </nut-datepicker>
    <InputNum 
      title="票据号"
      mask="1,12,8,8,1" 
      class="inputName"
      v-model="numValue" 
      :max="34" 
      @onChange="changeNum"
    />
    <p>Message is: {{ numValue }}</p>
  </div>
</template>

<script>
import Input from './Input.vue'
import InputNum from './InputNum.vue'
import './style.scss'

export default {
  name: 'Form',
  components: {
    Input,
    InputNum,
  },
  data() {
    return {
      input: '',
      datetime: '2018-11-02',
      isActive: true,
      isVisibleDate: false,
      error: null,
      numValue: ''
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
    },
    switchPicker(param) {
      this[`${param}`] = !this[`${param}`];
    },
    setChooseValue(param) {
      this.datetime = param[3];
    },
    changeNum (val) {
      this.numValue = val
    },
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

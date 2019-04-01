<template>
  <div>
    <Imagepicker @imgMsg="imgMsg" :max="1" :imgList="imgList" delMode="longtap" autoUpload />
    <FormItem
      :showIcon="true"
      @click.native="switchPicker('isVisibleDate')"
    >
      <label slot="label">
        到期日
      </label>
      <div slot="field" class="input">
        {{ maturityDate ? maturityDate : "请选择" }}
      </div>
    </FormItem>
    <FormItem>
      <label slot="label">
        票据号
      </label>
      <div slot="field">
        <Input
          title="票据号"
          mask="1,12,8,8,1"
          class="inputName"
          v-model="draftNo"
          @onChange="changeDraftNo"
          :max="30"
        />
      </div>
    </FormItem>
    <FormItem>
      <label slot="label">
        票面金额
      </label>
      <div slot="field">
        <Input
          title="票面金额"
          v-model="draftAmount"
          :max="15"
          @onChange="changeAmount"
        />
      </div>
    </FormItem>
    <FormItem>
      <label slot="label">
        承兑行行号
      </label>
      <div slot="field">
        <Input
          title="承兑行行号"
          mask="1,12,8,8,1"
          v-model="acceptorBankCnasp"
          :max="12"
          @onChange="changeBankCnasp"
        />
      </div>
    </FormItem>
    
    <nut-datepicker
      :is-visible="isVisibleDate"
      title="请选择日期"
      type="date"
      :startDate="startDate"
      :defaultValue="maturityDate || startDate"
      endDate="3000-01-01"
      @close="switchPicker('isVisibleDate')"
      @choose="setChooseValue"
    >
    </nut-datepicker>
  </div>
</template>

<script>
import { formatDate } from '@/utils/helper';
import FormItem from './FormItem.vue';
import Input from './Input.vue';
import Imagepicker from './Imagepicker.vue';
import './style.scss';

export default {
  name: 'Form',
  components: {
    Input,
    Imagepicker,
    FormItem
  },
  props: {
    maturityDate: { // 到期日,11位时间戳
        type: [Number, String],
        default: formatDate()
    },
    draftAmount: { // 票面金额
        type: [Number, String],
        default: ''
    },
    acceptorBankCnasp: { // 承兑人开户行联行号
        type: [String],
        default: ''
    },
    draftNo: { // 票号
        type: [String],
        default: ''
    },
    imgUrl: {
        type: [String],
        default: ''
    },
  },
  data() {
    return {
      isActive: true,
      isVisibleDate: false,
      error: null,
      startDate: formatDate(),
      imgList: []
    };
  },
  watch: {
    imgUrl: function (newValue, oldValue) {
      if (newValue) {
        this.imgList.splice(0, 1, {
          id: Math.random(),
          src: newValue
        })
      } else {
        this.imgList.splice(0, 1)
      }
      return newValue
    }
  },
  methods: {
    // code 1 自动上传  2 不上传只展示图片  3 删除图片  4 预览图片
    imgMsg(data) {
      if (data.code === 4) {
        this.$dialog({
          type: 'image', // 设置弹窗类型为'图片弹窗'
          lockBgScroll: true,
          link: '', // 点击图片跳转的Url
          imgSrc: data.src, // 图片Url
          onClickImageLink: function () { // 图片点击事件，默认行为是跳转Url
            return false;  // 返回false可阻止默认的链接跳转行为
          }
        });
      }
      if (data.code === 3) {
        this.$emit('onChange', {imgUrl: null});
      }
    },
    switchPicker(param) {
      this[`${param}`] = !this[`${param}`];
    },
    setChooseValue(param) {
      this.$emit('onChange', {maturityDate: param[3]});
    },
    changeDraftNo(val) {
      this.$emit('onChange', {draftNo: val});
    },
    changeAmount(val) {
      this.$emit('onChange', {draftAmount: val});
    },
    changeBankCnasp(val) {
      this.$emit('onChange', {acceptorBankCnasp: val});
    },
  },
};
</script>

<template>
  <div class="nut-imagepicker">
    <div class="img-list">
      <transition-group :name="animation?'nutEase':''">
        <div class="img-item"
          v-for="item in this.list"
          :key="item.id"
          @touchstart="delMode == 'longtap' ? touchStart(item.id) : ''"
          @touchmove="delMode == 'longtap' ? touchMove(item.id) : ''"
          @touchend="delMode == 'longtap' ? touchEnd(item.id) : ''"
        > 
          <span 
            class="img-close"
            @click="deleteImg(item.id)"
          >X</span>
          <a href="javascript:;"><img :src="item.src" alt="" @click="preview(item.id)"></a>
        </div>
      </transition-group>
      <div :class="['upload-btn', customClass]" v-show="this.list.length < this.max">
        <span>{{text}}</span>
        <input type="file" name="files" :multiple="ismultiple" :accept="accept" :disabled="loading"  @change="addImg" />
      </div>
    </div>
  </div>
</template>
<script>
import { post } from '@/utils/post'
import createSignature from '@/utils/api-signature';
export default {
  name:'Imagepicker',
  props: {
    customClass: {
      type: String,
      default: '',
    },
    animation:{
      type:[Boolean],
      default:true
    },
    max:{//允许上传的最大数量
      type:[Number,String],
      default:9
    },
    accept:{
      type:[String],
      default:"image/*"
    },
    text: {
      type:[String],
      default: '上传票据'
    },
    multiple:{//是否开启多图片上传
      type:[Boolean],
      default:false
    },
    delMode:{//删除图片的方式，支持tap、longtap
      type:[String],
      default:'tap'
    },
    autoUpload:{//选择完图片之后是否自动完成上传
      type:[Boolean,String],
      default:false
    },
    imgUrl:{
      type:[String],
      default: ''
    },
    imgList:{
      type:Array,
      default:() => {
        return [];
      }
    },
  },
  data() {
    return {
      timeOutEvent: 0,
      list: [],
      loading: false, // 上传图片loading状态
    };
  },
  computed: {
    ismultiple() {
      return this.multiple ? 'multiple' : false
    },
  },
  mounted() {
    this.list = this.imgList;
  },
  watch: {
    loading: function (newValue, oldValue) {
      if (newValue) {
        if (this.load) return;
        this.load = this.$toast.loading('正在上传');
        return
      }
      this.load && this.load.hide();
      this.load = null;
    },
    imgList: function (newValue, oldValue) {
      this.list = newValue
    },
  },
  methods: {
    addImg(event){
      const self = this;
      //限制图片上传数量
      const file = event.target.files;
      let fileArr = Array.from(file);
      if (file.length > self.max - self.list.length) {
        fileArr = fileArr.filter((item,index) => index < self.max - self.list.length);
      }
      if (self.autoUpload) { // 自动上传
        this.loading = true
        // FormData 上传
        const data = new FormData();
        data.append('datas', fileArr[0]);
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data',
            ...createSignature()
          },
          data: data,
          url: 'api-ext/ocr/exp-upload',
        }
        // triggle onChange whatever file
        event.target.value = '';
        post(options, self).then(data => {
          if (data && data.imgUrl) {
            self.list.push({
              id: Math.random(),
              src: data.imgUrl,
            });
            self.$emit('imgMsg', {
              code: 1,
              msg: {
                imgUrl: data.imgUrl,
                ...data.ocrInfo
              }
            });
          }
          this.loading = false
        }).catch(err => {
          this.$toast.fail('系统繁忙，请稍后再试！');
          this.loading = false
        })
      } else {
        fileArr.forEach((item,index) => {
          let reader = new FileReader();
          reader.onload = function(evt) {
            self.list.push({
              id:Math.random(),
              src:evt.target.result
            });
            event.target.value = '';
            self.$emit('imgMsg',{
              code:2,
              msg:fileArr
            });
          }
          reader.readAsDataURL(item);
        });
      }
    },
    preview(id) {
      const srcArr = this.list.filter(item => item.id === id )
      this.$emit('imgMsg',{
        code: 4,
        msg: id,
        src: srcArr[0].src,
      });
    },
    deleteImg(id) {
      this.list = this.list.filter(item => item.id != id);
      this.$emit('imgMsg',{
        code:3,
        msg:id
      });
    },
    touchStart(id) {
      this.timeOutEvent = setTimeout(() => {
        this.deleteImg(id);
      }, 500);
      return false;
    },
    touchMove(id) {
      clearTimeout(this.timeOutEvent);
      return false;
    },
    touchEnd(id) {
      clearTimeout(this.timeOutEvent);//清除定时器
      this.timeOutEvent = 0;
    }
  }
}
</script>
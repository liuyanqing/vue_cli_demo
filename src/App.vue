<template>
  <div id="app">
    <div class="rule" @click="openRule">活动规则</div>
    <div class="header">
      <img class="bounce" alt="logo" src="https://ftcms.jd.com/p/files/5ca186a53f5bcd5068b4045d.png" />
    </div>
    <nut-noticebar
      id="notice"
      left-icon="https://ftcms.jd.com/p/files/5ca186aa4c1a03191c8eef80.png"
      :text="notices"
    >
    </nut-noticebar>
    <div class="body">
      <transition name="slide" :duration="{ enter: 500, leave: 0 }">
        <div id="page1" v-show="!imgUrl">
          <div class="title">
            <h3>询价贴现</h3>
            <span></span>
          </div>
          <div class="tip">尊贵的客户，请上传您需要试算的电票照片，我们将免费为您提供试算结果。</div>
          <div class="upload">
            <Imagepicker @imgMsg="imgUpload" :max="1" delMode="longtap" :imgList="imgList" autoUpload />
          </div>
          <p><span class="c-primary">多：</span>支持500余家承兑银行；</p>
          <p><span class="c-primary">快：</span>票据贴到银行<span class="c-primary">2分钟内下款</span>；</p>
          <p><span class="c-primary">好：</span>贴现客户<span class="c-primary">在线银行签约</span>；</p>
          <p><span class="c-primary">省：</span>与多家银行合作，为企业提供贴现服务，企业通过试算，选择<span class="c-primary">最优价格</span>进行银行贴现；</p>
          <p><span class="c-primary">合规：</span>有回单，方便企业入账；</p>
        </div>
      </transition>
      <transition name="slide" :duration="{ enter: 500, leave: 0 }">
        <div id="page2" v-show="imgUrl && (posTag === 2)">
          <div class="title">
            <h3>识别票据</h3>
            <span></span>
          </div>
          <Form
            :imgUrl="imgUrl"
            :maturityDate="maturityDate" 
            :draftAmount="draftAmount" 
            :acceptorBankCnasp="acceptorBankCnasp"           
            :draftNo="draftNo"
            @onChange="changeForm" 
            />
          <div class="contact">
            <p>客服电话：<a href="tel:400-100-5767">400-100-5767</a></p>
            <p>官方网址：<a target="_blank" href="https://piaoju.jd.com">https://piaoju.jd.com</a></p>
          </div>
          <nut-button block class="fixed" @click="queryHandler">
            开始试算
          </nut-button>
        </div>
      </transition>
      <transition name="slide" :duration="{ enter: 500, leave: 0 }">
        <div id="page3" v-show="posTag === 3">
          <div class="title">
            <h3>试算结果</h3>
            <span></span>
          </div>
          <List :dataList="dataList" /> 
          <Bill
            :maturityDate="maturityDate" 
            :draftAmount="draftAmount" 
            :acceptorBankCnasp="acceptorBankCnasp"           
            :draftNo="draftNo"
          />
          <nut-row class="btn-group" :gutter="6">
            <nut-col :span="12">
              <Imagepicker 
                @imgMsg="imgUpload" 
                :max="1" 
                delMode="longtap" 
                text="重新上传" 
                customClass="bg-white"
                :imgList="imgList2"
                autoUpload />
            </nut-col>
            <nut-col :span="12">
              <nut-button block shape="circle" type="primary" @click="editHandler">
                修改票据信息
              </nut-button> 
            </nut-col>
          </nut-row>
          <nut-button block class="fixed" @click="orderService">
            预约专属服务
          </nut-button>
        </div>
      </transition>
      <transition name="slide" :duration="{ enter: 500, leave: 0 }">
        <div id="page4" v-show="posTag === 3">
          <div class="title">
            <h3>预约专属服务</h3>
            <span></span>
          </div>
          <div class="tip">请联系客服经理获取更多行口报价及秒贴服务</div>
          <div class="code">
            <img src="https://ftcms.jd.com/p/files/5ca186aee74b22192c06dd48.jpg" alt="客服经理二维码">
            <p>- 长按联系客服经理 -</p>
          </div>
          <div class="contact">
            <p>客服电话：<a href="tel:400-100-5767">400-100-5767</a></p>
            <p>官方网址：<a target="_blank" href="https://piaoju.jd.com">https://piaoju.jd.com</a></p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { post } from '@/utils/post';
// @ is an alias to /src
import { formatDate } from '@/utils/helper';
import { ruleContent } from '@/utils/config.js';
import Form from '@/components/Form.vue';
import List from '@/components/List.vue';
import Bill from '@/components/Bill.vue';
import Imagepicker from '@/components/Imagepicker.vue';

export default {
  name: 'app',
  components: {
    Form,
    List,
    Bill,
    Imagepicker,
  },
  data() {
    return {
      imgUrl: '',
      imgList: [],
      imgList2: [], // 重新上传图片
      noticeList: [],
      maturityDate: '', // 到期日,11位时间戳
      draftAmount: '', // 票面金额
      acceptorBankCnasp: '', // 承兑人开户行联行号
      draftNo: '', // 票号
      dataList: [], // 试算结果
      calcing: false, // 正在试算中。。
      posTag: 1, // 1 - 询价贴现，2 - 识别票据，3 - 试算结果
    };
  },
  watch: {
    calcing: function (newValue, oldValue) {
      if (newValue) {
        if (this.load) return;
        this.load = this.$toast.loading('试算中');
        return
      }
      this.load && this.load.hide();
      this.load = null;
    },
    imgUrl: function (newValue, oldValue) {
      if (newValue) {
        this.imgList.splice(0, 1, {
          id: Math.random(),
          src: newValue
        })
        this.imgList2.splice(0, 1)
        this.posTag = 2
      } else {
        this.posTag = 1
        this.imgList.splice(0, 1)
      }
      return newValue
    },
    posTag: function (newValue, oldValue) {
      if ((newValue !== oldValue) && (newValue === 2 || newValue === 3)) {
        this.scrollTop()
      }
      return newValue
    },
  },
  computed: {
    notices() {
      const list = this.noticeList.map(v => v.info)
      return list.join('； ')
    }
  },
  mounted() {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      data: {},
      url: 'open/latest-trades',
    }
    post(options, this).then(data => {
      if (data) {
        this.noticeList = [...data]
      }
    }).catch(err => {
      this.$toast.fail(err.msg || '网络有误，请稍后再试');
    })
  },
  methods: {
    openRule() {
      this.$dialog({
        customClass: "rule-dialog",
        title: "活动规则",
        lockBgScroll: true,
        maskBgStyle: "rgba(0,0,0,0)", //设置遮罩层背景透明
        textAlign: 'left',
        content: ruleContent,
        closeBtn: true,
        noFooter: true
      });
    },
    imgUpload(data) {
      if (data.code === 1) {
        this.posTag = 2
        this.changeForm(data.msg)
      }
    },
    changeForm(data) {
      if (data instanceof Object) {
        Object.keys(data).forEach(key => {
          if (key === 'maturityDate') {
            const date = formatDate(data[key])
            this[key] = date
            return
          }
          if (['imgUrl', 'draftAmount', 'acceptorBankCnasp', 'draftNo'].includes(key)) {
            this[key] = data[key]
          }
        })
      }
    },
    // 试算
    queryHandler() {
      const self = this;
      const datas = {
        draftFrontUrl: this.imgUrl,
        draftNo: this.draftNo,
        maturityDate: this.maturityDate,
        draftAmount: this.draftAmount,
        acceptorBankCnasp: this.acceptorBankCnasp,
      }
      if (!this.validateFields(datas)) {
        return
      }
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
        data: {
          datas,
        },
        url: 'api-ext/mt/exp-pre-query',
      }
      this.calcing = true
      post(options, self).then(data => {
        if (data) {
          this.dataList = [...data]
          this.posTag = 3
        }
        this.calcing = false
      }).catch(err => {
        this.calcing = false
        this.$toast.fail(err.msg || '试算失败');
      })
    },
    editHandler() {
      this.posTag = 2
    },
    validateFields(data) {
      const validate = {
        draftNo: ['票据号不能为空', '票据号格式不正确'],
        maturityDate: ['到期日不能为空'],
        draftAmount: ['票面金额不能为空', '票面金额格式不正确'],
        acceptorBankCnasp: ['承兑人行号不能为空', '承兑人行号为12位数字'],
      }
      let noErr = true
      for (const key in validate) {
        if (!data[key]) {
          noErr = false
          this.$toast.warn(validate[key][0]);
          break;
        }
      }
      if (!noErr) {
        return noErr
      }
      if (data.acceptorBankCnasp.length < 12) {
        this.$toast.warn(validate.acceptorBankCnasp[1]);
        return false
      }
      if (!data.draftNo.match(/^[12]\d{12}\d{4}(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])\d{9}$/)) {
        this.$toast.warn(validate.draftNo[1]);
        return false
      }
      return true
    },
    orderService() {
      this.$toast.text('请识别二维码联系客服经理了解更多行口报价。');
    },
    scrollTop() {
      const top = document.getElementById("notice").offsetTop + 36
      document.body.scrollTop = document.documentElement.scrollTop = window.pageYOffset = top
      console.log(document.body.scrollTop)
    }
  }
};
</script>

<style lang="scss" scoped>
$radio: 14px;
@keyframes bounceIn {
  0% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.rule {
  position: absolute;
  top: 6px;
  right: 0;
  width: 80px;
  line-height: 28px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 14px;
  text-align: center;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  cursor: pointer;
}
.header {
  font-size: 0;
  img {
    width: 100%;
  }
}
.bounce {
  animation: bounceIn 0.5s;
}
.body {
  padding: 0 16px;
}
.tip {
  width: 300px;
  margin: 0 auto 20px;
  text-align: center;
  line-height: 24px;
}
.upload {
  width: 169px;
  margin: 0 auto;
}
.contact {
  margin: 20px 0 46px;
  p {
    margin: 0;
    line-height: 24px;
    font-size: 14px;
    text-align: center;
  }
  a {
    color: #333;
  }
}
.btn-group {
  margin-top: 20px;
}
#page1 p {
  line-height: 24px;
  width: 80%;
  margin: auto;
}
#page4 {
  margin-top: 45px;
  .tip {
    width: 100%;
  }
}
.code {
  width: 215px;
  margin: 0 auto;
  img {
    width: 100%;
  }
  p {
    text-align: center;
    font-size: 12px;
  }
}
.slide-enter-active, .slide-leave-active {
  transition: height .5s;
}
.slide-enter, .slide-leave-to {
  height: 0;
}
</style>

<template>
  <div>
    <div class="item"
      v-for="item in this.dataList"
      :key="item.bankName"
    >
      <div class="name">
        <span class="decorateLine"></span>{{item.bankName}}
      </div>
      <div v-if="item.resCode === '1'">
        <div class="info">
          <div class="left">
            <p class="tit">贴现率(%)</p>
            <p class="text">{{ percent(item.discountRate) }}</p>
          </div>
          <div class="right">
            <p class="tit">预计成交价(元)</p>
            <p class="text">{{ amount(item.discountAmount) }}</p>
          </div>
        </div>
      </div>
      <div v-else class="info">
        <div class="desc">{{item.rejectDesc}}</div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { toPercent, formatAmount } from '@/utils/helper';

export default {
  name: 'List',
  props: {
    dataList: {
      type: [Array],
      default: () => ([]),
    },
  },
  data() {
    return {}
  },
  methods: {
    percent(val) {
      return toPercent(val);
    },
    amount(val) {
      return formatAmount(val);
    },
  }
}
</script>
<style lang="scss" scoped>
.item {
  margin-bottom: 20px;
  padding: 0 20px 12px;
  box-shadow: 0 0 24px 0 #ddd;
}
.name {
  line-height: 40px;
}
.info {
  display: flex;
  height: 68px;
  padding-top: 12px;
  box-sizing: border-box;
}
.left {
  width: 100px;
}
.tit {
  color: #999;
  font-size: 13px;
  font-weight: normal;
  line-height: 24px;
}
.text {
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
}
.desc {
  color: #999;
  line-height: 56px;
}
</style>

<template>
  <nut-row class="content">
    <nut-col :span="12">
      <div class="tit">承兑行行号</div>
      <div class="text">{{ acceptorBankCnasp }}</div>
    </nut-col>
    <nut-col :span="12" class="p-l">
      <div class="tit">到期日</div>
      <div class="text">{{ maturityDate }}</div>
    </nut-col>
    <nut-col :span="12">
      <div class="tit">票据号码</div>
      <div class="text">{{ draftNo }}</div>
    </nut-col>
    <nut-col :span="12" class="p-l">
      <div class="tit">票面金额</div>
      <div class="text">{{ draftAmount }}</div>
    </nut-col>
  </nut-row>
</template>
<script>
import { formatDate } from '@/utils/helper';

export default {
  name: 'Bill',
  props: {
    maturityDate: { // 到期日,11位时间戳
      type: [Number, String],
      default: formatDate()
    },
    draftAmount: { // 票面金额
      type: [Number, String],
      default: '--'
    },
    acceptorBankCnasp: { // 承兑人开户行联行号
      type: [String],
      default: '--'
    },
    draftNo: { // 票号
      type: [String],
      default: '--'
    },
  },
}
</script>
<style lang="scss">
.content {
  padding: 16px 20px 4px;
  background: #f5f5f5;
  >div {
    word-break: break-all;
    padding: 0 12px 0 0;
    margin-bottom: 12px;
  }
}
.tit {
  color: #999;
  font-size: 13px;
  line-height: 16px;
}
.text {
  line-height: 20px;
  margin-top: 4px;
}
</style>

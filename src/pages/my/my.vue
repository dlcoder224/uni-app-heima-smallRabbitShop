<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { http } from '@/utils/http'

const memberStore = useMemberStore()

const getData = async () => {
  const res = await http<string[]>({
    method: 'GET',
    url: '/home/banner',
  })
  console.log(res, 'res')
}
</script>

<template>
  <button
    @tap="
      memberStore.setProfile({
        nickname: '黑马先锋',
      })
    "
    size="mini"
    plain
    type="primary"
  >
    保存用户信息
  </button>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData()" size="mini" plain type="warn">测试请求</button>
  </view>
  <uni-card>
    <text>这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
  </uni-card>
</template>

<style lang="scss">
.my {
}
</style>

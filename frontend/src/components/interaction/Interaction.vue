<script setup lang="ts">
import {ref} from 'vue'
import {chat} from '@/api/imgs'
import {move, responseShow, responseSwicth, interactionDrawer, chatSpeak} from '@/components/scripts/pet'
import {getLeftByMargin, getTopByMargin} from '@/components/scripts/animationFunc'
import {sleep} from '@/components/scripts/utils';
import $ from 'jquery';

let customTargetX = ref<number>(0)
let customTargetY = ref<number>(0)

let chatPrompt = ref<string>('')
let history = ref<string[][]>([])

let showInterval = ref<number>(80)
let tmpStr: string[] = ['', '']

async function manualMove(targetX: number, targetY: number) {
  interactionDrawer.value = false
  move(targetX, targetY)
}

async function sendChat() {
  responseSwicth.value = false
  let res = await chat({
    question: chatPrompt.value,
    history: history.value,
  })
  res = res.data
  if (res.code === 0) {
    response.value = 'err:' + res.msg
    return
  }
  responseSwicth.value = true
  interactionDrawer.value = false
  response.value = res.data
  tmpStr[0] = chatPrompt.value
  tmpStr[1] = response.value
  history.value.push(tmpStr)
  responseShow.value = ''
  chatSpeak(response.value.length * showInterval.value)
  $('#chatPopover').text('')
  $(".arco-trigger-position-top").css({
    'margin-left': (getLeftByMargin() + 100) + 'px',
    'margin-top': (getTopByMargin() - 10) + 'px',
  })
  for (let i = 0; i < response.value.length; i++) {
    responseShow.value = response.value.substring(0, i + 1) + (i % 6 < 3 ? '|' : '')
    $('#chatPopover').text(responseShow.value)
    $(".arco-trigger-position-top").css({
      'margin-left': (getLeftByMargin() + 100) + 'px',
      'margin-top': (getTopByMargin() - 10) + 'px',
    })
    await sleep(showInterval.value)
  }
  responseShow.value = response.value
  $('#chatPopover').text(responseShow.value)
  $(".arco-trigger-position-top").css({
    'margin-left': (getLeftByMargin() + 100) + 'px',
    'margin-top': (getTopByMargin() - 10) + 'px',
  })
  await sleep(1000)
}

let response = ref<string>('')

</script>

<script lang="ts">
import {
  IconSend,
} from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconSend,
  },
};
</script>

<template>
  <div id="interaction">
    <a-row class="grid-demo" style="margin-bottom: 100px;">
      <a-col :flex="2">
        <a-input-number v-model="customTargetX" :style="{width:'160px'}" placeholder="目标点X像素坐标" allow-clear>
          <template #append>
            px
          </template>
        </a-input-number>
      </a-col>
      <a-col :flex="2">
        <a-input-number v-model="customTargetY" :style="{width:'160px'}" placeholder="目标点Y像素坐标" allow-clear>
          <template #append>
            px
          </template>
        </a-input-number>
      </a-col>
      <a-col :flex="1">
        <a-button type="primary" @click="manualMove(customTargetX, customTargetY)">移动</a-button>
      </a-col>
    </a-row>
    <a-row class="grid-demo" style="margin-bottom: 100px;">
      <a-col :flex="3">
        <a-input placeholder="输入prompt" v-model="chatPrompt">
          <template #suffix>
            <icon-send />
          </template>
        </a-input>
      </a-col>
      <a-col :flex="2">
        <a-button type="primary" @click="sendChat" :disabled="responseSwicth">调教</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.grid-demo {
  height: 48px;
  line-height: 48px;
  text-align: center;
}
</style>
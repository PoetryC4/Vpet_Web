<script setup lang="ts">
import { ref } from 'vue'
import { chat } from '@/api/imgs'
import { move, responseShow, responseSwicth, interactionDrawer, chatSpeak } from '@/components/scripts/pet'
import { getLeftByMargin, getTopByMargin } from '@/components/scripts/animationFunc'
import { studyToggle, sleepToggle, liveToggle, copyToggle, danceToggle, researchToggle, playOneToggle, workCleanToggle, removeObjectToggle} from '@/components/scripts/pet'
import { sleep } from '@/components/scripts/utils';
import $ from 'jquery';

let customTargetX = ref<number>(0)
let customTargetY = ref<number>(0)

let chatPrompt = ref<string>('')
let history = ref<string[][]>([])

let showInterval = ref<number>(80)
let tmpStr:string[] = ['','']

async function manualMove(targetX:number, targetY:number) {
    interactionDrawer.value = false
    move(targetX, targetY)
}

async function sendChat() {
    responseSwicth[0] = false
  let res = await chat({
      question: chatPrompt.value,
      history: history.value,
    })
    res = res.data
    if(res.code === 0) {
      response.value = 'err:'+res.msg
      return
    }
    interactionDrawer.value = false
    $(".el-popper").css({
  'margin-left': (getLeftByMargin() + 100)+'px',
  'margin-top': (getTopByMargin() - 10)+'px',
    })
    responseSwicth[0] = true
    response.value = res.data
    tmpStr[0] = chatPrompt.value
    tmpStr[1] = response.value
    history.value.push(tmpStr)
    responseShow[0] = ''
    chatSpeak(response.value.length * showInterval.value)
    $('#chatPopover').text('')
    for(let i = 0;i<response.value.length;i++) {
      responseShow[0] = response.value.substring(0, i+1) + (i%6<3?'|':'')
      $('#chatPopover').text(responseShow[0])
      await sleep(showInterval.value)
    }
    responseShow[0] = response.value
    $('#chatPopover').text(responseShow[0])
}

let response = ref<string>('')

</script>

<template>
    <div>
  <el-row :gutter="50">
      <el-col :span="5">
        <el-input
          placeholder="targetX"
          v-model:value="customTargetX"
          v-model:model-value="customTargetX">
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-input
          placeholder="targetY"
          @change="console.log(customTargetX)"
          v-model:value="customTargetY"
          v-model:model-value="customTargetY">
        </el-input>
      </el-col>
    </el-row>
  <el-row :gutter="70">
      <el-col :span="5">
          <el-button type="primary" plain @click="manualMove(customTargetX, customTargetY)">移动</el-button>
      </el-col>
    </el-row>
  <el-row :gutter="70">
      <el-col :span="15">
          <el-input placeholder="question" v-model:model-value="chatPrompt" v-model:value="chatPrompt"></el-input>
      </el-col>
      <el-col :span="5">
          <el-button type="primary" plain @click="sendChat">调教</el-button>
      </el-col>
    </el-row>
  <el-row :gutter="70">
    <el-col :span="5">
          <el-button type="primary" plain @click="studyToggle">学习</el-button>
      </el-col>
      <el-col :span="5">
          <el-button type="primary" plain @click="danceToggle">舞</el-button>
      </el-col>
      <el-col :span="5">
          <el-button type="primary" plain @click="sleepToggle">睡</el-button>
      </el-col>
      <el-col :span="5">
          <el-button type="primary" plain @click="copyToggle">抄</el-button>
      </el-col>
    </el-row>
  <el-row :gutter="70">
      <el-col :span="5">
          <el-button type="primary" plain @click="researchToggle">科研</el-button>
      </el-col>
      <el-col :span="5">
          <el-button type="primary" plain @click="liveToggle">播</el-button>
      </el-col>
      <el-col :span="5">
          <el-button type="primary" plain @click="playOneToggle">玩耍</el-button>
      </el-col>
      <el-col :span="5">
          <el-button type="primary" plain @click="workCleanToggle">清洁</el-button>
      </el-col>
    </el-row>
  <el-row :gutter="70">
      <el-col :span="5">
          <el-button type="primary" plain @click="removeObjectToggle">除物</el-button>
      </el-col>
    </el-row>
    
    </div>
</template>

<style>
.el-row{
    margin-top: 20px;
  }
</style>
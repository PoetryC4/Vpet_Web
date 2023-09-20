<script setup lang="ts">
import {ref} from 'vue'
import * as petAimations from '@/components/scripts/animation'
import {durDebug} from '@/components/scripts/pet'

let stateSelected = ref()

let stateOptions = [
  {
    value: 1,
    label: 'Happy'
  },
  {
    value: 2,
    label: 'Normal'
  },
  {
    value: 3,
    label: 'Ill'
  },
  {
    value: 4,
    label: 'PoorCondition'
  }
]

let animationSelected = ref()

let animationOptions: any[] = []
let index = 1
for (let item in petAimations) {
  animationOptions.push({
    'value': index,
    'label': item,
  })
  index++
}

async function beginAnimationDebug() {
  console.log(stateSelected.value)
  if (typeof petAimations[animationOptions[animationSelected.value - 1].label] === 'function') {
    durDebug.value = true
    await petAimations[animationOptions[animationSelected.value - 1].label](stateOptions[stateSelected.value - 1].label)
    durDebug.value = false
  }
}
</script>

<template>
  <div id="anime_debug">
    <a-row class="grid-demo" style="margin-bottom: 16px;">
      <a-col :flex="2">
        <a-select :defaultValue="stateOptions[0].label" :style="{width:'160px'}" placeholder="请选择状态" v-model="stateSelected">
          <a-option v-for="item in stateOptions" :value="item.value" :label="item.label"/>
        </a-select>
      </a-col>
      <a-col :flex="3">
        <a-select :defaultValue="animationOptions[0].label" :style="{width:'240px'}" placeholder="请选择动画" v-model="animationSelected">
          <a-option v-for="item in animationOptions" :value="item.value" :label="item.label"/>
        </a-select>
      </a-col>
    </a-row>
    <a-row class="grid-demo" style="margin-bottom: 16px;">
      <a-col :flex="3">
        <a-button type="primary" @click="beginAnimationDebug">调试</a-button>
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
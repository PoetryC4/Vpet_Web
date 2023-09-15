<script setup lang="ts">
import { ref } from 'vue'
import * as petAimations from'@/components/scripts/animation'
import { durDebug } from '@/components/scripts/pet'

let stateSelected = ref<number>(1)

let stateOptions = [
  {
    value:1,
    label:'Happy'
  },
  {
    value:2,
    label:'Normal'
  },
  {
    value:3,
    label:'Ill'
  },
  {
    value:4,
    label:'PoorCondition'
  }
]

let animationSelected = ref<number>(1)

let animationOptions: any[] = []
let index = 1
for(let item in petAimations) {
  animationOptions.push({
    'value':index,
    'label':item,
  })
  index++
}

function selectChange(val:any) {
    //console.log(animationOptions[animationSelected.value-1].label)
    //console.log(stateOptions[stateSelected.value-1].label)
}

async function beginAnimationDebug() {
  if (typeof petAimations[animationOptions[animationSelected.value-1].label] === 'function') {
    durDebug.value = true
    await petAimations[animationOptions[animationSelected.value-1].label](stateOptions[stateSelected.value-1].label)
    durDebug.value = false
  }
}
</script>

<template>
    <div>
  <el-row :gutter="70">
      <el-col :span="10">
        <el-select v-model:modelValue="stateSelected" placeholder="请选择状态" @change = "selectChange">
      <el-option
        v-for="item in stateOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
      </el-col>
    </el-row>
  <el-row :gutter="70">
      <el-col :span="10">
        <el-select v-model:modelValue="animationSelected" placeholder="请选择动画" filterable @change = "selectChange">
      <el-option
        v-for="item in animationOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
      </el-col>
    </el-row>
  <el-row :gutter="70">
      <el-col :span="5">
          <el-button type="primary" plain @click="beginAnimationDebug">调式动画</el-button>
      </el-col>
    </el-row>

    </div>
</template>

<style>
.el-row{
    margin-top: 20px;
  }
</style>
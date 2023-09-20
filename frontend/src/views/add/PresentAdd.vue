<script setup lang="ts">
import {reactive, ref} from 'vue'
import {validatorNumber, validatorString} from '@/components/scripts/validate'

const state = reactive({
  formData: {
    name: '',
    price: 0,
    mood: 0,
    picPath: '',
    exp: 0,
    performance: 0,
  },
})
import {addPresent} from '../../api/imgs'

async function submitPresent() {
  let res = await addPresent({
    presentName: state.formData.name,
    presentPrice: state.formData.price,
    presentPicPath: state.formData.picPath,
    presentMood: state.formData.mood,
    presentPerformance: state.formData.performance,
    presentExp: state.formData.exp,
  })
  res = res.data
  if (res.code === 1) {
    console.log('礼品添加成功')
    return res.data
  } else {
    console.log(res.msg || '出错')
    return null
  }
}
</script>


<template>
  <div id="medic_add">
    <a-form
        style="left: 0;right: 0;top: 0;bottom: 0;margin: 10% auto;"
        :model="state"
        :style="{ width: '600px', marginTop: '20px' }"
        :size="'medium'"
        :auto-label-width="true"
    >
      <a-form-item
          field="name"
          label="礼物名称"
          feedback
          :rules="[{required:true,message:'礼物名称是必需的'},{maxLength:20,message:'礼物名称不得长于二十个字符'}]"
          :validate-trigger="['change','input']"
      >
        <a-input
            v-model="state.formData.name"
            placeholder="请输入礼物名称"
        />
      </a-form-item>
      <a-form-item
          field="price"
          label="礼物价格"
          feedback
          :rules="[{required:true,message:'礼物价格是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.price"
            placeholder="请输入礼物价格"
        />
      </a-form-item>
      <a-form-item
          field="performance"
          label="礼品性能"
          feedback
          :rules="[{required:true,message:'礼物提升健康度是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.performance"
            placeholder="请输入礼品性能"
        />
      </a-form-item>
      <a-form-item
          field="exp"
          label="礼物提升经验值"
          feedback
          :rules="[{required:true,message:'礼物提升经验值是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.exp"
            placeholder="请输入礼物提升的经验值"
        />
      </a-form-item>
      <a-form-item
          field="mood"
          label="礼物补充心情值"
          feedback
          :rules="[{required:true,message:'礼物补充心情值是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.mood"
            placeholder="请输入礼物补充心情值"
        />
      </a-form-item>
      <a-form-item
          field="picPath"
          label="礼物贴图路径"
          feedback
          :rules="[{required:true,message:'礼物贴图路径是必需的'},{maxLength:20,message:'礼物名称不得长于二十个字符'}]"
          :validate-trigger="['change','input']"
      >
        <a-input
            v-model="state.formData.picPath"
            placeholder="请输入礼物贴图路径"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="submitPresent">添加礼物</a-button>
        </a-space>
      </a-form-item>

    </a-form>

  </div>
</template>
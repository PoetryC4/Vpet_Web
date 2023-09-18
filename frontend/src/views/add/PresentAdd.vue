<script setup lang="ts">
import {reactive, ref} from 'vue'
import {validatorNumber, validatorString} from '@/components/scripts/validate'

const form = ref<any>()
const state = reactive({
  formData: {
    name: '',
    price: 0,
    mood: 0,
    picPath: '',
    exp: 0,
    performance: 0,
  },
  rules: {
    name: [
      {validator: validatorString, trigger: "change"},
    ],
    picPath: [
      {validator: validatorString, trigger: "change"},
    ],
    price: [
      {validator: validatorNumber, trigger: "change"},
    ],
    mood: [
      {validator: validatorNumber, trigger: "change"},
    ],
    performance: [
      {validator: validatorNumber, trigger: "change"},
    ],
    exp: [
      {validator: validatorNumber, trigger: "change"},
    ],
  },
})
import {addPresent} from '../../api/imgs'

async function submitPresent(form: any) {
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
  <div class="fullDiv">
    <el-form ref="form" label-width="180px" :rules="state.rules" style="width:30%" :model="state.formData">
      <el-form-item label="礼品名称" prop="name">
        <el-input v-model="state.formData.name"></el-input>
      </el-form-item>
      <el-form-item label="礼品价格" prop="price">
        <el-input v-model="state.formData.price"></el-input>
      </el-form-item>
      <el-form-item label="礼品性能" prop="performance">
        <el-input v-model="state.formData.performance"></el-input>
      </el-form-item>
      <el-form-item label="礼品提升经验值" prop="exp">
        <el-input v-model="state.formData.exp"></el-input>
      </el-form-item>
      <el-form-item label="礼品补充心情值" prop="mood">
        <el-input v-model="state.formData.mood"></el-input>
      </el-form-item>
      <el-form-item label="礼品贴图路径" prop="picPath">
        <el-input v-model="state.formData.picPath"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPresent(form)">添加礼品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { validatorNumber, validatorString } from '@/components/scripts/validate'
const form = ref<any>()
const state = reactive({
  formData: {
    name: '',
    price: 0,
    hunger: 0,
    thirsty: 0,
    mood:0,
    picPath:'',
    exp:0,
    endu:0,
    heal:0,
  },
  rules: {
    name: [
          { validator: validatorString, trigger: "change" },
        ],
        picPath: [
          { validator: validatorString, trigger: "change" },
        ],
        price: [
          { validator: validatorNumber, trigger: "change" },
        ],
        hunger: [
          { validator: validatorNumber, trigger: "change" },
        ],
        mood: [
          { validator: validatorNumber, trigger: "change" },
        ],
        thirsty: [
          { validator: validatorNumber, trigger: "change" },
        ],
        exp: [
          { validator: validatorNumber, trigger: "change" },
        ],
        endu: [
          { validator: validatorNumber, trigger: "change" },
        ],
        heal: [
          { validator: validatorNumber, trigger: "change" },
        ],
  },
})
    import { addFood } from '../../api/imgs'
    async function submitFood(form:any) {
      let res = await addFood({
          foodName: state.formData.name,
          foodPrice: state.formData.price,
          foodPicPath: state.formData.picPath,
          foodMood: state.formData.mood,
          foodHunger: state.formData.hunger,
          foodThirsty: state.formData.thirsty,
          foodEndu: state.formData.endu,
          foodExp: state.formData.exp,
          foodHealth: state.formData.heal,
        })
      res = res.data
      if(res.code === 1) {
        console.log('食物添加成功')
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
  <el-form-item label="食物名称" prop="name">
    <el-input v-model="state.formData.name"></el-input>
  </el-form-item>
  <el-form-item label="食物价格" prop="price">
    <el-input v-model="state.formData.price"></el-input>
  </el-form-item>
  <el-form-item label="食物提升健康度" prop="heal">
    <el-input v-model="state.formData.heal"></el-input>
  </el-form-item>
  <el-form-item label="食物提升经验值" prop="exp">
    <el-input v-model="state.formData.exp"></el-input>
  </el-form-item>
  <el-form-item label="食物补充饥饿值" prop="hunger">
    <el-input v-model="state.formData.hunger"></el-input>
  </el-form-item>
  <el-form-item label="食物补充体力值" prop="endu">
    <el-input v-model="state.formData.endu"></el-input>
  </el-form-item>
  <el-form-item label="食物补充口渴值" prop="thirsty">
    <el-input v-model="state.formData.thirsty"></el-input>
  </el-form-item>
  <el-form-item label="食物补充心情值" prop="mood">
    <el-input v-model="state.formData.mood"></el-input>
  </el-form-item>
  <el-form-item label="食物贴图路径" prop="picPath">
    <el-input v-model="state.formData.picPath"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitFood(form)">添加食物</el-button>
  </el-form-item>
</el-form>
    </div>
</template>
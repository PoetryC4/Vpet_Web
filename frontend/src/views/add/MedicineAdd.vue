<script setup lang="ts">
import { reactive, ref } from 'vue'
import { validatorNumber, validatorString } from '@/components/scripts/validate'
const form = ref<any>()
const state = reactive({
  formData: {
    name: '',
    price: 0,
    power: 0,
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
        mood: [
          { validator: validatorNumber, trigger: "change" },
        ],
        power: [
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
    import { addMedicine } from '../../api/imgs'
    async function submitMedicine(form:any) {
      let res = await addMedicine({
          medicineName: state.formData.name,
          medicinePrice: state.formData.price,
          medicinePicPath: state.formData.picPath,
          medicineMood: state.formData.mood,
          medicinePower: state.formData.power,
          medicineEndu: state.formData.endu,
          medicineExp: state.formData.exp,
          medicineHealth: state.formData.heal,
        })
      res = res.data
      if(res.code === 1) {
        console.log('药物添加成功')
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
  <el-form-item label="药物名称" prop="name">
    <el-input v-model="state.formData.name"></el-input>
  </el-form-item>
  <el-form-item label="药物价格" prop="price">
    <el-input v-model="state.formData.price"></el-input>
  </el-form-item>
  <el-form-item label="药物提升健康度" prop="heal">
    <el-input v-model="state.formData.heal"></el-input>
  </el-form-item>
  <el-form-item label="药物提升经验值" prop="exp">
    <el-input v-model="state.formData.exp"></el-input>
  </el-form-item>
  <el-form-item label="药物补充体力值" prop="power">
    <el-input v-model="state.formData.power"></el-input>
  </el-form-item>
  <el-form-item label="药物补充体力值" prop="endu">
    <el-input v-model="state.formData.endu"></el-input>
  </el-form-item>
  <el-form-item label="药物补充心情值" prop="mood">
    <el-input v-model="state.formData.mood"></el-input>
  </el-form-item>
  <el-form-item label="药物贴图路径" prop="picPath">
    <el-input v-model="state.formData.picPath"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitMedicine(form)">添加药物</el-button>
  </el-form-item>
</el-form>
    </div>
</template>
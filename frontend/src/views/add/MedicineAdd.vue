<script setup lang="ts">
import {reactive, ref} from 'vue'
import {validatorNumber, validatorString} from '@/components/scripts/validate'

const state = reactive({
  formData: {
    name: '',
    price: 0,
    power: 0,
    mood: 0,
    picPath: '',
    exp: 0,
    endu: 0,
    heal: 0,
  },
})
import {addMedicine} from '../../api/imgs'

async function submitMedicine() {
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
  if (res.code === 1) {
    console.log('药物添加成功')
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
          label="药品名称"
          feedback
          :rules="[{required:true,message:'药品名称是必需的'},{maxLength:20,message:'药品名称不得长于二十个字符'}]"
          :validate-trigger="['change','input']"
      >
        <a-input
            v-model="state.formData.name"
            placeholder="请输入药品名称"
        />
      </a-form-item>
      <a-form-item
          field="price"
          label="药品价格"
          feedback
          :rules="[{required:true,message:'药品价格是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.price"
            placeholder="请输入药品价格"
        />
      </a-form-item>
      <a-form-item
          field="heal"
          label="药品提升健康度"
          feedback
          :rules="[{required:true,message:'药品提升健康度是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.heal"
            placeholder="请输入药品提升的健康度"
        />
      </a-form-item>
      <a-form-item
          field="exp"
          label="药品提升经验值"
          feedback
          :rules="[{required:true,message:'药品提升经验值是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.exp"
            placeholder="请输入药品提升的经验值"
        />
      </a-form-item>
      <a-form-item
          field="endu"
          label="药品补充体力值"
          feedback
          :rules="[{required:true,message:'药品补充体力值是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.endu"
            placeholder="请输入药品补充的体力值"
        />
      </a-form-item>
      <a-form-item
          field="mood"
          label="药品补充心情值"
          feedback
          :rules="[{required:true,message:'药品补充心情值是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.mood"
            placeholder="请输入药品补充心情值"
        />
      </a-form-item>
      <a-form-item
          field="picPath"
          label="药品贴图路径"
          feedback
          :rules="[{required:true,message:'药品贴图路径是必需的'},{maxLength:20,message:'药品名称不得长于二十个字符'}]"
          :validate-trigger="['change','input']"
      >
        <a-input
            v-model="state.formData.picPath"
            placeholder="请输入药品贴图路径"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="submitMedicine">添加药品</a-button>
        </a-space>
      </a-form-item>

    </a-form>

  </div>
</template>
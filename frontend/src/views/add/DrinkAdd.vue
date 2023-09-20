<script setup lang="ts">
import {reactive, ref} from 'vue'
import {validatorNumber, validatorString} from '@/components/scripts/validate'

const state = reactive({
  formData: {
    name: '',
    price: 0,
    hunger: 0,
    thirsty: 0,
    mood: 0,
    picPath: '',
    exp: 0,
    endu: 0,
    heal: 0,
  },
})
import {addDrink} from '../../api/imgs'

async function submitDrink() {
  let res = await addDrink({
    drinkName: state.formData.name,
    drinkPrice: state.formData.price,
    drinkPicPath: state.formData.picPath,
    drinkMood: state.formData.mood,
    drinkHunger: state.formData.hunger,
    drinkThirsty: state.formData.thirsty,
    drinkEndu: state.formData.endu,
    drinkExp: state.formData.exp,
    drinkHealth: state.formData.heal,
  })
  res = res.data
  if (res.code === 1) {
    console.log('饮品添加成功')
    return res.data
  } else {
    console.log(res.msg || '出错')
    return null
  }
}
</script>


<template>
  <div id="drink_add">
    <a-form
        style="left: 0;right: 0;top: 0;bottom: 0;margin: 10% auto;"
        :model="state"
        :style="{ width: '600px', marginTop: '20px' }"
        :size="'medium'"
        :auto-label-width="true"
    >
      <a-form-item
          field="name"
          label="饮品名称"
          feedback
          :rules="[{required:true,message:'饮品名称是必需的'},{maxLength:20,message:'饮品名称不得长于二十个字符'}]"
          :validate-trigger="['change','input']"
      >
        <a-input
            v-model="state.formData.name"
            placeholder="请输入饮品名称"
        />
      </a-form-item>
      <a-form-item
          field="price"
          label="饮品价格"
          feedback
          :rules="[{required:true,message:'饮品价格是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.price"
            placeholder="请输入饮品价格"
        />
      </a-form-item>
      <a-form-item
          field="heal"
          label="饮品提升健康度"
          feedback
          :rules="[{required:true,message:'饮品提升健康度是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.heal"
            placeholder="请输入饮品提升的健康度"
        />
      </a-form-item>
      <a-form-item
          field="exp"
          label="饮品提升经验值"
          feedback
          :rules="[{required:true,message:'饮品提升经验值是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.exp"
            placeholder="请输入饮品提升的经验值"
        />
      </a-form-item>
      <a-form-item
          field="hunger"
          label="饮品补充饥饿值"
          feedback
          :rules="[{required:true,message:'饮品补充饥饿值是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.hunger"
            placeholder="请输入饮品补充的饥饿值"
        />
      </a-form-item>
      <a-form-item
          field="endu"
          label="饮品补充体力值"
          feedback
          :rules="[{required:true,message:'饮品补充体力值是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.endu"
            placeholder="请输入饮品补充的体力值"
        />
      </a-form-item>
      <a-form-item
          field="thirsty"
          label="饮品补充口渴值"
          feedback
          :rules="[{required:true,message:'饮品补充口渴值是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.thirsty"
            placeholder="请输入饮品补充的口渴值"
        />
      </a-form-item>
      <a-form-item
          field="mood"
          label="饮品补充心情值"
          feedback
          :rules="[{required:true,message:'饮品补充心情值是必需的'},{type:'number', message:'输入必须为数字类型'}]"
          :validate-trigger="['change','input']"
      >
        <a-input-number
            v-model="state.formData.mood"
            placeholder="请输入饮品补充心情值"
        />
      </a-form-item>
      <a-form-item
          field="picPath"
          label="饮品贴图路径"
          feedback
          :rules="[{required:true,message:'饮品贴图路径是必需的'},{maxLength:20,message:'饮品名称不得长于二十个字符'}]"
          :validate-trigger="['change','input']"
      >
        <a-input
            v-model="state.formData.picPath"
            placeholder="请输入饮品贴图路径"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="submitDrink">添加饮品</a-button>
        </a-space>
      </a-form-item>

    </a-form>

  </div>
</template>
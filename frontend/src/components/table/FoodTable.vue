<script setup lang='ts'>
import {getFood} from '@/api/imgs'
import {foodDrawer, buyFood} from '@/components/scripts/pet'
import {reactive, ref} from 'vue';

let page: number = 1
let pageSize: number = 8
let pageSizes: number[] = [8, 16, 24]
const centerDialogVisible = ref<boolean>(false)
let imgUrlPrefix = 'http://127.0.0.1:8011/front/'
const tableValues = reactive({
  title: "test",
  foodTable: [] as any[]
});
const data = reactive({
  foodTable: []
});
let foodCounts: number = 0

async function openDialog(row: any) {
  tableValues.title = row.foodName + " 的属性"
  tableValues.foodTable = [
    {
      name: "心情值",
      value: row.foodMood,
    },
    {
      name: "经验值",
      value: row.foodExp,
    },
    {
      name: "补充饥饿值",
      value: row.foodHunger,
    },
    {
      name: "补充口渴值",
      value: row.foodThirsty,
    },
    {
      name: "耐力值",
      value: row.foodEndu,
    },
    {
      name: "健康度",
      value: row.foodHealth,
    },
  ]
  centerDialogVisible.value = true
}

async function manualBuyFood(row: any) {
  foodDrawer.value = false
  buyFood(row)
}

const getFoodTableData = async () => {
  let res = await getFood({
    page: page,
    pageSize: pageSize,
  })
  res = res.data
  if (res.code === 0) {
    console.log('err' + res.msg)
    return
  }
  data.foodTable = res.data.records || []
  foodCounts = parseInt(res.data.total)
};

const handleSizeChange = (val: number) => {
  pageSize = val
  getFoodTableData()
}
const handleCurrentChange = (val: number) => {
  page = val
  getFoodTableData()
}

getFoodTableData()
</script>

<script lang="ts">
import {
  IconSunFill,
  IconSend,
} from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconSunFill,
    IconSend,
  },
};
</script>
<template>
  <div id="food_table">
    <a-table :data="data.foodTable" stripe :pagination="false">
      <template #columns>
        <a-table-column title="食物展示">
          <template #cell="{ record }">
            <a-image
                width="70"
                height="70"
                :src="imgUrlPrefix+'food/'+record.foodPicPath"
                :fit="'contain'"
            />
          </template>
        </a-table-column>
        <a-table-column title="食物名称" data-index="foodName"></a-table-column>
        <a-table-column title="食物价格(￥)" data-index="foodPrice"></a-table-column>
        <a-table-column title="查看属性" :width="160">
          <template #cell="{ record }">
            <a-button @click="openDialog(record)">查看</a-button>
          </template>
        </a-table-column>
        <a-table-column title="是否购买" :width="160">
          <template #cell="{ record }">
            <a-button
                type="primary"
                size="large"
                class="blueBug"
                @click="manualBuyFood(record)"
            >
              购买
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-pagination :total="foodCounts" :current="1" :page-size="8" show-total show-jumper show-page-size
                  :page-size-options="pageSizes"
                  @page-size-change="handleSizeChange"
                  @change="handleCurrentChange"
                  style="left: 0;right: 0;top: 0;bottom: 0;margin: 10% auto;">
      <template #page-item="{ page }">
        - {{ page }} -
      </template>
      <template #page-item-step="{ type }">
        <icon-send :style="type==='previous' ? {transform:`rotate(180deg)`} : undefined"/>
      </template>
      <template #page-item-ellipsis>
        <icon-sun-fill/>
      </template>
    </a-pagination>
    <a-modal v-model:visible="centerDialogVisible" @ok="centerDialogVisible = false"
             @cancel="centerDialogVisible = false">
      <template #title>
        {{ tableValues.title }}
      </template>

      <a-table :data="tableValues.foodTable" stripe>
        <template #columns>
          <a-table-column title="名称" data-index="name" :width="200"></a-table-column>
          <a-table-column title="值" data-index="value" :width="200"></a-table-column>
        </template>
      </a-table>
    </a-modal>

  </div>

</template>
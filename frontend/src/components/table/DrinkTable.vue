<script setup lang='ts'>

import {reactive, ref} from 'vue';
import {getDrink} from '@/api/imgs'
import {drinkDrawer, buyDrink} from '@/components/scripts/pet'

let curPage = ref(1)
let pageSize = ref(8)
let pageSizes = ref([8, 16, 24])
const centerDialogVisible = ref<boolean>(false)
let imgUrlPrefix = 'http://127.0.0.1:8011/front/'

const tableValues = reactive({
  title: "test",
  drinkTable: [] as any[]
});
const data = reactive({
  drinkTable: []
});
let drinkCounts: number = 0

async function openDialog(row: any) {
  tableValues.title = row.drinkName + " 的属性"
  tableValues.drinkTable = [
    {
      name: "心情值",
      value: row.drinkMood,
    },
    {
      name: "经验值",
      value: row.drinkExp,
    },
    {
      name: "补充饥饿值",
      value: row.drinkHunger,
    },
    {
      name: "补充口渴值",
      value: row.drinkThirsty,
    },
    {
      name: "耐力值",
      value: row.drinkEndu,
    },
    {
      name: "健康度",
      value: row.drinkHealth,
    },
  ]
  centerDialogVisible.value = true
}

async function manualBuyDrink(row: any) {
  console.log(row)
  drinkDrawer.value = false
  buyDrink(row)
}

const getDrinkTableData = async () => {
  let res = await getDrink({
    page: curPage.value,
    pageSize: pageSize.value,
  })
  res = res.data
  if (res.code === 0) {
    console.log('err' + res.msg)
    return
  }
  data.drinkTable = res.data.records || []
  drinkCounts = parseInt(res.data.total)
};

const handleSizeChange = (val: number) => {
  pageSize.value = val
  getDrinkTableData()
}
const handleCurrentChange = (val: number) => {
  console.log(val)
  console.log(curPage.value)
  curPage.value = val
  getDrinkTableData()
}

getDrinkTableData()
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
  <div id="drink_table">
    <a-table :data="data.drinkTable" stripe :pagination="false">
      <template #columns>
        <a-table-column title="饮品展示">
          <template #cell="{ record }">
            <a-image
                width="70"
                height="70"
                :src="imgUrlPrefix+'drink/'+record.drinkPicPath"
                :fit="'contain'"
            />
          </template>
        </a-table-column>
        <a-table-column title="饮品名称" data-index="drinkName"></a-table-column>
        <a-table-column title="饮品价格(￥)" data-index="drinkPrice"></a-table-column>
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
                @click="manualBuyDrink(record)"
            >
              购买
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-pagination :total="drinkCounts" show-total show-jumper show-page-size
                  :page-size-options="pageSizes"
                  @page-size-change="handleSizeChange"
                  @change="handleCurrentChange"
                  v-model:current="curPage"
                  v-model:page-size="pageSize"
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

      <a-table :data="tableValues.drinkTable" stripe>
        <template #columns>
          <a-table-column title="名称" data-index="name" :width="200"></a-table-column>
          <a-table-column title="值" data-index="value" :width="200"></a-table-column>
        </template>
      </a-table>
    </a-modal>

  </div>
</template>
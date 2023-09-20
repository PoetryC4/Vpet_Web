<script setup lang='ts'>
import {getPresent} from '@/api/imgs'
import {presentDrawer, buyPresent} from '@/components/scripts/pet'
import {reactive, ref} from 'vue';

let curPage = ref(1)
let pageSize = ref(8)
let pageSizes = ref([8, 16, 24])
const centerDialogVisible = ref<boolean>(false)
let imgUrlPrefix = 'http://127.0.0.1:8011/front/'
const tableValues = reactive({
  title: "test",
  presentTable: [] as any[]
});
const data = reactive({
  presentTable: []
});
let presentCounts: number = 0

async function manualBuyPresent(row: any) {
  presentDrawer.value = false
  buyPresent(row)
}

async function openDialog(row: any) {
  tableValues.title = row.presentName + " 的属性"
  tableValues.presentTable = [
    {
      name: "心情值",
      value: row.presentMood,
    },
    {
      name: "经验值",
      value: row.presentExp,
    },
    {
      name: "性能",
      value: row.presentPerformance,
    },
  ]
  centerDialogVisible.value = true
}

const getMedicineTableData = async () => {
  let res = await getPresent({
    page: curPage.value,
    pageSize: pageSize.value,
  })
  res = res.data
  if (res.code === 0) {
    console.log('err' + res.msg)
    return
  }
  data.presentTable = res.data.records || []
  presentCounts = parseInt(res.data.total)
};

const handleSizeChange = (val: number) => {
  pageSize.value = val
  getMedicineTableData()
}
const handleCurrentChange = (val: number) => {
  curPage.value = val
  getMedicineTableData()
}

getMedicineTableData()
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

  <div id="present_table">
    <a-table :data="data.presentTable" stripe :pagination="false">
      <template #columns>
        <a-table-column title="礼物展示">
          <template #cell="{ record }">
            <a-image
                width="70"
                height="70"
                :src="imgUrlPrefix+'present/'+record.presentPicPath"
                :fit="'contain'"
            />
          </template>
        </a-table-column>
        <a-table-column title="礼物名称" data-index="presentName"></a-table-column>
        <a-table-column title="礼物价格(￥)" data-index="presentPrice"></a-table-column>
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
                @click="manualBuyPresent(record)"
            >
              购买
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-pagination :total="presentCounts" :current="curPage" :page-size="pageSize" show-total show-jumper show-page-size
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

      <a-table :data="tableValues.presentTable" stripe>
        <template #columns>
          <a-table-column title="名称" data-index="name" :width="200"></a-table-column>
          <a-table-column title="值" data-index="value" :width="200"></a-table-column>
        </template>
      </a-table>
    </a-modal>

  </div>
</template>
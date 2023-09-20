<script setup lang='ts'>
import {getMedicine} from '@/api/imgs'
import {medicineDrawer, buyMedicine} from '@/components/scripts/pet'
import {reactive, ref} from 'vue';

let curPage = ref(1)
let pageSize = ref(8)
let pageSizes = ref([8, 16, 24])
const centerDialogVisible = ref<boolean>(false)
let imgUrlPrefix = 'http://127.0.0.1:8011/front/'
const tableValues = reactive({
  title: "test",
  medicineTable: [] as any[]
});
const data = reactive({
  medicineTable: []
});
let medicineCounts: number = 0

async function openDialog(row: any) {
  tableValues.title = row.medicineName + " 的属性"
  tableValues.medicineTable = [
    {
      name: "心情值",
      value: row.medicineMood,
    },
    {
      name: "经验值",
      value: row.medicineExp,
    },
    {
      name: "耐力值",
      value: row.medicineEndu,
    },
    {
      name: "健康度",
      value: row.medicineHealth,
    },
  ]
  centerDialogVisible.value = true
}

async function manualBuyMedicine(row: any) {
  medicineDrawer.value = false
  buyMedicine(row)
}

const getMedicineTableData = async () => {
  let res = await getMedicine({
    page: curPage.value,
    pageSize: pageSize.value,
  })
  res = res.data
  if (res.code === 0) {
    console.log('err' + res.msg)
    return
  }
  data.medicineTable = res.data.records || []
  medicineCounts = parseInt(res.data.total)
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

  <div id="medic_table">
    <a-table :data="data.medicineTable" stripe :pagination="false">
      <template #columns>
        <a-table-column title="药品展示">
          <template #cell="{ record }">
            <a-image
                width="70"
                height="70"
                :src="imgUrlPrefix+'medicine/'+record.medicinePicPath"
                :fit="'contain'"
            />
          </template>
        </a-table-column>
        <a-table-column title="药品名称" data-index="medicineName"></a-table-column>
        <a-table-column title="药品价格(￥)" data-index="medicinePrice"></a-table-column>
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
                @click="manualBuyMedicine(record)"
            >
              购买
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-pagination :total="medicineCounts" :current="curPage" :page-size="pageSize" show-total show-jumper show-page-size
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

      <a-table :data="tableValues.medicineTable" stripe>
        <template #columns>
          <a-table-column title="名称" data-index="name" :width="200"></a-table-column>
          <a-table-column title="值" data-index="value" :width="200"></a-table-column>
        </template>
      </a-table>
    </a-modal>

  </div>
</template>
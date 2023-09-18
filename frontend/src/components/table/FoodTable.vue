<script setup lang='ts'>
import {getFood} from '@/api/imgs'
import {foodDrawer, buyFood} from '@/components/scripts/pet'
import {reactive, ref} from 'vue';

let page: number = 1
let pageSize: number = 8
let pageSizes: number[] = [8, 16, 24]
const centerDialogVisible = ref<boolean>(false)
let imgUrlPrefix = 'http://127.0.0.1:8011/front/'
const tableData = reactive({
  title: "test",
  presentTable: [] as any[]
});
const data = reactive({
  foodTable: []
});
let foodCounts: number = 0

async function openDialog(row: any) {
  tableData.title = row.foodName + " 的属性"
  tableData.presentTable = [
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

<template>
  <div>

    <el-table
        :data="data.foodTable"
        stripe
        class="tableBox"
    >
      <el-table-column label="食物展示">
        <template v-slot="scope">
          <el-image
              style="width: 70px; height: 70px"
              :src="imgUrlPrefix+'food/'+scope.row.foodPicPath"
              :fit="'contain'"></el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="foodName"
          label="食物名称"
      ></el-table-column>
      <el-table-column
          prop="foodPrice"
          label="食物价格(￥)"
      ></el-table-column>
      <el-table-column
          label="查看属性"
          width="160"
          align="center"
      >
        <template v-slot="scope">
          <el-button
              link
              type="primary"
              size="large"
              class="blueBug"
              @click="openDialog(scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
          label="是否购买"
          width="160"
          align="center"
      >
        <template v-slot="scope">
          <el-button
              link
              type="primary"
              size="large"
              class="blueBug"
              @click="manualBuyFood(scope.row)"
          >
            购买
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="pageList"
        :page-sizes="pageSizes"
        v-model:page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="foodCounts"
        v-model:current-page="page"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    ></el-pagination>
    <el-dialog
        :title="tableData.title"
        :visible.sync="centerDialogVisible"
        v-model:model-value="centerDialogVisible"
        width="30%"
        center>
      <el-table :data="tableData.presentTable">
        <el-table-column width="200" property="name" label="名称"></el-table-column>
        <el-table-column width="200" property="value" label="值"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
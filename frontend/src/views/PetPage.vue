<script setup lang="ts">
import DrinkTable from '@/views/table/DrinkTable.vue';
import FoodTable from '@/views/table/FoodTable.vue';
import MedicineTable from '@/views/table/MedicineTable.vue';
import Interaction from '@/views/interaction/Interaction.vue';
import AnimationDebug from '@/views/interaction/AnimationDebug.vue';
import { LTR, RTL } from 'element-plus/es/components/virtual-list/src/defaults';
import {valMoney, valEndu, valExp, valHung, valMood, valThir, start, shutdown, foodDrawer, drinkDrawer, interactionDrawer, medicineDrawer, animeDebugDrawer, valHeal, presentDrawer} from '@/components/scripts/pet'
import PresentTable from './table/PresentTable.vue';
  let singleSpan:number = 2
  let singleGutter:number = 35
  let debugSpan: number = 2

function foodBtnClick() {
    foodDrawer.value = !foodDrawer.value
}
function drinkBtnClick() {
  drinkDrawer.value = !drinkDrawer.value
}
function medicineBtnClick() {
  medicineDrawer.value = !medicineDrawer.value
}
function presentBtnClick() {
  presentDrawer.value = !presentDrawer.value
}
function interactionBtnClick() {
  interactionDrawer.value = !interactionDrawer.value
}
function animeBtnClick() {
  animeDebugDrawer.value = !animeDebugDrawer.value
}
const handleCloseFood = (done: () => void) => {
  foodDrawer.value = false
}
const handleCloseDrink = (done: () => void) => {
  drinkDrawer.value = false
}
const handleClosePresent = (done: () => void) => {
  presentDrawer.value = false
}
const handleCloseMedicine = (done: () => void) => {
  medicineDrawer.value = false
}
const handleCloseInteraction = (done: () => void) => {
  interactionDrawer.value = false
}
const handleCloseAnimation = (done: () => void) => {
  animeDebugDrawer.value = false
}
</script>

<style lang="css">
  .like {
    cursor: pointer;
    font-size: 25px;
    display: inline-block;
  }
  .valueShow{
    border-radius: 4px;
    border: 1px #333333 solid;
    margin-left: 20px;
    background-color: rgba(197, 221, 241, 0.3);
  }
  .el-row{
    margin-top: 20px;
  }
  .el-statistic{
    color:#333333;
  }
  .el-button{
    width: 100px;
    height: 50px;
  }
  .dashboard-container {
  padding: 20px;
}
.dashboard-container .container {
  background: #fff;
  position: relative;
  z-index: 1;
  padding: 30px 28px;
  border-radius: 4px;
}
.dashboard-container .container .tableBar {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}
.dashboard-container .container .tableBox {
  width: 100%;
  border: solid 2px #f3f4f7;
  border-radius: 2px;
}

.dashboard-container .container .tableBox .el-image img {
  width: 40px;
  border-radius: 5px;
}

.dashboard-container .container .pageList {
  text-align: center;
  margin-top: 30px;
}

.dashboard-container .container .tableLab .span-btn {
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  padding: 0 20px;
  color: #818693;
  border-right: solid 1px #d8dde3;
}

.dashboard-container .container .tableLab .el-button {
  margin-left: 10px;
}

.el-table-column--selection .cell {
  padding-left: 10px;
}

/* 添加 */
.addBrand-container .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.addBrand-container .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.addBrand-container .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.addBrand-container .avatar {
  width: 160px;
  height: 160px;
  display: block;
}
.addBrand-container .el-form--inline .el-form-item__content {
  width: 293px;
}
.addBrand-container .el-input {
  width: 293px;
}

.addBrand-container {
  margin: 30px;
}
.addBrand-container .container {
  position: relative;
  z-index: 1;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  min-height: 300px;
}
.addBrand-container .container .subBox {
  padding-top: 30px;
  text-align: center;
  border-top: solid 1px #f3f4f7;
}

.flavorBox {
  width: 777px;
}
.flavorBox .addBut {
  background: #a3d3ff;
  display: inline-block;
  padding: 0px 20px;
  border-radius: 3px;
  line-height: 40px;
  cursor: pointer;
  border-radius: 4px;
  color: #333333;
  font-weight: 500;
}
.flavorBox .flavor {
  border: solid 1px #dfe2e8;
  border-radius: 3px;
  padding: 15px;
  background: #fafafb;
}
.flavorBox .flavor .title {
  color: #606168;
}
.flavorBox .flavor .cont .items {
  display: flex;
  margin: 10px 0;
}
.flavorBox .flavor .cont .items .itTit {
  width: 150px;
  margin-right: 15px;
}
.flavorBox .flavor .cont .items .itTit input {
  width: 100%;
  line-height: 40px;
  border-radius: 3px;
  padding: 0 10px;
}
.flavorBox .flavor .cont .items .labItems {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  border-radius: 3px;
  min-height: 39px;
  border: solid 1px #d8dde3;
  background: #fff;
  padding: 0 5px;
}
.flavorBox .flavor .cont .items .labItems span {
  display: inline-block;
  color: #f19c59;
  margin: 5px;
  line-height: 26px;
  height: 26px;
  padding: 0 10px;
  background: #fdf4eb;
  border-radius: 3px;
  border: solid 1px #fae2cd;
}
.flavorBox .flavor .cont .items .labItems span i {
  cursor: pointer;
  font-style: normal;
}
.flavorBox .flavor .cont .items .labItems .inputBox {
  display: inline-block;
  width: 100%;
  height: 36px;
  line-height: 36px;
  overflow: hidden;
}
.flavorBox .flavor .cont .items .delFlavor {
  display: inline-block;
  padding: 0 10px;
  color: #f19c59;
  cursor: pointer;
}

.addBrand-container .address .el-form-item__content {
  width: 777px !important;
}

.el-button--text {
  font-weight: 400 !important;
  font-size: 13px !important;
}

.el-table td {
  font-size: 13px !important;
}

.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 12px;
}

</style>


<template>
  <div class="fullDiv" id="petPage">
  <el-row :gutter="30">
      <el-col :span="debugSpan">
          <el-button type="primary" plain @click="start">开始</el-button>
      </el-col>
      <el-col :span="debugSpan">
          <el-button type="primary" plain @click="shutdown">关闭</el-button>
      </el-col>
      <el-col :span="debugSpan">
          <el-button type="primary" plain @click="interactionBtnClick">互动</el-button>
      </el-col>
      <el-col :span="debugSpan">
          <el-button type="primary" plain @click="animeBtnClick">动画调试</el-button>
      </el-col>
    </el-row>
  <el-row :gutter="30">
      <el-col :span="debugSpan">
          <el-button type="primary" plain @click="foodBtnClick">吃</el-button>
      </el-col>
      <el-col :span="debugSpan">
          <el-button type="primary" plain @click="drinkBtnClick">喝</el-button>
      </el-col>
      <el-col :span="debugSpan">
          <el-button type="primary" plain @click="medicineBtnClick">服药</el-button>
      </el-col>
      <el-col :span="debugSpan">
          <el-button type="primary" plain @click="presentBtnClick">礼</el-button>
      </el-col>
    </el-row>
 <el-row :gutter="singleGutter">
      <el-col :span="singleSpan">
        <div class="valueShow">
          <el-statistic group-separator="," :precision="2" :value="valMoney" title="金钱"></el-statistic>
        </div>
      </el-col>
    </el-row>
 <el-row :gutter="singleGutter">
      <el-col :span="singleSpan">
        <div class="valueShow">
          <el-statistic group-separator="," :precision="2" :value="valHeal" title="健康度"></el-statistic>
        </div>
      </el-col>
    </el-row>
 <el-row :gutter="singleGutter">
      <el-col :span="singleSpan">
        <div class="valueShow">
          <el-statistic group-separator="," :precision="2" :value="valExp" title="经验"></el-statistic>
        </div>
      </el-col>
    </el-row>
 <el-row :gutter="singleGutter">
      <el-col :span="singleSpan">
        <div class="valueShow">
          <el-statistic group-separator="," :precision="2" :value="valEndu" title="体力"></el-statistic>
        </div>
      </el-col>
    </el-row>
 <el-row :gutter="singleGutter">
      <el-col :span="singleSpan">
        <div class="valueShow">
          <el-statistic group-separator="," :precision="2" :value="valMood" title="心情"></el-statistic>
        </div>
      </el-col>
    </el-row>
 <el-row :gutter="singleGutter">
      <el-col :span="singleSpan">
        <div class="valueShow">
          <el-statistic group-separator="," :precision="2" :value="valHung" title="饱腹度"></el-statistic>
        </div>
      </el-col>
    </el-row>
 <el-row :gutter="singleGutter">
      <el-col :span="singleSpan">
        <div class="valueShow">
          <el-statistic group-separator="," :precision="2" :value="valThir" title="口渴度"></el-statistic>
        </div>
      </el-col>
    </el-row>
    <el-drawer
        title="礼品超市"
        :visible.sync="presentDrawer"
        v-model="presentDrawer"
        :direction="LTR"
        :before-close="handleClosePresent"
        :destroy-on-close="true">
        <PresentTable/>
      </el-drawer>
    <el-drawer
        title="饮品超市"
        :visible.sync="drinkDrawer"
        v-model="drinkDrawer"
        :direction="LTR"
        :before-close="handleCloseDrink"
        :destroy-on-close="true">
        <DrinkTable/>
      </el-drawer>
    <el-drawer
        title="食品超市"
        :visible.sync="foodDrawer"
        v-model="foodDrawer"
        :direction="LTR"
        :before-close="handleCloseFood"
        :destroy-on-close="true">
        <FoodTable/>
      </el-drawer>
    <el-drawer
        title="药店"
        :visible.sync="medicineDrawer"
        v-model="medicineDrawer"
        :direction="LTR"
        :before-close="handleCloseMedicine"
        :destroy-on-close="true">
        <MedicineTable/>
      </el-drawer>
    <el-drawer
        title="互动"
        :visible.sync="interactionDrawer"
        v-model="interactionDrawer"
        :direction="RTL"
        :before-close="handleCloseInteraction"
        :destroy-on-close="true">
        <Interaction/>
      </el-drawer>
    <el-drawer
        title="动画调试"
        :visible.sync="animeDebugDrawer"
        v-model="animeDebugDrawer"
        :direction="RTL"
        :before-close="handleCloseAnimation"
        :destroy-on-close="true">
        <AnimationDebug/>
      </el-drawer>
      </div>
</template>

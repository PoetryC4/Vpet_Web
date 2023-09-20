<script setup lang="ts">
import DrinkTable from '@/components/table/DrinkTable.vue';
import FoodTable from '@/components/table/FoodTable.vue';
import MedicineTable from '@/components/table/MedicineTable.vue';
import Interaction from '@/components/interaction/Interaction.vue';
import AnimationDebug from '@/components/interaction/AnimationDebug.vue';
import {getFlagsAnd} from '@/components/scripts/pet'
import {
  valMoney,
  valEndu,
  valExp,
  valHung,
  valMood,
  valThir,
  start,
  shutdown,
  foodDrawer,
  drinkDrawer,
  interactionDrawer,
  medicineDrawer,
  animeDebugDrawer,
  valHeal,
  presentDrawer,
  studyToggle,
  sleepToggle,
  liveToggle,
  copyToggle,
  danceToggle,
  researchToggle,
  playOneToggle,
  workCleanToggle,
  removeObjectToggle,
  isStudy,
  isCopy,
  isDance,
  isLive,
  isRemoveObject,
  isSleep,
  isResearch,
  isShutDown,
  isWorkClean,
  isPlayOne
} from '@/components/scripts/pet'
import PresentTable from '@/components/table/PresentTable.vue';
import {ref} from "vue";

const doMenuItemClick = (key: string) => {
  switch (key) {
    case '0_0': {
      if (getFlagsAnd(true)) return
      start()
      break
    }
    case '0_1': {
      if (getFlagsAnd(true)) return
      shutdown()
      break
    }
    case '0_2': {
      animeBtnClick()
      break
    }
    case '0_3': {
      interactionBtnClick()
      break
    }
    case '1_0': {
      if (getFlagsAnd(isStudy.value)) return
      studyToggle()
      break
    }
    case '1_1': {
      if (getFlagsAnd(isDance.value)) return
      danceToggle();
      break
    }
    case '1_2': {
      if (getFlagsAnd(isSleep.value)) return
      sleepToggle()
      break
    }
    case '1_3': {
      if (getFlagsAnd(isCopy.value)) return
      copyToggle()
      break
    }
    case '1_4': {
      if (getFlagsAnd(isResearch.value)) return
      researchToggle()
      break
    }
    case '1_5': {
      if (getFlagsAnd(isLive.value)) return
      liveToggle()
      break
    }
    case '1_6': {
      if (getFlagsAnd(isPlayOne.value)) return
      playOneToggle()
      break
    }
    case '1_7': {
      if (getFlagsAnd(isWorkClean.value)) return
      workCleanToggle()
      break
    }
    case '1_8': {
      if (getFlagsAnd(isRemoveObject.value)) return
      removeObjectToggle()
      break
    }
    case '2_0': {
      foodBtnClick()
      break
    }
    case '2_1': {
      drinkBtnClick()
      break
    }
    case '2_2': {
      medicineBtnClick()
      break
    }
    case '2_3': {
      presentBtnClick()
      break
    }
  }
}

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

const handleCloseFood = () => {
  foodDrawer.value = false
}
const handleCloseDrink = () => {
  drinkDrawer.value = false
}
const handleClosePresent = () => {
  presentDrawer.value = false
}
const handleCloseMedicine = () => {
  medicineDrawer.value = false
}
const handleCloseInteraction = () => {
  interactionDrawer.value = false
}
const handleCloseAnimation = () => {
  animeDebugDrawer.value = false
}
</script>
<script lang="ts">
import {
  IconMenuFold,
  IconMenuUnfold,
  IconCloud,
  IconSun,
  IconMoon,
} from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconMenuFold,
    IconMenuUnfold,
    IconCloud,
    IconSun,
    IconMoon,
  },
};
</script>

<style lang="css" scoped>
.float-right {
  right: 0;
  left: auto;
  margin-right: 0;
  margin-left: auto;
  padding: 0;
}

.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}

.valueShow {
  border-radius: 4px;
  border: 1px #333333 solid;
  margin-left: 20px;
  background-color: rgba(197, 221, 241, 0.3);
}

.a-row {
  margin-top: 20px;
}

.a-statistic {
  color: #333333;
}

.a-button {
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

.a-button--text {
  font-weight: 400 !important;
  font-size: 13px !important;
}

.a-table td {
  font-size: 13px !important;
}

.a-table .cell,
.a-table th div,
.a-table--border td:first-child .cell,
.a-table--border th:first-child .cell {
  padding-left: 12px;
}

</style>


<template>
  <div id="petPage">
    <a-menu
        :style="{ width: '200px', height: '100%' }"
        show-collapse-button
        breakpoint="xl"
        @menu-item-click="doMenuItemClick"
    >
      <a-menu-item key="0_0_0" data-obj="1">控制栏</a-menu-item>
      <a-sub-menu key="0">
        <template #icon>
          <icon-cloud></icon-cloud>
        </template>
        <template #title>开关</template>
        <a-menu-item key="0_0">开始</a-menu-item>
        <a-menu-item key="0_1">关闭</a-menu-item>
        <a-menu-item key="0_2">动画调试</a-menu-item>
        <a-menu-item key="0_3">互动</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="1">
        <template #icon>
          <icon-sun></icon-sun>
        </template>
        <template #title>互动</template>
        <a-menu-item key="1_0">学习</a-menu-item>
        <a-menu-item key="1_1">舞</a-menu-item>
        <a-menu-item key="1_2">睡</a-menu-item>
        <a-menu-item key="1_3">抄</a-menu-item>
        <a-menu-item key="1_4">科研</a-menu-item>
        <a-menu-item key="1_5">播</a-menu-item>
        <a-menu-item key="1_6">玩耍</a-menu-item>
        <a-menu-item key="1_7">清洁</a-menu-item>
        <a-menu-item key="1_8">除物</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2">
        <template #icon>
          <icon-moon></icon-moon>
        </template>
        <template #title>投喂</template>
        <a-menu-item key="2_0">吃</a-menu-item>
        <a-menu-item key="2_1">喝</a-menu-item>
        <a-menu-item key="2_2">服药</a-menu-item>
        <a-menu-item key="2_3">礼物</a-menu-item>
      </a-sub-menu>
    </a-menu>
    <a-list :size="'large'"
            style="position:absolute; right: 10px;left: auto;top: 10px;bottom: auto;margin: 0;padding: 0;">
      <template #header>
        宠物数值
      </template>
      <a-list-item>
        <a-statistic show-group-separator :precision="2" :value="valMoney" title="金钱">
          <template #prefix>￥</template>
        </a-statistic>
      </a-list-item>
      <a-list-item>
        <a-statistic show-group-separator :precision="2" :value="valHeal" title="健康度"></a-statistic>
      </a-list-item>
      <a-list-item>
        <a-statistic show-group-separator :precision="2" :value="valExp" title="经验"></a-statistic>
      </a-list-item>
      <a-list-item>
        <a-statistic show-group-separator :precision="2" :value="valEndu" title="体力"></a-statistic>
      </a-list-item>
      <a-list-item>
        <a-statistic show-group-separator :precision="2" :value="valMood" title="心情"></a-statistic>
      </a-list-item>
      <a-list-item>
        <a-statistic show-group-separator :precision="2" :value="valHung" title="饱腹度"></a-statistic>
      </a-list-item>
      <a-list-item>
        <a-statistic show-group-separator :precision="2" :value="valThir" title="口渴度"></a-statistic>
      </a-list-item>
    </a-list>
    <a-drawer
        :width="700"
        :visible="presentDrawer"
        :placement="'left'"
        @ok="handleClosePresent"
        @cancel="handleClosePresent"
        unmountOnClose
    >
      <template #title>
        礼品超市
      </template>
      <PresentTable/>
    </a-drawer>
    <a-drawer
        :width="700"
        :visible="drinkDrawer"
        :placement="'left'"
        @ok="handleCloseDrink"
        @cancel="handleCloseDrink"
        unmountOnClose
    >
      <template #title>
        饮品超市
      </template>
      <DrinkTable/>
    </a-drawer>
    <a-drawer
        :width="700"
        :visible="foodDrawer"
        :placement="'left'"
        @ok="handleCloseFood"
        @cancel="handleCloseFood"
        unmountOnClose
    >
      <template #title>
        食品超市
      </template>
      <FoodTable/>
    </a-drawer>
    <a-drawer
        :width="700"
        :visible="medicineDrawer"
        :placement="'left'"
        @ok="handleCloseMedicine"
        @cancel="handleCloseMedicine"
        unmountOnClose
    >
      <template #title>
        药品超市
      </template>
      <MedicineTable/>
    </a-drawer>
    <a-drawer
        :width="500"
        :visible="interactionDrawer"
        :placement="'right'"
        @ok="handleCloseInteraction"
        @cancel="handleCloseInteraction"
        unmountOnClose
    >
      <template #title>
        互动
      </template>
      <Interaction/>
    </a-drawer>
    <a-drawer
        :width="500"
        :visible="animeDebugDrawer"
        :placement="'right'"
        @ok="handleCloseAnimation"
        @cancel="handleCloseAnimation"
        unmountOnClose
    >
      <template #title>
        动画调试
      </template>
      <AnimationDebug/>
    </a-drawer>
  </div>
</template>

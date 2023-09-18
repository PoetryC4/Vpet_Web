<script setup lang="ts">
import {curImgStr, curHandImgStr, curFrontlayImgStr} from '@/components/scripts/animationFunc'
import {responseShow, responseSwicth} from '@/components/scripts/pet'
import {getAssetsFile} from '@/components/scripts/utils'

</script>

<style>
.myPet {
  position: absolute;
  width: 400px;
  height: 400px;
  left: 0px;
  top: 0px;
  padding: 0;
  margin-left: 100px;
  margin-top: 100px;
}
</style>

<template>
  <div class="fullDiv" id="pet">
    <img alt="" :src="getAssetsFile(curImgStr)" class="myPet" id="myPet" style="display: none;"/>
    <img alt="" :src="getAssetsFile(curHandImgStr)" class="myPet" id="myPetHand" style="display: none;"/>
    <img alt="" :src="getAssetsFile(curFrontlayImgStr)" class="myPet" id="myPetFrontlay" style="display: none;"/>
    <el-popover
        ref="chatPopover"
        placement="top-start"
        :width="300"
        :content="responseShow[0]"
        v-model:visible="responseSwicth[0]">
      <div
          style="text-align: left; margin: 0"
          slot="reference"
          id="chatPopover"
          v-popover:chatPopover>
        content
      </div>
    </el-popover>
  </div>
</template>
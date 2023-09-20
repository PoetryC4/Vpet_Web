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
  left: 0;
  top: 0;
  padding: 0;
  margin-left: 100px;
  margin-top: 100px;
}
</style>

<template>
  <div id="pet">
    <img alt="" :src="getAssetsFile(curImgStr)" class="myPet" id="myPet" style="display: none;position: absolute"/>
    <img alt="" :src="getAssetsFile(curHandImgStr)" class="myPet" id="myPetHand"
         style="display: none;position: absolute"/>
    <img alt="" :src="getAssetsFile(curFrontlayImgStr)" class="myPet" id="myPetFrontlay"
         style="display: none;position: absolute"/>
    <a-popover
        content-style="width:400px;"
        class="petPopover"
        title=""
        style="position: absolute;"
        position="top"
        :trigger="'contextMenu'"
        :content="responseShow"
        v-model:popup-visible="responseSwicth">
      <template #content>
        <div
            id="chatPopover">
          content
        </div>
      </template>
    </a-popover>
  </div>
</template>
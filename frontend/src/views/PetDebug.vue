<script setup lang="ts">
import {getImgs} from '@/api/imgs';
import Pet from '@/components/pet/Pet.vue'
import PetPage from '@/components/pet/PetPage.vue';
import $ from 'jquery'
import {onMounted} from 'vue'

import {baseLocalUrl, preLaunched} from '@/components/scripts/pet';
import {getBlob, sleep} from '@/components/scripts/utils'

onMounted(async () => {
  $('#pet').hide()
  $('#petPage').hide()
  let folderPath = baseLocalUrl.value + '/vup'
  let folderSuffix = folderPath.substring(baseLocalUrl.value.length)
  folderPath = folderPath.replace(/\//g, 'ATslash;');
  folderSuffix = folderSuffix.replace(/\//g, 'ATslash;');
  let res = await getImgs({
    dirPath: folderPath,
    dirSuffix: folderSuffix,
  })
  res = res.data
  if (res.code === 0) {
    console.log('err:' + res.msg)
  } else {
    let preFiles = res.data
    let countFiles = preFiles.length
    let countCur = 0
    for (let i = 0; i < countFiles; i++) {
      if (i - countCur >= 300) {
        await sleep(100)
        continue
      }
      if (i - countCur >= 100) {
        await sleep(100)
      }
      getBlob(preFiles[i]).then((value) => {
        countCur++
        //console.log(countCur)
        $('#preload_perc').text(Math.ceil(countCur / countFiles * 100) + '%')
        if (countCur === countFiles) {
          preLaunched.value = true
          $('#preload_perc').fadeOut()
          $('#pet').fadeIn()
          $('#petPage').fadeIn()
        }
      })
    }
  }
})
</script>

<style>

.mid {
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 15% auto;
  position: absolute;
  font-size: 30px;
}

</style>

<template>
  <div id="pet_debug">
    <PetPage/>
    <Pet/>
    <div class="mid" id="preload_perc">
      0%
    </div>
  </div>
</template>
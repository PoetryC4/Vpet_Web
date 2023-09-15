export const sleep = (ms:number)=> {
    return new Promise(resolve=>setTimeout(resolve, ms))
}

import { getImgs } from "@/api/imgs"
import { baseLocalUrl } from "./pet";

export async function getAllFiles(folderPath:string) {
  let folderSuffix = folderPath.substring(baseLocalUrl.value.length)
  folderPath = folderPath.replace(/\//g, 'ATslash;');
  folderSuffix = folderSuffix.replace(/\//g, 'ATslash;');
  let res = await getImgs({
      dirPath: folderPath,
      dirSuffix: folderSuffix,
    })
  res = res.data
  //console.log(res)
  if(res.code === 1) {
    //console.log(res.data)
    return res.data
  } else {
    console.log(res.msg || '出错')
    return null
  }
}


export const getAssetsFile = (url: string) => {
    return new URL(url, import.meta.url).href;
}  

export function getTimeNow() {
    var now = new Date();
    return now.getTime();
}

export function getBaseLog(x:number, y:number) {
  return Math.log(y) / Math.log(x);
}

export function getBlob(fileUrl:string) {
  return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', fileUrl, true);
      //监听进度事件
      xhr.addEventListener(
          'progress',
          function (evt) {
              if (evt.lengthComputable) {
                  // let percentComplete = evt.loaded / evt.total;
                  // percentage是当前下载进度，可根据自己的需求自行处理
                  // let percentage = percentComplete * 100;
              }
          },
          false
      );
      xhr.responseType = 'blob';
      xhr.onload = () => {
          if (xhr.status === 200) {
              resolve(xhr.response);
          }
      };
      xhr.send();
  });
}
import { ref } from 'vue'
import { sleep, getAllFiles, getTimeNow } from './utils';
import { petImg, imgHeight, imgWidth, animationGap, curAnimation, durDebug, isLaunched, isShutDown } from './pet';

export const curFrontlayImgStr = ref<string>("")
export const curHandImgStr = ref<string>("")
export const curImgStr = ref<string>("")
const animationSwitch = ref<number>(0)
export const itemTransformScale = ref<number>(0.005)
export const itemTransform = ref<number[][][]>([
    [
        [-57, -50, 6],
        [-112, -311, 7.2],
        [-113, -306, 5.6],
        [-112, -311, 7.2],
        [-113, -306, 5.6],
        [-112, -311, 7.2],
        [-57, -50, 6],//drink_happy
        [1024, 1024, 1024],
    ],
    [
        [-7, 251, 8.3],
        [-29, 293, 19.6],
        [0, 175, 55.2],
        [34, 183, 74.4],
        [37, 186, 76.2],
        [34, 183, 74.4],
        [37, 186, 76.2],
        [34, 183, 74.4],
        [37, 186, 76.2],
        [34, 183, 74.4],
        [-7, 251, 8.3],//drink_ill
        [1024, 1024, 1024],
    ],
    [
        [-134, 273, 6],
        [-105, 296, 7.6],
        [-105, 296, 7.6],
        [-105, 296, 7.6],
        [-105, 296, 7.6],
        [-105, 296, 7.6],//eat_ill
        [1024, 1024, 1024],
    ],
    [
        [26, -100, 0],
        [26, -100, 0],
        [26, -100, 0],
        [26, -100, 0],
        [16, -52, 0],
        [26, -100, 0],
        [26, -100, 0],
        [26, -100, 0],
        [16, -52, 0],
        [26, -100, 0],
        [26, -100, 0],
        [26, -100, 0],//eat_normal_1
        [1024, 1024, 1024],
    ],
    [
        [-2, -120, 0],
        [-2, -120, 0],
        [-2, -120, 0],
        [-2, -120, 0],
        [11, -168, 0],
        [-2, -120, 0],
        [-2, -120, 0],
        [-2, -120, 0],
        [11, -168, 0],
        [-2, -120, 0],
        [-2, -120, 0],
        [-2, -120, 0],//eat_normal_2
        [1024, 1024, 1024],
    ],
    [
        [-27, -207, 0],
        [-20, -79, 0],
        [-21, -106, 0],
        [-16, -109, 0],
        [-12, -102, 0],
        [-12, -102, 0],
        [-12, -102, 0],
        [-21, -106, 0],
        [-16, -109, 0],
        [-12, -102, 0],
        [-12, -102, 0],
        [-12, -102, 0],
        [-12, -102, 0],
        [-12, -102, 0],//gift_happy
        [1024, 1024, 1024],
    ],
    [
        [-119, 87, 0],
        [-86, 101, 0],
        [-86, 101, 0],
        [-122, 129, 0],//gift_ill
        [1024, 1024, 1024],
    ],
    [
        [-27, -207, 0],
        [-20, -79, 0],
        [-21, -106, 0],
        [-21, -106, 0],
        [-21, -106, 0],
        [-21, -106, 0],
        [-21, -106, 0],
        [-21, -106, 0],
        [-21, -106, 0],//gift_normal
        [1024, 1024, 1024],
    ],
    [
        [-27, -207, 0],
        [-20, -79, 0],
        [-21, -106, 0],
        [-21, -106, 0],
        [-21, -106, 0],
        [-21, -106, 0],//gift_poorcondition
        [1024, 1024, 1024],
    ]
])

export function getLeftByMargin() {
    if(!petImg) return 0
    let a = $('#myPet').css('margin-left')
    let b = parseFloat(a.substring(0, a.length-2))
    if(b === undefined) return 0
    else return b
}
export function getTopByMargin() {
    if(!petImg) return 0
    let a = $('#myPet').css('margin-top')
    let b = parseFloat(a.substring(0, a.length-2))
    if(b === undefined) return 0
    else return b
}

export async function petAnimation(path:string, isDebug:boolean) {
    if(!isShutDown.value && (!isLaunched.value || (durDebug.value && !isDebug))) return
    //console.log(path)
    let AllImgs:string[] = await getAllFiles(path)
    if(!AllImgs) return
    //console.log(AllImgs)
    animationSwitch.value = getTimeNow()
    let curSwitch = animationSwitch.value
    for (let i = 0;i < AllImgs.length; i++) {
        if(!isShutDown.value && (!isLaunched.value || (durDebug.value && !isDebug))) return
        if(curSwitch !== animationSwitch.value) break
        //console.log(AllImgs[i])
        curImgStr.value = AllImgs[i]
        await sleep(animationGap.value)
    }
    if(isDebug) {
        await sleep(500)
    }
}
export async function petAnimation3layers(charPath:string, itemPath: string, startIndex:number, itemTransformIndex:number, isDebug:boolean) {
    if(!isLaunched.value || (durDebug.value && !isDebug)) return
    itemTransformScale.value = 180/imgHeight.value
    console.log(charPath)
    console.log(itemPath)
    let charAllImgsBack:string[] = await getAllFiles(charPath+'/back_lay')
    if(!charAllImgsBack) return
    let charAllImgsFront:string[] = await getAllFiles(charPath+'/front_lay')
    if(!charAllImgsFront) return
    $('#myPetFrontlay').css({
        'margin-left':getLeftByMargin()+'px',
        'margin-top':getTopByMargin()+'px',
    })
    $('#myPetHand').css({
        'margin-left':getLeftByMargin()+'px',
        'margin-top':getTopByMargin()+'px',
    })
    animationSwitch.value = getTimeNow()
    let curSwitch = animationSwitch.value
    for (let i = 0;i < charAllImgsBack.length; i++) {
        if(!isLaunched.value || (durDebug.value && !isDebug)) return
        if(curSwitch !== animationSwitch.value) break
        curImgStr.value = charAllImgsBack[i]
        if(i>=startIndex && i<startIndex+charAllImgsFront.length) {
            $('#myPetFrontlay').css({
                'display':'block',
            })
            curFrontlayImgStr.value = charAllImgsFront[i-startIndex]
            if(itemTransform.value[itemTransformIndex][i-startIndex][0] !== 1024) {
                $('#myPetHand').css({
                    'display':'block',
                    'transform': 'scale(0.16) rotate('+itemTransform.value[itemTransformIndex][i-startIndex][2]+'deg) translateX('+itemTransform.value[itemTransformIndex][i-startIndex][0]+'px) translateY('+itemTransform.value[itemTransformIndex][i-startIndex][1]+'px) '
                })
            }
            curHandImgStr.value = itemPath
        } else {
            $('#myPetFrontlay').css({
                'display':'none',
            })
            $('#myPetHand').css({
                'display':'none',
            })
        }
        await sleep(animationGap.value)
    }
    $('#myPetFrontlay').css({
        'display':'none',
    })
    $('#myPetHand').css({
        'display':'none',
    })
    if(isDebug) {
        await sleep(500)
    }
}


export async function petMovementAnimation_B(path:string, speed: number, direction:string, target: number, startX:number, startY:number, isDebug:boolean) {
    if(!isLaunched.value || (durDebug.value && !isDebug)) return
    console.log(path)
    if(!petImg || curAnimation.value === 'Raise') return
    let AllImgs:string[] = await getAllFiles(path)
    if(!AllImgs) return
    animationSwitch.value = getTimeNow()
    let curSwitch = animationSwitch.value
    switch(direction) {
        case 'R':case 'r':{
            while(getLeftByMargin()+ imgWidth.value/2<target) {
                if(!isLaunched.value || (durDebug.value && !isDebug)) return
                if(curSwitch !== animationSwitch.value) break
                for (let i = 0;i < AllImgs.length; i++) {
                    if(curSwitch !== animationSwitch.value) break
                    let newX = getLeftByMargin()+speed
                    $('#myPet').css({
                        'margin-left':newX+'px'
                    })
                    if(getLeftByMargin()+ imgWidth.value/2>=target) break
                    curImgStr.value = AllImgs[i]
                    await sleep(animationGap.value)
                }
            }
            break
        }
        case 'L':case 'l':{
            while(getLeftByMargin()+ imgWidth.value/2>target) {
                if(!isLaunched.value || (durDebug.value && !isDebug)) return
                if(curSwitch !== animationSwitch.value) break
                for (let i = 0;i < AllImgs.length; i++) {
                    if(curSwitch !== animationSwitch.value) break
                    let newX = getLeftByMargin()-speed
                    $('#myPet').css({
                        'margin-left':newX+'px'
                    })
                    if(getLeftByMargin()+ imgWidth.value/2<=target) break
                    curImgStr.value = AllImgs[i]
                    await sleep(animationGap.value)
                }
            }
            break
        }
        case 'D':case 'd':{
            while(getTopByMargin()+ imgHeight.value/2<target) {
                if(!isLaunched.value || (durDebug.value && !isDebug)) return
                if(curSwitch !== animationSwitch.value) break
                for (let i = 0;i < AllImgs.length; i++) {
                    if(curSwitch !== animationSwitch.value) break
                    let newY = getTopByMargin()+speed
                    $('#myPet').css({
                        'margin-top':newY+'px'
                    })
                    if(getTopByMargin()+ imgHeight.value/2>=target) break
                    curImgStr.value = AllImgs[i]
                    await sleep(animationGap.value)
                }
            }
            break
        }
        case 'U':case 'u':{
            while(getTopByMargin()+ imgHeight.value/2>target) {
                if(!isLaunched.value || (durDebug.value && !isDebug)) return
                if(curSwitch !== animationSwitch.value) break
                for (let i = 0;i < AllImgs.length; i++) {
                    if(curSwitch !== animationSwitch.value) break
                    let newY = getTopByMargin()-speed
                    $('#myPet').css({
                        'margin-top':newY+'px'
                    })
                    if(getTopByMargin()+ imgHeight.value/2<=target) break
                    curImgStr.value = AllImgs[i]
                    await sleep(animationGap.value)
                }
            }
            break
        }
    }
    if(isDebug) {
        await sleep(500)
    }
}

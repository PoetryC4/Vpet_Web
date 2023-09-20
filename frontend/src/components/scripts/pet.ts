import {ref} from 'vue'
import $ from 'jquery';

import {sleep, getTimeNow, getBaseLog} from './utils';
import {
    getLeftByMargin,
    getTopByMargin,
    petAnimation,
    petAnimation3layers,
    petMovementAnimation_B
} from './animationFunc'

export const foodDrawer = ref<boolean>(false)
export const drinkDrawer = ref<boolean>(false)
export const medicineDrawer = ref<boolean>(false)
export const presentDrawer = ref<boolean>(false)
export const interactionDrawer = ref<boolean>(false)
export const animeDebugDrawer = ref<boolean>(false)

export const imgWidth = ref<number>(1000)
export const imgHeight = ref<number>(1000)
export const animationGap = ref<number>(110)
const listenerGap = ref<number>(500)
const trialGap = ref<number>(5000)
const boringMidGap = ref<number>(2000)

export const curAnimation = ref<string>("Default")
export const valMoney = ref<number>(100.0)
export const valExp = ref<number>(10.0)
export const valEndu = ref<number>(50.0)
export const valMood = ref<number>(50.0)
export const valHung = ref<number>(50.0)
export const valThir = ref<number>(50.0)
export const valHeal = ref<number>(100.0)
export const curState = ref<String>("Normal")
export const responseSwicth = ref<boolean>(false)
export const responseShow = ref('')

const enableRandMov = ref<boolean>(true)
const gapTop = ref<number>(0)
const gapLeft = ref<number>(0)

const workPerformance = ref<number>(1)

export let petImg = document.getElementById('myPet')
export const isLaunched = ref<boolean>(false)
export const isShutDown = ref<boolean>(false)
const durSwitch = ref<boolean>(false)
const isDragged = ref<boolean>(false)
export const durDebug = ref<boolean>(false)
export const preLaunched = ref<boolean>(false)

const boringAnimationFlag = ref<boolean>(false)
const recoverAnimationFlag = ref<boolean>(false)
const illAnimationFlag = ref<boolean>(false)
const hungryAnimationFlag = ref<boolean>(false)
const thirstyAnimationFlag = ref<boolean>(false)

const speedFast = ref<number>(12)
const speedNormal = ref<number>(9)
const speedSlow = ref<number>(6)
const speedFalling = ref<number>(17)

export const isStudy = ref<boolean>(false)
export const isCopy = ref<boolean>(false)
export const isLive = ref<boolean>(false)
export const isSleep = ref<boolean>(false)
export const isDance = ref<boolean>(false)
export const isResearch = ref<boolean>(false)
export const isPlayOne = ref<boolean>(false)
export const isWorkClean = ref<boolean>(false)
export const isRemoveObject = ref<boolean>(false)

const interactionStrs = ref<string[]>([
    'Sleep',
    'Study',
    'Live',
    'Copy',
    'Dance',
    'WorkClean',
    'RemoveObject',
    'PlayONE',
    'Research'
])

let time: any

export const baseLocalUrl = ref<string>("E:/scl/pet_ques/src/main/resources/front")
export const baseNetUrl = ref<string>("http://127.0.0.1:8011/front")

async function dragMove(event: MouseEventInit) {
    if (petImg === null) return
    const mouseX = event.clientX
    const mouseY = event.clientY
    if (mouseX === undefined || mouseY === undefined) return
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    let newX = mouseX + scrollX - gapLeft.value
    let newY = mouseY + scrollY - gapTop.value
    $('#myPet').css({
        'margin-top': newY + 'px',
        'margin-left': newX + 'px'
    })

}

async function petClickedUp(event: MouseEvent) {
    $('#myPet').off('mousemove', dragMove);

    if (!petImg) return

    const mouseX = event.clientX
    const mouseY = event.clientY

    if (time) {
        clearInterval(time);
        time = null
    }

    if (!isDragged.value || curAnimation.value !== 'Raise') {
        const mousePerX = (mouseX - getLeftByMargin()) / imgWidth.value
        const mousePerY = (mouseY - getTopByMargin()) / imgHeight.value

        if (mousePerX >= 0.3 && mousePerX <= 0.7 && mousePerY <= 0.3 && mousePerY >= 0.1) {
            console.log('Head')
            curAnimation.value = "Touch_Head"
            valMood.value += 2
            valEndu.value -= 4
            switch (curState.value) {
                case 'Ill':
                case 'PoorCondition': {
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/A_Ill', false)
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/B_Ill', false)
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/C_Ill', false)
                    break
                }
                default: {
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/A_' + curState.value, false)
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/B_' + curState.value, false)
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/C_' + curState.value, false)
                    break
                }
            }
            curAnimation.value = 'Default'
        } else if (mousePerX >= 0.15 && mousePerX <= 0.85 && mousePerY >= 0.25 && mousePerY <= 0.95) {
            console.log('Body')
            curAnimation.value = "Touch_Body"
            valMood.value += 2
            valEndu.value -= 4
            switch (curState.value) {
                case 'Ill':
                case 'PoorCondition': {
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/A_Ill', false)
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/B_Ill', false)
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/C_Ill', false)
                    break
                }
                default: {
                    let rand = Math.round(Math.random() * 2 + 0.5)
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/A_Happy/tb' + rand, false)
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/B_Happy/tb' + rand, false)
                    await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/C_Happy/tb' + rand, false)
                    break
                }
            }
            curAnimation.value = 'Default'
        }
    }
    if (curAnimation.value !== 'Raise') return
    curAnimation.value = 'Falling'
    await petAnimation(baseLocalUrl.value + '/vup/Raise/Raised_Static/C_' + curState.value, false)
    isDragged.value = false
    curAnimation.value = 'Default'
}

async function petClickedDown(event: MouseEvent) {
    console.log(event)
    const mouseX = event.clientX
    const mouseY = event.clientY
    //获取鼠标按下时的时间
    let timeStart = getTimeNow();

    //setInterval会每100毫秒执行一次，也就是每100毫秒获取一次时间
    if (curAnimation.value !== 'Raise' && curAnimation.value !== 'Falling') {
        time = setInterval(async function () {
            let timeEnd = getTimeNow();

            //如果此时检测到的时间与第一次获取的时间差有1000毫秒
            if (timeEnd - timeStart > 1000) {
                isDragged.value = true
                //便不再继续重复此函数 （clearInterval取消周期性执行）
                clearInterval(time);
                time = null
                if (petImg === null) return
                curAnimation.value = 'Raise'
                gapTop.value = mouseY - getTopByMargin()
                gapLeft.value = mouseX - getLeftByMargin()
                $('#myPet').on('mousemove', dragMove);
                await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/Raised_Static/A_' + curState.value, false)
                while (curAnimation.value === 'Raise') {
                    if (curState.value !== 'Normal') {
                        await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/Raised_Dynamic/' + curState.value, false)
                    } else {
                        await petAnimation(baseLocalUrl.value + '/vup/' + curAnimation.value + '/Raised_Dynamic/Normal/' + Math.round(Math.random() * 2 + 0.5), false)
                    }
                }
                return
            }
        }, 100);
    }

    if (petImg === null) return
}

async function illAnimation() {
    if (curState.value === 'Ill') {
        durSwitch.value = true
        await petAnimation(baseLocalUrl.value + '/vup/Switch/Down/PoorCondition', false)
        durSwitch.value = false
    } else {
        durSwitch.value = true
        await petAnimation(baseLocalUrl.value + '/vup/Switch/Down/' + curState.value, false)
        durSwitch.value = false
    }
    curState.value = 'Ill'
}

async function tryIll(ext: number) {
    await sleep(trialGap.value)
    if (curState.value === 'Ill' || durSwitch.value) return
    else if (Math.random() * Math.pow(2, ext) < 2) {
        illAnimationFlag.value = true
    } else {
        tryIll(Math.max(1, ext - 1))
    }
}

async function recoverAnimation() {
    if (curState.value === 'Happy') {
        await petAnimation(baseLocalUrl.value + '/vup/Switch/Up/Normal', false)
    } else {
        await petAnimation(baseLocalUrl.value + '/vup/Switch/Up/' + curState.value, false)
    }
    curState.value = 'Normal'
}

async function tryRecover(ext: number) {
    await sleep(trialGap.value)
    if (curState.value !== 'Ill' || durSwitch.value) return
    else if (Math.random() * Math.pow(2, ext) < 2) {
        recoverAnimationFlag.value = true
        illAnimationFlag.value = false
    } else {
        tryRecover(Math.max(1, ext - 1))
    }
}

async function hungryAnimation() {
    if (curState.value === 'Ill') {
        durSwitch.value = true
        await petAnimation(baseLocalUrl.value + '/vup/Switch/Hunger/PoorCondition', false)
        durSwitch.value = false
    } else {
        durSwitch.value = true
        await petAnimation(baseLocalUrl.value + '/vup/Switch/Hunger/' + curState.value, false)
        durSwitch.value = false
    }
}

async function tryHungry(ext: number) {
    await sleep(trialGap.value)
    if (curState.value === 'Ill' || durSwitch.value || hungryAnimationFlag.value) return
    else if (Math.random() * Math.pow(2, ext) < 2) {
        hungryAnimationFlag.value = true
    } else {
        await tryHungry(Math.max(1, ext - 1))
    }
}

async function thirstyAnimation() {
    durSwitch.value = true
    await petAnimation(baseLocalUrl.value + '/vup/Switch/Thirsty', false)
    durSwitch.value = false
}

async function tryThirsty(ext: number) {
    await sleep(trialGap.value)
    if (curState.value === 'Ill' || durSwitch.value || thirstyAnimationFlag.value) return
    else if (Math.random() * Math.pow(2, ext) < 2) {
        thirstyAnimationFlag.value = true
    } else {
        await tryThirsty(Math.max(1, ext - 1))
    }
}

async function boringAnimation() {
    durSwitch.value = true
    let rand = Math.round(Math.random() * 4 - 0.5)
    switch (rand) {
        case 0: {
            await petAnimation(baseLocalUrl.value + '/vup/IDEL/Boring/A_Normal', false)
            let loop = Math.round(Math.random() * 2 + 1)
            for (let i = 0; i < loop; i++) {
                await petAnimation(baseLocalUrl.value + '/vup/IDEL/Boring/B_Normal', false)
            }
            await petAnimation(baseLocalUrl.value + '/vup/IDEL/Boring/C_Normal', false)
            break
        }
        case 1: {
            if (curState.value === 'Ill' || curState.value === 'PoorCondition') {
                await petAnimation(baseLocalUrl.value + '/vup/IDEL/Squat/A_PoorCondition', false)
                let loop = Math.round(Math.random() * 2 + 1)
                for (let i = 0; i < loop; i++) {
                    await petAnimation(baseLocalUrl.value + '/vup/IDEL/Squat/B_PoorCondition/' + Math.round(Math.random() * 2 + 0.5), false)
                    await sleep(boringMidGap.value / 2)
                }
                await petAnimation(baseLocalUrl.value + '/vup/IDEL/Squat/C_PoorCondition', false)
            } else {
                await petAnimation(baseLocalUrl.value + '/vup/IDEL/Squat/A_Normal', false)
                let loop = Math.round(Math.random() * 2 + 1)
                for (let i = 0; i < loop; i++) {
                    await petAnimation(baseLocalUrl.value + '/vup/IDEL/Squat/B_Normal/' + Math.round(Math.random() * 3 + 0.5), false)
                    await sleep(boringMidGap.value / 2)
                }
                await petAnimation(baseLocalUrl.value + '/vup/IDEL/Squat/C_Normal', false)
            }
            break
        }
        case 2: {
            if (curState.value === 'Ill' || curState.value === 'PoorCondition') {
                await petAnimation(baseLocalUrl.value + '/vup/State/StateONE/A_PoorCondition', false)
                let loop = Math.round(Math.random() * 2 + 1)
                for (let i = 0; i < loop; i++) {
                    await petAnimation(baseLocalUrl.value + '/vup/State/StateONE/B_PoorCondition', false)
                    await sleep(boringMidGap.value)
                }
                await petAnimation(baseLocalUrl.value + '/vup/State/StateONE/C_PoorCondition', false)
            } else {
                await petAnimation(baseLocalUrl.value + '/vup/State/StateONE/A_' + curState.value, false)
                let loop = Math.round(Math.random() * 2 + 1)
                for (let i = 0; i < loop; i++) {
                    await petAnimation(baseLocalUrl.value + '/vup/State/StateONE/B_' + curState.value + '/' + Math.round(Math.random() * 2 + 0.5), false)
                    await sleep(boringMidGap.value)
                }
                await petAnimation(baseLocalUrl.value + '/vup/State/StateONE/C_' + curState.value, false)
            }
            break
        }
        case 3: {
            if (curState.value === 'Ill' || curState.value === 'PoorCondition') {
                await petAnimation(baseLocalUrl.value + '/vup/State/StateTWO/A_PoorCondition', false)
                let loop = Math.round(Math.random() * 2 + 1)
                for (let i = 0; i < loop; i++) {
                    await petAnimation(baseLocalUrl.value + '/vup/State/StateTWO/B_PoorCondition', false)
                    await sleep(boringMidGap.value)
                }
                await petAnimation(baseLocalUrl.value + '/vup/State/StateTWO/C_PoorCondition', false)
            } else {
                await petAnimation(baseLocalUrl.value + '/vup/State/StateTWO/A_Normal', false)
                let loop = Math.round(Math.random() * 2 + 1)
                for (let i = 0; i < loop; i++) {
                    await petAnimation(baseLocalUrl.value + '/vup/State/StateTWO/B_Normal', false)
                    await sleep(boringMidGap.value)
                }
                await petAnimation(baseLocalUrl.value + '/vup/State/StateTWO/C_Normal', false)
            }
            break
        }
        default: {
            break
        }
    }
    durSwitch.value = false
}

async function tryBoring(ext: number) {
    if (curState.value === 'Ill' || durSwitch.value || boringAnimationFlag.value) return
    await sleep(trialGap.value)
    if (Math.random() * Math.pow(2, ext) < 2) {
        boringAnimationFlag.value = true
    } else {
        await tryBoring(Math.max(1, ext - 1))
    }
}

async function petListener() {
    if (curAnimation.value === 'Dance') {
        valHung.value -= 0.003
        valThir.value -= 0.003
        valEndu.value -= 0.004
        valHeal.value += 0.002
        return
    }
    if (curAnimation.value === 'Sleep') {
        valHung.value -= 0.001
        valThir.value -= 0.001
        valEndu.value += 0.006
        valHeal.value += 0.001
        return
    } else if (curAnimation.value === 'Study') {
        valHung.value -= 0.003
        valThir.value -= 0.004
        valEndu.value -= 0.002
        valMood.value -= 0.007
        valExp.value += 0.05
        valHeal.value -= 0.003
        return
    } else if (curAnimation.value === 'Live') {
        valHung.value -= 0.004
        valThir.value -= 0.005
        valEndu.value -= 0.003
        valMood.value -= 0.008
        valExp.value += 0.01
        valMoney.value += 0.3 * parseFloat(getBaseLog(10, valExp.value).toFixed(2)) * workPerformance.value
        valHeal.value -= 0.003
        return
    } else if (curAnimation.value === 'Copy') {
        valHung.value -= 0.003
        valThir.value -= 0.004
        valEndu.value -= 0.002
        valMood.value -= 0.005
        valMoney.value += 0.1 * parseFloat(getBaseLog(10, valExp.value).toFixed(2))
        valExp.value += 0.02
        valHeal.value -= 0.002
        return
    } else if (curAnimation.value === 'Research') {
        valHung.value -= 0.003
        valThir.value -= 0.004
        valEndu.value -= 0.002
        valMood.value -= 0.004
        valMoney.value -= 0.01 * parseFloat(getBaseLog(10, valExp.value).toFixed(2))
        valExp.value += 0.05 * workPerformance.value
        valHeal.value -= 0.004
        return
    } else if (curAnimation.value === 'PlayONE') {
        valHung.value -= 0.003
        valThir.value -= 0.004
        valEndu.value -= 0.003
        valMood.value += 0.006
        valExp.value += 0.01
        valHeal.value -= 0.001
        return
    } else if (curAnimation.value === 'WorkClean') {
        valHung.value -= 0.005
        valThir.value -= 0.006
        valEndu.value -= 0.005
        valMood.value -= 0.002
        valMoney.value -= 0.04 * parseFloat(getBaseLog(10, valExp.value).toFixed(2))
        valExp.value += 0.02
        valHeal.value -= 0.002
        return
    } else if (curAnimation.value === 'RemoveObject') {
        valHung.value -= 0.003
        valThir.value -= 0.004
        valEndu.value -= 0.001
        valMood.value -= 0.005
        valMoney.value += 0.2 * parseFloat(getBaseLog(10, valExp.value).toFixed(2))
        valExp.value += 0.01
        valHeal.value -= 0.002
        return
    }
    valHung.value -= 0.002
    valThir.value -= 0.003
    valEndu.value -= 0.001
    valMood.value -= 0.002
    //console.log(curState.value)
    if (durSwitch.value) return

    if (curState.value === 'Ill') {
        if (valHeal.value >= 60) {
            tryRecover(10 - Math.floor(valHeal.value / 10))
        }
    } else if (valHeal.value <= 60) {
        curState.value = 'PoorCondition'
        if (valHeal.value <= 40) {
            tryIll(6)
        }
    } else if (valMood.value >= 75) {
        curState.value = 'Happy'
    } else {
        curState.value = 'Normal'
    }

    if (valHung.value <= 30) {
        tryHungry(5)
    } else if (valThir.value <= 30) {
        tryThirsty(6)
    } else if (curState.value !== 'Ill') {
        tryBoring(8)
    }
}

async function defaultAnimation() {
    while (isLaunched.value) {
        for (; durSwitch.value || curAnimation.value === 'Raise' || curAnimation.value === 'Falling' || curAnimation.value === 'Touch_Head' || curAnimation.value === 'Touch_Body' || interactionStrs.value.indexOf(curAnimation.value) !== -1 || durDebug.value;) {
            await sleep(animationGap.value)
        }
        switch (curState.value) {
            case 'Normal': {
                await petAnimation(baseLocalUrl.value + '/vup/Default/Normal', false)
                break
            }
            case 'Ill': {
                await petAnimation(baseLocalUrl.value + '/vup/Default/Ill/' + Math.round(0.5 + Math.random() * 2), false)
                break
            }
            case 'Happy': {
                await petAnimation(baseLocalUrl.value + '/vup/Default/Happy/' + Math.round(0.5 + Math.random() * 3), false)
                break
            }
            case 'PoorCondition': {
                await petAnimation(baseLocalUrl.value + '/vup/Default/PoorCondition/' + Math.round(0.5 + Math.random() * 4), false)
                break
            }
        }
    }
}

export async function start() {
    if (!preLaunched.value) return
    isLaunched.value = true
    $('#myPet').css({
        'display': 'block'
    })
    let storage = window.localStorage;
    //storage.clear();
    if (storage.money) valMoney.value = Number.parseFloat(storage.money)
    if (storage.exp) valExp.value = Number.parseFloat(storage.exp)
    if (storage.endu) valEndu.value = Number.parseFloat(storage.endu)
    if (storage.mood) valMood.value = Number.parseFloat(storage.mood)
    if (storage.hung) valHung.value = Number.parseFloat(storage.hung)
    if (storage.thir) valThir.value = Number.parseFloat(storage.thir)
    if (storage.state) curState.value = storage.state

    //curState.value = 'Ill'

    petImg = document.getElementById('myPet')
    if (petImg) {
        petImg.addEventListener("mousedown", petClickedDown);
        window.addEventListener("mouseup", petClickedUp);
    }
    let imgW = $('#myPet').width()
    let imgH = $('#myPet').height()
    if (imgW != undefined) {
        imgWidth.value = imgW
    }
    if (imgH != undefined) {
        imgHeight.value = imgH
    }
    switch (curState.value) {
        case 'Normal': {
            await petAnimation(baseLocalUrl.value + '/vup/StartUP/Normal', false)
            break
        }
        case 'Ill': {
            await petAnimation(baseLocalUrl.value + '/vup/StartUP/Ill', false)
            break
        }
        case 'Happy': {
            await petAnimation(baseLocalUrl.value + '/vup/StartUP/Happy/' + Math.round(0.5 + Math.random() * 2), false)
            break
        }
        case 'PoorCondition': {
            await petAnimation(baseLocalUrl.value + '/vup/StartUP/PoorCondition', false)
            break
        }
        default: {
            curState.value = 'Normal'
            break
        }
    }

    defaultAnimation()

    while (isLaunched.value) {
        for (; curAnimation.value === 'Raise' || curAnimation.value === 'Falling' || curAnimation.value === 'Touch_Head' || curAnimation.value === 'Touch_Body';) {
            await sleep(animationGap.value)
        }
        if (durDebug.value) {
            await sleep(listenerGap.value)
            continue
        }
        if (interactionStrs.value.indexOf(curAnimation.value) !== -1) {
            petListener()
            await sleep(listenerGap.value)
            continue
        }
        if (recoverAnimationFlag.value) {
            await recoverAnimation()
            recoverAnimationFlag.value = false
        }
        if (illAnimationFlag.value) {
            await illAnimation()
            illAnimationFlag.value = false
        }
        if (hungryAnimationFlag.value) {
            await hungryAnimation()
            hungryAnimationFlag.value = false
        }
        if (thirstyAnimationFlag.value) {
            await thirstyAnimation()
            thirstyAnimationFlag.value = false
        }
        if (boringAnimationFlag.value) {
            await boringAnimation()
            boringAnimationFlag.value = false
        }
        if (enableRandMov.value && curState.value !== 'Ill' && !durSwitch.value && petImg) {
            if (Math.random() * 100 < 2) {
                let targetX = $(window).width()
                let targetY = $(window).height()
                if (!targetX || !targetY) return
                targetX = targetX * (Math.random() * 0.8 + 0.1)
                targetY = targetY * (Math.random() * 0.8 + 0.1)

                await move(targetX, targetY)
            }
        }
        petListener()
        await sleep(listenerGap.value)
    }
}

export async function move(targetX: number, targetY: number) {
    if (!isLaunched.value) return
    durSwitch.value = true
    if (Math.random() < 0.5) {
        await goToX(targetX, getLeftByMargin() + imgWidth.value / 2, getTopByMargin() + imgHeight.value / 2)
        await goToY(targetY, targetX, getLeftByMargin() + imgWidth.value / 2, getTopByMargin() + imgHeight.value / 2)
    } else {
        await goToY(targetY, targetX, getLeftByMargin() + imgWidth.value / 2, getTopByMargin() + imgHeight.value / 2)
        await goToX(targetX, getLeftByMargin() + imgWidth.value / 2, getTopByMargin() + imgHeight.value / 2)
    }
    durSwitch.value = false
}

async function goToX(targetX: number | undefined, startX: number, startY: number) {
    const windowHeight = $(window).height()
    if (targetX === undefined) return
    if (petImg !== null && windowHeight) {
        durSwitch.value = true
        if ((getTopByMargin() + imgHeight.value / 2) / windowHeight < 0.2) {
            if (targetX < startX) {
                await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.top.left/A_' + curState.value, false)
                await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/climb.top.left/B_' + curState.value, speedSlow.value, 'L', targetX, startX, startY, false)
                await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.top.left/C_' + curState.value, false)
            } else {
                await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.top.right/A_' + curState.value, false)
                await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/climb.top.right/B_' + curState.value, speedSlow.value, 'R', targetX, startX, startY, false)
                await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.top.right/C_' + curState.value, false)
            }
        } else {
            if (targetX < startX) {
                if (Math.random() < 1 / 3) {
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/crawl.left/A_' + curState.value, false)
                    await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/crawl.left/B_' + curState.value, speedSlow.value, 'L', targetX, startX, startY, false)
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/crawl.left/C_' + curState.value, false)
                } else if (curState.value !== 'Happy') {
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/walk.left/A_Normal', false)
                    await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/walk.left/B_Normal', speedNormal.value, 'L', targetX, startX, startY, false)
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/walk.left/C_Normal', false)
                } else {
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/walk.left.faster/A_Happy', false)
                    await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/walk.left.faster/B_Happy', speedFast.value, 'L', targetX, startX, startY, false)
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/walk.left.faster/C_Happy', false)
                }
            } else {
                if (Math.random() < 1 / 4) {
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/crawl.right/A_' + curState.value, false)
                    await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/crawl.right/B_' + curState.value, speedSlow.value, 'R', targetX, startX, startY, false)
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/crawl.right/C_' + curState.value, false)
                } else if (curState.value === 'Normal') {
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/walk.right/A_Normal', false)
                    await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/walk.right/B_Normal', speedNormal.value, 'R', targetX, startX, startY, false)
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/walk.right/C_Normal', false)
                } else if (curState.value === 'Happy') {
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/walk.right.faster/A_Happy', false)
                    await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/walk.right.faster/B_Happy', speedFast.value, 'R', targetX, startX, startY, false)
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/walk.right.faster/C_Happy', false)
                } else {
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/walk.right.slow/A_PoorCondition', false)
                    await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/walk.right.slow/B_PoorCondition', speedSlow.value, 'R', targetX, startX, startY, false)
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/walk.right.slow/C_PoorCondition', false)
                }
            }
        }
        durSwitch.value = false
    }
}

async function goToY(targetY: number | undefined, targetX: number | undefined, startX: number, startY: number) {
    if (targetY === undefined) return
    if (targetX === undefined) return
    if (petImg !== null) {
        durSwitch.value = true
        if (targetY < startY) {
            if (startX < targetX) {
                if (curState.value !== 'PoorCondition') {
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.left/A_' + curState.value, false)
                    await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/climb.left/B_' + curState.value, speedSlow.value, 'U', targetY, startX, startY, false)
                    //await petAnimation(baseLocalUrl.value+'/vup/MOVE/climb.left/C_'+curState.value, false)
                } else {
                    if (Math.random() < 0.5) {
                        await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.left/PoorCondition/A_1', false)
                        await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/climb.left/PoorCondition/B_1', speedSlow.value, 'U', targetY, startX, startY, false)
                        await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.left/PoorCondition/C_1', false)
                    } else {
                        await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.left/PoorCondition/A_2', false)
                        await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/climb.left/PoorCondition/B_2', speedSlow.value, 'U', targetY, startX, startY, false)
                        await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.left/PoorCondition/C_2', false)
                    }
                }
            } else {
                await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.right/A_' + curState.value, false)
                await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/climb.right/B_' + curState.value, speedSlow.value, 'U', targetY, startX, startY, false)
                if (curState.value === 'PoorCondition')
                    await petAnimation(baseLocalUrl.value + '/vup/MOVE/climb.right/C_' + curState.value, false)
            }
        } else {
            if (startX < targetX) {
                await petAnimation(baseLocalUrl.value + '/vup/MOVE/fall.left/A_' + curState.value, false)
                await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/fall.left/B_' + curState.value, speedFalling.value, 'D', targetY, startX, startY, false)
                await petAnimation(baseLocalUrl.value + '/vup/MOVE/fall.left/C_' + curState.value, false)
            } else {
                await petAnimation(baseLocalUrl.value + '/vup/MOVE/fall.right/A_' + curState.value, false)
                await petMovementAnimation_B(baseLocalUrl.value + '/vup/MOVE/fall.right/B_' + curState.value, speedFalling.value, 'D', targetY, startX, startY, false)
                await petAnimation(baseLocalUrl.value + '/vup/MOVE/fall.right/C_' + curState.value, false)
            }
        }
        durSwitch.value = false
    }
}

export async function shutdown() {
    isLaunched.value = false
    let storage = window.localStorage;
    storage.money = valMoney.value
    storage.exp = valExp.value
    storage.endu = valEndu.value
    storage.mood = valMood.value
    storage.hung = valHung.value
    storage.thir = valThir.value
    storage.state = curState.value

    if (petImg) {
        petImg.removeEventListener("mousedown", petClickedDown);
        window.removeEventListener("mouseup", petClickedUp);
    }

    isShutDown.value = true
    switch (curState.value) {
        case 'Normal': {
            await petAnimation(baseLocalUrl.value + '/vup/Shutdown/Normal/' + Math.round(0.5 + Math.random() * 2), false)
            break
        }
        case 'Ill': {
            await petAnimation(baseLocalUrl.value + '/vup/Shutdown/Ill', false)
            break
        }
        case 'Happy': {
            await petAnimation(baseLocalUrl.value + '/vup/Shutdown/Happy', false)
            break
        }
        case 'PoorCondition': {
            await petAnimation(baseLocalUrl.value + '/vup/Shutdown/PoorCondition', false)
            break
        }
        default: {
            curState.value = 'Normal'
            break
        }
    }
    isShutDown.value = false
    $('#myPet').css({
        'display': 'none'
    })
}

export async function researchToggle() {
    if (!isLaunched.value) return
    if (isResearch.value && curAnimation.value === 'Research') {
        isResearch.value = false
        return
    }
    curAnimation.value = 'Research'
    isResearch.value = true
    await petAnimation(baseLocalUrl.value + '/vup/WORK/Research/' + curState.value + '/A', false)
    while (isResearch.value) {
        switch (curState.value) {
            case 'Ill':
            case 'PoorCondition': {
                await petAnimation(baseLocalUrl.value + '/vup/WORK/Research/PoorCondition/B_' + Math.round(Math.random() * 3 + 0.5), false)
                break
            }
            case 'Happy': {
                await petAnimation(baseLocalUrl.value + '/vup/WORK/Research/Happy/B_' + Math.round(Math.random() * 4 + 0.5), false)
                break
            }
            case 'Normal': {
                await petAnimation(baseLocalUrl.value + '/vup/WORK/Research/Normal/B_' + Math.round(Math.random() * 2 + 0.5), false)
                break
            }
        }
    }
    await petAnimation(baseLocalUrl.value + '/vup/WORK/Research/' + curState.value + '/C', false)
    curAnimation.value = 'Default'
}

export async function studyToggle() {
    if (!isLaunched.value) return
    if (isStudy.value && curAnimation.value === 'Study') {
        isStudy.value = false
        return
    }
    curAnimation.value = 'Study'
    isStudy.value = true
    await petAnimation(baseLocalUrl.value + '/vup/WORK/Study/A_Normal', false)
    while (isStudy.value) {
        await petAnimation(baseLocalUrl.value + '/vup/WORK/Study/B_' + Math.round(Math.random() * 4 + 0.5) + '_Normal', false)
    }
    await petAnimation(baseLocalUrl.value + '/vup/WORK/Study/C_Normal', false)
    curAnimation.value = 'Default'
}

export async function liveToggle() {
    if (!isLaunched.value) return
    if (isLive.value && curAnimation.value === 'Live') {
        isLive.value = false
        return
    }
    curAnimation.value = 'Live'
    isLive.value = true
    await petAnimation(baseLocalUrl.value + '/vup/WORK/Live/A_Normal', false)
    while (isLive.value) {
        await petAnimation(baseLocalUrl.value + '/vup/WORK/Live/B_' + Math.round(Math.random() * 4 + 0.5) + '_Normal', false)
    }
    await petAnimation(baseLocalUrl.value + '/vup/WORK/Live/C_Normal', false)
    curAnimation.value = 'Default'
}

export async function copyToggle() {
    if (!isLaunched.value) return
    if (isCopy.value && curAnimation.value === 'Copy') {
        isCopy.value = false
        return
    }
    curAnimation.value = 'Copy'
    isCopy.value = true
    await petAnimation(baseLocalUrl.value + '/vup/WORK/Copy/A_Normal', false)
    while (isCopy.value) {
        await petAnimation(baseLocalUrl.value + '/vup/WORK/Copy/B_' + Math.round(Math.random() * 2 + 0.5) + '_Normal', false)
    }
    await petAnimation(baseLocalUrl.value + '/vup/WORK/Copy/C_Normal', false)
    curAnimation.value = 'Default'
}

export async function workCleanToggle() {
    if (!isLaunched.value) return
    if (isWorkClean.value && curAnimation.value === 'WorkClean') {
        isWorkClean.value = false
        return
    }
    curAnimation.value = 'WorkClean'
    isWorkClean.value = true
    await petAnimation(baseLocalUrl.value + '/vup/WORK/WorkClean/' + curState.value + '/A', false)
    while (isWorkClean.value) {
        switch (curState.value) {
            case 'Ill':
            case 'PoorCondition': {
                await petAnimation(baseLocalUrl.value + '/vup/WORK/WorkClean/PoorCondition/B_' + Math.round(Math.random() * 6 + 0.5), false)
                break
            }
            case 'Happy': {
                await petAnimation(baseLocalUrl.value + '/vup/WORK/WorkClean/Happy/B_' + Math.round(Math.random() * 7 + 0.5), false)
                break
            }
            case 'Normal': {
                await petAnimation(baseLocalUrl.value + '/vup/WORK/WorkClean/Normal/B_' + Math.round(Math.random() * 7 + 0.5), false)
                break
            }
        }
    }
    await petAnimation(baseLocalUrl.value + '/vup/WORK/WorkClean/' + curState.value + '/C', false)
    curAnimation.value = 'Default'
}

export async function playOneToggle() {
    if (!isLaunched.value) return
    if (isPlayOne.value && curAnimation.value === 'PlayONE') {
        isPlayOne.value = false
        return
    }
    curAnimation.value = 'PlayONE'
    isPlayOne.value = true
    await petAnimation(baseLocalUrl.value + '/vup/WORK/PlayONE/' + curState.value + '/A', false)
    while (isPlayOne.value) {
        await petAnimation(baseLocalUrl.value + '/vup/WORK/PlayONE/' + curState.value + '/B', false)
    }
    await petAnimation(baseLocalUrl.value + '/vup/WORK/PlayONE/' + curState.value + '/C', false)
    curAnimation.value = 'Default'
}

export async function sleepToggle() {
    if (!isLaunched.value) return
    if (isSleep.value && curAnimation.value === 'Sleep') {
        isSleep.value = false
        return
    }
    curAnimation.value = 'Sleep'
    isSleep.value = true
    await petAnimation(baseLocalUrl.value + '/vup/Sleep/A_' + curState.value, false)
    while (isSleep.value) {
        await petAnimation(baseLocalUrl.value + '/vup/Sleep/B_' + curState.value, false)
    }
    await petAnimation(baseLocalUrl.value + '/vup/Sleep/C_' + curState.value, false)
    curAnimation.value = 'Default'
}

export async function removeObjectToggle() {
    if (!isLaunched.value) return
    if (isRemoveObject.value && curAnimation.value === 'Sleep') {
        isRemoveObject.value = false
        return
    }
    curAnimation.value = 'Sleep'
    isRemoveObject.value = true
    await petAnimation(baseLocalUrl.value + '/vup/WORK/RemoveObject/' + curState.value + '/A', false)
    while (isRemoveObject.value) {
        switch (curState.value) {
            case 'Ill':
            case 'PoorCondition': {
                await petAnimation(baseLocalUrl.value + '/vup/WORK/RemoveObject/PoorCondition/B_' + Math.round(Math.random() * 2 + 0.5), false)
                break
            }
            case 'Happy': {
                await petAnimation(baseLocalUrl.value + '/vup/WORK/RemoveObject/Happy/B', false)
                break
            }
            case 'Normal': {
                await petAnimation(baseLocalUrl.value + '/vup/WORK/RemoveObject/Normal/B', false)
                break
            }
        }
    }
    await petAnimation(baseLocalUrl.value + '/vup/WORK/RemoveObject/' + curState.value + '/C', false)
    curAnimation.value = 'Default'
}

export async function danceToggle() {
    if (!isLaunched.value) return
    if (isDance.value && curAnimation.value === 'Dance') {
        isDance.value = false
        return
    }
    curAnimation.value = 'Dance'
    isDance.value = true
    if (curState.value === 'Ill') {
        await petAnimation(baseLocalUrl.value + '/vup/Music/A/PoorCondition', false)
    } else {
        await petAnimation(baseLocalUrl.value + '/vup/Music/A/' + curState.value, false)
    }
    let rand: number = Math.round(Math.random() * 3 + 0.5)
    while (isDance.value) {
        if (curState.value === 'Happy') {
            rand = Math.round(Math.random() * 5 + 0.5)
            if (rand === 5) {
                await petAnimation(baseLocalUrl.value + '/vup/Music/Single/Happy', false)
            } else {
                await petAnimation(baseLocalUrl.value + '/vup/Music/B/Happy_' + rand, false)
            }
        } else {
            rand = Math.round(Math.random() * 6 + 0.5)
            if (rand === 6) {
                await petAnimation(baseLocalUrl.value + '/vup/Music/Single/Normal', false)
            } else {
                await petAnimation(baseLocalUrl.value + '/vup/Music/B/Normal_' + rand, false)
            }
        }
    }
    if (rand === 2 || rand === 1) {
        if (curState.value === 'Happy') {
            await petAnimation(baseLocalUrl.value + '/vup/Music/C/Happy_' + rand, false)
        } else {
            await petAnimation(baseLocalUrl.value + '/vup/Music/C/Normal_' + rand, false)
        }
    }
    curAnimation.value = 'Default'
}

export async function buyDrink(drinkInfo: any) {
    if (!isLaunched.value || valMoney.value < drinkInfo.drinkPrice || durSwitch.value) return
    durSwitch.value = true
    await petAnimation3layers(baseLocalUrl.value + '/vup/Drink/' + curState.value, baseNetUrl.value + '/drink/' + drinkInfo.drinkPicPath, curState.value === 'Ill' ? 4 : 9, curState.value === 'Ill' ? 1 : 0, false)
    valMoney.value -= drinkInfo.drinkPrice
    valEndu.value += drinkInfo.drinkEndu
    valExp.value += drinkInfo.drinkExp
    valHung.value += drinkInfo.drinkHunger
    valThir.value += drinkInfo.drinkThirsty
    valMood.value += drinkInfo.drinkMood
    valHeal.value += drinkInfo.drinkHealth

    durSwitch.value = false
}

export async function buyFood(foodInfo: any) {
    if (!isLaunched.value || valMoney.value < foodInfo.foodPrice || durSwitch.value) return
    durSwitch.value = true
    switch (curState.value) {
        case 'Ill' : {
            await petAnimation3layers(baseLocalUrl.value + '/vup/Eat/Ill', baseNetUrl.value + '/food/' + foodInfo.foodPicPath, 5, 2, false)
            break
        }
        default: {
            if (Math.random() < 1 / 2) {
                await petAnimation3layers(baseLocalUrl.value + '/vup/Eat/Normal_1', baseNetUrl.value + '/food/' + foodInfo.foodPicPath, 4, 3, false)
            } else {
                await petAnimation3layers(baseLocalUrl.value + '/vup/Eat/Normal_2', baseNetUrl.value + '/food/' + foodInfo.foodPicPath, 4, 4, false)
            }
            break
        }
    }
    valMoney.value -= foodInfo.foodPrice
    valEndu.value += foodInfo.foodEndu
    valExp.value += foodInfo.foodExp
    valHung.value += foodInfo.foodHunger
    valThir.value += foodInfo.foodThirsty
    valMood.value += foodInfo.foodMood
    valHeal.value += foodInfo.foodHealth

    durSwitch.value = false
}

export async function buyMedicine(medicineInfo: any) {
    if (!isLaunched.value || curState.value !== 'Ill' || valMoney.value < medicineInfo.medicinePrice || durSwitch.value) return
    durSwitch.value = true
    switch (curState.value) {
        case 'Ill' : {
            await petAnimation3layers(baseLocalUrl.value + '/vup/Eat/Ill', baseNetUrl.value + '/medicine/' + medicineInfo.medicinePicPath, 5, 2, false)
            break
        }
        default: {
            if (Math.random() < 1 / 2) {
                await petAnimation3layers(baseLocalUrl.value + '/vup/Eat/Normal_1', baseNetUrl.value + '/medicine/' + medicineInfo.medicinePicPath, 4, 3, false)
            } else {
                await petAnimation3layers(baseLocalUrl.value + '/vup/Eat/Normal_2', baseNetUrl.value + '/medicine/' + medicineInfo.medicinePicPath, 4, 4, false)
            }
            break
        }
    }
    valMoney.value -= medicineInfo.medicinePrice
    valEndu.value += medicineInfo.medicineEndu
    valExp.value += medicineInfo.medicineExp
    valMood.value += medicineInfo.medicineMood
    valHeal.value += medicineInfo.medicineHealth

    durSwitch.value = false
}

export async function buyPresent(presentInfo: any) {
    if (!isLaunched.value || valMoney.value < presentInfo.presentPrice || durSwitch.value) return
    durSwitch.value = true
    let startIndex = -1
    let transformIndex = -1
    switch (curState.value) {
        case 'Ill': {
            startIndex = 11
            transformIndex = 6
            break
        }
        case 'Happy': {
            startIndex = 4
            transformIndex = 5
            break
        }
        case 'PoorCondition': {
            startIndex = 4
            transformIndex = 8
            break
        }
        case 'Normal': {
            startIndex = 4
            transformIndex = 7
            break
        }
        default: {
            break
        }
    }
    await petAnimation3layers(baseLocalUrl.value + '/vup/Gift/' + curState.value, baseNetUrl.value + '/present/' + presentInfo.presentPicPath, startIndex, transformIndex, false)
    valMoney.value -= presentInfo.presentPrice
    valExp.value += presentInfo.presentExp
    valMood.value += presentInfo.presentMood
    workPerformance.value += presentInfo.presentPerformance

    durSwitch.value = false
}

export async function chatSpeak(duration: number) {
    durSwitch.value = true
    let curTimeLine = 0
    switch (curState.value) {
        case 'Ill':
        case 'PoorCondition': {
            await petAnimation(baseLocalUrl.value + '/vup/Say/Serious/A', false)
            while (curTimeLine < duration) {
                await petAnimation(baseLocalUrl.value + '/vup/Say/Serious/B', false)
                curTimeLine += 4 * animationGap.value
            }
            await petAnimation(baseLocalUrl.value + '/vup/Say/Serious/C', false)
            break
        }
        case 'Happy': {
            await petAnimation(baseLocalUrl.value + '/vup/Say/Shining/A', false)
            let rand = 1
            while (curTimeLine < duration) {
                rand = Math.round(Math.random() * 3 + 0.5)
                await petAnimation(baseLocalUrl.value + '/vup/Say/Shining/B_' + rand, false)
                curTimeLine += (rand === 1 ? 6 : 7) * animationGap.value
            }
            await petAnimation(baseLocalUrl.value + '/vup/Say/Shining/C', false)
            break
        }
        default: {
            await petAnimation(baseLocalUrl.value + '/vup/Say/Self/A', false)
            let rand = 1
            while (curTimeLine < duration) {
                rand = Math.round(Math.random() * 3 + 0.5)
                await petAnimation(baseLocalUrl.value + '/vup/Say/Self/B_' + rand, false)
                curTimeLine += (rand === 3 ? 14 : 15) * animationGap.value
            }
            await petAnimation(baseLocalUrl.value + '/vup/Say/Self/C', false)
            break
        }
    }
    durSwitch.value = false
}

export function getFlagsAnd(curTry:boolean) {
    return !curTry&&(isStudy.value ||isCopy.value||isLive.value||isSleep.value||isDance.value||isResearch.value||isPlayOne.value||isWorkClean.value||isRemoveObject.value)
}
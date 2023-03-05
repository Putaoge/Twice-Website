// 選單按鈕
let languageBtn = document.querySelector('.languageBtnBox')
let languageBtnAll = document.querySelectorAll('.languageBtnBox')
// console.log(languageBtnAll);
// 語言列表
let languageList = document.querySelector('.languageList')
let languageListAll = document.querySelectorAll('.languageList')
// 目前選擇的語言
let currentLanguage = document.querySelector('.currentLanguage')
let currentLanguageAll = document.querySelectorAll('.currentLanguage')

let header = document.querySelector('header')
let headNav = document.querySelector('.headNav')

let menuBtn = document.querySelectorAll('.btnBox span')

let shareBtn = document.querySelectorAll('.menu ul li')
let shareBtnMenu = document.querySelector('.menu ul')
// let shareBtn = document.querySelectorAll('.menu ul')

// 手機版選單
let menuBtnMobile = document.querySelector('.headNav-mobile .menuBtn')
let topLine = document.querySelector('.menuBtn .top-line')
let midLine = document.querySelector('.menuBtn .mid-line')
let bottomLine = document.querySelector('.menuBtn .bottom-line')

// 選單
let showBox = document.querySelector('.headNav-mobile')


// 選擇是否打開
let languageBtnIsClick = false;
languageBtnAll.forEach((item,index)=>{
    item.onclick = () => {
        if (!item.isClick) {
            languageListAll[index].classList.add('listActive')
            item.isClick = true
            return;
        }
        languageListAll[index].classList.remove('listActive')
        item.isClick = false
    }


    document.body.addEventListener('click', function (event) {
        if (!item.isClick) {
            return;
        }
        if (event.target.className !== 'cover') {
            languageListAll[index].classList.remove('listActive')
            item.isClick = false
        }
    })

    languageListAll[index].childNodes.forEach(child => {
        child.onclick = () => {
            // console.log(child);
            currentLanguageAll[index].innerHTML = child.innerHTML
        }
    })

})

function throttle(fn, delay) {
    let timer;
    return () => {
        if (timer) {
            return
        } else {
            fn()
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
            }, delay)
        }
    }
}
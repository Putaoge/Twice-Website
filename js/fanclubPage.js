
let header = document.querySelector('header')

// 導航系列
let navLogo = document.querySelector('.navLogo')
let navBtnBox = document.querySelector('.navBtnBox')
let navList = document.querySelector('.navList')

// 第二導航
let secondNav = document.querySelector('.second-nav')

// 打開大導航
let menuBtn = document.querySelector('.menuBtn')
let topLine = document.querySelector('.menuBtn .top-line')
let midLine = document.querySelector('.menuBtn .mid-line')
let bottomLine = document.querySelector('.menuBtn .bottom-line')

// 選單按鈕
let languageBtn = document.querySelector('.languageBtnBox')
// 選單的殼
let languageBox = document.querySelector('.languageBox')
// console.log(languageBtnAll);
// 語言列表的殼
let languageList = document.querySelector('.languageList')
let languageListText = document.querySelector('.languageList ul')
let languageListItem = document.querySelectorAll('.languageList ul li')
// 目前選擇的語言
let currentLanguage = document.querySelector('.currentLanguage')


// 新聞盒子
let newsContent = document.querySelector('.news .content')

// stuff-blog盒子
let staffBlogContent = document.querySelector('.staff-blog .content')

// latest-contents盒子
let latestContents = document.querySelector('.latest-contents .content')

// 頁首滾動小動畫
let scrollAnimation = document.querySelector('.scroll-pc')


// support選單標題
let supportTitle = document.querySelector('.support-box dt')
let supportDD = document.querySelector('.support-box dd ')
let supportList = document.querySelector('.support-box dd  .support-list')


let loadingBox = document.querySelector('.loading')
let loadingWaveAll = document.querySelectorAll('.loading-wave .wave')



window.onload = async () => {

    // 加載動畫
    setTimeout(() => {
        loadingWaveAll.forEach(item => {
            item.style.transform = "translate3d(0,-120%,0)"
        })
        setTimeout(()=>{
            loadingBox.style.opacity='0'
            setTimeout(()=>{
                loadingBox.remove()
            },300)
        },1800)
    })


    // fanclub資料
    let { STAFFBLOG, LATESTCONTENTS } = await fetch('../public/info/fanclubInfo.json').then(response => response.json())


    // 新聞資料
    let newsArr = (await fetch('../public/info/News.json')
        .then(response => response.json())).slice(0, 5)


    let newsStr = ``
    newsArr.forEach((item, index) => {

        newsStr +=
            `
            <li>
                <span class="date">
                    ${item.date}
                </span>
                <p>
                    ${item.text}
                </p>
            </li>
        `
    })
    newsContent.innerHTML = newsStr; // 更新新聞


    let blogStr = ``
    STAFFBLOG.forEach(item => {
        blogStr +=
            `
            <li>
                <div class="pic">
                    <img src=${item.path} alt="${item.text}">
                    <div class="cover">
                        <p>member only</p>
                        <div class="wave">
                            <svg width="100%" height="100%" viewBox="0 0 1440 700" xmlns="https://www.w3.org/2000/svg">
                                <path
                                    d="M 0,700 C 0,700 0,350 0,350 C 201.59999999999997,370.26666666666665 403.19999999999993,390.53333333333336 568,370 C 732.8000000000001,349.46666666666664 860.8,288.1333333333333 1000,278 C 1139.2,267.8666666666667 1289.6,308.93333333333334 1440,350 C 1440,350 1440,700 1440,700 Z"
                                    stroke="none" stroke-width="0" fill="#FC8B8Bff">
                                    <animate attributeName="d" dur="8s" repeatCount="indefinite" calcMode="linear"
                                        values="M 0,700 C 0,700 0,350 0,350 C 188.93333333333334,322.8 377.8666666666667,295.6 541,277 C 704.1333333333333,258.4 841.4666666666667,248.39999999999998 987,262 C 1132.5333333333333,275.6 1286.2666666666667,312.8 1440,350 C 1440,350 1440,700 1440,700 Z;M 0,700 C 0,700 0,350 0,350 C 117.06666666666666,342.5333333333333 234.13333333333333,335.06666666666666 403,326 C 571.8666666666667,316.93333333333334 792.5333333333333,306.26666666666665 974,310 C 1155.4666666666667,313.73333333333335 1297.7333333333333,331.8666666666667 1440,350 C 1440,350 1440,700 1440,700 Z;M 0,700 C 0,700 0,350 0,350 C 193.46666666666664,320.4 386.9333333333333,290.8 557,281 C 727.0666666666667,271.2 873.7333333333333,281.2 1017,296 C 1160.2666666666667,310.8 1300.1333333333332,330.4 1440,350 C 1440,350 1440,700 1440,700 Z;M 0,700 C 0,700 0,350 0,350 C 201.59999999999997,370.26666666666665 403.19999999999993,390.53333333333336 568,370 C 732.8000000000001,349.46666666666664 860.8,288.1333333333333 1000,278 C 1139.2,267.8666666666667 1289.6,308.93333333333334 1440,350 C 1440,350 1440,700 1440,700 Z;M 0,700 C 0,700 0,350 0,350 C 188.93333333333334,322.8 377.8666666666667,295.6 541,277 C 704.1333333333333,258.4 841.4666666666667,248.39999999999998 987,262 C 1132.5333333333333,275.6 1286.2666666666667,312.8 1440,350 C 1440,350 1440,700 1440,700 Z">
                                    </animate>
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
                <p class="date">${item.date}</p>
                <p class="text">${item.text}</p>
            </li>
        `
    })
    staffBlogContent.innerHTML = blogStr


    let latestContentsStr = ``
    LATESTCONTENTS.forEach(item => {
        latestContentsStr +=
            `
            <li>
                <div class="pic">
                    <img src=${item.path} alt="${item.text}">
                    <div class="cover">
                        <p>member only</p>
                        <div class="wave">
                            <svg width="100%" height="100%" viewBox="0 0 1440 700" xmlns="https://www.w3.org/2000/svg">
                                <path
                                    d="M 0,700 C 0,700 0,350 0,350 C 201.59999999999997,370.26666666666665 403.19999999999993,390.53333333333336 568,370 C 732.8000000000001,349.46666666666664 860.8,288.1333333333333 1000,278 C 1139.2,267.8666666666667 1289.6,308.93333333333334 1440,350 C 1440,350 1440,700 1440,700 Z"
                                    stroke="none" stroke-width="0" fill="#FC8B8Bff">
                                    <animate attributeName="d" dur="8s" repeatCount="indefinite" calcMode="linear"
                                        values="M 0,700 C 0,700 0,350 0,350 C 188.93333333333334,322.8 377.8666666666667,295.6 541,277 C 704.1333333333333,258.4 841.4666666666667,248.39999999999998 987,262 C 1132.5333333333333,275.6 1286.2666666666667,312.8 1440,350 C 1440,350 1440,700 1440,700 Z;M 0,700 C 0,700 0,350 0,350 C 117.06666666666666,342.5333333333333 234.13333333333333,335.06666666666666 403,326 C 571.8666666666667,316.93333333333334 792.5333333333333,306.26666666666665 974,310 C 1155.4666666666667,313.73333333333335 1297.7333333333333,331.8666666666667 1440,350 C 1440,350 1440,700 1440,700 Z;M 0,700 C 0,700 0,350 0,350 C 193.46666666666664,320.4 386.9333333333333,290.8 557,281 C 727.0666666666667,271.2 873.7333333333333,281.2 1017,296 C 1160.2666666666667,310.8 1300.1333333333332,330.4 1440,350 C 1440,350 1440,700 1440,700 Z;M 0,700 C 0,700 0,350 0,350 C 201.59999999999997,370.26666666666665 403.19999999999993,390.53333333333336 568,370 C 732.8000000000001,349.46666666666664 860.8,288.1333333333333 1000,278 C 1139.2,267.8666666666667 1289.6,308.93333333333334 1440,350 C 1440,350 1440,700 1440,700 Z;M 0,700 C 0,700 0,350 0,350 C 188.93333333333334,322.8 377.8666666666667,295.6 541,277 C 704.1333333333333,258.4 841.4666666666667,248.39999999999998 987,262 C 1132.5333333333333,275.6 1286.2666666666667,312.8 1440,350 C 1440,350 1440,700 1440,700 Z">
                                    </animate>
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
                <p class="date">${item.date}</p>
                <p class="text">${item.text}</p>
            </li>
        `
    })
    latestContents.innerHTML = latestContentsStr


}


window.onscroll = () => {
    let userHeight = document.documentElement.clientHeight
    let headerHeight = header.offsetHeight
    // 新聞高度
    let newsContentScrollHeight = newsContent.parentNode.offsetTop
    // blog高度
    let staffBlogContentHeight = staffBlogContent.parentNode.offsetTop
    // latestContents高度
    let latestContentsHeight = latestContents.parentNode.offsetTop

    if (document.documentElement.scrollTop) {
        scrollAnimation.style.opacity = '0'
    } else {
        scrollAnimation.style.opacity = '1'
    }

    if (document.documentElement.scrollTop > latestContentsHeight - 200) {
        navList.style.backgroundColor = '#F5A3A3'
        navList.style.boxShadow = `0px 4px 9px -3px rgb(183 91 91 / 67%)`
        showUp()
    } else if (document.documentElement.scrollTop > staffBlogContentHeight - 200) {
        navList.style.backgroundColor = '#F7BCBC'
        navList.style.boxShadow = `0px 4px 9px -3px rgb(183 91 91 / 67%)`
        showUp()
    } else if (document.documentElement.scrollTop > newsContentScrollHeight - 200) {
        navList.style.backgroundColor = '#FFEBC7'
        navList.style.boxShadow = `0px 4px 9px -3px #c7a261`
        showUp()
    } else if (document.documentElement.scrollTop > headerHeight - 200) {
        navList.style.backgroundColor = '#F7BCBC'
        navList.style.boxShadow = `0px 4px 9px -3px rgb(231 169 169 / 67%)`
        showUp()
    }
    else {
        navList.style.top = '-60px'
        languageBox.style.right = '70px';
        navLogo.style.top = '-100px'
        navBtnBox.style.top = '-100px'
    }

}



let languageTextHeight = getComputedStyle(languageListText).height

languageBtn.addEventListener('click', () => {
    if (!languageBtn.isClick) {
        languageList.style.maxHeight = languageTextHeight
        languageBtn.isClick = true
        return;
    }
    languageList.style.maxHeight = 0;

    languageBtn.isClick = false
})


document.body.addEventListener('click', function (event) {
    if (!languageBtn.isClick) {
        return;
    }
    if (event.target.className !== 'cover') {
        languageList.style.maxHeight = 0;
        languageBtn.isClick = false
    }
})

// 選擇語言
languageListItem.forEach(item => {
    item.onclick = () => {
        currentLanguage.innerHTML = item.innerHTML
    }
})


function showUp() {

    if (document.documentElement.clientWidth > 992) {
        navList.style.top = '65px'
        languageBox.style.right = '30px';
        navLogo.style.top = '25px'
        navBtnBox.style.top = '125px'

    }
}



let isMenuClick = false
menuBtn.addEventListener('click', throttle(() => {

    if (!isMenuClick) { // 這裡打開選單
        // 取消滾動
        document.body.style.overflow = 'hidden'
        // 重置點擊狀態
        isMenuClick = true

        midLine.style.right = '-100%';
        Object.assign(topLine.style, {
            top: `50%`,
            left: `0`,
            transform: `translate3d(0%, -50%, 0) rotate3d(0, 0, 1, 45deg)`

        })
        Object.assign(bottomLine.style, {
            bottom: `50%`,
            left: `0`,
            transform: `translate3d(0%, 50%, 0) rotate3d(0, 0, 1, -45deg)`

        })

        secondNav.style.transform = 'translate3d(0,0%,0)'



    } else {  // 這裡關閉選單

        // 開啟滾動
        document.body.style.overflow = 'auto'

        // 重置點擊狀態
        isMenuClick = false
        midLine.style.right = '0%';

        Object.assign(topLine.style, {
            top: `25%`,
            left: `0%`,
            transform: `none`
        })
        Object.assign(bottomLine.style, {
            bottom: '25%',
            left: `0%`,
            transform: `none`
        })
        secondNav.style.transform = 'translate3d(0,140%,0)'

    }

}, 200))



// support選單點擊事件
let textHeight = getComputedStyle(supportList).height
supportTitle.addEventListener('click', () => {
    if (!supportTitle.isClick) {
        supportDD.style.maxHeight = textHeight;
        supportTitle.isClick = true
        return;
    }
    supportDD.style.maxHeight = 0;
    supportTitle.isClick = false
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

// mobile選單的background color顏色
let mobileBtnColor = ''
// 是否設過mobile選單的background color
let isBtnColorSet = false

let loading = document.querySelector('.loading')
let loading2 = document.querySelector('.loading-2')


// 判斷是手機還是pc
let userDeviceIsMobile;
let isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/gi)
let isMobile = isIOS || navigator.userAgent.match(/Android|BlackBerry|Opera Mini|IEMobile/gi)
if (isMobile) {
    // 移動端
    userDeviceIsMobile = true

} else {
    // PC端
    userDeviceIsMobile = false
}


window.onload = async ()=>{

    setTimeout(()=>{
        loading.style.transform = loading2.style.transform = "scaleX(0)"
    },1500)



    // 新聞資料
    let newsArr = (await fetch('public/info/news.json')
    .then(response => response.json())).slice(0,5)
    // console.log(newsArr);

    // 獲取home頁面資料
    let homePageInfo = await fetch('public/info/homePageInfo.json').then((response) => response.json())
    // console.log(homePageInfo);


    // WHAT'S NEW 資料
    let newsBox = document.querySelector('.news-box ul')
    newsArr.forEach((item,index)=>{
        if(index==0){
            newsBox.innerHTML+=
            `
                <li>
                    <p class="date-new">
                        <span class="category">NEWS</span>
                        ${item.date}
                        <span class="newLogo">New!</span>
                    </p>
                    <p class="textContent">
                        ${item.text}
                    </p>
                </li>
            `
        }else{
            newsBox.innerHTML +=
                `
                <li>
                    <p class="date-new">
                        <span class="category">NEWS</span>
                        ${item.date}
                    </p>
                    <p class="textContent">
                        ${item.text}
                    </p>
                </li>
            `
        }
    })


    // FANCLUB NEWS 資料
    let FANCLUBNEWS = document.querySelector('.all-once .fanclub-news ul')
    homePageInfo.FANCLUBNEWS.forEach((item,index)=>{
        // console.log(FANCLUBNEWS.innerHTML);
        if(index == 0){
            FANCLUBNEWS.innerHTML +=
                `
            <li>
                <p class="date-new">
                    <span class="category">NEWS</span>
                    ${item.date}
                    <span class="newLogo">New!</span>
                </p>
                <p>
                    ${item.text}
                </p>
            </li>
        `
        }else{
            FANCLUBNEWS.innerHTML +=
                `
            <li>
                <p class="date-new">
                    <span class="category">NEWS</span>
                    ${item.date}
                </p>
                <p>
                    ${item.text}
                </p>
            </li>
        `
        }
        
    })
    // console.log(FANCLUBNEWS);


    // TOGETHER 資料
    let FANCLUBTOGETHER = document.querySelector('.all-once .latest-news ul')
    let temp = document.createDocumentFragment()
    homePageInfo.FANCLUBTOGETHER.forEach((item,index)=>{
        let li = document.createElement('li')
        li.innerHTML = 
        `
            <p class="date-new">
                <span class="category">MOVIE</span>
                ${item.date}
                <span class="newLogo">Best!</span>
            </p>
            <p>
                ${item.text}
            </p>
        `
        let picture = document.createElement('div')
        picture.classList.add('picture')
        picture.style.backgroundImage = `url(${item.path})`
        li.prepend(picture)

        temp.append(li)
    })
    FANCLUBTOGETHER.append(temp)
    temp = null



    // MOBILENEWS 資料
    let MOBILENEWS = document.querySelector('.japan-once .fanclub-news ul')
    homePageInfo.MOBILENEWS.forEach((item, index) => {
        // console.log(MOBILENEWS.innerHTML);
        if (index == 0) {
            MOBILENEWS.innerHTML +=
                `
            <li>
                <p class="date-new">
                    <span class="category">NEWS</span>
                    ${item.date}
                    <span class="newLogo">New!</span>
                </p>
                <p>
                    ${item.text}
                </p>
            </li>
        `
        } else {
            MOBILENEWS.innerHTML +=
                `
            <li>
                <p class="date-new">
                    <span class="category">NEWS</span>
                    ${item.date}
                </p>
                <p>
                    ${item.text}
                </p>
            </li>
        `
        }

    })
    // console.log(fanclubNews);


    // TOGETHER 資料
    let MOBILELATEST = document.querySelector('.japan-once .latest-news ul')

    homePageInfo.MOBILELATEST.forEach((item, index) => {
        if (index == 0) {
            MOBILELATEST.innerHTML +=
                `
            <li>
                <div class="picture"></div>
                <p class="date-new">
                    <span class="category">MOVIE</span>
                    ${item.date}
                    <span class="newLogo">New!</span>
                </p>
                <p>
                    ${item.text}
                </p>
            </li>
        `
        } else {
            MOBILELATEST.innerHTML +=
                `
            <li>
                <div class="picture"></div>
                <p class="date-new">
                    <span class="category">MOVIE</span>
                    ${item.date}
                </p>
                <p>
                    ${item.text}
                </p>
            </li>
        `
        }
        
    })








}




// 導航樣式
window.onscroll = () => {
    // console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop) {
        headNav.style.height = '50px';
        shareBtnMenu.style.height = '60px'
        if (document.documentElement.scrollTop > 600) {
            header.style.backgroundColor = '#fff';
            header.style.boxShadow = '0 0px 3px 0px #999'
            header.style.color = '#000';
            // languageBtn.style.borderColor = '#000'
            languageBtnAll.forEach(item=>{
                item.style.borderColor = '#000'
            })


            if (!isBtnColorSet){
                isBtnColorSet = true
                mobileBtnColor = '#ff5fa2'
                topLine.style.backgroundColor = midLine.style.backgroundColor = bottomLine.style.backgroundColor = '#ff5fa2'
            }


            shareBtn.forEach(item => {
                // item.style.color = '#000'
                // console.log(item.childNodes[1].childNodes[1]);
                // item.childNodes[1].style.color = '#000'
                item.style.color = '#000'
            })
            // shareBtn.style.color = '#000'

        } else {
            // isBtnColorSet = false
            if (isBtnColorSet) {
                isBtnColorSet = false
                mobileBtnColor = '#fff'
                topLine.style.backgroundColor = midLine.style.backgroundColor = bottomLine.style.backgroundColor = '#fff'
            }

            header.style.backgroundColor = '';
            header.style.color = '#fff';
            // languageBtn.style.borderColor = ''
            header.style.boxShadow = null

            languageBtnAll.forEach(item => {
                item.style.borderColor = 'transparent'
            })


            // topLine.style.backgroundColor = midLine.style.backgroundColor = bottomLine.style.backgroundColor = '#fff'

            shareBtn.forEach(item => {
                item.style.color = '#fff'
            })
            // shareBtn.style.color = '#fff'
        }
        return;
    }
    shareBtnMenu.style.height = '80px'
    headNav.style.height = '80px'
}

// release元素
let releaseItem = document.querySelectorAll('.releaseList li')
// console.log(releaseItem);

// 輪播圖列表
let carouselList = document.querySelector('.carouselBox ul')
// 輪播圖子元素
let carouselItem = document.querySelectorAll('.carouselBox ul li')
// console.log(carouselList, carouselItem);

// 上一頁下一頁
let prePic = document.querySelector('.prePic')
let nextPic = document.querySelector('.nextPic')

// 輪播圖激活點點
let selectList = document.querySelectorAll('.selectList span')

// 查看全文
let overText = document.querySelector('.overText p')
let overTextBox = document.querySelector('.overText')
let viewAllBtn = document.querySelector('.viewAll')
let viewAllActiveList = document.querySelectorAll('.viewAll i')
// console.log(viewAllActiveList);




// release hover效果
releaseItem.forEach((item, index) => {
    item.addEventListener('mouseenter', (e) => {
        // console.log(e.target);
        releaseItem.forEach(item => {
            item.style.opacity = '.5'
        })

        e.target.style.opacity = '1'
        item.addEventListener('mouseleave', (e) => {
            releaseItem.forEach(item => {
                item.style.opacity = '1'
            })
        })
    })
})



// 輪播圖邏輯(pc)
let previousPointer = 0;
let pointer = 0;
if (userDeviceIsMobile){
    nextPic.onclick = throttle(function () {
        change(++pointer, 80, 150)
    }, 500)
    prePic.onclick = throttle(function () {
        change(--pointer, 80, 150)
    }, 500)

    carouselList.addEventListener('mouseenter', () => {
        clearInterval(autoClick)
    })
    carouselList.addEventListener('mouseleave', () => {
        autoClick = setInterval(() => {
            change(++pointer, 38, 46)
        }, 3000)
    })
}else{
    



    nextPic.onclick = throttle(function () {
        change(++pointer, 38, 46)
    }, 500)
    prePic.onclick = throttle(function () {
        change(--pointer, 38, 46)
    }, 500)

    carouselList.addEventListener('mouseenter', () => {
        clearInterval(autoClick)
    })
    carouselList.addEventListener('mouseleave', () => {
        autoClick = setInterval(() => {
            change(++pointer, 38, 46)
        }, 3000)
    })
}



let autoClick = setInterval(() => {
    if (userDeviceIsMobile){
        change(++pointer, 80, 150)
    } else {
        change(++pointer, 38, 46)
    }
}, 3000)


function change(index, picWidth, startX) {
    clearInterval(autoClick)

    carouselList.style.transition = '.5s';
    carouselList.style.transform = `translate3d(${-(index * picWidth + startX)}vw,0,0)`

    if (index == -1) {
        setTimeout(() => {
            carouselList.style.transition = 'none';
            carouselList.style.transform = `translate3d(${-(index * picWidth + startX)}vw,0,0)`

        }, 500)
        index = pointer = 5
    }
    if (index == 6) {
        setTimeout(() => {
            carouselList.style.transition = 'none';
            carouselList.style.transform = `translate3d(${-(index * picWidth + startX)}vw,0,0)`

        }, 500)
        index = pointer = 0
    }
    // console.log(index);
    selectList[index].classList.add('active')
    selectList[previousPointer].classList.remove('active')
    previousPointer = pointer

    autoClick = setInterval(() => {
        change(++pointer, picWidth, startX)
    }, 3000)
}
selectList.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        pointer = index
        if(userDeviceIsMobile){
            change(index, 80, 150)
        }else{
            change(index, 38, 46)
        }
        clearInterval(autoClick)
        autoClick = setInterval(() => {
            nextPic.click()
        }, 3000)
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

// 查看全文
let isViewAllBtnClick = false;
viewAllBtn.addEventListener('click', (event) => {
    if (!isViewAllBtnClick) {
        let actualHeight = getComputedStyle(overText).height
        // console.log(actualHeight);
        overTextBox.style.maxHeight = actualHeight
        viewAllBtn.innerHTML =
            `
            <i class="fa-solid fa-plus"></i>
            <i class="fa-solid fa-minus active"></i>
            close
        `
        isViewAllBtnClick = true;
    } else {
        overTextBox.style.maxHeight = 0;
        viewAllBtn.innerHTML =
            `
            <i class="fa-solid fa-plus active"></i>
            <i class="fa-solid fa-minus"></i>
            view all
        `
        isViewAllBtnClick = false;
    }
})






let isMenuClick = false
menuBtnMobile.addEventListener('click', throttle(() => {
    // console.log(isMenuClick);
    if (!isMenuClick) { // 這裡打開選單
        // console.log('jinlaile');
        // 取消滾動
        document.body.style.overflow = 'hidden'
        // 重置點擊狀態
        isMenuClick = true

        menuBtnMobile.style.transform = `rotate3d(0,0,1,135deg)`
        midLine.style.display = 'none';
        Object.assign(topLine.style, {
            top: `50%`,
            left: `50%`,
            transform: `translate3d(-50%, -50%, 0) rotate3d(0, 0, 1, 90deg)`,
            backgroundColor: '#fff'

        })
        Object.assign(bottomLine.style, {
            bottom: `50%`,
            left: `50%`,
            transform: `translate3d(-50%, 50%, 0)`,
            backgroundColor: '#fff'
        })
       


        let showNav = document.querySelector('.headNav-mobile .showNav')
        showNav.style.display = 'block'


    } else {  // 這裡關閉選單

        // 開啟滾動
        document.body.style.overflow = 'auto'

        // 重置點擊狀態
        isMenuClick = false

        menuBtnMobile.style.transform = `none`
        midLine.style.display = 'block';
        Object.assign(topLine.style, {
            top: `15%`,
            left: `0%`,
            transform: `none`,
            backgroundColor: mobileBtnColor
        })
        Object.assign(bottomLine.style, {
            bottom: '15%',
            left: `0%`,
            transform: `none`,
            backgroundColor: mobileBtnColor
        })

        let showNav = document.querySelector('.headNav-mobile .showNav')
        showNav.classList.add('leave')
        setTimeout(() => {
            showNav.style.display = 'none'
            showNav.classList.remove('leave')
        }, 300)

    }

}, 300))



// 內容列表
let discographyList = document.querySelector('.discographyList')
// 內容子元素
let discographyItems = document.querySelectorAll('.discographyList li')

// 更新中的動畫圖標
let loading = document.querySelector('.loading')
// 更新完成顯示文本
let loadingAllText = document.querySelector('.loadingAll')
// 獲取分類

let selectBtnList = document.querySelector('.selectBtnList')

// 底部高度
let footer = document.querySelector('footer')

// 完整數據
let newsArr = null
// 內容文本
let newsInfo = ``
// 當前加載的index
let newsMark = 0
// 是否正在加載
let isLoading = false
// 是否加載完成
let loadingAll = false
// 需要更新的數據
let updateArr = null
// 目前點擊的分類
let preClick = 0;




let discographyInfo = ``
let discographyMark = 0
window.onload = async () => {
    let discographyData = await fetch('../public/info/discographyInfo.json').then(response => response.json())

    updateArr = discographyData
    showSchedule(discographyData)

    // 導航樣式 + 更新數據
    window.onscroll = () => {


        if (document.documentElement.scrollTop) {
            headNav.style.height = '50px';
            shareBtnMenu.style.height = '60px'
        } else {
            shareBtnMenu.style.height = '80px'
            headNav.style.height = '80px'
        }


        // 獲取loading的位置
        let footerHeigth = footer.offsetTop
        // 總的滾動距離
        let finalScrollTop = document.documentElement.scrollTop + innerHeight
        // 更新數據
        if (finalScrollTop > footerHeigth) {

            if (isLoading || loadingAll) return;

            loading.classList.add('active')

            // 禁止更新數據
            isLoading = true

            updateSchedule(updateArr)



        }
    }


    // 獲取分類
    let selectArr = discographyData.map(item => item.category).filter((item, index, self) => {
        return self.indexOf(item) == index
    })

    let tempStr = `<li class="active">
                ALL
            </li>`
    selectArr.forEach((item) => {
        tempStr +=
            `
            <li>
                ${item}
            </li>
        `
    })
    selectBtnList.innerHTML = tempStr

    let category = document.querySelectorAll('.selectBtnList li')

    category.forEach((item, index) => {
        item.addEventListener('click', () => {
            // 取消上一個激活狀態
            category[preClick].classList.remove('active')
            // 添加激活狀態
            item.classList.add('active')
            // 更新分類index
            preClick = index

            // 隱藏更新完成文本
            loadingAllText.classList = 'loadingAll'

            // 清空內容
            discographyList.innerHTML = ``

            if (index == 0) {

                updateArr = discographyData

                // 清除標記
                newsMark = 0
                isLoading = false
                // 顯示十條數據
                showSchedule(updateArr)
            } else {
                // 過濾搜索分類內容
                updateArr = discographyData.filter(news => {
                    return news.category === item.textContent.trim()
                })

                // console.log(updateArr);
                // 清空內容存儲
                newsInfo = ``
                // 清除標記
                newsMark = 0

                isLoading = false

                // 顯示十條數據
                showSchedule(updateArr)

            }



        })
    })

}

// 初始化
function showSchedule(dataArr) {
    let tempMark = newsMark

    let frag = document.createDocumentFragment()
    for (newsMark; newsMark < (tempMark + 9 > dataArr.length ? dataArr.length : tempMark + 9); newsMark++) {

        let li = document.createElement('li')
        li.classList.add('new-show-up')
        li.innerHTML =
            `
            <div class="text">
                <p class="category">
                    <span>${dataArr[newsMark].category}</span>
                </p>
                <p class="title">
                    ${dataArr[newsMark].title}
                </p>
                <p class="date">
                    ${dataArr[newsMark].date}
                </p>
            </div>
        `
        li.style.backgroundImage = `url(${dataArr[newsMark].src})`
        frag.appendChild(li)
    }
    discographyList.appendChild(frag)
    frag = null;

    if (dataArr.length <= 9) {
        loadingAllText.classList.add('active')
        loading.classList.remove('active')

        isLoading = false
        loadingAll = true
    } else {

        loadingAll = false
    }

}

// 更新數據
function updateSchedule(dataArr) {

    loading.classList.add('active')

    let tempMark = newsMark
    discographyItems.forEach(item=>{
        item.classList.remove('new-show-up')
    })

    let frag = document.createDocumentFragment()
    for (newsMark; newsMark < (tempMark + 9 > dataArr.length ? dataArr.length : tempMark + 9); newsMark++) {
        let li = document.createElement('li')
        li.classList.add('new-show-up')
        li.innerHTML =
            `
            <div class="text">
                <p class="category">
                    <span>${dataArr[newsMark].category}</span>
                </p>
                <p class="title">
                    ${dataArr[newsMark].title}
                </p>
                <p class="date">
                    ${dataArr[newsMark].date}
                </p>
            </div>
        `
        li.style.backgroundImage = `url(${dataArr[newsMark].src})`
        frag.appendChild(li)
    }
    setTimeout(() => {
        discographyList.appendChild(frag)
        frag = null;
        isLoading = false // 可再更新數據
        if (newsMark == dataArr.length) {
            loadingAll = true
            loadingAllText.classList.add('active')
            loading.classList.remove('active')
        }
    }, 1000)
}
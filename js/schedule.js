
// 內容區域
let container = document.querySelector('.container')

// 更新中的動畫圖標
let loading = document.querySelector('.loading')
// 更新完成顯示文本
let loadingAllText = document.querySelector('.loadingAll')

let footer = document.querySelector('footer')

// 獲取分類
let selectBtnList = document.querySelector('.selectBtnList')

// 內容區域
let newsList = document.querySelector('.newsList')

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


window.onload = async () => {

    // 获取资料
    newsArr = await fetch('../public/info/scheduleInfo.json').then(response => response.json())
    // console.log(newsArr);
    updateArr = newsArr

    // 顯示十條數據
    showSchedule(newsArr)





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
        // let loadingHeight = loading.offsetTop
        let innerHeight = window.innerHeight

        let footerHeigth = footer.offsetTop
        // 總的滾動距離
        let finalScrollTop = document.documentElement.scrollTop + innerHeight
        // 更新數據
        if (finalScrollTop > footerHeigth) {
            if (isLoading || loadingAll) return;
            
            // 禁止再次更新數據
            isLoading = true
            loading.classList.add('active')
            updateSchedule(updateArr)
        }
    }



    // 獲取分類
    let selectArr = newsArr.map(item=> item.category).filter((item,index,self)=>{
        return self.indexOf(item) == index
    })

    let tempStr = `<li class="active">
                ALL
            </li>`
    selectArr.forEach((item)=>{
        tempStr+=
        `
            <li>
                ${item}
            </li>
        `
    })
    selectBtnList.innerHTML = tempStr

    let category = document.querySelectorAll('.selectBtnList li')

    category.forEach((item,index)=>{
        item.addEventListener('click', ()=>{
            // 取消上一個激活狀態
            category[preClick].classList.remove('active')
            // 添加激活狀態
            item.classList.add('active')
            // 更新分類index
            preClick = index

            // 隱藏更新完成文本
            loadingAllText.classList = 'loadingAll'

            if(index == 0){

                updateArr = newsArr
                // 清空內容存儲
                newsInfo = ``
                // 清除標記
                newsMark = 0
                isLoading = false
                // 顯示十條數據
                showSchedule(updateArr)
            }else{
                // 過濾搜索分類內容
                updateArr = newsArr.filter(news=>{
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
function showSchedule(dataArr){
    let tempMark = newsMark
    for (newsMark; newsMark < (tempMark + 10 > dataArr.length ? dataArr.length : tempMark + 10); newsMark++) {

        newsInfo +=
            `
            <li class="new-show-up">
                <p class="date ">
                    <span class="category">${dataArr[newsMark].category}</span>
                    ${dataArr[newsMark].date}
                </p>
                <p class="tit">
                    ${dataArr[newsMark].text}
                </p>
            </li>
        `
    }
    newsList.innerHTML = newsInfo

    if (dataArr.length<=10){
        loadingAllText.classList.add('active')
        loading.classList.remove('active')

        isLoading = false
        loadingAll = true
    }else{
        loadingAll = false
    }

}

// 更新數據
function updateSchedule(dataArr){

    loading.classList.add('active')

    let newsList = document.querySelector('.newsList')
    let newsListItems = document.querySelectorAll('.newsList li')

    newsListItems.forEach(item=>{
        item.classList.remove('new-show-up')
        newsInfo = newsList.innerHTML
    })

    let tempMark = newsMark

    for (newsMark; newsMark < (tempMark + 10 > dataArr.length ? dataArr.length : tempMark + 10); newsMark++) {
        newsInfo +=
            `
                <li class="new-show-up">
                <p class="date ">
                    <span class="category">${dataArr[newsMark].category}</span>
                    ${dataArr[newsMark].date}
                </p>
                <p class="tit">
                    ${dataArr[newsMark].text}
                </p>
            </li>
            `
    }
    setTimeout(() => {
        newsList.innerHTML = newsInfo
        isLoading = false // 可再更新數據
        if (newsMark == dataArr.length) {
            // 加載完成
            loading.classList.remove('active')
            loadingAll = true
            loadingAllText.classList.add('active')
        }
    }, 1000)
}

// 內容區域
let container = document.querySelector('.container')
// 更新中的動畫圖標
let loading = document.querySelector('.loading')
// 更新完成顯示文本
let loadingAllText = document.querySelector('.loadingAll')


let footer = document.querySelector('footer')

let newsArr = null
let newsInfo = ``
let newsMark = 0
window.onload = async () => {

    // 获取资料
    newsArr = await fetch('../public/info/News.json')
    .then(response => response.json())
    // console.log(newsArr);


    let tempMark = newsMark
    for (newsMark; newsMark < tempMark + 10; newsMark++) {
        if (newsMark == 0) {
            newsInfo +=
                `
            <li class="new-show-up">
                <p class="date-new">
                    ${newsArr[newsMark].date}
                    <span class="newLogo">New!</span>
                </p>
                <p class="textContent">
                    ${newsArr[newsMark].text}
                </p>
            </li>
        `
        } else {
            newsInfo +=
                `
                <li class="new-show-up">
                    <p class="date-new">
                        ${newsArr[newsMark].date}
                    </p>
                    <p class="textContent">
                        ${newsArr[newsMark].text}
                    </p>
                </li>
            `
        }
    }

    let article = document.createElement('article')
    article.innerHTML =
        `
        <ul class="newsInfoList">
            ${newsInfo}
        </ul>
    `
    container.appendChild(article)



    let isLoading = false
    let loadingAll = false

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

            // 禁止更新數據
            isLoading = true

            let newsInfoList = document.querySelector('.newsInfoList')
            let newsInfoItems = document.querySelectorAll('.newsInfoList li')

            newsInfoItems.forEach(item=>{
                item.classList.remove('new-show-up')
                newsInfo = newsInfoList.innerHTML
            })

            let tempMark = newsMark

            for (newsMark; newsMark < (tempMark + 10 > newsArr.length ? newsArr.length : tempMark + 10); newsMark++) {
                newsInfo +=
                    `
                <li class="new-show-up">
                    <p class="date-new">
                        ${newsArr[newsMark].date}
                    </p>
                    <p class="textContent">
                        ${newsArr[newsMark].text}
                    </p>
                </li>
            `
            }
            setTimeout(() => {
                newsInfoList.innerHTML = newsInfo
                isLoading = false // 可再更新數據
                if (newsMark == newsArr.length) {
                    loadingAll = true
                    // console.log('加載完了');
                    loadingAllText.classList.add('active')
                    loading.remove()

                }
            }, 1000)
        }
    }

}

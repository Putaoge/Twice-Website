
let specialList = document.querySelector('.special-list')
// 更新中的動畫圖標
let loading = document.querySelector('.loading')
// 更新完成顯示文本
let loadingAllText = document.querySelector('.loadingAll')

// 底部高度
let footer = document.querySelector('footer')

let specialInfo = ``
let specialMark = 0
window.onload = async ()=>{
    let specialData = await fetch('../public/info/specialPageInfo.json').then(response=>response.json())
    // console.log(specialData);


    let tempMark = specialMark
    for (specialMark; specialMark < tempMark + 12; specialMark++) {
        specialInfo +=
                `
                <li>
                    <img src=${specialData[specialMark].src} alt="${specialData[specialMark].title}">
                    <p class="textContent">
                        ${specialData[specialMark].title}
                    </p>
                </li>
            `
    }

    specialList.innerHTML = specialInfo



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


        // 1. 獲取所有li
        let contentItems = document.querySelectorAll('.special-list li')

        // 更新數據
        if (finalScrollTop > footerHeigth) {
            if (isLoading || loadingAll) return;

            contentItems.forEach(item=>{
                // console.log(item.classList);
                item.classList.remove('new-show-up')
                specialInfo = specialList.innerHTML
            })


            // 禁止更新數據
            isLoading = true

            let tempMark = specialMark

            for (specialMark; specialMark < (tempMark + 12 > specialData.length ? specialData.length : tempMark + 12); specialMark++) {
                specialInfo +=
                    `
                <li class="new-show-up">
                    <img src=${specialData[specialMark].src} alt="${specialData[specialMark].title}">
                    <p class="textContent">
                        ${specialData[specialMark].title}
                    </p>
                </li>
            `
            }
            setTimeout(() => {
                specialList.innerHTML = specialInfo
                isLoading = false // 可再更新數據
                if (specialMark == specialData.length) {
                    loadingAll = true
                    // console.log('加載完了');
                    loadingAllText.classList.add('active')
                    loading.remove()
                }
            }, 1000)
        }
    }

}
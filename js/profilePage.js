
let memberInfo = null
window.onload = async () => {
    let memberItem = document.querySelectorAll('.member-list li')
    // 獲取成員信息表
    memberInfo = await fetch('../public/info/profileInfo.json')
        .then(response => response.json())

    memberItem.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            // console.log(event.target);
            // console.log(memberInfo[index]);
            showMember(index)
        })
    })

}


// 導航樣式
window.onscroll = () => {

    if (document.documentElement.scrollTop) {
        headNav.style.height = '50px';
        shareBtnMenu.style.height = '60px'
        if (document.documentElement.scrollTop > 50) {
            header.style.backgroundColor = '#fff';
            header.style.boxShadow = '0 0px 3px 0px #999'
            header.style.color = '#000';

            shareBtn.forEach(item => {
                item.style.color = '#000'
            })


        }
        return;
    }
    shareBtnMenu.style.height = '80px'
    headNav.style.height = '80px'
}



function showMember(index) {
    document.body.style.overflow = 'hidden'
    if (index === -1) {
        index = 8
    }
    if (index === 9) {
        index = 0
    }

    let memberDisplay = document.createElement('div')
    memberDisplay.classList.add('member-display')
    memberDisplay.innerHTML =
        `
        <div class="container">
            <div class="textContent">
            
                <p class="name">
                    ${memberInfo[index].name}
                </p>
                <p class="kana">
                    ${memberInfo[index].kana}
                </p>
                <p class="detail">
                    生年月日：${memberInfo[index].detail.birthday}
                    <br>
                    血液型：${memberInfo[index].detail.bloodType}
                </p>
            </div>
            <div class="cover"></div>
            <div class="btn prePic"></div>
            <div class="btn nextPic"></div>
            <div class="btn exit"></div>
        </div>

    `
    document.body.prepend(memberDisplay)

    // 獲取容器(背景圖片用)
    let container = document.querySelector('.container')
    // 切換前後張
    let prePic = document.querySelector('.prePic')
    let nextPic = document.querySelector('.nextPic')

    // 退出鍵
    let exit = document.querySelector('.exit')

    // cover層
    let cover = document.querySelector('.cover')


    // 設置圖片
    container.style.backgroundImage = `url(${memberInfo[index].path})`

    prePic.addEventListener('click', () => {
        memberDisplay.remove()
        showMember(--index)
    })
    nextPic.addEventListener('click', () => {
        memberDisplay.remove()
        showMember(++index)
    })
    exit.addEventListener('click', () => {
        memberDisplay.classList.add('leave')
        document.body.style.overflow = `auto`;
        setTimeout(() => {
            memberDisplay.remove()
        }, 500)
    })
    cover.addEventListener('click', () => {
        exit.click()
    })



}
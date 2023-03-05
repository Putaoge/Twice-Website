let isMenuClick = false
menuBtnMobile.addEventListener('click', throttle(() => {
    // console.log(isMenuClick);
    if (!isMenuClick) { // 這裡打開選單
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
            backgroundColor: '#ff5fa2'
        })
        Object.assign(bottomLine.style, {
            bottom: '15%',
            left: `0%`,
            transform: `none`,
            backgroundColor: '#ff5fa2'
        })


        let showNav = document.querySelector('.headNav-mobile .showNav')
        showNav.classList.add('leave')
        setTimeout(() => {
            showNav.style.display = 'none'
            showNav.classList.remove('leave')
        }, 300)

    }

}, 300))
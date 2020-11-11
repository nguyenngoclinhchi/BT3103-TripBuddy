<template>
    <div id="galaxy" class="window u-pr">
        <div class="window--inner u-fw">
            <div class="window--container u-fw u-pr">
                <ul class="window--stars u-fw u-pr">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div class="window--sun"></div>
                <div class="window--planet1"></div>
                <div class="window--planet2"></div>
                <div class="window--planet3"></div>
                <div class="window--ring"></div>
                <ul class="window--shootingstars u-fw">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
    body {
        background-color: #f2f2f2;
        display: flex;
        width: 100vw;
        height: 100vh;
    }
    .u-fw {
        width: 100%;
        height: 100%;
    }
    .u-pr {
        position: relative;
    }
    .window {
        width: 336px;
        height: 336px;
        margin: auto;
        border-radius: 50%;
        border: 12px solid #fff;
        box-shadow: -2px 15px 54px 4px rgba(255, 100, 183, 0.7);
        background: rgba(11, 16, 31, 1);
        background: linear-gradient(to bottom, rgba(11, 16, 31, 1) 8%, rgba(48, 30, 55, 1) 22%, rgba(255, 108, 189, 1) 100%);
        overflow: hidden;
    }
    .window--inner {
        position: absolute;
        top: 0;
        left: 0;
        animation: movegalaxy 10s ease infinite;
    }
    .window--stars li {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        background-color: white;
    }
    .window--stars li:nth-child(1) {
        opacity: 0.73;
        transform: translate(80px, 21px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(2) {
        opacity: 0.63;
        transform: translate(-114px, -145px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(3) {
        opacity: 0.81;
        transform: translate(163px, -149px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(4) {
        opacity: 0.1;
        transform: translate(106px, 129px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(5) {
        opacity: 0.22;
        transform: translate(104px, 114px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(6) {
        opacity: 0.43;
        transform: translate(159px, 99px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(7) {
        opacity: 0.65;
        transform: translate(-22px, -141px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(8) {
        opacity: 0.72;
        transform: translate(126px, -151px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(9) {
        opacity: 0.28;
        transform: translate(-62px, -136px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(10) {
        opacity: 0.64;
        transform: translate(-25px, 95px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(11) {
        opacity: 0.71;
        transform: translate(-145px, 75px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(12) {
        opacity: 0.41;
        transform: translate(-44px, -70px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(13) {
        opacity: 0.66;
        transform: translate(129px, -96px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(14) {
        opacity: 0.51;
        transform: translate(-1px, 103px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(15) {
        opacity: 0.97;
        transform: translate(65px, 152px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(16) {
        opacity: 0.14;
        transform: translate(118px, -82px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(17) {
        opacity: 0.66;
        transform: translate(83px, -37px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(18) {
        opacity: 0.68;
        transform: translate(-154px, -146px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(19) {
        opacity: 0.63;
        transform: translate(-165px, -148px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(20) {
        opacity: 0.7;
        transform: translate(67px, -120px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(21) {
        opacity: 0.47;
        transform: translate(-110px, 96px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(22) {
        opacity: 0.11;
        transform: translate(-82px, 128px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(23) {
        opacity: 0.23;
        transform: translate(-155px, 18px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(24) {
        opacity: 0.31;
        transform: translate(-81px, -63px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(25) {
        opacity: 0.19;
        transform: translate(49px, 41px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(26) {
        opacity: 0.95;
        transform: translate(13px, -128px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(27) {
        opacity: 0.13;
        transform: translate(-38px, 126px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(28) {
        opacity: 0.05;
        transform: translate(103px, 93px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(29) {
        opacity: 0.33;
        transform: translate(142px, -162px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(30) {
        opacity: 0.09;
        transform: translate(10px, -122px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(31) {
        opacity: 0.29;
        transform: translate(-122px, 33px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(32) {
        opacity: 0.6;
        transform: translate(16px, 23px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(33) {
        opacity: 0.93;
        transform: translate(-83px, 65px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(34) {
        opacity: 0.19;
        transform: translate(38px, -68px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(35) {
        opacity: 0.2;
        transform: translate(92px, -98px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(36) {
        opacity: 0.6;
        transform: translate(-142px, -41px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(37) {
        opacity: 0.86;
        transform: translate(-36px, -55px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(38) {
        opacity: 0.8;
        transform: translate(-50px, 137px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(39) {
        opacity: 0.89;
        transform: translate(-87px, 36px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(40) {
        opacity: 0.93;
        transform: translate(-19px, 91px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(41) {
        opacity: 0.65;
        transform: translate(-64px, -100px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(42) {
        opacity: 0.6;
        transform: translate(100px, 151px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(43) {
        opacity: 0.79;
        transform: translate(-62px, 93px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(44) {
        opacity: 0.7;
        transform: translate(-87px, 91px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(45) {
        opacity: 0.62;
        transform: translate(68px, -93px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(46) {
        opacity: 0.36;
        transform: translate(41px, 154px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(47) {
        opacity: 0.16;
        transform: translate(-18px, 164px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(48) {
        opacity: 0.92;
        transform: translate(-46px, -55px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(49) {
        opacity: 0.93;
        transform: translate(-91px, -61px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(50) {
        opacity: 0.2;
        transform: translate(-40px, 86px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(51) {
        opacity: 0.6;
        transform: translate(-161px, 97px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(52) {
        opacity: 0.21;
        transform: translate(-126px, 25px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(53) {
        opacity: 0.29;
        transform: translate(-67px, 49px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(54) {
        opacity: 0.42;
        transform: translate(107px, 160px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(55) {
        opacity: 0.91;
        transform: translate(11px, 77px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(56) {
        opacity: 1;
        transform: translate(-90px, -118px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(57) {
        opacity: 0.94;
        transform: translate(44px, 110px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(58) {
        opacity: 0.53;
        transform: translate(-79px, 109px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(59) {
        opacity: 0.68;
        transform: translate(87px, -82px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(60) {
        opacity: 0.06;
        transform: translate(-72px, -98px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(61) {
        opacity: 0.65;
        transform: translate(93px, 85px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(62) {
        opacity: 0.99;
        transform: translate(55px, 90px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(63) {
        opacity: 1;
        transform: translate(108px, 94px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(64) {
        opacity: 0.31;
        transform: translate(118px, -23px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(65) {
        opacity: 0.55;
        transform: translate(-103px, -132px);
        width: 4px;
        height: 4px;
    }
    .window--stars li:nth-child(66) {
        opacity: 0.63;
        transform: translate(163px, -84px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(67) {
        opacity: 0.2;
        transform: translate(-56px, -121px);
        width: 1px;
        height: 1px;
    }
    .window--stars li:nth-child(68) {
        opacity: 0.52;
        transform: translate(58px, -78px);
        width: 2px;
        height: 2px;
    }
    .window--stars li:nth-child(69) {
        opacity: 0.17;
        transform: translate(144px, 94px);
        width: 3px;
        height: 3px;
    }
    .window--stars li:nth-child(70) {
        opacity: 0.27;
        transform: translate(114px, 54px);
        width: 2px;
        height: 2px;
    }
    .window--sun {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-55%, -15%);
        width: 168px;
        height: 168px;
        border-radius: 50%;
        background-color: #f1f1cb;
        box-shadow: 0 0 0 17px rgba(241, 241, 203, .20), 0 0 0 34px rgba(241, 241, 203, .20), 0 0 0 50px rgba(241, 241, 203, .20), 0 0 0 67px rgba(241, 241, 203, .20);
    }
    .window--planet1 {
        width: 50px;
        height: 50px;
        top: 0;
        right: 0;
        transform: translate(-100.8px, 42px);
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(115deg, rgba(80, 148, 82, 1) 0%, rgba(33, 74, 100, 1) 51%, rgba(41, 22, 53, .8) 100%);
    }
    .window--planet2 {
        width: 92px;
        height: 92px;
        top: 0;
        right: 0;
        transform: translate(8px, 118px);
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(204, 199, 66, 1) 0%, rgba(223, 23, 56, 1) 51%, rgba(154, 49, 121, 1) 100%);
    }
    .window--planet3 {
        width: 118px;
        height: 118px;
        top: 0;
        right: 0;
        transform: translate(-114.24px, 201.6px);
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(165deg, rgba(229, 78, 164, 1) 0%, rgba(28, 5, 21, 1) 80%, rgba(28, 5, 21, 1) 100%);
    }
    .window--ring {
        width: 151px;
        height: 151px;
        top: 0;
        right: 0;
        transform: translate(-97.44px, 171px) rotateX(-105deg);
        position: absolute;
        border-radius: 50%;
        border-width: 13.44px 0 0 0;
        opacity: 0.85;
        border-color: pink;
        border-style: solid;
    }
    .window--shootingstars {
        position: absolute;
        top: 0;
        left: 0;
    }
    .window--shootingstars li {
        width: 84px;
        height: 2px;
        border-radius: 50%;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        background: red linear-gradient(-45deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 1) 67%);
    }
    .window--shootingstars li:nth-child(1) {
        transform: rotate(-39deg) translate(-140px, -40px);
        opacity: 0.4;
    }
    .window--shootingstars li:nth-child(2) {
        transform: rotate(-39deg) translate(-220px, 8px);
    }
    .window--shootingstars li:nth-child(3) {
        transform: rotate(-39deg) translate(-70px, 100px);
        opacity: 0.3;
    }
    @keyframes movegalaxy {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(3%, 4%);
        }
        75% {
            transform: translate(2%, 1%);
        }
        100% {
            transform: translate(0%, 0%);
        }
    }
</style>
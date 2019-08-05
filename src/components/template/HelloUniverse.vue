<template>
  <div id="universe-body">
    <div class="stars"></div>      
    <div class="twinkling"></div>
    <div id="solarSystem" class="planetScaleIn">
      <div id="flash"></div>

      <div class="shell" id="layer8">
        <div class="in">
          <div class="planet medium" id="uranus"></div>
        </div>
      </div>
      <div class="shell" id="layer7">
        <div class="in">
          <div class="planet medium" id="neptune"></div>
        </div>
      </div>
      <div class="shell" id="layer6">
        <div class="in">
          <div class="planet large" id="saturn"></div>
        </div>
      </div>
      <div class="shell" id="layer5">
        <div class="in">
          <div class="planet large" id="jupiter"></div>
        </div>
      </div>
      <div class="shell" id="layer4">
        <div class="in">
          <div class="planet small basic" id="mars"></div>
        </div>
      </div>
      <div class="shell" id="layer3">
        <div class="in">
          <div class="planet small" id="earth"></div>
        </div>
      </div>
      <div class="shell" id="layer2">
        <div class="in">
          <div class="planet small basic" id="venus"></div>
        </div>
      </div>
      <div class="shell" id="layer1">
        <div class="in">
          <div class="planet small basic" id="mercury"></div>
        </div>
      </div>
      <div class="sun sunStyle"></div>

      <div id="blackHole" class="sun blackHole"></div>
      <div id="boom"></div>

      <div id="starBack">
        <div class="outerShell shellOut">
          <div class="outerShell shellOut">
            <div class="outerShell shellOut">
              <div class="outerShell shellOut">
                <div class="outerShell shellOut">
                  <div class="outerShell shellOut">
                    <div class="outerShell shellOut">
                      <div class="outerShell shellOut">
                        <div class="outerShell shellOut">
                          <div class="outerShell shellOut">
                            <div class="outerShell shellOut">
                              <div class="outerShell shellOut">
                                <div class="outerShell shellOut">
                                  <div class="outerShell shellOut">
                                    <div class="outerShell shellOut">
                                      <div class="outerShell shellOut">
                                        <div class="outerShell shellOut">
                                          <div class="outerShell shellOut"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloUniverse',
  methods : {
    setHelloUniverse() {
      setTimeout(() => {
          this.$store.state.isHelloUniverse = false
        }, 3000);
    }
  },
  mounted(){
    var sun = document.querySelector('.sun')
    var bkrd = document.querySelector('.outerShell')
    var solarSystem = document.querySelector('#solarSystem')
    var blackHole = document.querySelector('#blackHole')
    var setHelloUniverse = this.setHelloUniverse

    sun.addEventListener('click', function() {
      sun.className = "blackHole"
      bkrd.className = "implode"
      solarSystem.className = "planetScaleOut"
      blackHole.style.display="block";
      setHelloUniverse()
    });
  }
}
</script>
<style>
#universe-body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #181818;
  overflow: hidden;
  position: relative;
}
#solarSystem {
  z-index:999;
  width:100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#boom {
  position: absolute;
  border-radius: 50%;
  animation: boom 2s ease-out forwards;
  z-index: -5;
}

@keyframes boom {
  0% {
    height: 0;
    width: 0;
    background: rgba(256,256,256, 0.3);
  }
  100% {
    height: 100%;
    width: 100%;
    background: rgba(256,256,256, 0);
  }
}

.planetScaleIn {
  animation: scaleIn 4s ease-in-out forwards;
}

.planetScaleOut {
  animation: scaleOut 3s ease-in-out forwards;
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes scaleOut {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

.shell {
  position: absolute;
}

.in {
  width: 100%;
  height: 100%;
}

#layer1 {
  width: 210px;
  height: 210px;
  transform: rotate(20deg);
}
#layer1 .in {
  animation: orbit 10s linear infinite;
}

#layer2 {
  width: 260px;
  height: 260px;
  transform: rotate(90deg);
}
#layer2 .in {
  animation: orbit 14s linear infinite;
}

#layer3 {
  width: 325px;
  height: 325px;
  transform: rotate(220deg);
}
#layer3 .in {
  animation: orbit 18s linear infinite;
}

#layer4 {
  width: 390px;
  height: 390px;
  transform: rotate(290deg);
}
#layer4 .in {
  animation: orbit 22s linear infinite;
}

#layer5 {
  width: 520px;
  height: 520px;
  transform: rotate(150deg);
}
#layer5 .in {
  animation: orbit 26s linear infinite;
}

#layer6 {
  width: 680px;
  height: 680px;
}
#layer6 .in {
  animation: orbit 30s linear infinite;
}

#layer7 {
  width: 800px;
  height: 800px;
  transform: rotate(270deg);
}
#layer7 .in {
  animation: orbit 34s linear infinite;
}

#layer8 {
  width: 910px;
  height: 910px;
  transform: rotate(100deg);
}
#layer8 .in {
  animation: orbit 38s linear infinite;
}

.sun {
  transform: scale(0.8);
  width: 160px;
  height: 160px;
  border-radius: 50%;
  position: absolute;
}
.sun:hover {
  animation: blackHole 1s linear infinite;
  animation-direction: reverse;
  background: rgba(0,0,0, 1);
  box-shadow: 6px 0 0 10px rgba(256,256,256,  0.2), -6px 0 0 20px rgba(256,256,256,  0.2),
    0 6px 0 30px rgba(256,256,256, 0.2), 0 -6px 0 35px rgba(256,256,256, 0.1);
}

.sunStyle {
  background-color: #f7cf20;
  animation: coronaFlare 1s ease-in-out infinite;
  animation-direction: alternate;
  box-shadow: 3px 0 0 10px rgba(247,207,32, 0.2), -3px 0 0 20px rgba(247,207,32, 0.2),
    0 3px 0 30px rgba(247,207,32, 0.2), 0 -3px 0 35px rgba(247,207,32, 0.1);
}

.blackHole {
  z-index: 5;
  display: none;
  animation: blackHole 1s linear infinite;
  animation-direction: reverse;
  background: rgba(0,0,0, 1);
  box-shadow: 6px 0 0 10px rgba(256,256,256, 0.2), -6px 0 0 20px rgba(256,256,256,  0.2),
    0 6px 0 30px rgba(256,256,256, 0.2), 0 -6px 0 35px rgba(256,256,256, 0.1);
}

@keyframes blackHole {
  0% {
    transform: rotate(0deg) scale(0.8);
    box-shadow: 6px 0 0 20px rgba(256,256,256, 0.1), 4px 4px 0 20px rgba(256,256,256, 0.1),
      -6px 0 0 35px rgba(256,256,256, 0.1), -4px 4px 0 35px rgba(256,256,256, 0.1),
      0 6px 0 50px rgba(256,256,256, 0.1), -4px -4px 0 50px rgba(256,256,256, 0.1),
      0 -6px 0 65px rgba(256,256,256, 0.1), 4px -4px 0 65px rgba(256,256,256, 0.1);
  }
  100% {
    transform: rotate(360deg) scale(0.8);
    box-shadow: 6px 0 0 20px rgba(256,256,256, 0.1), 4px 4px 0 20px rgba(256,256,256, 0.1),
      -6px 0 0 35px rgba(256,256,256, 0.1), -4px 4px 0 35px rgba(256,256,256, 0.1),
      0 6px 0 50px rgba(256,256,256, 0.1), -4px -4px 0 50px rgba(256,256,256, 0.1),
      0 -6px 0 65px rgba(256,256,256, 0.1), 4px -4px 0 65px rgba(256,256,256, 0.1);
  }
}

@keyframes coronaFlare {
  0% {
    box-shadow: 3px 0 0 10px rgba(250,228,88, 0.2),
      -5px 0 0 20px rgba(250,228,88, 0.2), 0 3px 0 30px rgba(250,228,88, 0.2),
      0 -5px 0 35px rgba(250,228,88, 0.1);
  }
  100% {
    box-shadow: -5px -3px 0 10px rgba(250,228,88, 0.2),
      3px -5px 0 20px rgba(250,228,88, 0.2), 5px -3px 0 30px rgba(250,228,88, 0.2),
      3px 5px 0 35px rgba(250,228,88, 0.1);
  }
}

.planet {
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.small {
  width: 50px;
  height: 50px;
  transform: scale(0.6);
}

.medium {
  width: 70px;
  height: 70px;
}

.large {
  width: 90px;
  height: 90px;
}

#mercury {
  background-color: #636365;
}

#venus {
  background-color: #a26205;
}

#earth {
  background-color: #6199f5;
  animation: orbit 18s linear infinite;
  animation-direction: reverse;
}
#earth:before {
  content: "";
  position: absolute;
  background-color: #61cc00;
  border-radius: 50%;
  left: 15px;
  top: 15px;
  width: 50px;
  height: 10px;
  box-shadow: 5px -8px 0 0 #61cc00;
}

#earth:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background-color: #61cc00;
  border-radius: 50%;
  left: -15px;
  top: 30px;
  width: 50px;
  height: 10px;
  box-shadow: -8px 8px 0 0 #61cc00;
}

#mars {
  background-color: #b53200;
}

#mars:before {
  position: absolute;
  background: rgba(0,0,0, 0.05);
  box-shadow: -5px -10px 0 rgba(0,0,0, 0.2);
}

#mars:after {
  position: absolute;
  background: rgba(0,0,0, 0.2);
  box-shadow: 6px -10px 0 rgba(0,0,0, 0.34);
}

#jupiter {
  background-color: #a5957b;
  transform: rotate(0deg);
  animation: orbit 26s linear infinite;
  animation-direction: reverse;
}

#jupiter:before {
  content: "";
  position: absolute;
  background-color: rgba(256,256,256, 0.25);
  width: 100px;
  height: 20px;
  top: 10px;
  box-shadow: 0 20px 0 0 rgba(256,256,256, 0.6);
}

#jupiter:after {
  content: "";
  position: absolute;
  background-color: rgba(256,256,256, 0.25)!important;
  width: 100px;
  height: 20px;
  top: 40px;
  box-shadow: 0 20px 0 0 rgba(132,89,64, 0.9)!important;
}

#saturn {
  background-color: #ebc067;
  overflow: visible;
  animation: orbit 30s linear infinite;
  animation-direction: reverse;
}
#saturn:after {
  content: "";
  position: absolute;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  left: 7px;
  top: 0px;
  border-bottom: 20px solid rgba(256,256,256, 0.9);
  border-left: 20px solid rgba(256,256,256, 0.9);
  transform: skew(50deg) rotateX(50deg);
}

#uranus {
  background-color: #88dadf;
}

#neptune {
  background-color: #4653ff;
}

#starBack {
  position: absolute;
  z-index: -11;
  animation: orbit 60s infinite linear;
}

@keyframes orbit {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.shellOut {
  animation: bangBack 4s ease-in-out forwards;
  animation-direction: alternate;
}

.implode {
  animation: implodeBack 4s ease-in-out forwards;
}

.outerShell {
  position: relative;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  z-index: -100;
}
.outerShell:before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: rgba(256,256,256, 0.4);
  border-radius: 50%;
  box-shadow: 0px -300px 0 rgba(256,256,256, 0.4);
}

.outerShell:after {
  content: "";
  position: absolute;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: rgba(256,256,256, 0.5);
  border-radius: 50%;
  box-shadow: 0px -300px 0 rgba(256,256,256, 0.5);
}

@keyframes bangBack {
  0% {
    transform: scale(0) rotate(10deg);
  }
  100% {
    transform: scale(0.9) rotate(100deg);
  }
}

@keyframes implodeBack {
  0% {
    transform: scale(0.9) rotate(100deg);
  }
  100% {
    transform: scale(0) rotate(0deg);
  }
}
</style>

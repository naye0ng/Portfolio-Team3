<template>
  <div id="universe-body">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <div class="p p-1"></div>
    <div class="p2 p-2"></div>
    <div class="p3 p-3"></div>
    <div>
      <audio id="soprano" autoplay loop>
        <source src="@/assets/intro_with_soprano.mp3" />     
      </audio>
      <audio id="HU">
        <source src="@/assets/intro_with_HU.mp3" />
      </audio>
    </div>
    <div id="solarSystem" class="planetScaleIn">
      <div id="flash"></div>

      <div class="shell" id="layer8">
        <div class="in">
          <div class="planet small basic" id="sub"></div>
        </div>
      </div>
      <div class="shell" id="layer7">
        <div class="in">
          <div class="planet" id="jupiter"></div>
        </div>
      </div>
      <div class="shell" id="layer6">
        <div class="in">
          <div class="planet large" id="hazel"></div>
        </div>
      </div>
      <div class="shell" id="layer5">
        <div class="in">
          <div class="planet medium" id="richard"></div>
        </div>
      </div>
      <div class="shell" id="layer4">
        <div class="in">
          <div class="planet" id="earth"></div>
        </div>
      </div>
      <!--  -->
      <div class="shell" id="layer3">
        <div class="in">
          <div class="planet large" id="anna"></div>
        </div>
      </div>
      <div class="shell" id="layer2">
        <div class="in">
          <div class="planet medium" id="eddy"></div>
        </div>
      </div>
      <div class="shell" id="layer1">
        <div class="in">
          <div class="planet small basic" id="sub"></div>
        </div>
      </div>
      <div id="nana" class="sun sunStyle"></div>

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
  name: "HelloUniverse",
  methods: {
    setHelloUniverse() {
      setTimeout(() => {
        this.$router.push("/home");
      }, 2800);
    }
  },
  mounted() {
    var sun = document.querySelector(".sun");
    var bkrd = document.querySelector(".outerShell");
    var solarSystem = document.querySelector("#solarSystem");
    var blackHole = document.querySelector("#blackHole");
    var setHelloUniverse = this.setHelloUniverse;

    var x = document.getElementById("HU");
    var y = document.getElementById("soprano");

    sun.addEventListener("click", function() {
      y.autoplay=false;
      x.autoplay = true;
      y.load();
      x.load();
      
      sun.className = "blackHole";
      bkrd.className = "implode";
      solarSystem.className = "planetScaleOut";
      blackHole.style.display = "block";
      setHelloUniverse();
    });
  }
};
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
  z-index: 999;
  width: 100%;
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
    background: rgba(256, 256, 256, 0.3);
  }
  100% {
    height: 100%;
    width: 100%;
    background: rgba(256, 256, 256, 0);
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
  width: 300px;
  height: 300px;
  transform: rotate(90deg);
}
#layer2 .in {
  animation: orbit 8s linear infinite;
}

#layer3 {
  width: 400px;
  height: 400px;
  transform: rotate(220deg);
}
#layer3 .in {
  animation: orbit 18s linear infinite;
}

#layer4 {
  width: 430px;
  height: 430px;
  transform: rotate(290deg);
}
#layer4 .in {
  animation: orbit 22s linear infinite;
}

#layer5 {
  width: 550px;
  height: 550px;
  transform: rotate(150deg);
}
#layer5 .in {
  animation: orbit 26s linear infinite;
}

#layer6 {
  width: 600px;
  height: 600px;
  transform: rotate(50deg);
}
#layer6 .in {
  animation: orbit 10s linear infinite;
}

#layer7 {
  width: 700px;
  height: 700px;
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
  background: rgba(0, 0, 0, 1)!important;
  box-shadow: 6px 0 0 10px rgba(256, 256, 256, 0.2),
    -6px 0 0 20px rgba(256, 256, 256, 0.2),
    0 6px 0 30px rgba(256, 256, 256, 0.2),
    0 -6px 0 35px rgba(256, 256, 256, 0.1);
}
/* .sun:hover {
  animation: blackHole 1s linear infinite;
  animation-direction: reverse;
  background: rgba(0, 0, 0, 1);
  box-shadow: 6px 0 0 10px rgba(256, 256, 256, 0.2),
    -6px 0 0 20px rgba(256, 256, 256, 0.2),
    0 6px 0 30px rgba(256, 256, 256, 0.2),
    0 -6px 0 35px rgba(256, 256, 256, 0.1);
} */
.sun:hover::after {
  content: "Click!";
  top: 36%;
  left: 24%;
  position: absolute;
  color: #ffffff;
  font-size: 30px;
}

.sunStyle {
  background-color: rgba(255, 99, 132);
  animation: coronaFlare 1s ease-in-out infinite;
  animation-direction: alternate;
  box-shadow: 3px 0 0 10px rgba(247, 207, 32, 0.2),
    -3px 0 0 20px rgba(247, 207, 32, 0.2), 0 3px 0 30px rgba(247, 207, 32, 0.2),
    0 -3px 0 35px rgba(247, 207, 32, 0.1);
}

.blackHole {
  z-index: 5;
  display: none;
  animation: blackHole 1s linear infinite;
  animation-direction: reverse;
  background: rgba(0, 0, 0, 1);
  box-shadow: 6px 0 0 10px rgba(256, 256, 256, 0.2),
    -6px 0 0 20px rgba(256, 256, 256, 0.2),
    0 6px 0 30px rgba(256, 256, 256, 0.2),
    0 -6px 0 35px rgba(256, 256, 256, 0.1);
}

@keyframes blackHole {
  0% {
    transform: rotate(0deg) scale(0.8);
    box-shadow: 6px 0 0 20px rgba(256, 256, 256, 0.1),
      4px 4px 0 20px rgba(256, 256, 256, 0.1),
      -6px 0 0 35px rgba(256, 256, 256, 0.1),
      -4px 4px 0 35px rgba(256, 256, 256, 0.1),
      0 6px 0 50px rgba(256, 256, 256, 0.1),
      -4px -4px 0 50px rgba(256, 256, 256, 0.1),
      0 -6px 0 65px rgba(256, 256, 256, 0.1),
      4px -4px 0 65px rgba(256, 256, 256, 0.1);
  }
  100% {
    transform: rotate(360deg) scale(0.8);
    box-shadow: 6px 0 0 20px rgba(256, 256, 256, 0.1),
      4px 4px 0 20px rgba(256, 256, 256, 0.1),
      -6px 0 0 35px rgba(256, 256, 256, 0.1),
      -4px 4px 0 35px rgba(256, 256, 256, 0.1),
      0 6px 0 50px rgba(256, 256, 256, 0.1),
      -4px -4px 0 50px rgba(256, 256, 256, 0.1),
      0 -6px 0 65px rgba(256, 256, 256, 0.1),
      4px -4px 0 65px rgba(256, 256, 256, 0.1);
  }
}

@keyframes coronaFlare {
  0% {
    box-shadow: 3px 0 0 10px rgba(255, 99, 132, 0.2),
      -5px 0 0 20px rgba(255, 99, 132, 0.2),
      0 3px 0 30px rgba(255, 99, 132, 0.2),
      0 -5px 0 35px rgba(255, 99, 132, 0.1);
  }
  100% {
    box-shadow: -5px -3px 0 10px rgba(255, 99, 132, 0.2),
      3px -5px 0 20px rgba(255, 99, 132, 0.2),
      5px -3px 0 30px rgba(255, 99, 132, 0.2),
      3px 5px 0 35px rgba(255, 99, 132, 0.1);
  }
}

.planet {
  border-radius: 50%;
  position: relative;
}

.small {
  width: 20px;
  height: 20px;
  transform: scale(0.6);
}

.medium {
  width: 85px;
  height: 85px;
}

.large {
  width: 100px;
  height: 100px;
}

#sub{
  background-color: rgba(256,256,256);
}
#nana, #anna, #eddy, #hazel, #richard {
  background-size: cover;
  background-position: center center;
}
#nana{
  background-color: rgba(255, 99, 132);
  background-image:url(../assets/nana.png);
}
#anna {
  background-color: rgba(75, 192, 192);
  background-image:url(../assets/anna.png);
}
#anna:after {
  content: "";
  position: absolute;
  height: 90px;
  width: 100px;
  border-radius: 50%;
  left: -5px;
  top: 15px;
  border-bottom: 20px solid  rgba(255,255,255,0.5);
  border-left: 20px solid  rgba(255,255,255,0.5);
  -webkit-transform: skew(50deg) rotateX(50deg);
  transform: skew(50deg) rotateX(50deg);
}
#eddy {
  background-color: rgba(54, 162, 235);
  background-image:url(../assets/eddy.png);
}
#hazel {
  width: 110px;
  height: 110px;
  background-color: rgba(255, 206, 86);
  background-image:url(../assets/hazel.png);
}
#richard {
  background-color: rgba(153, 102, 255);
  background-image:url(../assets/richard.png);
}
#richard:before{
  content: "";
  position: absolute;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  left: -9px;
  top: -5px;
  border-bottom: 10px solid  rgba(255,255,255,0.3);
  border-right: 10px solid  rgba(255,255,255,0.3);
  -webkit-transform: skew(50deg) rotateX(50deg);
  transform: skew(-50deg) rotateX(-50deg);
}
#richard:after {
  content: "";
  position: absolute;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  left: -9px;
  top: -5px;
  border-bottom: 8px solid  rgba(255,255,255,0.3);
  border-left: 8px solid  rgba(255,255,255,0.3);
  -webkit-transform: skew(50deg) rotateX(50deg);
  transform: skew(50deg) rotateX(50deg);
}
/* #venus {
  background-color: #a26205;
} */

#earth {
  overflow: hidden;
  width: 50px;
  height: 50px;
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

/* #mars {
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
} */

#jupiter {
  overflow: hidden;
  width: 60px;
  height: 60px;
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
/*
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
  border-bottom: 20px solid rgba(256, 256, 256, 0.9);
  border-left: 20px solid rgba(256, 256, 256, 0.9);
  transform: skew(50deg) rotateX(50deg);
}

#uranus {
  background-color: #88dadf;
}

#neptune {
  background-color: #4653ff;
}
*/
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
  background-color: rgba(256, 256, 256, 0.4);
  border-radius: 50%;
  box-shadow: 0px -300px 0 rgba(256, 256, 256, 0.4);
}

.outerShell:after {
  content: "";
  position: absolute;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: rgba(256, 256, 256, 0.5);
  border-radius: 50%;
  box-shadow: 0px -300px 0 rgba(256, 256, 256, 0.5);
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

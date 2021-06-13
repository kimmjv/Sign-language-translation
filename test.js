const URL = "https://teachablemachine.withgoogle.com/models/jAf-q6pZK/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata Refer to tmImage.loadFromFiles() in the API to
  // support files from a file picker or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(500, 500, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append elements to the DOM
  document.getElementById("cam").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  //await delay();
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
var count = 1;
stopCheck = false;
var bar_value = document.getElementById("bar-value");

async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  //console.log(maxPredictions);

  if (prediction[0].className == '안녕하세요' && prediction[0].probability.toFixed(2) >= 0.95) {
    count += 1
    if (count % 60 == 0) {
        labelContainer
            .childNodes[0]
            .innerHTML += "안녕하세요\n"
            percentage.innerHTML = (prediction[0].probability.toFixed(4))*100 + "%";
            bar_value.style.width = (prediction[0].probability.toFixed(4))*100 + '%'
        count = 1;

    }

} else if (prediction[1].className == '만나서' && prediction[1].probability.toFixed(2) >= 0.90) {
    count += 1
    if (count % 60 == 0) {
        labelContainer
            .childNodes[0]
            .innerHTML += "만나서\n"
            percentage.innerHTML = (prediction[1].probability.toFixed(4))*100 + "%";
            bar_value.style.width = (prediction[1].probability.toFixed(4))*100 + '%'
        count = 1;
    }

} else if (prediction[2].className == '반갑습니다' && prediction[2].probability.toFixed(2) >= 1.00) {
    count += 1
    if (count % 60 == 0) {
        labelContainer
            .childNodes[0]
            .innerHTML += "반갑습니다\n"
            percentage.innerHTML = (prediction[2].probability.toFixed(4))*100 + "%";
            bar_value.style.width = (prediction[2].probability.toFixed(4))*100 + '%'
        count = 1;
    }

} else if (prediction[3].className == '오늘' && prediction[3].probability.toFixed(2) >= 0.90) {
    count += 1
    if (count % 60 == 0) {
        labelContainer
            .childNodes[0]
            .innerHTML += "오늘\n"
            percentage.innerHTML = (prediction[3].probability.toFixed(4))*100 + "%";
            bar_value.style.width = (prediction[3].probability.toFixed(4))*100 + '%'
        count = 1;
    }

} else if (prediction[4].className == '날씨' && prediction[4].probability.toFixed(2) >= 0.90) {
    count += 1
    if (count % 60 == 0) {
        labelContainer
            .childNodes[0]
            .innerHTML += "날씨\n"
            percentage.innerHTML = (prediction[4].probability.toFixed(4))*100 + "%";
            bar_value.style.width = (prediction[4].probability.toFixed(4))*100 + '%'
        count = 1;
    }

} else if (prediction[5].className == '어때요?' && prediction[5].probability.toFixed(2) >= 0.90) {
    count += 1
    if (count % 60 == 0) {
        labelContainer
            .childNodes[0]
            .innerHTML += "어때요?\n"
            percentage.innerHTML = (prediction[5].probability.toFixed(4))*100 + "%";
            bar_value.style.width = (prediction[5].probability.toFixed(4))*100 + '%'
        count = 1;
    }

} else if (prediction[6].className == '코로나' && prediction[6].probability.toFixed(2) >= 0.90) {
    count += 1
    if (count % 60 == 0) {
        labelContainer
            .childNodes[0]
            .innerHTML += "코로나\n"
            percentage.innerHTML = (prediction[6].probability.toFixed(4))*100 + "%";
            bar_value.style.width = (prediction[6].probability.toFixed(4))*100 + '%'
        count = 1;
    }

} else if (prediction[7].className == '조심하세요' && prediction[7].probability.toFixed(2) >= 0.95) {
    count += 1
    if (count % 60 == 0) {
        labelContainer
            .childNodes[0]
            .innerHTML += "조심하세요\n"
            percentage.innerHTML = (prediction[7].probability.toFixed(4))*100 + "%";
            bar_value.style.width = (prediction[7].probability.toFixed(4))*100 + '%'
        count = 1;
    }

} else if (prediction[8].className == '감사합니다' && prediction[8].probability.toFixed(2) >= 0.90) {
    count += 1
    if (count % 60 == 0) {
        labelContainer
            .childNodes[0]
            .innerHTML += "감사합니다\n"
            percentage.innerHTML = (prediction[8].probability.toFixed(4))*100 + "%";
            bar_value.style.width = (prediction[8].probability.toFixed(4))*100 + '%'
        count = 1;
    }
} else {
    count += 1
    labelContainer
        .childNodes[0]
        .innerHTML += ""
} console.log(count);

}




function speak(text, opt_prop) {
  if (
    typeof SpeechSynthesisUtterance === "undefined" ||
    typeof window.speechSynthesis === "undefined"
  ) {
    alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
    return;
  }

  window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

  const prop = opt_prop || {};

  const speechMsg = new SpeechSynthesisUtterance();
  speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10
  speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
  speechMsg.lang = prop.lang || "ko-KR";
  speechMsg.text = labelContainer.childNodes[0].innerHTML;

  // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
  window.speechSynthesis.speak(speechMsg);
}

// 이벤트 영역
const selectLang = document.getElementById("select-lang");
const text = document.getElementById("label-container");
const btnRead = document.getElementById("btn-read");

btnRead.addEventListener("click", (e) => {
  speak(text.value, {
    rate: 1,
    pitch: 1.2,
    lang: selectLang.options[selectLang.selectedIndex].value,
  });
});

function btndel() {
    labelContainer.childNodes[0].innerHTML = " "
}

init();

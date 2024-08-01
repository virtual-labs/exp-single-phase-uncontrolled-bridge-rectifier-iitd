 // * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


                
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }    
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
}

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
}

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}

const cancelSpeech = ()=>{
  window.speechSynthesis.cancel()
  ccQueue = []
}

const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }

  isRunning = value;
  if(value){
    Dom.useTogglePointerEventsHere(false)
    cancelSpeech()
    Dom.hideAll()
  }
};

// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const textToSpeach = (text) => {
  // if(isMute){
  //   return;
  // }
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(utterance)
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25, speak = true, blockArrow=false) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped(){
      ccQueue.shift()
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())`
      // }
    }
  });
  let utterance = null
  if (!isMute && speak){
    utterance = textToSpeach(text)
  }  
  // if (utterance!=null){
  //   setTimeout(()=>{
  //     Dom.setBlinkArrowRed(-1)
  //   }, 5)
  //   utterance.onend = ()=>{
  //     if(!blockArrow)
  //       Dom.setBlinkArrowRed(-2)
  //   }
  //   return utterance
  // }
  return utterance
}

class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else if (selector instanceof HTMLElement) {
      this.item = selector;
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector;
    // push
  }
  getValue() {
    return this.item.attributes["value"].value;
  }
  setValue(val) {
    this.item.attributes["value"].value = val;
  }
  hidden() {
    return this.item.style.display == "none";
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  addClass(className) {
    this.item.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.item.classList.remove(className);
    return this;
  }
  borderRadius(amount) {
    amount += "px";
    this.styles({
      borderRadius: amount,
    });
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  left(leftPixel) {
    this.item.left = leftPixel + "px";
    return this;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    // coordinates
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.height = height;
    this.width = width;
    this.item.style.opacity = 1;
    this.item.style.transform = "translateX(0) translateY(0)";

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    //! push for every element
    this.push();

    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // for setting styles
  styles(props) {
    for (let property in props) {
      this.item.style[property] = props[property];
    }
    return this;
  }
  pointerEvents(eventName){
    this.item.style.pointerEvents = eventName
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj) {
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems() {
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes) {
      // to reset each anime after back btn pressed
      i.reset();
    }
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  static useTogglePointerEvents = false
  static useTogglePointerEventsHere(use = true){
    if(use){
      this.useTogglePointerEvents = true
      this.togglePointerEvents()
    }
    else{
      let animeWindow = new Dom(".main-window")
      let animeHeader = new Dom(".anime-header")
      let animeFooter = new Dom(".anime-footer")
      let cd = getAll(".concept_development")
      let graph_boxes = getAll(".graph_box")
      cd.forEach(c=>{
        let cdd = new Dom(c)
        cdd.pointerEvents("all")
      })
      graph_boxes.forEach(gb=>{
        let g = new Dom(gb)
        g.pointerEvents("all")
      })
      this.isArrowBlinking = false
      animeHeader.pointerEvents("all")
      animeFooter.pointerEvents("all")
      animeWindow.pointerEvents("all")
      this.useTogglePointerEvents = false
    }
  }
  static isArrowBlinking = false
  static togglePointerEvents(){
    if(!this.useTogglePointerEvents){
      return
    }
    let animeWindow = new Dom(".main-window")
    let animeHeader = new Dom(".anime-header")
    let animeFooter = new Dom(".anime-footer")
    
    animeHeader.pointerEvents("all")
    animeFooter.pointerEvents("all")

    if(this.isArrowBlinking){
      animeWindow.pointerEvents("all")
    }
    else{
      animeWindow.pointerEvents("none")
    }
  }
  static setBlinkArrowRed(
    isX = true,
    left = null,
    top = null,
    height = 30,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom(".blinkArrowRed")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000)
    if (isX === -1) {
      this.isArrowBlinking = false
      this.togglePointerEvents()
      blinkArrow.hide();
      return;
    }
    if (isX === -2) {
      blinkArrow.show();
      return;
    }
    this.isArrowBlinking = true
    this.togglePointerEvents()
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = 60,
    rotate = 0
  ) {
    // because we added the blinkArrow image out of the anime-main
    top += 130;
    let blinkArrow = new Dom(".blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    if (this.selector != ".anime-header") Dom.arrayOfItems.push(this);
    return this;
  }
  forMathematicalExpressionBtn = 0;
}



// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  // ! To Plot graph
  plotGraph(
    ctx,
    graphIdx,
    startEmpty = false,
    xLabel = "",
    yLabel = "",
    data = [],
    dataLabel = "",
    beginAtZero = true,
  ) {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel
    Scenes.items.chart.label[graphIdx].x = xLabel
    // for label
    Scenes.items.yLabel.set(530, 213).setContent("india india").styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      width: "199px",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(694, 366).setContent("india india").styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
    });
    

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset 
    let datasets = [
      {
        label: dataLabel,
        fill: false,
        borderColor: "red",
        backgroundColor: "red",
        data: data,
        display: false,
      },
    ]

    if(startEmpty){
      datasets=[]
    }

    graphRef = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: yLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: xLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
        },
      },
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef
  },

  // for adding new datasets to graph
  graphFeatures: {
    addDataset(chart, label, bgColor, data) {
      chart.data.datasets.push({
        label: label,
        fill: false,
        borderColor: bgColor,
        backgroundColor: bgColor,
        data: data,
      });
      chart.update();
    },
    addData(chart, index, data) {
      console.log(data);
      if (data.length > 0) {
        chart.data.datasets[index].data = data;
      } else {
        chart.data.datasets[index].data.push(data);
      }
      chart.update();
    },
    getSizeOfDatasets(chart){
      return chart.data.datasets.length
    }
  },
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),

//!images of previous experiment
    

part3_table_one : new Dom(".part3_table_one"),
part3_table_two : new Dom(".part3_table_two"),
part3_table_three : new Dom(".part3_table_three"),
part3_table_three_two : new Dom(".part3_table_three_two"),
part3_table_four : new Dom(".part3_table_four"),
part3_table_four_2 : new Dom(".part3_table_four_2"),
slider_vIn : new Dom(".slider_vIn"),
slider_D : new Dom(".slider_D"),
slider_R : new Dom(".slider_R"),
slider_box : new Dom(".universal-slider"),

graph0: new Dom(".graph0"),
graph1: new Dom(".graph1"),
graph2: new Dom(".graph2"),
graph3: new Dom(".graph3"),
graph4: new Dom(".graph4"),
graph5: new Dom(".graph5"),
graph6: new Dom(".graph6"),
graph7: new Dom(".graph7"),
graph8: new Dom(".graph8"),
graph9: new Dom(".graph9"),
graph10: new Dom(".graph10"),
graph_box_0: new Dom(".graph_box0"),
graph_box_1: new Dom(".graph_box1"),
graph_box_2: new Dom(".graph_box2"),
graph_box_3: new Dom(".graph_box3"),
graph_box_4: new Dom(".graph_box4"),
graph_box_5: new Dom(".graph_box5"),
graph_box_6: new Dom(".graph_box6"),
graph_box_7: new Dom(".graph_box7"),
graph_box_8: new Dom(".graph_box8"),
graph_box_9: new Dom(".graph_box9"),
graph_box_10: new Dom(".graph_box10"),
xLabel: new Dom(".xLabel"),
yLabel: new Dom(".yLabel"),
xLabel2: new Dom(".xLabel2"),
yLabel2: new Dom(".yLabel2"),

concept_development_1: new Dom(".concept_development_1"),
concept_development_2: new Dom(".concept_development_2"),
concept_development_3: new Dom(".concept_development_3"),



btn_delete : new Dom(".btn-delete"),
btn_reset : new Dom(".btn-reset"),


btn_check_connections: new Dom(".btn-check-connections"),
btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

// Theory

// theory image removed

btn_transparent: new Dom(".btn-transparent"),

// ! Procedure formula Nomenclature images 
 
formulas_component_stress : new Dom("formulas_component_stress"),
formulas_efficiency : new Dom("formulas_efficiency"),
formulas_ideal : new Dom("formulas_ideal"),
formulas_nomenclautre : new Dom("formulas_nomenclautre"),
formulas_non_ideal : new Dom("formulas_non_ideal"),
formulas_procedure : new Dom("formulas_procedure"),
formulas_universal : new Dom("formulas_universal"),

// ! Procedure formula Nomenclature images end


// EE2 images added
btn_reset_connections: new Dom(".btn-connections"),
btn_reset_connections: new Dom(".btn-connections"),
btn_reset_connections: new Dom(".btn-connections"),

      //! EE15 images added 
      
      arrow_selected_cf : new Dom("arrow_selected_cf"),
      arrow_selected_rf : new Dom("arrow_selected_rf"),
      arrow_select_l : new Dom("arrow_select_l"),
      arrow_select_r : new Dom("arrow_select_r"),
      arrow_select_rf : new Dom("arrow_select_rf"),
      btn_delete : new Dom("btn_delete"),
      btn_record : new Dom("btn_record"),
      btn_reset : new Dom("btn_reset"),
      btn_start_experiment : new Dom("btn_start_experiment"),
      circle : new Dom("circle"),
      formula_cf : new Dom("formula_cf"),
      formula_rf : new Dom("formula_rf"),
      part_1_circuit : new Dom("part_1_circuit"),
      part_1_correct_text : new Dom("part_1_correct_text"),
      part_1_text_1 : new Dom("part_1_text_1"),
      part_1_text_2 : new Dom("part_1_text_2"),
      part_1_text_3 : new Dom("part_1_text_3"),
      part_2_box : new Dom("part_2_box"),
      part_2_circuit_left : new Dom("part_2_circuit_left"),
      part_2_circuit_right : new Dom("part_2_circuit_right"),
      part_2_graph : new Dom("part_2_graph"),
      part_2_text : new Dom("part_2_text"),
      part_3_a : new Dom("part_3_a"),
      part_3_circuit : new Dom("part_3_circuit"),
      part_3_full_graph : new Dom("part_3_full_graph"),
      part_3_graph_a : new Dom("part_3_graph_a"),
      part_3_graph_v1 : new Dom("part_3_graph_v1"),
      part_3_graph_v2 : new Dom("part_3_graph_v2"),
      part_3_graph_v3 : new Dom("part_3_graph_v3"),
      part_3_text : new Dom("part_3_text"),
      part_3_v_1 : new Dom("part_3_v_1"),
      part_3_v_2 : new Dom("part_3_v_2"),
      part_3_v_3 : new Dom("part_3_v_3"),
      part_4_btn_dc_output : new Dom("part_4_btn_dc_output"),
      part_4_circuit : new Dom("part_4_circuit"),
      part_4_performance_tab : new Dom("part_4_performance_tab"),
      part_5_circuit : new Dom("part_5_circuit"),
      part_5_text_1 : new Dom("part_5_text_1"),
      part_5_text_2 : new Dom("part_5_text_2"),
      part_5_text_3 : new Dom("part_5_text_3"),
      part_5_text_4 : new Dom("part_5_text_4"),
      part_5_value_boxes : new Dom("part_5_value_boxes"),
      part_5_versus_tab : new Dom("part_5_versus_tab"),
      table_load_l : new Dom("table_load_l"),
      table_load_r : new Dom("table_load_r"),
      table_ripple_factor : new Dom("table_ripple_factor"),
      tab_1 : new Dom("tab_1"),
      tab_2 : new Dom("tab_2"),
      tab_3 : new Dom("tab_3"),
      tab_4 : new Dom("tab_4"),
      value_box_cf : new Dom("value_box_cf"),
      value_box_lf : new Dom("value_box_lf"),
      btn_check : new Dom("btn_check"),
      part_1_helper : new Dom("part_1_helper"),
      arrow_selected_r : new Dom("arrow_selected_r"),
      arrow_selected_l : new Dom("arrow_selected_l"),
      arrow_selected_lf : new Dom("arrow_selected_lf"),
      part_2_circuit_right_load : new Dom("part_2_circuit_right_load"),

      //!EE15 images end here

      //! EE15 tables
      table_resistance: new Dom(".table_resistance"),
      table_inductor: new Dom(".table_inductor"),
      table_ripple_factor: new Dom(".table_ripple_factor"),


           
concept_development: new Dom(".concept_development"), 
        

// ! new items dom
 domQs1: new Dom("domQs1"),
 domQs2: new Dom("domQs2"),
 domQs3: new Dom("domQs3"),
 domQs4: new Dom("domQs4"),
 domQs5: new Dom("domQs5"),
 domQs6: new Dom("domQs6"),


  chart: {
    graph: [
      graph1=null,
      graph2=null,
      graph3=null,
      graph4=null,
      graph5=null,
      graph6=null,
      graph7=null,
      graph8=null,
      graph9=null,
      graph10=null,
      graph11=null,
    ],
    label: [
      label1 = {
        x: "Label 2",
        y: "Label 1",
      },
      label2 = {
        x: "Label 2",
        y: "Label 1",
      },
      label3 = {
        x: "Label 2",
        y: "Label 1",
      },
      label4 = {
        x: "Label 2",
        y: "Label 1",
      },
      label5 = {
        x: "Label 2",
        y: "Label 1",
      },
      label6 = {
        x: "Label 2",
        y: "Label 1",
      },
      label7 = {
        x: "Label 2",
        y: "Label 1",
      },
      label8 = {
        x: "Label 2",
        y: "Label 1",
      },
      label9 = {
        x: "Label 2",
        y: "Label 1",
      },
      label10 = {
        x: "Label 2",
        y: "Label 1",
      },
      label11 = {
        x: "Label 2",
        y: "Label 1",
      },
    ]
  }


  },
  // delete it, it is for step helper
  EE15AlreadySeleted: 0,
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone:[0,0,0,0],
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      }; 
      return true;

    }),

    (concept_dev_step1 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      // require
      Scenes.items.slider_box.hide()
      
      let btn_transparent = Scenes.items.btn_transparent.set().item;

      Scenes.items.concept_development_1.set().styles({
        zIndex: "5000",
        scale: "1 0.915",
        top: "-144px",
        position: "absolute",
      })
      let src_path = "./iframes/step1/index.html"
      Scenes.items.concept_development_1.item.src = src_path
      // remove other iframes 
      function removeIframes(){
        let safeIdx = 0
        let cds = getAll(".concept_development")
        cds.forEach((cd,idx)=>{
          if(idx != safeIdx){
            cd.src = ""
          }
        })
        
      }
      removeIframes()
      // ! Slide ended enable the button next button
      function checkIsSlideEnded(){
        let isSlideEnded = JSON.parse(localStorage.getItem("isSlideEnded"))
        if(isSlideEnded==true){
          btn_transparent.disabled = false
          setIsProcessRunning(false)
          btn_transparent.classList.remove("btn-disabled")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
          btn_transparent.onclick = ()=>{
            Scenes.next()
            localStorage.setItem("isSlideEnded",false)
            window.clearInterval(interval)
            btn_transparent.classList.add("btn-disabled")
            btn_transparent.disabled = true
          }
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000)
        
      return true;
    }),
    
    //! Circuit formulation part1
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()

      setCC("Connect the given terminals of the AC source with the given terminal of the diode bridge network and then")

      setCC("connect the terminals of the load with the remaining terminals of the diode bridge circuit")


      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions

      // Dom.setBlinkArrowRed(true,739, 5, 30,30,90).play()

      Scenes.items.part_1_circuit.set(11, 34, 400)
      Scenes.items.part_1_text_1.set(680, 30+2, 220)
      Scenes.items.part_1_text_2.set(665, 30+213, 75)
      Scenes.items.part_1_text_3.set(665, 30+302, 75)
      Scenes.items.btn_reset.set(820-10, -45, 55).zIndex(1)
      Scenes.items.btn_check.set(690-10, -45, 55).zIndex(1)

      Scenes.items.part_1_correct_text.set(688, 4, 262).hide()


      let st = {
        backgroundColor: "#c00000",
          fontSize: "1.2rem",
          padding: "2px",
          textShadow: "1px 2px #c00000"
      }

      // Scenes.items.tempTitle10.setContent("Connect the components to form a 3-phase uncontrolled bridge rectifier").set(94, 6, 57, 357).styles(st)

     
      
      // connected vertex src and dest
      let allConnectedVertexSrcDest = {}

      function isConnectionsRight(isConnectionsCorrect){
        let imgToShow = null
        if(isConnectionsCorrect){

          Dom.setBlinkArrowRed(-1)

          setCC("The diode bridge rectifier circuit formulation is completed, now proceed further")

          // * destroy all the connection
          // Scenes.items.btn_reset.item.click()
          // getAll(".jtk-endpoint").forEach(ele=>{
          //   ele.style.display = "none"
          // })

          let imgs = [
            Scenes.items.part_1_text_1,
            Scenes.items.part_1_text_2,
            Scenes.items.part_1_text_3,
            Scenes.items.btn_reset,
            Scenes.items.btn_check,
          ]

          for(let i of imgs){
            i.hide()
          }

          Scenes.items.part_1_correct_text.show()
          
          
          //to go to next step 
          setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 544).play();
          setIsProcessRunning(false);
          

        }
        else{
          setCC("Incorrect connections, Press Reset and try again")
        }
      }


      Scenes.items.slider_box.hide();

      // ! JSPLumb cable 
      function cable(){
        
        Scenes.items.btn_check.item.onclick = checkCableConnection
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = []
        // ! connection is right/wrong
        let isConnectionRight = false
        // set graph
        function fillCheckGraph(){
          //* to fill element in array
          function create2DArray(rows, cols, initValue){

            filledArray = new Array(rows)

            for(let i=0;i<rows;i++){
              filledArray[i] = new Array(cols)

              for(let j=0;j<cols;j++){
                filledArray[i][j] = initValue
              }
            }
            return filledArray;
          }

          // fill zero 
          let noOfVertex = 17
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0)

          //* fixed connection is filled
          let xAxisFixed = [1, 3, 5, 7]
          let yAxisFixed = [2, 4, 6, 8]
          for(let i in xAxisFixed){
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1
          }

          // console.log(matricesForCheckGraph)
        } 
        fillCheckGraph()

        // minimum connection length for check graph
        let minimumConnectionsLength = 4
        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          // ! Matched Graph 
          let isGraphMatched = false

          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first")
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos) 
            }

            // ! Main logic for hecking graph
            for(let i=0;i<listDiv.length;i++){
              // * to convert div to idx only
              function convertDivtextToIdx(divText){
                let convertedText = ""
                let text = divText.substr(-2)
                let num1 = text[0]
                let num2 = text[1]
                if(!isNaN(num1))
                  convertedText+=num1
                if(!isNaN(num2))
                  convertedText+=num2
                return parseInt(convertedText)
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])

              if(matricesForCheckGraph[vertexSrcIdx][vertexDestIdx] == 1){
                isGraphMatched = true
              }
              else{
                isGraphMatched = false
                break
              }
            }

            
            // ! for right connection note
            if(isGraphMatched){
              isConnectionsRight(true)
            }else{
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false)
              allConnectedVertexSrcDest = []
            }
          }
          
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) {
            connections.push(conn);
            // ! show blink when all vertex are connected
            // todo change size 4 to 13
            if(connections.length == minimumConnectionsLength){
              Dom.setBlinkArrowRed(true,739, 5, 30,30,90).play()

              // Dom.setBlinkArrowRed(true,805,10,30,null,90).play()
            }
          }

          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections=1, color = "ff0000"){
              let radius = 7.5
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: `#${color}` },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: `#${color}`, strokeWidth: 6 },
                connector: ["Bezier", { curviness: -7 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              }
              return endPointStyleData
            }

            //colors code
            // red = ff0000
            // Yellow = f2b50c
            // Black = 0070c0
            // Blue = 000000
            

            var exampleEndpoint1 = setEndPoint(1, "ff0000")
            var exampleEndpoint2 = setEndPoint(1, "000000")


            function addEndPoints(){

              // ! for all red wire

              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 2
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //! for black wire
              
              //conn 1
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
                );
                instance.addEndpoint(
                  "vertex6",
                  { anchor: [0.75, 0, 0, -1] },
                  exampleEndpoint2
                  );
                  
              //conn 2
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
                  

          
            }
            addEndPoints()


            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1)
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),

    (concept_dev_step2 = function () {
      // ! destroy connection
      Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })

      setIsProcessRunning(true);
      Dom.hideAll()
      // require
      Scenes.items.slider_box.hide()
      
      let btn_transparent = Scenes.items.btn_transparent.set().item;

      Scenes.items.concept_development_2.set().styles({
        zIndex: "5000",
        scale: "1 0.915",
        top: "-144px",
        position: "absolute",
      })
      let src_path = "./iframes/step3/index.html"
      Scenes.items.concept_development_2.item.src = src_path
      // remove other iframes 
      function removeIframes(){
        let safeIdx = 1
        let cds = getAll(".concept_development")
        cds.forEach((cd,idx)=>{
          if(idx != safeIdx){
            cd.src = ""
          }
        })
        
      }
      removeIframes()

      // ! Slide ended enable the button next button
      function checkIsSlideEnded(){
        let isSlideEnded = localStorage.getItem("isSlideEnded")
        if(isSlideEnded=="true"){
          btn_transparent.disabled = false
          setIsProcessRunning(false)
          btn_transparent.classList.remove("btn-disabled")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
          btn_transparent.onclick = ()=>{
            Scenes.next()
            localStorage.setItem("isSlideEnded",false)
            window.clearInterval(interval)
            btn_transparent.classList.add("btn-disabled")
            btn_transparent.disabled = true

          }
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000)
        
      return true;
    }),

    //! LC-Filter diode bridge rectifier with RL-Load
    (step2 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading(
        "Step-3",
        'LC-Filter Based Diode Bridge Rectifier with RL-Load.'
      )
      // Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()

      Scenes.items.btn_next.show()
      Scenes.items.slider_box.hide()

      setCC("Click on the box to Connect the LC-filter between the diode bridge rectifier and RL load, and observe the output voltage waveform.")

      // setTimeout(()=>{
      //   setCC("Connect the C-filter between the diode rectifier and dc load.")
      //   Scenes.items.part_3_text_1.set(405, 0, 55)
      //   Scenes.items.arrow_click_here.set(283,10, 55)
      // },9000)

      function scale(target){
        return anime({
          targets: target.item,
          scale: [0.9, 1],
          loop: true,
          // duration: 8000,
          easing: "linear",
        })
      }

        //! Required items
        Scenes.items.part_2_circuit_left.set(65, 144-50, 268+50)
        Scenes.items.part_2_circuit_right.set(499, 72, 302.8).hide()
        // Scenes.items.part_2_circuit_right_load.set(701, 93, 318).hide()
        Scenes.items.part_2_circuit_right_load.set(701-10, 93, 318)
        Scenes.items.part_2_box.set(472, 111-48, 310+28)
        Scenes.items.part_2_text.set(80, -35, 126).hide()
        Scenes.items.part_2_graph.set(766, 174, 85).hide()
        Scenes.items.part_1_helper.set(778, 174)

      let scaleAnime = scale(Scenes.items.part_2_box, true)

      function wipeOut(target){
        anime({
          targets: target.item,
          // left: left_, 
          translateX: 180,
          duration: 2000, 
          easing: "easeInOutQuad",
          loop: true,
        })
      }

      let btn = Scenes.items.part_2_box

        btn.item.onclick = ()=>{

          scaleAnime.reset()
          Scenes.items.part_2_circuit_right_load.show()
          Scenes.items.part_2_box.scale(1.1)
          Scenes.items.part_2_circuit_right.show()
          Scenes.items.part_2_text.show()
          // Scenes.items.part_2_graph.show()

          console.log("clicked")
          anime({
            targets: Scenes.items.part_2_circuit_right.item,
            // left: "481", 
            left: "471", 
            easing: "easeInOutQuad",
            duration: 2000, 
            complete(){
              // Scenes.items.part_2_circuit_right_load.show()
              Scenes.items.part_2_graph.show()
              wipeOut(Scenes.items.part_1_helper)
              

            setCC("Click Next to goto next step.")
            Dom.setBlinkArrow(true, 790, 544).play();
            setIsProcessRunning(false);
          }
        })

      }

      return true
    }),
 
    (concept_dev_step3 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      // require
      Scenes.items.slider_box.hide()
      
      let btn_transparent = Scenes.items.btn_transparent.set().item;

      Scenes.items.concept_development_3.set().styles({
        zIndex: "5000",
        scale: "1 0.915",
        top: "-144px",
        position: "absolute",
      })
      let src_path = "./iframes/step5/index.html"
      Scenes.items.concept_development_3.item.src = src_path
      // remove other iframes 
      function removeIframes(){
        let safeIdx = 2
        let cds = getAll(".concept_development")
        cds.forEach((cd,idx)=>{
          if(idx != safeIdx){
            cd.src = ""
          }
        })
        
      } 
      removeIframes()

      // ! Slide ended enable the button next button
      function checkIsSlideEnded(){
        let isSlideEnded = localStorage.getItem("isSlideEnded")
        if(isSlideEnded=="true"){
          btn_transparent.disabled = false
          setIsProcessRunning(false)
          btn_transparent.classList.remove("btn-disabled")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
          btn_transparent.onclick = ()=>{
            Scenes.next()
            localStorage.setItem("isSlideEnded",false)
            window.clearInterval(interval)
            btn_transparent.classList.add("btn-disabled")
            btn_transparent.disabled = true

          }
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000)
        
      return true;
    }),

    //! diode bridge rectifier : steady state waveforms
    (step3 = function () {
      setIsProcessRunning(true);


      Scenes.setStepHeading(
        "Step-2",
        "Voltage and current waveforms."
      )
      // Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()
      Scenes.items.btn_next.show()
      Scenes.items.slider_box.hide()

      // // * destroy all the connection
      // Scenes.items.btn_reset.item.click()
      // getAll(".jtk-endpoint").forEach(ele=>{
      //   ele.style.display = "none"
      // })


      //! Required items
      Scenes.items.part_3_circuit.set(54, 113, 291 )
      Scenes.items.part_3_text.set(33, -25, 123)
      Scenes.items.part_3_v_1.set(5, 224, 105)
      Scenes.items.part_3_v_2.set(516, 150, 223)
      Scenes.items.part_3_v_3.set(277, 132, 107)
      Scenes.items.part_3_a.set(229, 199, 66).zIndex(1)
      Scenes.items.part_1_helper.set(632, 18, 170).zIndex(2)
      // Scenes.items.part_1_helper.set(627, 11, 185).zIndex(2)
      // Scenes.items.part_1_helper.set(633, 9, 185).zIndex(2)
      // Scenes.items.part_1_helper.set(626, 11, 185).zIndex(2)
      
      
      let graphs = [
        Scenes.items.part_3_graph_v1.set(591, -15, 170).hide(),
        Scenes.items.part_3_graph_v2.set(591, -15, 220).hide(),
        Scenes.items.part_3_graph_v3.set(591, -15, 140).hide(),
        Scenes.items.part_3_graph_a.set(591, -15, 185).hide(),
        Scenes.items.part_3_full_graph.set(622, -38, 428).hide(),
      ]
      let compo = [  
        Scenes.items.part_3_v_1,     
        Scenes.items.part_3_v_2,     
        Scenes.items.part_3_v_3,     
        Scenes.items.part_3_a
      ]

      compo.forEach((ele)=>{
        ele.item.onmouseenter = ()=>{
          anime({
            targets: ele.item,
            scale: 1.1,
            duration: 500,
            easing: "easeInOutQuad",
            // loop: true,
          })
        }
        ele.item.onmouseout = ()=>{
          anime({
            targets: ele.item,
            scale: 1,
            duration: 500,
            easing: "easeInOutQuad",
            // loop: true,
          })
        }

      })

      function remove(target){
        return anime({
          targets: target.item,
          left: 1000,
          duration:2000,
          easing: "easeInOutQuad"
        })
      }

      let clickCountIdx = 0
      let currentGraph = Scenes.items.talk_cloud.hide()

      let isCompClick = [0, 0, 0, 0]
      let time 

      compo[0].item.onclick = ()=>{
        time = 4000
        isCompClick[0] = 1
        setCC("Here, the ac input  voltage waveform is shown.")
        Scenes.items.part_1_helper.set(632, 18, 170).zIndex(2)
        remove(Scenes.items.part_1_helper)
        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[0]
        graphs[0].show()
        fullWave()
      }
      compo[1].item.onclick = ()=>{
        time = 4000
        isCompClick[1] = 1
        setCC("Here, the load voltage waveform is shown. The load voltage ripple is reduced after connecting the LC-filter")
        Scenes.items.part_1_helper.set(627, 11, 185).zIndex(2)
        remove(Scenes.items.part_1_helper)
        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[1]
        graphs[1].show()
        fullWave(8000)

      }
      compo[2].item.onclick = ()=>{
        time = 4000
        isCompClick[2] = 1
        setCC("Here, the voltage appearing across diode one is shown.")
        Scenes.items.part_1_helper.set(633, 9, 185).zIndex(2)
        remove(Scenes.items.part_1_helper)
        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[2]
        graphs[2].show()
        fullWave()

      }
      compo[3].item.onclick = ()=>{
        time = 8000
        isCompClick[3] = 1
        setCC("Here, the ac input  current waveform is shown.")
        Scenes.items.part_1_helper.set(626, 11, 185).zIndex(2)
        remove(Scenes.items.part_1_helper)

        clickCountIdx++
        currentGraph.hide()
        currentGraph = graphs[3]
        graphs[3].show()
        console.log(clickCountIdx)
        fullWave()
      }


  
      function fullWave(delayTime = 4000){
        // if(clickCountIdx == 4){
        if(isCompClick.indexOf(0) == -1){
          compo.forEach((ele)=>{
            ele.item.onmouseenter = ()=>{
              
            }
            ele.item.onclick = ()=>{

            }
          })
          console.log(clickCountIdx)
          setTimeout(()=>{
            // Scenes.items.part_2_text_1.hide()
            // Scenes.items.part_2_text_2.show()
            currentGraph.hide()
            graphs[4].show()
            Dom.setBlinkArrow(true, 790, 408).play()
            setCC("Here, various voltage and current waveforms are shown for better understanding of the diode bridge rectifier operation with LC-filter.")
            setIsProcessRunning(false)
          },delayTime)
        }
      } 
      
      return true
    }),

    //! part 5 Performance analysis
    (step4 = function () {
      // Dom.useTogglePointerEventsHere()
      
      // todo all previous elements hide
      Dom.hideAll();
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step-5", "Performance Measurement of Diode Bridge Rectifier");
      
      Scenes.items.slider_box.hide()
      // * remove all previous restrictions
      
      // ! Required Elements
      //! new added
      Scenes.items.part_4_circuit.set(-20, 21, 273)
      Scenes.items.part_4_btn_dc_output.set(338, 212, 47).zIndex(1)
      Scenes.items.part_4_performance_tab.set(445, -40, 458).hide()
      Scenes.items.part_1_helper.set(445, -36, 444)

      Dom.setBlinkArrowRed(true,370, 259,30,null,90).play()

      function wipeOut(target){
        anime({
          targets: target.item,
          // left: left_, 
          translateX: 480,
          duration: 2000, 
          easing: "easeInOutQuad",
          complete(){
            Scenes.items.part_1_helper.hide()

          }
          // loop: true,
        })
      }

      let btn = Scenes.items.part_4_btn_dc_output
      btn.item.onclick = ()=>{
        wipeOut(Scenes.items.part_1_helper)
        Dom.setBlinkArrowRed(-1)
        Scenes.items.part_4_performance_tab.set(445, -40, 458).show()
        // after complete
        Dom.setBlinkArrow(true, 790, 408).play();
        setIsProcessRunning(false);
      }

      setCC("The block diagram representation of diode bridge rectifier with LC filter is shown here.")
      setCC("Its performance quantification involves measurement of voltage and currents on the output side of the rectifier.")
    

      // hide all tables
      Scenes.items.part3_table_one.hide()
      Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      Scenes.items.part3_table_four.hide()
      Scenes.items.part3_table_four_2.hide()

      return true;

    }),

    //! R load working
    (step6 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Dom.useTogglePointerEventsHere()
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "",
        ""
      )

      let lfVal =0, cfVal = 0,  r_val = 0,  l_val = 0,  rf_val = 0
      let resetOnlyValues = true
      function btn_reset_function(reset_type=""){
        let table = new Dom(".part3_table_three").item
        var rows = table.tBodies[0].rows
        let n=7
        let m=8
  
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          } 
        }
        rows[0].cells[1].innerHTML = 50
        rows[1].cells[1].innerHTML = 220


        if(reset_type=="full" && !resetOnlyValues){

          Scenes.steps[8]()
        }else{
          partTwo()
        }
      }

      function partOne(){
        //* Required items

        let topminus = 48
        Scenes.items.btn_record.set(8, -75, 52)
        Scenes.items.btn_reset.set(8+120, -75, 52)
        Scenes.items.btn_delete.set(8+120+120, -75, 52)
        
        Scenes.items.slider_box.set(0,-20).show("flex")
        sliders.resetSlidersValue()
        sliders.showAllSliders()
        sliders.showSliderFor(1)
        
        let components = [

          Scenes.items.table_resistance.set(615, -70+50-topminus),
          Scenes.items.table_inductor.set(615, 40+50-topminus),
          Scenes.items.table_ripple_factor.set(665, 200+50-topminus),
  
          Scenes.items.value_box_cf.set(669, 129, 80),
          Scenes.items.value_box_lf.set(669, 340-topminus, 80),
  
          Scenes.items.arrow_select_r.set(477, -14-topminus, 61).hide(),
          Scenes.items.arrow_select_l.set(477, 94-topminus, 61).hide(),
          Scenes.items.arrow_select_rf.set(525, 252-topminus, 61).hide(),
  
          Scenes.items.arrow_selected_r.set(477, -14-topminus, 61).hide(),
          Scenes.items.arrow_selected_l.set(477, 94-topminus, 61).hide(),
          Scenes.items.arrow_selected_cf.set(550, 188-topminus, 61).hide().zIndex(1),
          Scenes.items.arrow_selected_rf.set(525, 252-topminus, 61).hide(),
          Scenes.items.arrow_selected_lf.set(546, 346-topminus, 61).hide(),
  
          Scenes.items.formula_cf.set(113, 162, 142).hide(),
          Scenes.items.formula_rf.set(192, 298-topminus, 80).hide(),
  
          Scenes.items.part_5_text_1.set(30, 324, 100).hide(),
          Scenes.items.part_5_text_2.set(30, 324, 100).hide(),
          Scenes.items.part_5_text_3.set(30, 324, 100).hide(),
          Scenes.items.part_5_text_4.set(30, 324, 100).hide(),
  
          Scenes.items.btn_start_experiment.set(810, 352, 63).hide()
        ]

        let st = {
          color: "#000000",
          fontWeight: "bold",
          fontSize: "0.9rem"
        }

        Scenes.items.tempTitle10.set(743, 161, null, 120).setContent(cfVal + " µ𝑭").styles(st)
        Scenes.items.tempTitle11.set(743, 323, null, 120).setContent(lfVal + " mH").styles(st)

        let table_1 = document.querySelectorAll(".table-1-row .table-cell")
        let table_2 = document.querySelectorAll(".table-2-row .table-cell")
        let table_3 = document.querySelectorAll(".table-3-row .table-cell")

        //! functionality

        // select r arrows 
        let blink_arrow_select_r = [
          ()=>Dom.setBlinkArrowRed(true,644, 0,30,null,90).play(),
          ()=>Dom.setBlinkArrowRed(true,734, 0,30,null,90).play(),
          ()=>Dom.setBlinkArrowRed(true,824, 0,30,null,90).play(),
        ]

        let blink_arrow_select_l = [
          ()=>Dom.setBlinkArrowRed(true,644, 112,30,null,90).play(),
          ()=>Dom.setBlinkArrowRed(true,734, 112,30,null,90).play(),
          ()=>Dom.setBlinkArrowRed(true,824, 112,30,null,90).play(),
        ]

        Scenes.items.arrow_select_r.show()
        blink_arrow_select_r[Scenes.EE15AlreadySeleted]()
        setCC("Select the value of Load resistance R")
        

        // let r_val , l_val, rf_val
        table_1.forEach((ele )=>{
          let e = new Dom(ele);
          ele.onclick = ()=>{
            e.styles({
              backgroundColor: "gray",
              color: "white",
            })
            .removeClass("btn-img")
            .item.disabled = true


            console.log(ele.innerHTML.slice(0, ele.innerHTML.indexOf(" ")))
            r_val = ele.innerHTML.slice(0, ele.innerHTML.indexOf(" "))

            Dom.setBlinkArrowRed(-1)
            
            Scenes.items.arrow_select_r.hide()
            Scenes.items.arrow_selected_r.show()

            Scenes.items.arrow_select_l.show()
            blink_arrow_select_l[Scenes.EE15AlreadySeleted]()
            setCC("Select the value of Load inductance L")

            table_1.forEach(ele=>ele.onclick= ()=>{})
          }
        })

        table_2.forEach((ele )=>{
          let e = new Dom(ele);
          ele.onclick = ()=>{
            e.styles({
              backgroundColor: "gray",
              color: "white",
            })
            .removeClass("btn-img")
            .item.disabled = true
            
            console.log(ele.innerHTML.slice(0, ele.innerHTML.indexOf(" ")))
            l_val = ele.innerHTML.slice(0, ele.innerHTML.indexOf(" "))

            Dom.setBlinkArrowRed(-1)

            Scenes.items.arrow_select_l.hide()
            Scenes.items.arrow_selected_l.show()

            Scenes.items.part_5_text_1.show()   
            console.log("rf_val" , rf_val,"r_val", r_val,"l_val", l_val)         
            updateValues(0, rf_val, r_val, l_val)
            cfVal = Number(Formulas.r_load.cf(values)).toFixed(2)
            
            anime.timeline({
              duration: 2000,
            })
            .add({
              duration: 4000,
              complete(){
                Scenes.items.part_5_text_1.hide()
              }
            })
            .add({
              begin(){
                setCC("Now compute the filter capacitor value using the formula ")            
                Scenes.items.formula_cf.show()
                Scenes.items.arrow_selected_cf.show()
                Scenes.items.part_5_text_2.show() 
                Scenes.items.tempTitle10.setContent(cfVal + " µ𝑭")
              },
            })
            .add({
              complete(){
                // Scenes.items.formula_cf.hide()
                           
            },
            })
            .add({
              complete(){
                // Scenes.items.part_5_text_2.hide()            
                Scenes.items.arrow_select_rf.show()
                Dom.setBlinkArrowRed(true,735, 318-topminus,30,null,90).play()
                setCC("Choose ripple factor and use computed value of filter capacitance and then compute the value of filter inductor using formula")
            }
            })
            table_2.forEach(ele=>ele.onclick= ()=>{})
          }
        })

        table_3.forEach((ele )=>{
          let e = new Dom(ele);
          e.styles({
            backgroundColor: "#cfd5ea",
            color: "black",
          })
          .addClass("btn-img")

          ele.onclick = ()=>{
            e.styles({
              backgroundColor: "gray",
              color: "white",
            })
            .removeClass("btn-img")

            // for hiding old images
            Scenes.items.formula_cf.hide()
            Scenes.items.part_5_text_2.hide()

            Dom.setBlinkArrowRed(-1)
            console.log(ele.innerHTML)
            rf_val = ele.innerHTML
            Scenes.items.arrow_select_rf.hide()
            Scenes.items.arrow_selected_rf.show()

            Scenes.items.part_5_text_3.show()
            updateValues(0, rf_val, r_val, l_val)
            lfVal = Number(Formulas.r_load.lf(values)).toFixed(2)
            
            anime.timeline({
              duration: 2000,
            })
            .add({
              duration: 4000,
              complete(){

              }
            })
            .add({
              begin(){
                Scenes.items.part_5_text_3.hide()
                Scenes.items.formula_rf.show()
                Scenes.items.tempTitle11.setContent(lfVal + " mH")
              }
            })
            .add({
              complete(){
                // Scenes.items.formula_rf.hide()
                Scenes.items.arrow_selected_lf.show()
                Scenes.items.part_5_text_4.show()
                setCC("For the chosen values of filter and load circuit parameters set the input ac voltage to perform the experiment.")
              }
            })
            .add({
              complete(){
                // Scenes.items.part_5_text_4.hide()
                Scenes.items.btn_start_experiment.show()
                Dom.setBlinkArrowRed(true,766, 364,30,null,180).play()
                setCC("Now start the experiment")
              }
            })
            table_3.forEach(ele=>ele.onclick= ()=>{})
          }
        })

        //! onclick for start btn
        let btn = Scenes.items.btn_start_experiment
        btn.item.onclick = ()=>{
          Dom.setBlinkArrowRed(-1)
          // partTwo()
          btn_reset_function()
          components.forEach((ele)=>{
            console.log(ele)
            ele.hide()
          })
        }


      }

      partOne()
      // partTwo()
      function partTwo() {
        // btn_reset_function()
        cancelSpeech()
        // ! show the slider
        Scenes.items.slider_box.set(0,-20).show("flex")
        sliders.resetSlidersValue()
        sliders.showAllSliders()
        sliders.showSliderFor(1)
        
        //!new added for EE8
        Scenes.items.part3_table_three.set(5)

        let st = {
          color: "#b61c1c", 
          fontSize: "0.9rem",
          fontWeight: "bold"
        }

        Scenes.items.tempTitle12.set(507,-38, null, 120 ).setContent(r_val + " Ω").styles(st)
        Scenes.items.tempTitle13.set(507,25, null, 120).setContent(cfVal + " µ𝑭").styles(st)
        Scenes.items.tempTitle14.set(505,88, null, 120).setContent(lfVal + " mH").styles(st)



        //* to set the styling of conclusion front
        // let conclusionFront = "Here, the load voltage waveform is shown. The load voltage ripple is reduced after connecting the C-filter"
        // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

        
        // Scenes.items.graph_bcg.set(612,-75, 120)
        // Scenes.items.text_vs.set(636+3, -42, 37)
        // Scenes.items.part_5_tab1.set(601+3, -44, 47).zIndex(3)
        // Scenes.items.part_5_tab2.set(692+15+12+3, -44, 47).zIndex(3)
        // Scenes.items.part_5_tab3.set(736+25+12+3, -44, 47).zIndex(3)
        // Scenes.items.part_5_tab4.set(780+32+12+3, -44, 47).zIndex(3)
        // Scenes.items.part_5_tab5.set(820+39+12+1, -44, 47).zIndex(3)
        // Scenes.items.graph_bcg.set(571, -69, 480)
        // Scenes.items.part_5_resistance_text_value.set(417, 134, 52)
        
        //! required items new
        Scenes.items.part_5_versus_tab.set(621, -74, 81)
        Scenes.items.part_5_value_boxes.set(421, -74, 212)
        Scenes.items.tab_1.set(625, -27, 28, 65).zIndex(3)
        Scenes.items.tab_2.set(696, -27, 28, 61).zIndex(3)
        Scenes.items.tab_3.set(765, -28, 28, 60).zIndex(3)
        Scenes.items.tab_4.set(832, -28, 28, 61).zIndex(3)


        // let rightTicks = [
          //   Scenes.items.right_tick_1.set(622,-61,19).hide(),
        //   Scenes.items.right_tick_2.set(798,-61,19).hide(),
        //   Scenes.items.right_tick_3.set(622,-16, 19).hide(),
        //   Scenes.items.right_tick_4.set(798, -16, 19).hide(),
        //   Scenes.items.right_tick_5.set(712, 28, 19).hide(),
        // ]

        Scenes.items.btn_record.set(8, -75, 52)
        Scenes.items.btn_reset.set(8+120, -75, 52)
        Scenes.items.btn_delete.set(8+120+120, -75, 52)
        // Scenes.items.btn_plot.set(698+20, 360, 35).zIndex(2)

        let valuesToMatch = [] 

        let table = new Dom(".part3_table_three").item
        
        // * index to handle records
        let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

        // ! Tutorial Function
        // Dom.setBlinkArrowRed(true,0,0,30,null,-90)
        function stepTutorial2(){
          
          setCC("Set the input ac voltage magnitude using auto-transformer and record various voltage and currents of bridge rectifier")
          setCC("and tabulate in the Table given here.")
          setTimeout(() => {
            Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
            setCC("Press Record")
          }, 8000);

          // reset slider d onclick
          sliders.v_knob.onclick = ()=>{
            sliders.sliderV(()=>{
              setCC("Press Record", 25,false)
              Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
            })
            sliders.v_knob.click()
          }
        }
        if(recordBtnClickIdx == 0){
          stepTutorial2()
        }

        // ! graph
        // let graph_width = 346
        // let graph_height = 273

        let graph_width = 308
        let graph_height = 268

        // let graph_box_height = 295
        // let graph_box_top = 60

        let graph_box_height = 383
        let graph_box_width = 290
        let graph_box_top = 10
        let graph_box_left = 615
        let dataLabelX = "Input AC voltage (volts)"
        
        // ! Forshowing dummy graph
        Scenes.items.graph_box_0.set(graph_box_left, graph_box_top, graph_box_height, graph_box_width).zIndex(5)
        Scenes.items.graph0.set(null,null,graph_height,graph_width)
        let ctx = Scenes.items.graph0.item
        let dummyGraphIdx = 10
        // graph idx is for  showing which graph is being shown
        let graphIdx = 0
        // * showing the dummy graph
        function showDummyGraph(zidx = 10){
          // if(forceShow || Scenes.items.chart.graph[dummyGraphIdx]==null){
          //   Scenes.items.graph_box_0.set()
          //   Scenes.plotGraph(ctx,dummyGraphIdx,true,dataLabelX,"")
          // }
          Scenes.items.graph_box_0.zIndex(zidx)
        }
        showDummyGraph()  
        
        // ! To Plot graph
        function plotGraphs(){
          let ctxs = {
            graph_box: [
              Scenes.items.graph_box_1.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
              Scenes.items.graph_box_2.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
              Scenes.items.graph_box_3.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
              Scenes.items.graph_box_4.set(graph_box_left,graph_box_top,graph_box_height,graph_box_width).zIndex(5),
            ],
            graph: [
              Scenes.items.graph1.set(null,null,graph_height,graph_width).item,
              Scenes.items.graph2.set(null,null,graph_height,graph_width).item,
              Scenes.items.graph3.set(null,null,graph_height,graph_width).item,
              Scenes.items.graph4.set(null,null,graph_height,graph_width).item,
            ]
          }
          let data = {
            labels: [
              ["Vdc"],
              ["Vo2"],
              ["Vo"],
              ["Power"],
            ],

            colors: [
              ["#ff0066"],
              ["#2f5597"],
              ["#ee00a4"],
              ["#dc1a06"],
            ],
            datas:[],
          }
          let yLabels = [
            "Voltage (volts)",
            "Voltage (volts)",
            "Voltage (volts)",
            "Power (watts)",
          ]
          function getDataFromTable(){
            let datas_XY = [] // vDC , Vo2, V0, Power
            let indexForTableColunmDataY = [
              [2],[4],[5],[7]
            ]
            let indexForTableColumnDataX = 1
            indexForTableColunmDataY.forEach(col_idxs=>{
              let col_idxs_datas = []
              col_idxs.forEach(col_idx=>{
                let rows = table.tBodies[0].rows
                // get data from rows.cells
                let col_idx_datas = []
                for(let row of rows){
                  let x = row.cells[indexForTableColumnDataX].innerHTML
                  let y = row.cells[col_idx].innerHTML
                  let data = {x,y}
                  col_idx_datas.push(data);
                }
                // save data on datas_XY
                col_idxs_datas.push(col_idx_datas)
              })
              datas_XY.push(col_idxs_datas)
            })
            return datas_XY
          }
          // table data to array conversion
          let datas_XY = getDataFromTable()
          data.datas = datas_XY

          // ! set all data and plot graph but hide all or don't set
          // and active all click buttons
          function dataToGraphConversion(){
            ctxs.graph.forEach((ctx,idx)=>{
              idx = idx
              let 
              xLabel = dataLabelX,
              yLabel = yLabels[idx],
              dataArrays = data.datas[idx],
              dataLabels = data.labels[idx],
              dataColor = data.colors[idx]
              // plot empty graph
              let graphRef = Scenes.plotGraph(ctx,idx,true,xLabel,yLabel)

              let first = 0
              // let second = 1
              let data_1 = {
                array: dataArrays[first],
                label: dataLabels[first],
                color: dataColor, 
              }
              // let data_2 = {
              //   array: dataArrays[second],
              //   label: dataLabels[second],
              //   color: dataColor, 
              // }
              Scenes.graphFeatures.addDataset(graphRef,data_1.label,data_1.color,data_1.array)
              // Scenes.graphFeatures.addDataset(graphRef,data_2.label,data_2.color,data_2.array)
              
            })
            Scenes.items.yLabel.setContent("")
            Scenes.items.xLabel.setContent("")
          }
          dataToGraphConversion()
                  
          // * graph tab btn onclick
          function btnGraphTab(){
            let subtitles = {
              lastButtonFunction: ()=>{
                // todo 
                  Dom.setBlinkArrowRed(-1)
                  setTimeout(() => {
                    // setCC("Click 'Next' to go to next step");
                    // Dom.setBlinkArrow(true, 790, 544).play();
                    // setIsProcessRunning(false);
                    Scenes.EE15AlreadySeleted++
                    if(Scenes.EE15AlreadySeleted <= 2){
                      setCC("Click on 'Reset' to select different values")
                      resetOnlyValues = false
                      Dom.setBlinkArrowRed(true,170, -20,30,null,90).play()
                    }else{
                      setCC("Simulation Done")
                      setCC("All the performance characteristics are observed with different values, ")
                      setCC("this concludes the virtual lab experiment on single phase AC-DC uncontrolled bridge rectifier.")
                      Scenes.items.btn_reset.item.onclick = ()=>{
                        location.reload()
                      }
                    }
                    // Scenes.currentStep = 8
                  }, 12000);
                // showArrowForAll()
                setCC("Here, the load power is increasing with increase in AC input voltage. Higher load power demands can only be met by setting high input AC voltage.")
              },
              arrows: [
                ()=>Dom.setBlinkArrowRed(true,708,10,30,null,90).play(),
                ()=>Dom.setBlinkArrowRed(true,778,10,30,null,90).play(),
                ()=>Dom.setBlinkArrowRed(true,848,10,30,null,90).play(),
                // ()=>Dom.setBlinkArrowRed(true,762,68,30,null,90).play(),
              ],
              texts: [
                "Here, DC component of load voltage is increasing with increase in AC input voltage.",
                "Here, the second harmonic component of  load voltage is increasing with increase in AC input voltage.",
                "Here, the load voltage is increasing with increase in AC input voltage.",
                // "In AC voltage controller the power factor decreases with increasing firing angle"
              ]
            }
            let btns = [
              Scenes.items.tab_1.item,
              Scenes.items.tab_2.item,
              Scenes.items.tab_3.item,
              Scenes.items.tab_4.item,
            ]

            btns.forEach((btn,idx)=>{

              btn.onclick = () =>{
                // dummy graph by zindex
                showDummyGraph(1)
                // Scenes.items.tab_1.styles({filter: "hue-rotate(158deg)"})
                // btn.style.filter = "hue-rotate(158deg)"

                //for labeling
                let conclusionFront = ""
                //* for conclusion
                switch(idx){ 
                  case 0: 
                    conclusionFront = "With R-load, the RMS output voltage ( V<sub>rms</sub>) is more as compared to average output voltage (V<sub>o</sub>)."
                    break;
                  
                  case 1: 
                    conclusionFront = "With R-load the I<sub>rms</sub> is more as compared to I<sub>o</sub> (average output current)"
                    break;
                  
                  case 2: 
                    conclusionFront = "The load power increases with increasing input ac source voltage."
                    break;
                  
                  case 3: 
                    conclusionFront = "Here, the ripple factor and TUF are constant and they are independent of load."
                    break;
                }
                // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

                for(let gb of ctxs.graph_box){
                  gb.hide()
                }

                // * show current clicked graph and labels
                ctxs.graph_box[idx].show()
                if(idx < btns.length - graphIdx - 1){
                  Dom.setBlinkArrowRed(-1)
                  setCC(subtitles.texts[idx]).onend = ()=>{
                    subtitles.arrows[idx]()
                  }
                }else{
                  subtitles.lastButtonFunction()
                }
                let yLabel = Scenes.items.chart.label[idx].y
                Scenes.items.yLabel.setContent(yLabel)
                Scenes.items.xLabel.setContent(dataLabelX)
              }
            })
          }
          btnGraphTab()
        }

        //* to check conclusion appearance
        // Scenes.items.tempTitle1.set(null, -74,108, 301 ).setContent("lorem20sdhs jfjdsf ajhs;as hdf asdlhf").addClass("conclusion").zIndex(2000).item


        // ! ------------> If data already present plot the graph
        // if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        //   // setDataToGraph()= 
        //     setIsProcessRunning(false)
        //     Scenes.currentStep  = 4

        //     recordBtnClickIdx = 21
        //     let r=7
        //     let tab=3
        //     // * to get old values from table for matching
        //     for(let i=0;i<tab;i++){
        //       let arr = []
        //       for(let j=0;j<r;j++){
        //         arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
        //       }
        //       valuesToMatch.push(arr)
        //     }

        //     disableSlider("r")
        //     disableSlider("v")
        //     setDataToGraph()
        // }else{
        //   plotGraph()
        // }
        
        //!onclick for delete btn
        Scenes.items.btn_delete.item.onclick =  function(){
          if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
            return
          }
          let rows = table.tBodies[0].rows
          let n = 8
          
          for(let i=1;i<n;i++){
            rows[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
          }
          recordBtnClickIdx = recordBtnClickIdx-1
          if(recordBtnClickIdx==0){
            // disableSlider("reset")
          }
          valuesToMatch.pop()
          let constVal1 = 50
          let constVal2 = 220
          // for safe the prdefined values
          if(recordBtnClickIdx==0){
            rows[0].cells[1].innerHTML = constVal1
            // valuesToMatch.push(constVal1)
          }else if(recordBtnClickIdx==1){
            rows[1].cells[1].innerHTML = constVal2
            // valuesToMatch.push(constVal2)
          }
        }

        //! onclick for reset 
        Scenes.items.btn_reset.item.onclick = ()=>{
          btn_reset_function("full")
        }

        let currentTableIdx = 0
        // ! onclick for record
        Scenes.items.btn_record.item.onclick = function(){
          if(recordBtnClickIdx==0){
            sliders.v_knob.click()
          }
          // for arrow system
          if(0 <= recordBtnClickIdx && recordBtnClickIdx <1){
            Dom.setBlinkArrowRed(true,50,-18,30,null,90).play()
            setCC("Press Record")
          }else if(recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true,70,30,30,null,-90).play()
            setCC("Set the ac voltage")
          } 
          // dutyRatioValue/d is firing angle
          let vInValue = Number(sliders.v.value)
          // let dutyRatioValue = Number(sliders.d.value)
          // * for default two values
          if(recordBtnClickIdx == 0 || recordBtnClickIdx == 1){
            vInValue = recordBtnClickIdx == 0 ? 50 : 220
          }
          let resistanceValue = 50 // 50 ohm fixed
          updateValues(vInValue,rf_val ,r_val, l_val)
          // ! Can't select same values
          if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(vInValue)!=-1){
            setCC("Please set different ac voltage.")
            return
          }else{
            valuesToMatch.push(vInValue)
          }

          // ! sort the data
          if(recordBtnClickIdx==7){

            function sortTable(){
              var rows = table.tBodies[0].rows
              let valueColumnToShort = 2
              
              let n=7
              for(let i=0;i<n;i++){
                  for(let j=0;j<n-i-1;j++){
                      let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
                      let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
                      if(val1 > val2){
                          let temp = rows[j].innerHTML
                          rows[j].innerHTML = rows[j+1].innerHTML
                          rows[j+1].innerHTML = temp
                      }
                  }
              }
              for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
              }
            }
            sortTable()
            // ! plot all graphs
            plotGraphs()
            

            // ! Graph Tab Buttons click
            function graphTabButtonArrows(){
              window.speechSynthesis.cancel()
              // conclusionFontAdd_1
              // let text = "To see the average and rms load voltage variation with input ac voltage press the respective button."
              // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(text).addClass("conclusion").zIndex(2000).item
              Dom.setBlinkArrowRed(-1)
              // setCC(text).onend = ()=>{
                Dom.setBlinkArrowRed(true,641,10,30,null,90).play()
              // }
              // refer to plotGraphs() area

            }
            graphTabButtonArrows()
            // after complete
            // Dom.setBlinkArrow(true, 790, 408).play()
            // setCC("Click 'Next' to go to next step")
            // setIsProcessRunning(false)
            // Scenes.currentStep = 4
          }

          // deactivate the sliders after first value  done
          // todo
          if(recordBtnClickIdx == 0){
            // disableSlider("v")
            // disableSlider("d")
          }
          let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
          // let FiringAngleValue = tableRow.cells[2].innerHTML
          tableRow.cells[1].innerHTML = vInValue
          tableRow.cells[2].innerHTML = Number(Formulas.r_load.vdc(values)).toFixed(2)
          tableRow.cells[3].innerHTML = Number(Formulas.r_load.v2h(values)).toFixed(2)
          tableRow.cells[4].innerHTML = Number(Formulas.r_load.v02(values)).toFixed(2)
          tableRow.cells[5].innerHTML = Number(Formulas.r_load.v0(values)).toFixed(2)
          tableRow.cells[6].innerHTML = Number(Formulas.r_load.idc(values)).toFixed(2)
          tableRow.cells[7].innerHTML = Number(Formulas.r_load.power(values)).toFixed(2)
          // tableRow.cells[8].innerHTML = Number(Formulas.r_load.eff(values)).toFixed(2)
          // tableRow.cells[9].innerHTML = Number(Formulas.r_load.rf(values)).toFixed(2)
          // tableRow.cells[10].innerHTML = Number(Formulas.r_load.tuf(values)).toFixed(2)
          // added a display none column

          // let x = tableRow.cells[9].innerHTML
          // let y = tableRow.cells[10].innerHTML
          // // ! addData to graph
          // graph.addData(0,{x:x,y:y})

          // if(recordBtnClickIdx>6){
          //   // after complete
          //   Dom.setBlinkArrow(true, 790, 408).play();
          //   setCC("Click 'Next' to go to next step");
          //   setIsProcessRunning(false); 
          //   Scenes.currentStep = 4
          // }
          // warning for sorting the data
          // if(recordBtnClickIdx==7){
          //   setCC("Click 'Record' to sort the table according to D and plot the graph.")
          // }
        }    
      }
      return true;

    }),


    // (step6 = function () {
    //   setIsProcessRunning(true);
 
    //   Scenes.setStepHeading(
    //     "",
    //     "Efficiency Plot."
    //   )
    //   // setCC("Record 7 reading for different Load Resistances (R0)")
    //     // ! show the slider
    //   Scenes.items.slider_box.set(-65,-60)
    //   Scenes.items.btn_next.show()

    //   //! Required Items
    //   // Scenes.items.circuit_full_3.set(230,-50,150)
    //   // Scenes.items.part_3_option_3.set(-30, 155)
    //    Scenes.items.part3_table_three.show()
    //   //  Scenes.items.right_tick_1.set(-5,175)
    //   Scenes.items.record_btn.set(770,220,70)
    //   Scenes.items.btn_delete.set(785,290)
    //   Scenes.items.btn_reset.set(787,350)
    //   Scenes.items.part3_table_three.set(20)
    //    let table = Scenes.items.part3_table_three.item
    //    let valuesToMatch = []
    //     // * index to handle records
    //   let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[4].innerHTML==""?0:7)
      


    //    // ! graph
    //   Scenes.items.graph4.set(null,null,220,355)
    //   let ctx = Scenes.items.graph4.item
      
    //   // let xLabel = "Output Power (Po)"
    //   let xLabel = ""
    //   let yLabel = "Efficiency (%)"
    //   function plotGraph(data,label,xLabel,yLabel,beginAtZero=false){
    //     let x = new Chart(ctx, {
    //       type: "scatter",
    //       plugins: [{
    //         afterDraw: chart => {
    //           var ctx = chart.chart.ctx;
    //           ctx.save();
    //           ctx.textAlign = 'center';
    //           ctx.font = '18px Arial';
    //           ctx.fillStyle = 'black';
    //           ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
    //           ctx.textAlign = 'left';
    //           ctx.font = '10px Arial';
    //           ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
    //           ctx.restore();
    //         },
            
    //       }],
    //       data: {
    //         datasets: [
    //             {
    //               label: label,
    //               fill: false,
    //               borderColor: "red",
    //               backgroundColor: "red",
    //               data: data,
    //             },
    //         ],
    //       },
    //       options: {
    //         scales: {
    //           yAxes: [
    //             {
    //               scaleLabel: {
    //                 display: true,
    //                 labelString: yLabel,
    //                 fontColor: 'black',
    //                 fontSize: 17,
  
    //               },
    //               ticks: { 
    //                 beginAtZero:beginAtZero,
    //                 fontColor: 'black',
    //                 fontSize: 14,
    //               }
    //             },
    //           ],
    //           xAxes: [
    //             {
    //               scaleLabel: {
    //                 display: true,
    //                 labelString: xLabel,
    //                 fontColor: 'black',
    //                 fontSize: 17,
    //               },
    //               ticks: { 
    //                 beginAtZero:beginAtZero,
    //                 fontColor: 'black',
    //                 fontSize: 14,
    //               }
    //             },
    //           ],
    //         },
    //       },
    //     })
    //   }

    //   // let slidersBox = document.querySelectorAll(".slider")
    //   // let slidersBox = document.querySelectorAll(".range-slider__range")
    //   function stepTutorial2(){

    //     Dom.setBlinkArrowRed(true,50,-50,30,30,-90).play()
    //     setCC("Select the value of V<sub>g</sub>")

    //     sliders.vImg.onclick = ()=>{
    //       sliderV()
    //       sliders.vImg.click()
    //       Dom.setBlinkArrowRed(true,215,110,null,null,90).play()
    //       setCC("Set the value of D",5)

    //       sliders.d.onclick = ()=>{
    //         Dom.setBlinkArrowRed(true,560,20).play()
    //         setCC("Set the value of R")

    //         sliders.r.onclick = ()=>{
    //           Dom.setBlinkArrowRed(true,894,226).play()
    //           setCC("Press Record")

    //           sliders.clearOnclick()
    //         }
    //       }
    //     }
    //   }
    //   if(recordBtnClickIdx == 0){
    //     stepTutorial2()
    //   }

      
    //   function setDataToGraph(){
    //     let graphData = []
    //     var rows = table.tBodies[0].rows
    //     let n = 7
    //     for(let i=0;i<n;i++){
    //       graphData.push(
    //         {
    //           x: rows[i].cells[9].innerHTML,
    //           y: rows[i].cells[10].innerHTML
    //         }
    //       )
    //     }
    //     plotGraph(graphData,"Efficiency","",yLabel)
    //     Scenes.items.graph4.set(null,null,220,355)
    //   }
    //   // ! ------------> If data already present plot the graph
    //   if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
    //     setIsProcessRunning(false)
    //     Scenes.currentStep = 4

    //     recordBtnClickIdx = 7
    //     let rows = table.tBodies[0].rows
    //     let n=7
    //     // * to get old values from table for matching
    //     for(let i=0;i<n;i++){
    //       let val = rows[i].cells[2].innerHTML
    //       valuesToMatch.push(Number(val))
    //     }
    //   }else{
    //     // ! Please note this when plot the graph then show the graph ... 
    //     plotGraph([{}],"Efficiency","",yLabel,true) 
    //     Scenes.items.graph4.set(null,null,220,355)
    //     disableSlider("reset")
    //   }

    //   // // ! adding data set
    //   // graph.addDataset(
    //   //   "Efficiency",
    //   //   "red",
    //   //   []
    //   // )
       

    //    //!onclick for delete btn
    //    Scenes.items.btn_delete.item.onclick =  function(){
    //     if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
    //       return
    //     }
    //     let row = table.tBodies[0].rows
    //     let n=11
        
    //     for(let i=1;i<n;i++){
    //       row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
    //     }
    //     recordBtnClickIdx = recordBtnClickIdx-1
    //     if(recordBtnClickIdx==0){
    //       disableSlider("reset")
    //     }
    //     valuesToMatch.pop()
    //   }

    //   //! onclick for reset 
    //   Scenes.items.btn_reset.item.onclick = function(){
    //     var rows = table.tBodies[0].rows
    //     let n=7
    //     let m=11
  
    //     for(let i=0;i<n;i++){
    //       for(let j=1;j<m;j++){
    //         rows[i].cells[j].innerHTML = "";
    //       }
    //     }

    //     // reset all the parameters
    //     // so just simply call this step again
    //     sliders.reset()
    //     Scenes.steps[7]()        
        
    //   }

    //   // ! onclick for record
    //   Scenes.items.record_btn.item.onclick = function(){ 
    //      // for arrow system
    //      if(recordBtnClickIdx < 6){
    //         Dom.setBlinkArrowRed(true,560,75).play()
    //         setCC("Change the value of R and Record it")

    //         sliders.r.onclick = ()=>{
    //           Dom.setBlinkArrowRed(true,894,226).play()
    //           setCC("Press Record")

    //           sliders.clearOnclick()
    //         }
    //     }else{
    //       Dom.setBlinkArrowRed(-1)
    //     }
        
    //     let vInValue = Number(sliders.v.value)
    //     let dutyRatioValue = Number(sliders.d.value)
    //     let resistanceValue = Number(sliders.r.value)
    //     updateValues(vInValue,dutyRatioValue,resistanceValue)

    //     // ! Can't select same values
    //     if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(resistanceValue)!=-1){
    //       setCC("Please select different value.")
    //       return
    //     }else{
    //       valuesToMatch.push(resistanceValue)
    //     }

    //     // ! sort the data
    //     if(recordBtnClickIdx==7){

    //       function sortTable(){
    //         var rows = table.tBodies[0].rows

    //         let n=7
    //         for(let i=0;i<n;i++){
    //             for(let j=0;j<n-i-1;j++){
    //                 let val1 = Number(rows[j].cells[9].innerHTML)
    //                 let val2 = Number(rows[j+1].cells[9].innerHTML)
    //                 if(val1 > val2){
    //                     let temp = rows[j].innerHTML
    //                     rows[j].innerHTML = rows[j+1].innerHTML
    //                     rows[j+1].innerHTML = temp
    //                 }
    //             }
    //         }
    //         for(let i=0;i<n;i++){
    //             rows[i].cells[0].innerHTML = i+1
    //         }
    //       }
    //       sortTable()

    //       // * plot the graph
    //       // adding parameter to x,y graph
    //       // var rows = table.tBodies[0].rows
    //       // let n = 7
    //       // for(let i=0;i<n;i++){
    //       //   graph.addData(0,
    //       //     {
    //       //       x: rows[i].cells[9].innerHTML,
    //       //       y: rows[i].cells[10].innerHTML
    //       //     }
    //       //   )
    //       // }
    //       setDataToGraph()

    //       // after complete
    //       Dom.setBlinkArrow(true, 790, 408).play()
    //       setCC("Click 'Next' to go to next step")
    //       setIsProcessRunning(false)
    //       Scenes.currentStep = 4
    //     }


        

    //     // deactivate the sliders after first value  done
    //     // todo
    //     if(recordBtnClickIdx == 0){
    //       disableSlider("v")
    //       disableSlider("d")
    //     }
    //     let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
    //     tableRow.cells[1].innerHTML = vInValue
    //     tableRow.cells[2].innerHTML = dutyRatioValue
    //     tableRow.cells[3].innerHTML = resistanceValue
    //     tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
    //     tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
    //     tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
    //     tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
    //     tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
    //     tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
    //     tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

    //     // let x = tableRow.cells[9].innerHTML
    //     // let y = tableRow.cells[10].innerHTML
    //     // // ! addData to graph
    //     // graph.addData(0,{x:x,y:y})

    //     // if(recordBtnClickIdx>6){
    //     //   // after complete
    //     //   Dom.setBlinkArrow(true, 790, 408).play();
    //     //   setCC("Click 'Next' to go to next step");
    //     //   setIsProcessRunning(false); 
    //     //   Scenes.currentStep = 4
    //     // }
    //     // warning for sorting the data
    //     if(recordBtnClickIdx==7){
    //       setCC("Click 'Record' to sort the table according to D and plot the graph.")
    //     }
    //   }    
       
      

      
    //   return true
    // }),
    // (step7 = function () {
    //   setIsProcessRunning(true);
 
    //   Scenes.setStepHeading(
    //     "",
    //     "Component Stress"
    //   )
    //     // ! show the slider
    //   Scenes.items.slider_box.set(-70,-60)
    //   Scenes.items.btn_next.show()

    //   //! Required Items
    //   // Scenes.items.circuit_full_2.set(270,0,160)
    //   //  Scenes.items.part_3_option_4.set(-30, 170,100,220)
    //   // Scenes.items.right_tick_1.set(-12,185)
    //   Scenes.items.part3_table_four.set(10,170)
    //   Scenes.items.part3_table_four_2.set(10,240)
    //   Scenes.items.record_btn.set(465,180,60)
    //   //  Scenes.items.part_3_option_4_graph.set(295,-60,60)

    //   let styles = {
    //     color: "black",
    //     backgroundColor: "white",
    //     width: "80px",
    //     rotate: "-90deg"
    //   }
    //   Scenes.items.tempTitle1.set(548,25).zIndex(4000).setContent("Switch").styles(styles)
    //   Scenes.items.tempTitle2.set(548,150).zIndex(4000).setContent("Diode").styles(styles)
    //   Scenes.items.tempTitle3.set(548,290).zIndex(4000).setContent("Capacitor").styles(styles)
    //    let graph_box5 = new Dom(".graph_box5")
    //    // ! graph
    //   // Scenes.items.graph4.set(null,null,190,290)
    //   Scenes.items.graph5.set(null,0,390,320).styles({marginLeft: "15px"})
    //   graph_box5.set(575,-70,475,365)
    //   let table = Scenes.items.part3_table_four.item

    //   let ctx2 = Scenes.items.graph5.item
    //   let chart2 = Scenes.items.chart.graph5
      
    //   function plotGraph(){
    //     let data = {
    //       labels: ['Switch', 'Diode', 'Capacitor'],
    //       datasets: [
    //           {
    //               label: 'Voltage Stress',
    //               backgroundColor: 'rgba(255, 0, 0, 1)',
    //               borderColor: 'rgba(255, 0, 0, 1)',
    //               borderWidth: 1,
    //               data: []
    //           },
    //           {
    //               label: 'Current Stress',
    //               backgroundColor: 'rgba(0, 0, 255, 1)',
    //               borderColor: 'rgba(0, 0, 255, 1)',
    //               borderWidth: 1,
    //               data: []
    //           },
    //           {
    //               label: 'Power',
    //               backgroundColo r: 'rgba(0, 128, 0, 1)',
    //               borderColor: 'rgba(0, 128, 0, 1)',
    //               borderWidth: 1,
    //               data: [],
    //           }
    //       ]
    //   };

    //   let options = {
    //       maintainAspectRatio: false,
    //       scales: {
    //           xAxes: [{
    //               ticks: {
    //                   fontSize: 17,
    //                   fontWeight: 'bold',
    //                   fontColor: 'black',
    //                   beginAtZero: true
    //               }
    //           }],
    //           yAxes: [{
    //               ticks: {
    //                   display: false,
    //                   // fontSize: 17,
    //                   // fontWeight: 'bold',
    //                   // fontColor: 'black',
    //                   // beginAtZero: true,
    //                   // autoSkip: false,
    //                   // position: "right",
    //                   // maxRotation: 90, // Rotate labels to 90 degrees
    //                   // minRotation: 90,
    //                   // callback: function(value) {
    //                   //   return value // You can add custom formatting here if needed
    //                   // }
    //               }
    //           }]
    //       }
    //   };

    //   chart2 = new Chart(ctx2, {
    //       type: 'horizontalBar',
    //       data: data,
    //       options: options
    //   });
    //   Scenes.items.chart.graph5 = chart2
    //   Scenes.items.graph5.set(0,0,475,345)
    // }

    //   // let slidersBox = document.querySelectorAll(".slider")
    //   let slidersBox = document.querySelectorAll(".range-slider__range")
    //   function stepTutorial2(){

        
    //     Dom.setBlinkArrowRed(true,50,-50,30,30,-90).play()
    //     setCC("Select the value of V<sub>g</sub>")

    //     sliders.vImg.onclick = ()=>{
    //       sliderV()
    //       sliders.vImg.click()
    //       Dom.setBlinkArrowRed(true,215,110,null,null,90).play()
    //       setCC("Set the value of D",5)

    //       sliders.d.onclick = ()=>{
    //         Dom.setBlinkArrowRed(true,560,20).play()
    //         setCC("Set the value of R")

    //         sliders.r.onclick = ()=>{
    //           Dom.setBlinkArrowRed(true,504,140,30,30,-90).play()
    //           setCC("Press Record")

    //           sliders.clearOnclick()
    //         }
    //       }
    //     }

    //   }
    //   if(table.tBodies[0].rows[0].cells[3].innerHTML == ""){
    //     stepTutorial2()
    //   }
    //   const graph = {
    //     addDataset(chart,label,bgColor,data){
    //       chart.data.datasets.push(
    //         {
    //           label: label,
    //           fill: true,
    //           borderColor: bgColor,
    //           data: data,
    //         }
    //       )
    //       chart.update()
    //     },
    //     addData(chart,index,data){
    //       console.log(data)
    //       if(data.length > 0){
    //         chart.data.datasets[index].data = data
    //       }else{
    //         chart.data.datasets[index].data.push(data)
    //       }
    //       chart.update()
    //     }
    //   }

    //    // ! ------------> If data already present plot the graph
    //     if(table.tBodies[0].rows[0].cells[6].innerHTML !== ""){
    //       setIsProcessRunning(false)
    //       Scenes.items.graph5.set(0,0,475,345)
    //       Scenes.currentStep = 4
    //     }else{
    //       plotGraph()
    //     }   

       
    //    // ! onclick for record
    //    Scenes.items.record_btn.item.onclick = function(){
    //     Dom.setBlinkArrowRed(-1)

    //      let vInValue = Number(sliders.v.value)
    //      let dutyRatioValue = Number(sliders.d.value)
    //      let resistanceValue = Number(sliders.r.value)

    //      updateValues(vInValue,dutyRatioValue,resistanceValue)
 
    //      let tableRow = table.tBodies[0].rows[0]
    //      tableRow.cells[1-1].innerHTML = vInValue
    //      tableRow.cells[2-1].innerHTML = dutyRatioValue
    //      tableRow.cells[3-1].innerHTML = resistanceValue
    //      tableRow.cells[4-1].innerHTML = Number(Formulas.stress.v0(values)).toFixed(2)
    //      tableRow.cells[5-1].innerHTML = Number(Formulas.stress.M(values)).toFixed(2)
    //      tableRow.cells[6-1].innerHTML = Number(Formulas.stress.i2(values)).toFixed(2)
    //      tableRow.cells[7-1].innerHTML = Number(Formulas.stress.i0(values)).toFixed(2)


    //      let v0 = Number(Formulas.stress.v0(values)).toFixed(2)
    //      let i2 = Number(Formulas.stress.i2(values)).toFixed(2)
    //      let ic = Number(Formulas.stress.i2(values) - Formulas.stress.i0(values)).toFixed(2)
    //      let pSw = Number(Formulas.stress.pSw(values)).toFixed(2)
    //      let pDi = Number(Formulas.stress.pDi(values)).toFixed(2)
         
    //      // table two changes
    //      let table2Row = Scenes.items.part3_table_four_2.item.tBodies[0].rows
    //     table2Row[0].cells[1].innerHTML = `> v<sub>0</sub> (${v0})`
    //     table2Row[1].cells[1].innerHTML = `> v<sub>0</sub> (${v0})`
    //     table2Row[2].cells[1].innerHTML = `> v<sub>0</sub> (${v0})`
        
    //     table2Row[0].cells[2].innerHTML = `> i<sub>2</sub> (${i2})`
    //     table2Row[1].cells[2].innerHTML = `> i<sub>2</sub> (${i2})`
    //     table2Row[2].cells[2].innerHTML = `> (i<sub>2</sub>-i<sub>0</sub>)(${ic})`

    //     table2Row[0].cells[3].innerHTML = `> P<sub>Sw</sub> (${pSw})`
    //     table2Row[1].cells[3].innerHTML = `> i<sub>2</sub> (${pDi})`

    //     // ! add values to graph
    //     let graph2_voltageStress = [v0,v0,v0]
    //     let graph2_currentStress = [i2,i2,ic]
    //     let graph2_power = [pSw,pDi]

    //     // ! destroy and show new graph
    //     // plotGraph()
    //     graph.addData(chart2,0,graph2_voltageStress)
    //     graph.addData(chart2,1,graph2_currentStress)
    //     graph.addData(chart2,2,graph2_power)
    //       // after complete
    //       Dom.setBlinkArrow(true, 790, 408).play();
    //       // setCC("Click 'Next' to go to next step");
    //       setIsProcessRunning(false); 
    //       Scenes.currentStep = 4

    //       // ! fix resistance value to its original
    //       // resistanceSlider.min = 10
    //       // resistanceSlider.max = 500
    //       // resistanceSlider.step = 1        
    //       // resistanceSlider.value = 10
    //       // resistanceSlider.oninput = ()=>{}
    //    }    
    //   return true
    // }),
  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

// stepcalling       
Scenes.currentStep = 1

Scenes.next()
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next")

const backBtn = get(".btn-back")
nextBtn.addEventListener("click", () => {
  Scenes.next();
})
backBtn.addEventListener("click", () => {
  Scenes.back();
})

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
    window.speechSynthesis.cancel()
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox(){
  let popupBtns = document.querySelectorAll(".btn-popup")
  let popupWindow = document.querySelector(".btn-popup-window")
  
  popupBtns[0].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_procedure.item.src
  }
  popupBtns[1].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src
  }
  popupBtns[2].onmouseover = ()=>{
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src
        break;
    
      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src
        break;
    }
  }
}
btnPopupBox()

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }
























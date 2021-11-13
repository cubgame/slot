'use strict' ;

{
  const picture = document.getElementById("picture");
  const question = document.getElementById("question");
  const btn = document.getElementById("btn");
  const choices = document.getElementById("choices");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector("#result > p");


  document.addEventListener("turbolinks:load", function() {
    // ...
  })

  const quizSet = [
    {i: "./q1.png", q: "スーパーカブが初めて発売された年は?" ,c: ["1958年", "1978年", "1968年"]},
    {i: "./q2.png", q: "HONDAの創業者は?" ,c: ["本田宗一郎", "本田総一郎", "本田壮一郎"]},
    {i: "./q3.png", q: "「カブ」の由来は?" ,c: ["「猛獣の子供」のように小さくてもパワーがある", "「切り株」にまつわる歌舞伎の演目から", "「Cute Unique Bike」の略"]},
    {i: "./q4.png", q: "スーパーカブ50の法定速度は?" ,c: ["時速30km", "秒速30km", "時速30cm"]},
    {i: "./q5.png", q: "スーパーカブの前輪ブレーキはどこにある?" ,c: ["右ハンドル", "左ハンドル", "右足ステップ"]},
    {i: "./q6.png", q: "スーパーカブ生誕60周年限定カラーはどれ?" ,c: ["マグナレッド", "マグマレッド", "ハクナマタタ"]},
    {i: "./q7.png", q: "小説『スーパーカブ』の主人公の名前は?" ,c: ["子熊", "子鹿", "子馬"]},
    {i: "./q8.png", q: "バッグや地図などを固定するための積載装置は?" ,c: ["ベトナムキャリア", "フィリピンキャリア", "チリキャリア"]},
    {i: "./q9.png", q: "軽車両はどれ?" ,c: ["馬", "スーパーカブ", "セグウェイ"]},
    {i: "./q10.png", q: "最終問題！カブに乗ってみ...?" ,c: ["たい！", "たくない", "♨︎"]},
  ];
  let currentNum = 0;
  let isAnswered;
  let score = 0;


  function shuffle(arr) {
    for(let i = arr.length -1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j],arr[i]] = [arr[i],arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered){
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]){
      li.classList.add("correct");
      score++;
    }else{
      li.classList.add("wrong");
    }

    btn.classList.remove("disabled");
  }

  function setQuiz() {
    isAnswered = false;
    picture.src=quizSet[currentNum].i;
    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", ()=> {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = "気になる得点は...?";
    }
  }

  setQuiz();

  btn.addEventListener("click", ()=> {
    if (btn.classList.contains("disabled")){
      return;
    }
    btn.classList.add("disabled");

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `得点: ${score} / ${quizSet.length}`;
      result.classList.add("show");
    }else{
    currentNum++;
    setQuiz();
    }

  });



}
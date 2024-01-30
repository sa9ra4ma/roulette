<script lang='ts'>
  import { onMount } from 'svelte';
  import OptionLabel from '$lib/component/OptionLabel.svelte';
  import QuizCard from '$lib/component/QuizCard.svelte';

  // export let data
  // let weapons = data.weapons.map(v => v.name);

  let correctCount = 0;
  let resultComment = '';
  
  function answerQuiz1(){
    let elements = document.getElementsByName('question1');
    let len = elements.length;
    let checkValue = '';
    let i = 0;
    for (i = 0; i < len; i++){
      if (elements.item(i).checked){
        checkValue = elements.item(i).value;
        break;
      }
    }
    if (checkValue === 'option1-3') correctCount++;

    var quiz1 = document.getElementById('quiz1');
    quiz1.classList.add('hidden');

    setTimeout(() => {
      if (i < 4) elements.item(i).checked = false;
      quiz1.classList.add('display-none');
      var quiz2 = document.getElementById('quiz2');
      quiz2.classList.remove('hidden');
    }, 1000);
  }

  function answerQuiz2(){
    let elements = document.getElementsByName('question2');
    let len = elements.length;
    let checkValue = '';
    let i = 0;
    for (i = 0; i < len; i++){
      if (elements.item(i).checked){
        checkValue = elements.item(i).value;
        break;
      }
    }
    if (checkValue === 'option2-1') correctCount++;

    var quiz2 = document.getElementById('quiz2');
    quiz2.classList.add('hidden');

    setTimeout(() => {
      if (i < 4) elements.item(i).checked = false;
      quiz2.classList.add('display-none');
      var quiz3 = document.getElementById('quiz3');
      quiz3.classList.remove('hidden');
    }, 1000);
  }

  function answerQuiz3(){
    let elements = document.getElementsByName('question3');
    let len = elements.length;
    let checkValue = '';
    let i = 0;
    for (i = 0; i < len; i++){
      if (elements.item(i).checked){
        checkValue = elements.item(i).value;
        break;
      }
    }
    if (checkValue === 'option3-3') correctCount++;

    switch (correctCount) {
      case 0:
        resultComment = 'やる気ある？';
        break;
      case 1:
        resultComment = 'まぐれで1問！';
        break;
      case 2:
        resultComment = 'いっつもあと一歩！';
        break;
      case 3:
        resultComment = '知識だけはいっちょまえ！';
        break;
      default:
        break;
    }

    var quiz3 = document.getElementById('quiz3');
    quiz3.classList.add('hidden');

    setTimeout(() => {
      if (i < 4) elements.item(i).checked = false;
      quiz3.classList.add('display-none');
      var result = document.getElementById('result');
      result.classList.remove('hidden');
    }, 1000);
  }

  function returnToStart(){
    var result = document.getElementById('result');
    result.classList.add('hidden');
    
    setTimeout(() => {
      correctCount = 0;
      resultComment = '';

      var quiz1 = document.getElementById('quiz1');
      var quiz2 = document.getElementById('quiz2');
      var quiz3 = document.getElementById('quiz3');
      quiz1.classList.remove('display-none');
      quiz2.classList.remove('display-none');
      quiz3.classList.remove('display-none');
      
      // なんかよくわかんないけどこうしないと1問目がパッと出てきて動きが微妙だからこうしてる
      setTimeout(() => {
        quiz1.classList.remove('hidden');
      }, 1)
    }, 1000);
  }

  let options1 = ["32.0", "34.0", "36.0", "38.0"];
  let options2 = ["メガホンレーザー", "エナジースタンド", "キューインキ", "アメフラシ"];
  let options3 = ["ボトルガイザー", "ジェットスイーパー", "ロングブラスター", "エクスプロッシャー"];

  const response = [
    {
      quiz_id: 1,
      question: 'スプラシューターのメインのダメージ量は？',
      type: 1,
      options: [
        { text: '32.0', display_order: 1 },
        { text: '34.0', display_order: 2 },
        { text: '36.0', display_order: 3 },
        { text: '38.0', display_order: 4 },
      ],
      correct_choises_no: 3,
    },
    {
      quiz_id: 2,
      question: '14式竹筒銃・甲のスペシャルウェポンは？',
      type: 1,
      options: [
        { text: 'メガホンレーザー', display_order: 1 },
        { text: 'エナジースタンド', display_order: 2 },
        { text: 'キューインキ', display_order: 3 },
        { text: 'アメフラシ', display_order: 4 },
      ],
      correct_choises_no: 1,
    },
    {
      quiz_id: 3,
      question: '以下のブキの中で1番射程が短いものは？',
      type: 1,
      options: [
        { text: 'ボトルガイザー', display_order: 1 },
        { text: 'ジェットスイーパー', display_order: 2 },
        { text: 'ロングブラスター', display_order: 3 },
        { text: 'エクスプロッシャー', display_order: 4 },
      ],
      correct_choises_no: 3,
    },
  ]

  function generateRadioId(quizNo, optionNo) {
    return `option${quizNo}-${optionNo}`
  }
</script>

<title>四択クイズ</title>

<div class="main">
  <div class="title">スプラクイズ</div>
  <!-- なんか後からクラス追加しても動かない、事前にここに書かれてるクラスなら後から追加できるから書いてる -->
  <div class="hidden display-none"></div>

  <div class="container">
    <QuizCard
      question="スプラシューターのメインのダメージ量は？"
      questionNo={1}
      options={options1}
      isHidden={false}
      on:answerQuestion={answerQuiz1}
    />

    <QuizCard
      question="14式竹筒銃・甲のスペシャルウェポンは？"
      questionNo={2}
      options={options2}
      isHidden={true}
      on:answerQuestion={answerQuiz2}
    />

    <QuizCard
      question="以下のブキの中で1番射程が短いものは？"
      questionNo={3}
      options={options3}
      isHidden={true}
      on:answerQuestion={answerQuiz3}
    />

    <div id="result" class="main-quiz fade-out hidden">
      <h2>結果: 3問中{correctCount}問正解！</h2>
      <div class="result-comment">{resultComment}</div>
      <div class="answer-btn-wrap">
        <button class="answer-btn" on:click={returnToStart}>もう一回挑戦！</button>
      </div>
    </div>
  </div>
</div>

<style>
  .main {
    width: 340px;
    margin: 0 auto;
  }

  .main-quiz {
    background-color: #e1fffd;
    box-shadow: 0 0 8px gray;
    padding: 20px;
    margin: 10px 0 0 0;
    border-radius: 10px;
  }

  .fade-out {
    opacity: 1;
    transition: opacity 1s ease;
  }
  .hidden{
    opacity: 0;
  }
  .display-none {
    display: none;
  }

  .title {
    text-align: center;
  }

  .select {
    text-align: center;
    margin: 0 auto 20px;
  }

  .answer-btn-wrap {
    text-align: center;
  }
  .answer-btn {
    padding: 0.8em 3em;
    background-color: #f3f5fb; /* 背景色 */
    box-shadow: 0 3px 0 #a2a4a7; /* 影の太さ・色 */
    border-radius: 60px;
    cursor: pointer;
  }

  .result-comment {
    margin: 0 0 20px 0;
  }
</style>

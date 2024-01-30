<script lang='ts'>
  import { onMount } from 'svelte';
  import OptionLabel from '$lib/component/OptionLabel.svelte';

  // export let data
  // let weapons = data.weapons.map(v => v.name);

  let correctCount = 0;
  let resultComment = '';

  onMount(() => {
    // 最初のdivをフェードアウトして、別のdivを表示する関数
    function fadeOutAndShowNext() {
      var fadeOutDiv = document.getElementById('fadeOutDiv');
      var nextDiv = document.getElementById('nextDiv');
        
      // fadeOutDivをフェードアウト
      fadeOutDiv.classList.add('hidden');
        
      // 3秒後に次のdivを表示
      setTimeout(function() {
        fadeOutDiv.classList.add('display-none');
        nextDiv.classList.remove('display-none');
      }, 3000); // 1秒後に次のdivを表示
    }
    // setTimeout(()=>fadeOutAndShowNext(),3000);
    
    // ページ読み込み後、3秒後にフェードアウトと次のdivの表示を開始
    // window.onload = function() {
    //     setTimeout(fadeOutAndShowNext, 3000); // 3秒後にフェードアウトと次のdivの表示を開始
    // };
  });
  
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
    <div id="quiz1" class="main-quiz fade-out">
      <h2>Q1: スプラシューターのメインのダメージ量は？</h2>
      <div class="select">
        {#each options1 as option, i}
          <OptionLabel
            name="question1"
            id="{generateRadioId(1, i + 1)}"
            value="{generateRadioId(1, i + 1)}"
            option="{option}"
          />
        {/each}
      </div>

      <div class="answer-btn-wrap">
        <button class="answer-btn" on:click={answerQuiz1}>NEXT→</button>
      </div>
    </div>

    <div id="quiz2" class="main-quiz fade-out hidden">
      <h2>Q2: 14式竹筒銃・甲のスペシャルウェポンは？</h2>
      <div class="select">
        {#each options2 as option, i}
          <OptionLabel
            name="question2"
            id="{generateRadioId(2, i + 1)}"
            value="{generateRadioId(2, i + 1)}"
            option="{option}"
          />
        {/each}
      </div>

      <div class="answer-btn-wrap">
        <button class="answer-btn" on:click={answerQuiz2}>NEXT→</button>
      </div>
    </div>

    <div id="quiz3" class="main-quiz fade-out hidden">
      <h2>Q3: 以下のブキの中で1番射程が短いものは？</h2>
      <div class="select">
        {#each options3 as option, i}
          <OptionLabel
            name="question3"
            id="{generateRadioId(3, i + 1)}"
            value="{generateRadioId(3, i + 1)}"
            option="{option}"
          />
        {/each}
      </div>

      <div class="answer-btn-wrap">
        <button class="answer-btn" on:click={answerQuiz3}>NEXT→</button>
      </div>
    </div>

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

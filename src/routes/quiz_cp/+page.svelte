<script lang='ts'>
  import { onMount } from 'svelte';
  import QuizCard from '$lib/component/QuizCard.svelte';

  let correctCount = 0;
  let resultComment = '';
  
  function answerQuiz(number: number, correctAnswerNumber: number, isLast: boolean){
    let elements = document.getElementsByName(`question${number}`);
    let len = elements.length;
    let checkValue = '';
    let i = 0;
    for (i = 0; i < len; i++){
      if (elements.item(i).checked){
        checkValue = elements.item(i).value;
        break;
      }
    }
    if (checkValue === `option${number}-${correctAnswerNumber}`) correctCount++;

    const quiz = document.getElementById(`quiz${number}`);
    quiz.classList.add('hidden');

    if (isLast) {
      switch (correctCount) {
        case 0:
          resultComment = 'やる気ある？';
          break;
        case 1:
          resultComment = 'まだ試験キャンセルできるかも！';
          break;
        case 2:
          resultComment = '偶数だね！';
          break;
        case 3:
          resultComment = 'えー、至って平凡です';
          break;
        case 4:
          resultComment = 'いっつもあと一歩！';
          break;
        case 5:
          resultComment = '知識だけはいっちょまえ！';
          break;
        default:
          break;
      }
      setTimeout(() => {
        if (i < 4) elements.item(i).checked = false;
        quiz.classList.add('display-none');
        var result = document.getElementById('result');
        result.classList.remove('hidden');
      }, 1000);
    } else {
      setTimeout(() => {
        if (i < 4) elements.item(i).checked = false;
        quiz.classList.add('display-none');
        var nextQuiz = document.getElementById(`quiz${number + 1}`);
        nextQuiz.classList.remove('hidden');
      }, 1000);
    }
  }

  function returnToStart(){
    var result = document.getElementById('result');
    result.classList.add('hidden');
    
    setTimeout(() => {
      correctCount = 0;
      resultComment = '';

      for (let i = 1; i <= response.length; i++) {
        const quiz = document.getElementById(`quiz${i}`);
        quiz.classList.remove('display-none');
      }

      // なんかよくわかんないけどこうしないと1問目がパッと出てきて動きが微妙だからこうしてる
      // でも3周目はパッと出てきてしまう
      var firstQuiz = document.getElementById(`quiz1`);
      setTimeout(() => {
        firstQuiz.classList.remove('hidden');
      }, 1)
    }, 1000);
  }
  
  const response = [
    {
      quiz_id: 1,
      question: 'AWSでは、柔軟にスケーリングすればいいから何の予測が不要になった？',
      type: 1,
      options: [
        { text: 'リリース日', display_order: 1 },
        { text: 'キャパシティ', display_order: 2 },
        { text: '天候', display_order: 3 },
        { text: '売上', display_order: 4 },
      ],
      correct_choises_no: 2,
    },
    {
      quiz_id: 2,
      question: 'AWSのサービスを使い始めると自動的に収集されるデータのことをなんという？',
      type: 1,
      options: [
        { text: '標準メトリクス', display_order: 1 },
        { text: 'カスタムメトリクス', display_order: 2 },
        { text: 'スーパーメトリクス', display_order: 3 },
        { text: '初期メトリクス', display_order: 4 },
      ],
      correct_choises_no: 1,
    },
    {
      quiz_id: 3,
      question: 'CloudWatchのアラームでできないことはどれ？',
      type: 1,
      options: [
        { text: '課金の減額交渉', display_order: 1 },
        { text: 'SNSへの通知', display_order: 2 },
        { text: 'オートスケール', display_order: 3 },
        { text: 'EC2の回復', display_order: 4 },
      ],
      correct_choises_no: 1,
    },
    {
      quiz_id: 4,
      question: 'リソースの設定変更履歴を簡単に確認できるサービスは？',
      type: 1,
      options: [
        { text: 'Config', display_order: 1 },
        { text: 'CloudFormation', display_order: 2 },
        { text: 'CloudTrail', display_order: 3 },
        { text: 'CloudWatch', display_order: 4 },
      ],
      correct_choises_no: 1,
    },
    {
      quiz_id: 5,
      question: 'AWSアカウント内で発生したイベントを検知してアクションを起こせるサービスは？',
      type: 1,
      options: [
        { text: 'Fargate', display_order: 1 },
        { text: 'DirectConnect', display_order: 2 },
        { text: 'CloudWatch', display_order: 3 },
        { text: 'EventBridge', display_order: 4 },
      ],
      correct_choises_no: 4,
    },
  ]
</script>

<title>四択クイズ</title>

<div class="main">
  <div class="title">クラウドプラクティショナー クイズ</div>
  <!-- なんか後からクラス追加しても動かない、事前にここに書かれてるクラスなら後から追加できるから書いてる -->
  <div class="hidden display-none"></div>

  <div class="container">
    {#each response as quizObj, i}
      <QuizCard
        question={quizObj.question}
        questionNo={i + 1}
        options={quizObj.options.map(option => option.text)}
        isHidden={i + 1 !== 1}
        on:answerQuestion={() => answerQuiz(i + 1, quizObj.correct_choises_no, i + 1 === response.length)}
      />
    {/each}

    <div id="result" class="main-quiz fade-out hidden">
      <h2>結果: {response.length}問中{correctCount}問正解！</h2>
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

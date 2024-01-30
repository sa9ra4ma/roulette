<script>
  import OptionLabel from '$lib/component/OptionLabel.svelte';
  import { createEventDispatcher } from 'svelte';

  export let question = '';
  export let questionNo = 0;
  export let options = [];
  export let isHidden = false;
  
  const dispatch = createEventDispatcher();

  function generateRadioId(quizNo, optionNo) {
    return `option${quizNo}-${optionNo}`
  }

  function answerQuestion() {
    dispatch("answerQuestion");
  }
</script>

<div class="hidden display-none"></div>
<div id="quiz{questionNo}" class="main-quiz fade-out { isHidden ? 'hidden' : '' }">
  <h2>Q{questionNo}: {question}</h2>
  <div class="select">
    {#each options as option, i}
      <OptionLabel
        name="{`question${questionNo}`}"
        id="{generateRadioId(questionNo, i + 1)}"
        value="{generateRadioId(questionNo, i + 1)}"
        option="{option}"
      />
    {/each}
  </div>

  <div class="answer-btn-wrap">
    <button class="answer-btn" on:click={answerQuestion}>NEXT→</button>
  </div>
</div>

<style>
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
</style>
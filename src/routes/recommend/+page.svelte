<!-- src/routes/index.svelte -->

<script>
  let aiResponse = '';
  let userInput = '';
  let displayText = '';

  async function add() {
		const response = await fetch('/api/buki', {
			method: 'POST',
			body: JSON.stringify({message: userInput}),
			headers: {
				'content-type': 'application/json'
			}
		});

		const res = await response.json();
    aiResponse = res.content;
	}

</script>

<main>
  <h3>キミの要望に応える武器を教えるよ</h3>

  <form on:submit|preventDefault={add}>
    <input type="text" bind:value={userInput} placeholder="どんな武器が良い？">
    <button type="submit">送る</button>
  </form>

  <pre>{aiResponse}</pre>
</main>

<style>
  main {
    text-align: center;
    padding: 20px;
  }

  pre {
    white-space: pre-wrap; /* 空白と改行を維持しつつ、長い行を折り返します */
    overflow-x: auto; /* 水平方向のオーバーフローが発生した場合にスクロールバーを表示します */
    max-width: 100%; /* 最大幅を100%に設定して、親要素に合わせて自動的に伸縮します */
    text-align: left;
  }
</style>

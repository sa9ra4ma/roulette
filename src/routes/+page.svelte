<script lang='ts'>
  // import { Weapon } from './types';

  // export let data: { weapons: Weapon[] };

  export let data;
  let weapons = data.weapons.map(v => v.name);
  let weapon = '';

  function roulette() {
    const randomIndex = Math.floor(Math.random() * weapons.length);
    weapon = weapons[randomIndex];
  }
</script>

<button on:click={roulette}>ルーレット！</button>
<p>{ weapon }</p>

<a href="/recommend">レコメンドはこちら</a>

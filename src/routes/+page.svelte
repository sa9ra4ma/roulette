<script lang='ts'>
  // import { Weapon } from './types';

  // export let data: { weapons: Weapon[] };

  import { weaponsData } from '$lib/stores';

// データを格納
  export let data;

  let weapons = data.weapons.map(v => v.name);
  weaponsData.set(weapons);
  let weapon = '';

  function roulette() {
    const randomIndex = Math.floor(Math.random() * weapons.length);
    weapon = weapons[randomIndex];
  }
</script>

<button on:click={roulette}>ルーレット！</button>
<p>{ weapon }</p>

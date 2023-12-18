<script lang='ts'>
  // import { Weapon } from './types';

  // export let data: { weapons: Weapon[] };
  export let data;
  let weapons = data.weapons.map(v => v.name);
  let weapon = '';

  let rotateDeg = 0;

  // 値が５個以上ならそれなりに整うけど、それ以下だとおかしくなる
  $: clipPathCoordinate = 360 / weapons.length / 2;
  $: clipPathValue = `polygon(50% 50%, 100% ${50 - clipPathCoordinate}%, 100% ${50 + clipPathCoordinate}%)`;

  function roulette() {
    const randomIndex = Math.floor(Math.random() * weapons.length);
    weapon = weapons[randomIndex];
  }

  function spinRoulette() {
    const wheel = document.getElementById('rouletteWheel');
    const randomDegree = Math.floor(Math.random() * 360) + 720; // Rotate between 2 to 3 full spins
    rotateDeg += randomDegree;
    wheel.style.transform = `rotate(${rotateDeg}deg)`;
  }
  
  function randomColor() {
    var hex_numbers =  ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    var hex = "";

    for(var i = 0; i < 6; i++) {
      hex += hex_numbers[Math.floor(Math.random() * hex_numbers.length)];
    }

    return `#${hex}`;
  }

</script>

<!-- <button on:click=
 -->

<div class="roulette-container">
  <div class="roulette-wheel" id="rouletteWheel">
    {#each weapons as v, index (index)}
      <div class="roulette-section" style="background-color: {randomColor()}; transform: rotate({(360/weapons.length) * (index-1)}deg); clip-path: {clipPathValue};">
        <div class="section-text">{v}</div>
      </div>
    {/each}
  </div>
</div>
<button class="spin-btn" on:click={spinRoulette}>Spin</button>

<style>
  .roulette-container {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: #f1f1f1;
    overflow: hidden;
  }

  .roulette-wheel {
    width: 100%;
    height: 100%;
    transform-origin: center;
    transition: transform 3s ease-out;
  }

  .roulette-section {
    position: absolute;
    width: 100%;
    height: 100%;
    clip-path: polygon(50% 50%, 100% 48.4%, 100% 51.6%);
    /* clip-path: polygon(50% 50%, 100% 0%, 100% 6%); */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section-text {
    color: #fff;
    font-size: 4px;
    font-weight: bold;
    margin: 0 2px 0 auto;
  }

  .spin-btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #2ecc71;
    color: #fff;
    border: none;
    border-radius: 5px;
  }
</style>
<script>
  export let name = '';
  export let id = '';
  export let value = '';
  export let option = '';
</script>

<input type="radio" id="{id}" name="{name}" value="{value}">
<label for="{id}">
  <i>{option}</i>
</label>

<style>
  input {
    display: none;
  }
  input[type="radio"]:checked + label {
    color: #000;
    border: 2px solid gray;
    background-color: #b3b9e8;
    box-shadow: 1px 1px 3px gray;
  }
  label {
    color: #3275bc;
    border: 2px solid #3275bc;
    background-color: #d0e6fd;
    text-align: center;
    display: inline-block;
    padding: 5px 0px;
    width: 120px;
    border-radius: 10px;
    margin: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 13px
  }
  label:hover {
    color: #aaa;
    border: 2px solid #aaa;
    cursor: pointer;
  }
</style>
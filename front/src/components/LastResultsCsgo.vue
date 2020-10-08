<template>
  <div>
      <button class="btn-success font-weight-bold">+ favori</button>
    <h3 class= "text-dark text-center">Last results</h3>
    <table class="table">
      <thead >
        <tr >
          <th class="h5 font-weight-bold">Season</th>
          <th class="h5 font-weight-bold">Tournament</th>
          <th class="h5 font-weight-bold">Competitors</th>
          <th class="h5 font-weight-bold">Results</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2019-2020</td>
          <td>Intel challenge</td>
          <td>tocard vs cool</td>
          <td>3-0</td>
        </tr>
        <tr>
          <td>2020-2021</td>
          <td>Twitch warrior</td>
          <td>tocard vs cool</td>
          <td>3-0</td>
        </tr>        
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "LastResultsCsgo",
  }
</script>

<style >
  tbody {
    color: black;
  }


</style>
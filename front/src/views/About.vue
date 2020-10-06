<template>
  <div id="json">
    <vue-json-pretty
    :showLine=false
    :data=datas>
    </vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
export default {
  name: "About",
  components:{
    VueJsonPretty
  },
data(){
  return {
    datas:{}
  }

},
  async mounted() {
    await fetch(`http://localhost:3000/about`, {
      method: "GET",
      headers: {
        "content-type": "application/octet-stream;charset=utf-8,",
      },
    })
      .then(res => res.json())
      .then(res => {
        this.datas = res
      })
    },
};
</script>
<style >
#json {
  background-color: white;
}
.vjs-key{
  color:black
}
.vjs-tree__brackets{
  color:black
}

</style>

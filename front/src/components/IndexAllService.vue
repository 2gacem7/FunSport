<template>
  <div class="services card ">
    <div class="card-header">
      {{ service.name }}</div>
    <div class="card-body">
      {{ data.description }}</div>

    <div class="card-footer">
      <button class="btn btn-primary" v-if="add" v-on:click="addService"> Add to my dashboard </button>
      <button class="btn btn-info" v-if="edit" v-on:click="editService"> Edit the service </button>
      <button class="btn btn-danger" v-if="del" v-on:click="delService"> Delete this service </button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'IndexAllService',
  datas(){
    return{


    }
  },
  props: {
    data: {},
    service:"",
    edit:false,
    del:false,
    add:false
  },
  watch:{

  },
  methods:{
    addService(){
      console.log("test")
      if (this.$store.state.UserData.services){
          const index = this.$store.state.UserData.services.indexOf(this.service)
          if (index == -1){
            this.$store.state.UserData.services.push(this.service)
          }
      } else {
        this.$store.state.UserData.services =[this.service]
      }

      console.log(this.$store.state.UserData.services)
      this.$emit('update-service')
    },
    delService(){
      console.log("testdel")
      const index = this.$store.state.UserData.services.indexOf(this.data)
      if (index != -1){
        this.$store.state.UserData.services.splice(index,1)
      } else {
        this.$store.state.UserData.services =[]
      }

            console.log(this.$store.state.UserData.services)
                  this.$emit('update-service')


    },
    editService(){
      this.$emit('edit-service', this.service)
    }

  }
}
</script>

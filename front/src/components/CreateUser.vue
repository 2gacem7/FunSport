<template>
    <div id="createUser">
        <div id="pop" class="container-flex mx-4   mt-5 fixed-top">
            <div class="row justify-content-center">
                <div class="card align-item-center d-flex "
                    style="width:100%;height: 80vh;position: absolute; z-index:10">
                    <div class="card-header d-flex justify-content-between">
                        <h4>Create User</h4>
                        <button class="btn btn-warning" @click="cancel()">Cancel</button>
                    </div>
                    <div class="card-body overflow-auto">

                    </div>
                    <button class="btn btn-success mt-2 mb-2" style="width:100%" @click="submit()">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'createUser',
        data() {
            return {}
        },
        watch: {},
        async mounted() {},
        methods: {
        async submit() {},
        
        cancel() {
            this.$parent.createButton = false;
        }
        }
    }
</script>
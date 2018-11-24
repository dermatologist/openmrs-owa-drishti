<template>
    <div>
        <h3>{{msg}}</h3>
        <div class="alert-warning" v-if="alertMsg">
            {{alertMsg}}
        </div>
        <div>{{ $store.state.shimmerId }}</div>
        <p>Select one of the fitness tracking applications below,
            and complete its authorization process, to link this
            application to the account.</p>
        <div>
            <a class="btn btn-default" v-on:click="handleClick()"><img
                    :src="logoUrl" height="25" width="99"></a>
        </div>
    </div>

</template>

<script>
    import OmhService from '../services/omhService';
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'DrishtiLogin',
        props: {
            msg: String,
            alertMsg: String,
            logoUrl: String,
        },
        data() {
            return {
                isOpen: false,
                results: [],
                search: '',
                isLoading: false,
                arrowCounter: 0,
            };
        },
        created() {

        },
        computed: mapGetters([
            'shimmer'
        ]),

        methods: {

            // VUE_APP_ prefix is REQUIRED.
            handleClick() {
                console.log(process.env.VUE_APP_googleFitShim);
                let omhSevice = new OmhService('TestPatient');
                omhSevice.login(process.env.VUE_APP_googleFitShim);
            },


        },

        watch: {},

        mounted() {
            if (this.$route.query.loginSuccess == 'true') {
                this.$router.push('/about');
            }
            this.$store.commit('setShimmerId', this.$route.query.shimmerId);
            console.log(this.$route.query);
            console.log(this.$store.state.shimmerId);
        },

        destroyed() {
        },

    };
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .autocomplete-results {
        padding: 0;
        margin: 0;
        border: 1px solid #eeeeee;
        height: 120px;
        overflow: auto;
        width: 100%;
    }

    .autocomplete-result {
        list-style: none;
        text-align: left;
        padding: 4px 2px;
        cursor: pointer;
    }

    .autocomplete-result.is-active,
    .autocomplete-result:hover {
        background-color: #4aae9b;
        color: white;
    }
</style>

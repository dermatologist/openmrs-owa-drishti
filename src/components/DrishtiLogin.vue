<template>
    <div>
        <h3>{{msg}}</h3>
        <div class="alert-warning" v-if="alertMsg">
            {{alertMsg}}
        </div>
        <p>Select one of the fitness tracking applications below, and complete its authorization process, to link this
            application to the account.</p>
        <!--<div>-->
        <!--<button class="btn btn-default" ng-click="$ctrl.loginWithFitbit()" disabled><img src="{{$ctrl.env.baseUrl}}img/fitbit-transparent.png" height="25" width="99"></button>-->
        <!--</div>-->
        <div>
            <!--<button class="btn btn-default" ng-click="$ctrl.loginWithGoogleFit()"><img src="{{$ctrl.env.baseUrl}}img/Google-Fit-Logo-transparent.png" height="25" width="99"></button>-->
            <a class="btn btn-default" v-on:click="handleClick()"><img
                    :src="logoUrl" height="25" width="99"></a>
        </div>
    </div>

</template>

<script>
    // import OmhService from '../services/omhService';

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
        computed: {},
        methods: {

            // VUE_APP_ prefix is REQUIRED.
            handleClick() {
                console.log(process.env.VUE_APP_googleFitShim);
            },


        },

        watch: {},

        mounted() {

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

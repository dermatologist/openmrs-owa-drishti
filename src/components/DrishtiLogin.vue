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
            <a class="btn btn-default" ng-href=$ctrl.googleFitUrl target="_self"
               ng-mousedown="$ctrl.loginWithGoogleFit()"><img
                    src="{{process.env.baseUrl}}img/Google-Fit-Logo-transparent.png" height="25" width="99"></a>
        </div>
    </div>

</template>

<script>
    import OmhService from '../services/omhService';

    export default {
        name: "DrishtiLogin",
        props: {
            msg: String,
            alertMsg: String,
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
        computed: {
            error() {
                return OmhService.state.error.patients;
            },
            pending() {
                return OmhService.state.pending.patients;
            },
            patients() {
                return OmhService.state.patients.results;
            },
        },
        methods: {

            onChange() {
                // Let's warn the parent that a change was made
                this.$emit('input', this.search);

                // Send request

                const params = {q: this.search};
                Patient.dispatch('queryPatients', {params});


                // Is the data given by an outside ajax request?
                if (this.pending) {
                    this.isLoading = true;
                } else if (this.patients) {
                    // Let's search our flat array
                    this.filterResults();
                    this.isOpen = true;
                }
            },

            filterResults() {
                // first uncapitalize all the things
                // this.results = this.items
                this.results = this.patients
                    .filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
            },

            setResult(result) {
                this.search = result;
                this.isOpen = false;
            },

            onArrowDown(evt) {
                if (this.arrowCounter < this.results.length) {
                    this.arrowCounter = this.arrowCounter + 1;
                    console.log(evt);
                }
            },
            onArrowUp() {
                if (this.arrowCounter > 0) {
                    this.arrowCounter = this.arrowCounter - 1;
                }
            },
            onEnter() {
                this.search = this.results[this.arrowCounter];
                this.isOpen = false;
                this.arrowCounter = -1;
            },
            handleClickOutside(evt) {
                if (!this.$el.contains(evt.target)) {
                    this.isOpen = false;
                    this.arrowCounter = -1;
                }
            },
        },

        watch: {
            items(val, oldValue) {
                // actually compare them
                if (val.length !== oldValue.length) {
                    this.results = val;
                    this.isLoading = false;
                }
            },
        },

        mounted() {
            document.addEventListener('click', this.handleClickOutside);
        },

        destroyed() {
            document.removeEventListener('click', this.handleClickOutside);
        },

    }
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

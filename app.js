Vue.component('CoinDetail', {
    props: ['coin'],

    template:`
        <div>
            <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
                {{ coin.title }}
                <span v-if="coin.changePercent > 0">Bien</span>
                <span v-else-if="coin.changePercent < 0">Mal</span>
                <span v-else>Cruza los dedos</span>
                <span v-on:click="toggleShowPrices">{{ showPrices ? "Hide prices" : "Show prices" }}</span>
            </h1>

            <img v-bind:src="coin.img" v-bind:alt="name" width="100px" height="100px">

            <input type="number" v-model="value">
            <span>{{ coin.convertedValue }}</span>

            <ul v-show="showPrices">
                <li
                    v-bind:class="{ orange: p.value === coin.price, red: p.value < coin.price, green: p.value > coin.price }"
                    v-for="(p, i) in coin.pricesWithDays"
                    v-bind:key="p.day"
                >
                    {{i}} -> {{p.day}} {{p.value}}
                </li>
            </ul>
        </div>
    `
    ,

    data() {
        return {
            showPrices: false,
            value: 0
        }
    },

    computed: {
        title() {
            return `${this.coin.name} - ${this.coin.symbol}`;
        },
        convertedValue() {
            if (!this.value) {
                return 0;
            }

            return this.value / this.price;
        }
    },

    methods: {
        toggleShowPrices() {
            this.showPrices = !this.showPrices;

            this.$emit('change-color');
        }
    },
})

new Vue({
    el: '#app',
    data() {
        return {
            btc: {
                name: 'Bitcoin',
                symbol: 'BTC',
                img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
                changePercent: 10,
                price: 8400,
                pricesWithDays: [
                    { day: 'Lunes', value: 8400 },
                    { day: 'Martes', value: 7900 },
                    { day: 'Miercoles', value: 8200 },
                    { day: 'Jueves', value: 9000 },
                    { day: 'Viernes', value: 9400 },
                    { day: 'Sabado', value: 10000 },
                    { day: 'Domingo', value: 10200 },
                ],    
                title: 'Mis viscoins'
            },
            color: "f4f4f4",
        }
    },
    
    methods: {
        updateColor () {
            this.color = this.color.split('').reverse().join('');
        }
    }
});
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <ul class="name-list">
      <li>Bruna Sayuri</li>
      <li>Luana Monteiro</li>
      <li>Jonas Ribeiro</li>
      <li>Rodrigo Normando</li>
    </ul>
    <button v-on:click="getProducts">Ver produtos</button>
    <img alt="Vue logo" src="../assets/imgs/loader.gif" v-if="this.showloader">
    <div v-if="this.prodLoaded && !this.showloader" class="table">
      <table>
        <tr>
          <th class="table-title">Nome do Produto</th>
          <th class="table-title">Descrição</th>
          <th class="table-title">Quantidade</th>
        </tr>
        <tr v-for="prod in products" v-bind:key="prod._id">
          <td>{{ prod.name }}</td>
          <td>{{ prod.description }}</td>
          <td>{{ prod.quantity }}</td>
        </tr>
      </table>
    </div>
    <button v-on:click="showOrderPanel = !showOrderPanel">{{ this.showOrderPanel ? this.panelMessage[0] : this.panelMessage[1] }}</button>
    <div v-if="this.showOrderPanel" class="order-panel">
      <input v-model="productName" placeholder="nome do produto">
      <input v-model="email" type="email" placeholder="email" v-bind:class="this.emailError ? 'hasError': ''" v-on:keyup="validateEmail()">
      <button> Enviar </button>
    </div>
  </div>
</template>

<script>

import firebase from "firebase";


export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: () => {
    return {
      db: undefined,
      showloader: false,
      prodLoaded: false,
      products: [],
      showOrderPanel: false,
      panelMessage: ['Esconder','Mostrar'],
      productName: '',
      email: '',
      emailError: null
    };
  },
  methods: {
    getProducts() {
      this.products = [];
      this.showloader = !this.showloader
      this.setDatabase();
      this.db
        .collection("produto")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(element => this.products.push({ ...element.data(), _id: element.id }));
          this.prodLoaded = true;
          setTimeout(() => (this.showloader = !this.showloader), 1000);
        });
    },
    getOrder() {
      this.showOrderPanel = true;
    },
    setDatabase() {
      this.db = firebase.firestore();
      this.db.settings({});
    },
    validateEmail() {
      const emailPattern = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}/g)
      this.emailError = !emailPattern.test(this.email);
    }
  }
};
</script>
<style>

.table {
display: flex;
justify-content: center;
}

p,
h1,
h2,
h3,
td,
th,
label {
  color: antiquewhite;
}

h1 {
  margin: 0;
}

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

body {
  background-color: #191f26;
}

.hello {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 40px 0;
}

img {
  margin-top: 10px;
}

.name-list {
  color: #ffffff;
  list-style-type: disc;
}

button {
  width: 210px;
  margin: 20px auto;
  border: 1px solid #fff;
  border-radius: 8px;
  background: transparent;
  padding: 20px 10px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}

button:hover{
	text-shadow: 0 0 2px #fff;
  border-color:#fff;
  box-shadow: 0 0 5px 0 #fff;
}

ul {
  display: flex;
   flex-wrap: wrap;
   justify-content: center;
}

li {
  display: flex;
  justify-content: space-around;
  align-items: center;

}

li:before {
    content: "";
    background: url(/img/loader.960a1abf.gif) no-repeat center;
    width: 73px;
    height: 74px;
    display: flex;
    background-size: 150px;
}
.table-title {
    border-radius: 8px;
    background: transparent;
    border: 1px solid #fff;
    padding: .5rem;
}
.order-panel {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
}

input {
margin: .5rem;
border-radius: 8px;
}
.hasError {
  border: 2px solid red;
}
</style>

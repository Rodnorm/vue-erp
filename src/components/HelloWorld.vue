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
    <Loader/>
    <Notification :showNotification="this.showNotification" />
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
    <button
      v-on:click="showOrderPanel = !showOrderPanel"
    >{{ this.showOrderPanel ? this.panelMessage[0] : this.panelMessage[1] }}</button>
    <div v-if="this.showOrderPanel" class="order-panel">
      <input v-model="userName" placeholder="insira seu nome">
      <input v-model="productName" placeholder="nome do produto">
      <input
        v-model="email"
        type="email"
        placeholder="email"
        v-bind:class="this.emailError ? 'hasError': ''"
        v-on:keyup="validateEmail()"
      >
      <button v-on:click="sendEmail">Enviar</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Loader from './Loader.vue'
import Notification from './Notification.vue'
export default {
  name: "HelloWorld",
  components: {
    Loader, 
    Notification
  },
  props: {
    msg: String
  },
  mounted() {
    const element = document.createElement('script');
    const el = document.createElement('script');
    el.setAttribute('src','https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js')
    element.setAttribute('src','https://cdn.emailjs.com/sdk/2.3.2/email.min.js')
    document.getElementById('app').append(element);
    document.getElementById('app').append(el);
    setTimeout(() => emailjs.init("user_0nggQHB17fGofTTX0HHFZ"), 1000);

  },
  data: () => {
    return {
      db: undefined,
      showNotification: false,
      showloader: false,
      prodLoaded: false,
      products: [],
      showOrderPanel: false,
      panelMessage: ["Esconder", "Mostrar"],
      userName: '',
      productName: "",
      email: "",
      emailError: null,
      Email: null
    };
  },
  methods: {
    getProducts() {
      this.products = [];
      this.showloader = !this.showloader;
      this.setDatabase();
      this.db
        .collection("produto")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(element =>
            this.products.push({ ...element.data(), _id: element.id })
          );
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
      const emailPattern = new RegExp(
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}/g
      );
      this.emailError = !emailPattern.test(this.email);
    },
    sendEmail() {

      axios.post(
        'http://localhost:3000/email',
        { 
          params: {	
            "email": this.email,
            "name": this.userName,
            "productName": this.productName
            }
        })
      .then(resp => {
        this.showNotification = true;
        setTimeout(() => this.showNotification = false, 5000);
      });
    }
  }
}
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

button:hover {
  text-shadow: 0 0 2px #fff;
  border-color: #fff;
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
  padding: 0.5rem;
}
.order-panel {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
}

input {
  margin: 0.5rem;
  border-radius: 8px;
}
.hasError {
  border: 2px solid red;
}
</style>

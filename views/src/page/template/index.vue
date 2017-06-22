<template>
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>{{ pageTitle }}</title>
    
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet" type="text/css">
    <link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet" type="text/css">
    <link href="./style/style.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div id="app">
    </div>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vuetify/dist/vuetify.min.js"></script>
    <script src="./dist/build.js"></script>
  </body>
  </html>
</template>

<script>
import home from './home'
import choose from './choose'
import gameend from './gameend'
import roundExchange from './round-exchange'
import roundFactory from './round-factory'
import roundMarket from './round-market'
import roundRetailer from './round-retailer'
import roundTeamleader from './round-teamleader'
import roundWholeseller from './round-wholeseller'

const routes = [
  { path: '/', component: home },
  { path: '/home', component: home },
  { path: '/choose', component: choose },
  { path: '/gameend', component: gameend },
  { path: '/round/exchange', component: roundExchange },
  { path: '/round/factory', component: roundFactory },
  { path: '/round/market', component: roundMarket },
  { path: '/round/retailer', component: roundRetailer },
  { path: '/round/teamleader', component: roundTeamleader },
  { path: '/round/wholeseller', component: roundWholeseller }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  el: '#app',
  data: {
    pageTitle: '2017 工工營'
  },
  router: router
})
</script>

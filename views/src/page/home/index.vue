<template>
  <div id="app">
    <v-toolbar class="orange">
      <v-toolbar-title>首頁</v-toolbar-title>
    </v-toolbar>

    <main>
      <v-stepper v-model="stepCount" vertical style="width: 100%;">
        <v-stepper-step step="1" v-bind:complete="stepCount > 1">
          選擇組別
          <small>隊輔也請選擇你的組別</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-row class="stepper-content-row">
            <v-select></v-select>
          </v-row>
          <v-row class="stepper-content-row">
            <v-btn primary @click.native="stepCount = 2">下一步</v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-step step="2" v-bind:complete="stepCount > 2">
          選擇工作
          <small>請隊輔協助分配工作</small>
        </v-stepper-step>
        <v-stepper-content step="2" class="stepper-content">
          <v-row class="stepper-content-row">
            <v-select></v-select>
          </v-row>
          <v-row class="stepper-content-row">
            <v-btn primary @click.native="stepCount = 3">下一步</v-btn>
            <v-btn flat @click.native="stepCount = 1">上一步</v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-step step="3" v-bind:complete="stepCount > 3">
          準備進入
        </v-stepper-step>
        <v-stepper-content step="3" class="stepper-content">
          <v-row class="stepper-content-row">
            <p>歡迎來到工工營</p>
          </v-row>
          <v-row class="stepper-content-row">
            <v-btn primary @click.native="stepCount = 4">進入</v-btn>
            <v-btn flat @click.native="stepCount = 2">上一步</v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper>
    </main>
  </div>
</template>

<script>
  let app = new Vue({
    el: '#app',
    data: {
      stepCount: 0
    }
  })
</script>

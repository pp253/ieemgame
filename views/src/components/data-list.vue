<template>
  <v-data-table
    v-bind:headers="header"
    v-model="items"
    hide-actions
  >
    <template slot="readableOrderList" scope="props">
      <td class="text-xs-left">{{ props.item.readableDayTime }}</td>
      <td class="text-xs-right">{{ props.item.readableBuyer }}</td>
      <td class="text-xs-right">{{ props.item.readableProduct }}</td>
      <td class="text-xs-right">{{ props.item.quantity }}</td>
      <td class="text-xs-right">{{ props.item.delivered }}</td>
    </template>
  </v-data-table>
</template>

<script>
import readable from '../lib/readable'

export default new Vue.components('order-list', {
  props: [
    'list'
  ],
  data: {
    header: [
      {text: '時間', left: true, value: 'readableDayTime'},
      {text: '訂貨者', value: 'readableBuyer'},
      {text: '產品', value: 'readableProduct'},
      {text: '數量', value: 'quantity'},
      {text: '已送達', value: 'delivered'}
    ]
  },
  computed: {
    readableOrderList: function () {
      return readable.toReadableOrderList(list)
    }
  }
})
</script>

<style>
</style>

<template>
    <img
      :src="card.img_url == '?'?'https://raw.githubusercontent.com/miratkd/black-jack-rest-front-end/a6a47f9a18cb88f9349ab3bf524853dbbec24a60/src/assets/cards/black_joker.svg':'https://raw.githubusercontent.com/miratkd/black-jack-rest-front-end/a6a47f9a18cb88f9349ab3bf524853dbbec24a60/src/assets/cards/' + card.img_url"
      alt="test">
</template>

<script>
export default {
  name: 'CardLoader',
  props: ['card']
}
</script>

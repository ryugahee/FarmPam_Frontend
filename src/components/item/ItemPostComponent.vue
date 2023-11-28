<template>
  <div class="post" @click="detail">
    <div class="post-img-box" v-for="(post, i) in posts" :key="i">
      <div class="post-img">
        <img class="thumbnail-img" :src="post.image" alt=""/>
        <div class="remaining-time">
          <div class="time-bg">
            <p> {{ post.time }} 남음</p>
          </div>
        </div>
      </div>
      <div class="post-content">
        <h3> {{ post.title }} </h3>
        <img src="../../../public/assets/img/users.png" class="users-img" alt=""/>
        <span class="participants"> {{ post.users }} </span>
        <p class="current-bid-price">현재 입찰가</p>
        <h3 class="price"> {{ post.price.toLocaleString() }}원 </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemPost',
  data() {
    return {
      posts: [
        {
          image: require("../../../public/assets/img/thumbnail1.png"),
          time: "00:00:51",
          title: "가희네 고당도 샤인머스켓 4kg",
          users: 1204,
          price: 40000
        },
        {
          image: require("../../../public/assets/img/thumbnail2.png"),
          time: "00:01:22",
          title: "다은이네 천도 복숭아 4kg",
          users: 512,
          price: 23000
        },
        {
          image: require("../../../public/assets/img/thumbnail3.png"),
          time: "00:02:00",
          title: "민이네 남해 유자 4kg",
          users: 256,
          price: 51000
        },
      ]
    }
  },
  methods: {
    detail() {
      this.$router.push("/detail")
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/item-post-component.css";
</style>
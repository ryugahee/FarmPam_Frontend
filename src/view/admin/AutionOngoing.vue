<template>
  <div class="auctionReport">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">경매중</th>
          <th scope="col">품목</th>
          <th scope="col">무게</th>
          <th scope="col">거래일</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">핀</th>
          <td>당근</td>
          <td>5kg</td>
          <td>2023-08-30</td>
        </tr>
        <tr>
          <th scope="row">제이크</th>
          <td>당근</td>
          <td>5kg</td>
          <td>2023-08-30</td>
        </tr>
        <tr>
          <th scope="row">비모</th>
          <td>당근</td>
          <td>5kg</td>
          <td>2023-08-30</td>
        </tr>
        <tr>
          <th scope="row">마셀린</th>
          <td>당근</td>
          <td>5kg</td>
          <td>2023-08-30</td>
        </tr>
      </tbody>
    </table>
    <div class="paginations1">
      <a href="#" class="page-link">&laquo;</a>
      <a href="#" class="page-link">1</a>
      <a href="#" class="page-link">2</a>
      <a href="#" class="page-link">3</a>
      <a href="#" class="page-link">&raquo;</a>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import axios from "axios";
export default {
  setup() {
    //작동 중지해놓은 상태
    const getAuctionOngoing = () => {
      console.log("경매중 경매 요청");

      axios
        .get("api/item/getAuctionOngoing")
        .then((res) => {
          console.log("경매중 경매: ", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      //   getAuctionOngoing();
    });

    return {
      getAuctionOngoing,
    };
  },
};
</script>

<style></style>

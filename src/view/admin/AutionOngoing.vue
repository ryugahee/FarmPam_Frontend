<template>
  <div class="auctionReport">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">경매현황</th>
          <th scope="col">지역</th>
          <th scope="col">제목</th>
          <th scope="col">최소 금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(auction, index) in auctions" :key="index">
          <th scope="row" v-if="!auction.isSoldout">
            완료된 경매
            <!-- {{ auction.isSoldout }} -->
          </th>
          <th v-else>
            진행중 경매
          </th>
          <td>{{ auction.city }}</td>
          <td>{{ auction.itemTitle }}</td>
          <td>{{ auction.minPrice }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="paginations">
      <a href="#" class="page-link">&laquo;</a>
      <a href="#" class="page-link">1</a>
      <a href="#" class="page-link">2</a>
      <a href="#" class="page-link">3</a>
      <a href="#" class="page-link">&raquo;</a>
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import instance from '@/api/http';
export default {
  setup() {
    const auctions = ref([{ id: 1 }]);


    const getAuctionOngoing = (pageNum) => {
      instance
        .get("/item/list", {
          params: {
            page: 0,
            sortType: "ongoing",
          },
        })
        .then((res) => {
          console.log("완료된 경매 : ", res);

          auctions.value = [...res.data];

        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
        getAuctionOngoing();
    });

    return {
      getAuctionOngoing,
      auctions
    };
  },
};
</script>

<style scoped>

.auctionReport {
  overflow-y: scroll;
  scrollbar-width: thin;
}
.paginations {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  margin-top: 240px;
}

.table {
  margin: 0 auto; /* 좌우 여백을 auto로 설정하여 수평 가운데 정렬 */
}

/* th, td 요소 내의 텍스트를 가운데 정렬 */
th, td {
  text-align: center;
}

/* th 요소 중 특정 열을 가운데 정렬 */
.col1 {
  text-align: center; /* 가운데 정렬을 원하는 특정 열(th)에 클래스 적용 */
}
.page-link {
  display: inline-block;
  padding: 8px 12px;
  text-decoration: none;
  color: #333;
  border: 1px solid #ccc;
  margin: 0 4px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.page-link:hover {
  background-color: #f2f2f2;
}

</style>

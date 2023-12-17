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
          <th scope="row">{{ auction.isSoldout }}</th>
          <td>{{ auction.city }}</td>
          <td>{{ auction.itemTitle }}</td>
          <td>{{ auction.minPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import instance from "@/api/http";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const auctions = ref([{ id: 1 }]);
    const auctionReportPageNum = ref(0);
    const auctionReportTotalPage = ref(0);
    let arr = ref([]);

    const getAuctionReport = (pageNum) => {
      instance
        .get("/item/list", {
          params: {
            page: pageNum,
            sortType: "completed",
          },
        })
        .then((res) => {
          console.log("완료된 경매 : ", res);

          auctions.value = [...res.data];

          auctionReportTotalPage.value = res.data.length % 9;
          generateRange(auctionReportTotalPage.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const generateRange = (totalPages) => {
      arr = Array.from({ length: totalPages }, (_, index) => index + 1);

      console.log("배열 : ", arr);
    };

    onMounted(() => {
      getAuctionReport(auctionReportPageNum.value);
    });

    return {
      auctions,
      arr,
      auctionReportTotalPage,
      generateRange,
    };
  },
};
</script>

<style scoped>
.auctionReport {
  overflow-y: scroll;
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
th,
td {
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

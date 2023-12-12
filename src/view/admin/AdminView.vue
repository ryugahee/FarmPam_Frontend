<template>
  <div>
    <!-- 헤더 -->
    <div class="adminHeader">
      <img class="adminLogo" src="../../../public/assets/img/adminLogo.png" />
      <div class="adminName">나무니 님</div>
      <button class="adminLogoutBtn">로그아웃</button>
    </div>

    <!-- 경매 현황 -->
    <div class="adminContainer">
      <div class="auctionReport">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">판매자</th>
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

      <!-- 경매중 -->
      <div class="auctionIng"></div>
    </div>

    <div class="adminContainer">
      <!-- 시세 -->
      <div class="chart-container">
        <!-- <div class="adminSearchContainer"> -->
        <input
          class="adminSearch"
          v-model="keyword"
          @keyup.enter="searchMarketValue()"
        />
        <img
          class="adminSearchLens"
          src=".././../../public/assets/img/search.png"
          @click="searchMarketValue()"
        />
        <!-- </div> -->
        <div v-if="chartDatas.length == 0">
          <h3>품목 '{{ this.keyword }}'은 없어요</h3>
        </div>
        <!-- <div v-else> -->
        <div
          class="chart"
          v-for="(chartData, index) in chartDatas"
          :key="index"
        >
          <ChartView :chartData="chartData" />
          <!-- {{ chartData }} -->
        </div>

        <div class="paginations2">
          <a href="#" class="page-link">&laquo;</a>
          <a href="#" class="page-link">1</a>
          <a href="#" class="page-link">2</a>
          <a href="#" class="page-link">3</a>
          <a href="#" class="page-link">&raquo;</a>
        </div>
        <!-- </div> -->
      </div>

      <!-- 회원 현황 -->
      <div class="memberReport"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ChartView from "./ChartView.vue";
import { onMounted } from "vue";

export default {
  name: "App",
  components: { ChartView },

  methods: {
    searchMarketValue() {
      this.chartDatas = [];

      console.log("시세 검색 요청 보내기 : ", this.keyword);

      axios
        .post("api/item/marketValue", { itemType: this.keyword })
        .then((res) => {
          console.log(res.data);

          const dayList = res.data.dayList;
          const priceList = res.data.priceList;
          const itemName = res.data.itemList[0];

          if (itemName.length != 0) {
            this.chartDatas.push({
              labels: dayList,
              datasets: [
                {
                  borderWidth: 1,
                  label: itemName,
                  backgroundColor: "rgb(255,255,255, 0)",
                  pointBackgroundColor: "#64CCA2",
                  fill: true,
                  tension: 0.1,
                  borderColor: "#64CCA2",
                  pointBorderColor: "#64CCA2",
                  pointBorderWidth: 1,
                  data: priceList,
                },
              ],
            });
          }

          // console.log("배열 확인 : ", itemName[0]);

          // this.chartDatas[0].labels = dayList;

          // this.chartDatas[0].datasets[0].label = itemName;
          // this.chartDatas[0].datasets[0].data = priceList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  data() {
    onMounted(() => {
      console.log("전체 시세 조회 요청");

      axios
        .get("/api/item/allMarketValues")
        .then((res) => {
          console.log(res.data);

          if (Object.keys(res.data).length !== 0) {
            const keys = Object.keys(res.data);

            keys.forEach((key) => {
              const values = res.data[key];

              console.log("KEY : ", key);
              console.log("VALUES : ", values);

              this.chartDatas.push({
                labels: values[1], // 변수
                datasets: [
                  {
                    borderWidth: 1,
                    label: key,
                    backgroundColor: "rgb(255,255,255, 0)",
                    pointBackgroundColor: "#64CCA2",
                    fill: true,
                    tension: 0.1,
                    borderColor: "#64CCA2",
                    pointBorderColor: "#64CCA2",
                    pointBorderWidth: 1,
                    data: values[0], // 변수
                  },
                ],
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return {
      dayList: [],
      priceList: [],
      itemName: "",
      keyword: "",
      chartDatas: [
        //   {
        //     labels: [],
        //     datasets: [
        //       {
        //         borderWidth: 1,
        //         label: "", //변수
        //         backgroundColor: "rgb(255,255,255, 0)",
        //         pointBackgroundColor: "#64CCA2",
        //         fill: true, // 채우기
        //         tension: 0.1,
        //         borderColor: "#64CCA2",
        //         pointBorderColor: "#64CCA2",
        //         pointBorderWidth: 1,
        //         data: [], //변수
        //       },
        //     ],
        //   },
      ],
    };
  },
};
</script>

<style scoped>
body {
  /* display: flex;
  align-items: center; */
}

.adminContainer {
  display: flex;
  align-items: center;
  margin-left: 60px;
  min-width: 1300px;
}

.adminSearchContainer {
  display: flex;
  align-items: center;
}

.adminSearchLens {
  position: absolute;
  margin-left: 525px;
  margin-top: 15px;
}

.adminSearchLens:hover {
  cursor: pointer;
}

.adminHeader {
  display: flex;
  min-width: 950px;
  width: 100%;
  height: 65px;
  background-color: #404040;
}
.adminLogo {
  width: 160px;
  margin-left: 20px;
}
.adminLogoutBtn {
  margin-top: 15px;
  border-radius: 5px;
  width: 110px;
  margin-right: 20px;
}
.adminName {
  margin-top: 20px;
  width: 100px;
  margin-left: 64%;
  color: aliceblue;
}
.auctionReport {
  width: 850px;
  min-width: 850px;
  height: 500px;
  border: #404040 solid 1px;
  margin: 100px 30px;
}
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  text-align: center;
  padding: 8px;
}

/* 페이지네이션 스타일 */
.paginations1 {
  display: flex;
  justify-content: center;
  margin-top: 240px;
}
.paginations2 {
  position: absolute;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  /* height: 20px; */
  margin-left: 320px;
  margin-top: 475px;
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

.chart-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* gap: 5px; */
  width: 850px;
  min-width: 850px;
  height: 530px;
  border: #404040 solid 1px;
  margin: 10px 30px;
}
.chart {
  margin-top: 40px;
  margin-left: 30px;
}

.adminSearch {
  position: absolute;
  border: #333 solid 1px;
  width: 180px;
  margin-left: 340px;
  margin-top: 22px;
}
.auctionIng {
  width: 850px;
  min-width: 850px;
  height: 500px;
  border: #333 solid 1px;
}
.memberReport {
  width: 850px;
  min-width: 850px;
  height: 530px;
  border: #333 solid 1px;
}
</style>

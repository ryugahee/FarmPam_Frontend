<template>
  <div class="memberContainer">
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="col1">가입자 이름</th>
            <th scope="col">아이디</th>
            <th scope="col">주소</th>
            <th scope="col">이메일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <th scope="row">{{ user.realName }}</th>
            <td>{{ user.username }}</td>
            <td>{{ user.streetAddress }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="paginations1">
     <a href="#" class="page-link">&laquo;</a> 
      <div v-for="n in memberReportTotalPage" :key="n">
        <a href="#" class="page-link">{{ n }}</a>
      </div>

      <a href="#" class="page-link">&raquo;</a> 
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import http from "@/api/http";
export default {
  setup() {
    const users = ref([{ id: 1 }]);
    const memberReportPageNum = ref(0);
    const memberReportTotalPage = ref(0);
    let arr = ref([]);

    const getAllUsers = (pageNum) => {
      http
        .get("/getAllUsers", {
          params: {
            pageNum: pageNum,
          },
        })
        .then((res) => {
          console.log("유저 배열 : ", res.data);
          users.value = [...res.data.content];

          memberReportTotalPage.value = res.data.totalPages;

          generateRange(memberReportTotalPage.value);
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
      getAllUsers(memberReportPageNum.value);
    });

    return {
      users,
      arr,
      memberReportTotalPage,
      generateRange,
    };
  },
};
</script>

<style scoped>
.memberContainer {
  overflow-y: scroll;
}
body {
  overflow-x: scroll;
}
.paginations1 {
  /* display: flex;
  justify-content: center;
  margin-top: 240px; */
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  /* position: absolute;
  display: flex;
  justify-content: center; */
  /* margin-top: 355px; */
  /* height: 20px; */
  margin-left: 295px;
  margin-top: 10px;
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

.col1 {
  text-align: center;
}
</style>

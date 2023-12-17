<template>
  <div class="auctionReport">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">경매현황</th>
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
          <div class="paginations">
            <!-- <a href="#" class="page-link">&laquo;</a> -->
            <a href="#" class="page-link">1</a>
            <a href="#" class="page-link">2</a>
            <a href="#" class="page-link">3</a>
            <!-- <a href="#" class="page-link">&raquo;</a> -->
          </div>
        </div>
</template>

<script>
export default {

}
</script>

<style scoped>

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
<template>
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
    <div class="paginations1">
      <a href="#" class="page-link">&laquo;</a>
      <div v-for="(user, index) in users" :key="index">
        <a href="#" class="page-link">{{ index + 1 }}</a>
      </div>

      <a href="#" class="page-link">&raquo;</a>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  setup() {
    const users = ref([{ id: 1 }]);

    const getAllUsers = () => {
      axios
        .get("/api/getAllUsers")
        .then((res) => {
          users.value = [...res.data];

          console.log("유저 배열 : ", users.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      getAllUsers();
    });

    return {
      users,
    };
  },
};
</script>

<style scoped>
.paginations1 {
  /* display: flex;
  justify-content: center;
  margin-top: 240px; */

  position: absolute;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  /* height: 20px; */
  margin-left: 320px;
  margin-top: 335px;
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

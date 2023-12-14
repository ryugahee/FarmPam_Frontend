<script>
import axios from "axios";
import { ref } from "vue";
import router from "@/router";

// export function checkAccessToken() {
//     const errMsg = ref("");
//       const accessToken = localStorage.getItem("accessToken");
//       console.log("요청 보내는 엑세스 토큰 : " + accessToken);
//       axios
//         .get("http://localhost:8080/api/test", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             username: localStorage.getItem("username"),
//           },
//         })
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((err) => {
//           if (err.response && err.response.data) {
//             // 에러 응답이 있을 경우 에러 내용을 출력
//             errMsg.value = err.response.data;
//             console.log("에러 내용 : " + errMsg.value);

//             if (errMsg.value.length > 0) {
//               console.log("리프레시 토큰 요구하는 api수행");

//               errMsg.value = "";

//               requireRefreshToken();
//             }
//           } else {
//             // 에러 응답이 없는 경우, 일반적인 에러 처리
//             console.error("에러 발생:", err);
//           }
//         });
//     }

export function requireRefreshToken() {
  const errMsg = ref("");
  const refreshToken = localStorage.getItem("refreshToken");

  axios
    .post("http://localhost:8080/api/requireRefreshToken", null, {
      headers: {
        AuthorizationRefresh: `Bearer ${refreshToken}123`,
        username: localStorage.getItem("username"),
      },
    })
    .then((res) => {
      console.log("리프레시 토큰으로 엑세스 토큰 재발급 성공!");
      console.log("액세스 토큰 : " + res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
    })
    .catch((err) => {
      console.log("엑세스 토큰 재발급 에러 : " + err.response);

      errMsg.value = err.response.data;
      console.log("에러 내용 : " + errMsg.value);

      if (errMsg.value.length > 0) {
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        router.replace("/login");
      }
    });
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default {
  setup() {
    const errMsg = ref("");

    // function checkAccessToken() {
    //   const accessToken = localStorage.getItem("accessToken");
    //   console.log("요청 보내는 엑세스 토큰 : " + accessToken);
    //   axios
    //     .get("http://localhost:8080/api/test", {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //         username: localStorage.getItem("username"),
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       if (err.response && err.response.data) {
    //         // 에러 응답이 있을 경우 에러 내용을 출력
    //         errMsg.value = err.response.data;
    //         console.log("에러 내용 : " + errMsg.value);

    //         if (errMsg.value.length > 0) {
    //           console.log("리프레시 토큰 요구하는 api수행");

    //           errMsg.value = "";

    //           requireRefreshToken();
    //         }
    //       } else {
    //         // 에러 응답이 없는 경우, 일반적인 에러 처리
    //         console.error("에러 발생:", err);
    //       }
    //     });
    // }

    // function requireRefreshToken() {
    //   const refreshToken = localStorage.getItem("refreshToken");

    //   axios
    //     .post("http://localhost:8080/api/requireRefreshToken", null, {
    //       headers: {
    //         Authorization: `Bearer ${refreshToken}`,
    //         username: localStorage.getItem("username"),
    //       },
    //     })
    //     .then((res) => {
    //       console.log("리프레시 토큰으로 엑세스 토큰 재발급 성공!");
    //       console.log("액세스 토큰 : " + res.data.accessToken);
    //       localStorage.setItem("accessToken", res.data.accessToken);
    //       localStorage.setItem("refreshToken", res.data.refreshToken);
    //     })
    //     .catch((err) => {
    //       console.log("엑세스 토큰 재발급 에러 : " + err.response);

    //       errMsg.value = err.response.data;
    //       console.log("에러 내용 : " + errMsg.value);

    //       if (errMsg.value.length > 0) {
    //         localStorage.clear();
    //         alert("로그아웃 되었습니다.");
    //         router.push("/login");
    //       }
    //     });
    // }

    return {
      //   checkAccessToken,
      requireRefreshToken,
      errMsg,
    };
  },
};
</script>

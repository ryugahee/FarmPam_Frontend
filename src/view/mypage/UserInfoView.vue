<template>
  <div>
    <LOGO />
    <div class="header">
      <div>
        <button class="btn-left" @click="goBack">
          <img src="../../../public/assets/img/left2.png" alt="" />
        </button>
      </div>
      <div class="page-name">
        <p>프로필 수정</p>
      </div>
      <div>
        <button @click="updateUserInfo" class="btn-upload">완료</button>
      </div>
    </div>

    <div class="img-user-container" v-if="!preview && !imageUrl">
      <div class="img-user">
        <img src="../../../public/assets/img/person2.png" alt="" />
      </div>
      <div class="user-icon">
        <label for="file">
          <img
            src="../../../public/assets/img/camera1.png"
            class="icon-cam"
            alt=""
          />
        </label>
        <input
          type="file"
          id="file"
          @change="userImageUpload"
          style="display: none"
        />
      </div>
    </div>
    <div class="img-user-container" v-if="preview">
      <label for="file">
        <img :src="preview" class="preview-user" alt="" />
      </label>
      <input
        type="file"
        id="file"
        @change="userImageUpload"
        style="display: none"
      />
    </div>

    <div class="img-user-container" v-if="imageUrl && !preview">
      <label for="file">
        <img :src="imageUrl" class="preview-user" alt="" />
      </label>
      <input
        type="file"
        id="file"
        @change="userImageUpload"
        style="display: none"
      />
    </div>

    <div class="user-info-main">
      <div class="flex">
        <div>닉네임</div>
        <div><input type="text" v-model="nickname" /></div>
      </div>

      <hr />

      <div class="flex">
        <div>이름</div>
        <div><input type="text" v-model="realName" /></div>
      </div>

      <hr />

      <!-- <div class="flex">
        <div>나이</div>
        <div><input type="text" v-model="age" /></div>
      </div>

      <hr /> -->

      <div class="flex">
        <div>아이디</div>
        <div><input type="text" readonly v-model="username" /></div>
      </div>

      <hr />

      <div class="flex">
        <div>이메일</div>
        <div><input type="text" v-model="email" /></div>
      </div>

      <hr />

      <div class="flex">
        <div>전화번호</div>
        <div><input type="text" v-model="phoneNumber" /></div>
      </div>

      <hr />
      <div class="flex">
        <div>우편번호</div>
        <div><input type="text" v-model="mailCode" /></div>
      </div>

      <hr />
      <div class="flex">
        <div>도로명주소</div>
        <div><input type="text" v-model="streetAddress" /></div>
      </div>

      <hr />
      <div class="flex">
        <div>상세주소</div>
        <div><input type="text" v-model="detailAddress" /></div>
      </div>

      <!-- <div class="flex">
        <div>상점소개</div>
        <div></div>
      </div>
      <textarea
        class="store-Intro"
        type="text"
        placeholder="&#10; 상점 소개를 적어주세요"
      ></textarea> -->
    </div>

    <NavComponent />
  </div>
</template>
<script>
import LOGO from "@/components/user/LogoComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";
import { ref, onMounted } from "vue"; // ref와 onMounted를 가져옴
import instance from "@/api/http";
import router from "@/router";

export default {
  components: { NavComponent, LOGO },
  setup() {
    const mailCode = ref(0);
    const username = ref("");
    const realName = ref("");
    const nickname = ref("");
    const phoneNumber = ref("");
    const age = ref(0);
    const email = ref("");
    const streetAddress = ref("");
    const imageUrl = ref("");
    const detailAddress = ref("");
    let file = ref(null); // file을 ref로 선언
    const preview = ref(""); // 미리보기 이미지를 ref로 선언

    const userImageUpload = (event) => {
      const selectedFile = event.target.files[0];
      const fileType = selectedFile.name.toLowerCase();

      if (
        !fileType.includes("jpg") &&
        !fileType.includes("png") &&
        !fileType.includes("gif") &&
        !fileType.includes("jpeg")
      ) {
        alert(`이미지 파일(JPG, JPEG, GIF, PNG)만 첨부해주세요.`);
        return;
      }

      file.value = selectedFile;
      preview.value = URL.createObjectURL(selectedFile);
    };

    const getUserInfo = () => {
      instance
        .post("/getUserInfo")
        .then((res) => {
          console.log("유저 정보", res.data);
          const data = res.data;
          mailCode.value = data.mailCode;
          username.value = data.username;
          realName.value = data.realName;
          nickname.value = data.nickname;
          phoneNumber.value = data.phoneNumber;
          age.value = data.age;
          email.value = data.email;
          streetAddress.value = data.streetAddress;
          detailAddress.value = data.detailAddress;
          imageUrl.value = data.imageUrl;
        })
        .catch((err) => {
          console.error("유저 정보 조회 오류:", err);
        });
    };

    const updateUserInfo = () => {
      const formData = new FormData();

      formData.append("realName", realName.value);
      formData.append("username", username.value);
      formData.append("nickname", nickname.value);
      formData.append("phoneNumber", phoneNumber.value);
      formData.append("age", age.value);
      formData.append("email", email.value);
      formData.append("mailCode", mailCode.value);
      formData.append("streetAddress", streetAddress.value);
      formData.append("detailAddress", detailAddress.value);
      formData.append("file", file.value);

      instance
        .post("/updateUserInfo", formData, {
          headers: {
            "Content-Type": "multipart/form-data; charset=UTF-8",
          },
        })
        .then((res) => {
          alert("회원정보 수정에 성공했습니다!");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const goBack = () => {
      let result = confirm("마이페이지를 나가시겠어요?");
      if (result) {
        // TODO: 뒤로 가기 로직 작성
        router.go(-1);
      }
    };

    onMounted(() => {
      // console.log("유저 정보 조회 요청");
      getUserInfo();
    });

    return {
      mailCode,
      username,
      realName,
      nickname,
      phoneNumber,
      age,
      email,
      streetAddress,
      detailAddress,
      file,
      preview,
      imageUrl,
      userImageUpload,
      goBack,
      updateUserInfo,
    };
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/user-info.css";
</style>

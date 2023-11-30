<template>
  <div>
    <LOGO/>
    <div class="header">
      <div>
        <button class="btn-left" @click="goBack"><img src="../../../public/assets/img/left.png" alt=""/></button>
      </div>
      <div class="page-name">
        <p>프로필 수정</p>
      </div>
      <div>
        <button class="btn-upload">완료</button>
      </div>
    </div>


    <div class="img-user-container" v-if="!file">
      <div class="img-user">
        <img src="../../../public/assets/img/person2.png" alt=""/>
      </div>
      <div class="user-icon">
        <label for="file">
          <img src="../../../public/assets/img/camera.png" class="icon-cam" alt=""/>
        </label>
        <input type="file" id="file" ref="file" @change="userImageUpload" style="display: none"/>
      </div>
    </div>
    <div class="img-user-container" v-else>
      <label for="file">
        <img :src="preview" class="preview-user" alt=""/>
      </label>
      <input type="file" id="file" ref="file" @change="userImageUpload" style="display: none"/>
    </div>

    <div class="user-info-main">
      <dl class="flex">
        <dt>닉네임</dt>
        <dd><input type="text">팜파미</dd>
      </dl>
      <dl class="flex">
        <dt>아이디</dt>
        <dd><input type="text">farmi123</dd>
      </dl>
      <dl class="flex">
        <dt>비밀번호</dt>
        <dd><input type="password">********</dd>
      </dl>
      <dl class="flex">
        <dt>이메일</dt>
        <dd><input type="text">farm@gmail.com</dd>
      </dl>
      <dl class="flex">
        <dt>전화번호</dt>
        <dd><input type="text">010-1234-5678</dd>
      </dl>
      <dl class="flex">
        <dt>우편번호</dt>
        <dd><input type="text" v-model="zipcode">546-601</dd>
      </dl>
      <dl class="flex">
        <dt>도로명주소</dt>
        <dd><input type="text" v-model="streetadr">센텀동로 40</dd>
      </dl>
      <dl class="flex">
        <dt>상세주소</dt>
        <dd><input type="text" v-model="detailadr">1호</dd>
      </dl>
      <dl class="flex">
        <dt>상점소개</dt>
        <dd></dd>
      </dl>
      <textarea class="store-Intro" type="text" placeholder="&#10; 상점 소개를 적어주세요"></textarea>
    </div>


    <NavComponent/>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";

export default {
  components: {NavComponent, LOGO},
  data() {
    return {
      file: "",
      preview: "",

      zipcode: "",
      streetadr: "",
      detailadr: "",
    }
  },
  methods: {
    userImageUpload() {

      const fileType = this.$refs.file.files[0].name.toLowerCase();
      if (!fileType.includes('jpg') && !fileType.includes('png') && !fileType.includes('gif') && !fileType.includes('JPEG')) {
        alert(
            `이미지 파일(JPG,JPEG,GIF,PNG)만 첨부해주세요.`
        )
        return
      }

      this.file = this.$refs.file.files[0]
      this.preview = URL.createObjectURL(this.file)
    },

    goBack() {
      this.$router.go(-1);
    },


  }

}
</script>

<style lang="scss" scoped>
@import "../../../public/assets/css/user-info.css";
</style>
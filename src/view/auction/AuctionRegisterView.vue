<template>
  <div class="wrapper">
    <LOGO />
    <HeaderComponent>
      <p>경매 등록</p>
    </HeaderComponent>
    <div class="img-upload">
      <!--     미리보기       -->
      <div class="img-preview">
        <div v-for="(file, index) in files" :key="index" class="img-file">
          <div class="img-close-button" @click="imageDeleteButton(index)">
            x
          </div>
          <img :src="file.preview" class="preview" alt="" />
        </div>
        <!--     사진 추가       -->
        <div v-if="!files.length">
          <label for="file" class="filelabel"
            ><img
              src="../../../public/assets/img/camera1.png"
              class="icon-camera"
              alt=""
          /></label>
          <input
            type="file"
            id="file"
            ref="files"
            multiple
            @change="imageAddUpload"
            style="display: none"
          />
        </div>
        <div v-else>
          <label for="file" class="filelabel"
            ><img src="../../../public/assets/img/add.png" class="icon" alt=""
          /></label>
          <input
            type="file"
            id="file"
            ref="files"
            multiple
            @change="imageAddUpload"
            style="display: none"
          />
        </div>
      </div>
    </div>
    <div class="main">
      <div>
        <input class="title-box" type="text" v-model="itemTitle" @input="onChange" placeholder=" 제목" required>
      </div>
      <div>
        <select class="type-box" v-model="city" required>
          <option value="" disabled selected>지역 선택</option>
          <option>서울</option>
          <option>부산</option>
          <option>대구</option>
          <option>인천</option>
          <option>광주</option>
          <option>대전</option>
          <option>울산</option>
          <option>세종</option>
          <option>경기도</option>
          <option>강원도</option>
          <option>충청북도</option>
          <option>충청남도</option>
          <option>전라북도</option>
          <option>전라남도</option>
          <option>경상북도</option>
          <option>경상남도</option>
          <option>제주</option>
        </select>
      </div>
      <div>
        <input
          class="price-box"
          type="text"
          v-model="minPrice"
          placeholder=" 최소 입찰 가격"
          required
        />
        원
      </div>
      <div class="timer">
        <select class="time-box" v-model="time" required>
          <option value="" disabled selected>시간 선택</option>
          <option value="3600">1시간</option>
          <option value="7200">2시간</option>
          <option value="10800">3시간</option>
          <option value="21600">6시간</option>
          <option value="43200">12시간</option>
          <option value="20">24시간</option>
        </select>
      </div>

      <div class="content-itemDetail">
      <textarea class="itemDetail-box"
          type="text"
          v-model="itemDetail"
          placeholder=" 상품 설명"
          required
        ></textarea>
      </div>
      <!--     태그 추가       -->
      <div class="tag-box">
        <div>
          <input
            type="text"
            v-model="tag"
            class="add-tag"
            @keyup.enter="addTag"
            placeholder=" 품목명 태그"
          />
          <button class="btn-add-tag" type="button" @click="addTag">
            태그 추가
          </button>
        </div>
        <div class="selected-tag-box-flex">
          <div
            class="selected-tag-box"
            v-for="(tag, i) in tags"
            :key="i"
            @click="removeTag(tag)"
            :tag="tag"
            required
          >
            <div class="selected-tag">
              {{ tag }}
            </div>
            <div class="closeBtn">X</div>
          </div>
        </div>
      </div>
      <div>
        <input class="weight-box" type="text" :value="weight" @input="inputWeight($event)" placeholder=" 무게"> kg
      </div>
    </div>
    <div class="btn-container">
      <button class="btn-start" type="submit" @click="submitPost">
        경매 시작!
      </button>
    </div>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import HeaderComponent from "@/components/user/HeaderComponent.vue";

export default {
  name: "AuctionRegisterView",
  components: {
    LOGO,
    HeaderComponent,
  },
  data() {
    return {
      userName: "",
      itemTitle: "",
      minPrice: "",
      time: 0,
      itemDetail: "",
      tag: "",
      city: "",
      weight: "",
      tags: [],

      files: [],
      filesPreview: [],
      uploadImageIndex: 0,
    };
  },
  inject: ["$http"],
  methods: {
    imageAddUpload() {
      let num = -1;
      if (this.files.length + this.$refs.files.files.length > 5) {
        return;
      }

      for (let i = 0; i < this.$refs.files.files.length; i++) {

        if (this.files.length + this.$refs.files.files.length > 5) {
          return;
        }

        for (let i = 0; i < this.$refs.files.files.length; i++) {
          const fileType = this.$refs.files.files[i].name.toLowerCase();
          if (
              !fileType.includes("jpg") &&
              !fileType.includes("png") &&
              !fileType.includes("gif") &&
              !fileType.includes("JPEG")
          ) {
            alert(`이미지 파일(JPG,JPEG,GIF,PNG)만 첨부해주세요.`);
            return;
          }

          this.files.push({
            file: this.$refs.files.files[i],
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            number: i + this.uploadImageIndex,
          });

          this.uploadImageIndex = num + 1;
        }
        console.log(this.files);
      }
    },
    imageDeleteButton(index) {
      this.files = this.files.filter((data, i) => i !== index);
      console.log(this.files);
    },
    async submitPost() {
      const formData = new FormData();

      formData.append("itemTitle", this.itemTitle);
      formData.append("minPrice", this.minPrice);
      formData.append("itemDetail", this.itemDetail);
      formData.append("city", this.city);
      formData.append("weight", this.weight);
      formData.append("time", this.time);

      for (let i = 0; i < this.files.length; i++) {
        formData.append("files", this.files[i].file);
      }

      const tagArray = this.tags;
      const arrayAsString = tagArray.join(",");
      formData.append("tagNames", arrayAsString);

      // formData.append("userId", this.$store.state.user.id);
      formData.append("userId", "gg");

      await this.$http
        .post("/item/new", formData, {
          headers: {
            "Content-Type": "multipart/form-data;  charset=UTF-8",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log(res);
            // this.$router.go(-1);  디테일 페이지로 변경
          }
        }).catch(() => {
            window.alert("상품 등록 실패");
          });
    },

    addTag() {
      if (this.tag == " " || this.tag == "") {
        return;
      }
      if (this.tags.length >= 5) {
        return;
      }
      if (this.tags.indexOf(this.tag) != -1) {
        return;
      }
      this.tags.push(this.tag);
      this.tag = "";
    },
    removeTag(tag) {
      let index = this.tags.indexOf(tag);
      if (index !== -1) {
        this.tags.splice(index, 1);
      }
    },
    // 유효성 검사
    inputWeight(event) {
      const inputValue = event.target.value;
      if (inputValue.trim() === "") {
        this.weight = "";
        return;
      }
      const regex = /^\d+(\.\d{0,1})?$/;
      if (regex.test(inputValue)) {
        this.weight = inputValue;
        console.log("무게: " + this.weight)
      } else {
        alert("소수점 첫째짜리까지 입력 가능합니다.")
        event.target.value = this.weight;
      }

    },
    onChange(event){
      console.log(event.target.value)
    }
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/auction-register-page.css";
</style>

<template>
  <div class="wrapper">
    <LOGO />
    <HeaderComponent>
      <p>경매 등록</p>
    </HeaderComponent>
    <div class="img-upload">
      <!--     미리보기       -->
      <div class="img-preview">
        <div
            v-for="(file, index) in files"
            :key="index" class="img-file">
          <div
              class="img-close-button"
              @click="imageDeleteButton(index)">
            x
          </div>
          <img :src="file.preview" class="preview" alt="" />
        </div>
        <!--     사진 추가       -->
        <div v-if="!files.length">
          <label for="file" class="filelabel"><img src="../../../public/assets/img/camera1.png" class="icon-camera" alt="" ></label>
          <input
              type="file"
              id="file"
              ref="files"
              multiple
              @change="imageAddUpload"
              style="display: none"/>
        </div>
        <div v-else>
          <label for="file" class="filelabel"><img src="../../../public/assets/img/add.png" class="icon" alt="" ></label>
          <input
              type="file"
              id="file"
              ref="files"
              multiple
              @change="imageAddUpload"
              style="display: none"/>
        </div>
      </div>
    </div>
    <div class="main">
      <div>
        <input class="title-box" type="text" v-model="itemTitle" placeholder=" 제목" required>
      </div>
      <div>
        <input class="price-box" type="text" v-model="minPrice" placeholder=" 최소 입찰 가격" required> 원
      </div>
      <div class="ss">
        <select class="time-box" required>
          <option>시간</option>
          <option value="30">30분</option>
          <option>1시간</option>
          <option>2시간</option>
          <option>3시간</option>
          <option>6시간</option>
          <option>12시간</option>
          <option>24시간</option>
        </select>
      </div>
      <div class="content">
      <textarea class="itemDetail-box"
          type="text"
                v-model="itemDetail" placeholder="&#10; 상품 설명" required></textarea>
      </div>
      <!--     태그 추가       -->
      <div class="tag-box">
        <div>
          <input type="text"
                 v-model="tag" class="add-tag" @keyup.enter="addTag"  placeholder=" 품목명 태그">
          <button class="btn-add-tag" type="button" @click="addTag">태그 추가</button>
        </div>
        <div class="selected-tag-box-flex">
          <div class="selected-tag-box" v-for="(tag, i) in tags" :key="i" @click="removeTag(tag)" :tag="tag" required>
            <div class="selected-tag">
              {{tag}}
            </div>
            <div class="closeBtn">X</div>
          </div>
        </div>

      </div>
      <div>
        <select class="type-box" required>
          <option>대분류</option>
          <option>딸기</option>
          <option>수박</option>
          <option>토마토</option>
        </select>
      </div>
      <div>
        <input v-model="weight" class="weight-box" type="text" placeholder=" 무게" required> kg
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
import axios from "axios";
import LOGO from "@/components/user/LogoComponent.vue";
import HeaderComponent from "@/components/user/HeaderComponent.vue";

export default {
  name: "AuctionRegisterView",
  components: {
    LOGO,
    HeaderComponent
  },
  data() {
    return {
      itemTitle: "",
      minPrice: "",
      time: "",
      itemDetail: "",
      tag: "",
      itemType: "",
      weight: "",
      tags: [],

      files: [],
      filesPreview: [],
      uploadImageIndex: 0,


    };
  },
  inject:["$http"],
  methods: {


    imageAddUpload() {
      let num = -1;
      for (let i = 0; i < this.$refs.files.files.length; i++) {

        const fileType = this.$refs.files.files[i].name.toLowerCase();
        if (!fileType.includes('jpg') && !fileType.includes('png') && !fileType.includes('gif') && !fileType.includes('JPEG')) {
          alert(
              `이미지 파일(JPG,JPEG,GIF,PNG)만 첨부해주세요.`
          )
          return
        }

        this.files.push({
          file: this.$refs.files.files[i],
          preview: URL.createObjectURL(this.$refs.files.files[i]),
          number: i + this.uploadImageIndex,
        });

        this.uploadImageIndex = num + 1;
      }
      console.log(this.files);
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
      formData.append("itemType", this.itemType);
      formData.append("weight", this.weight);

      for (let i = 0; i < this.files.length; i++) {
        formData.append("files", this.files[i].file);
      }

      const myArray = this.tags;
      const arrayAsString = myArray.join(',');
      formData.append("tagNames",arrayAsString);

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
              window.alert("상품 등록 성공");
            }
          })
          .catch(() => {
            window.alert("상품 등록 실패");
          });

    },

    addTag() {
      if (this.tag == " " || this.tag == "") {
        return;
      }
      if (this.tags.indexOf(this.tag) != -1) {
        return;
      }
      this.tags.push(this.tag);
      this.tag = '';

      console.log("태그: " + this.tags);
    },
    removeTag(tag) {
      let index = this.tags.indexOf(tag);
      if (index !== -1) {
        this.tags.splice(index, 1);
      }
    },

  },
};
</script>

<style scoped>
@import "../../../public/assets/css/auction-register-page.css";

</style>

<template>
    <div class="container">
        <row>

            <div class="advice" >
            <p>간편 로그인 완료를 위해</p>
            <p>추가 정보를 입력해주세요</p>
        </div>


<div class="easyLoginForm">
  <label for="itemname"><span>* </span>이름</label>
  <input type="text" class="txt-input" id="itemname" value="dust">
</div>

<div class="easyLoginForm">
  <label for="itempw"><span>* </span>전화번호</label>
  <input type="text" class="txt-input" id="itempw" value="">
</div>

<div class="easyLoginForm">
  <label for="itemnew"><span>* </span>닉네임</label>
  <input type="text" class="txt-input" id="itemnew" value="">
</div>

<div class="easyLoginForm">
  <label for="itemnew"><span>* </span>지역</label>
  <input type="text" class="txt-input" id="itemnew" value="">
</div>

<button>회원가입 하기</button>


        </row>
    </div>
</template>

<script>
export default {
    setup() {

    },
}
</script>

<style scoped>
.container {
  width: 390px; /* 가로 크기 */
  height: 844px; /* 세로 크기 */
    border: #C0C0C0 1px solid;
    margin: 0 auto;
    display: flex;
  justify-content: center;
  /* background: antiquewhite; */
}

.advice {
    font-size: 20px;
    margin-top: 100px;
    width: 300px;
}


input{
    font-family: 'Noto Sans KR','Noto Sans Korean', "Nanum Gothic", sans-serif;
    border: 0;
    outline: none;
    font-size: 10px;
}
input::placeholder{
  color: #d9d9d9
}
.easyLoginForm{

  box-sizing: border-box;
  margin: 20px auto;
  position: relative;
}
.easyLoginForm label{
  display: inline-block;
  position: absolute;
  top: -5px;
  left: 14px;
  padding: 10px;
  background: white;
  font-size: 14px;
  color: #888;
  font-weight: bold;
}
.easyLoginForm.ver2 label{
  top: initial;
  bottom: -20px;
}
.easyLoginForm label span{
  color: #da4841;
  vertical-align: -1px;
}
.easyLoginForm input{
    width: 100%;
    border: 1px solid #dddddd !important;
    font-size: 1rem;
    line-height: 1.45;
    letter-spacing: -0.04rem;
    border-radius: 8px;
    padding: 16px;
    margin-top: 12px;
}

button {
    background: #90EE90;
    border: transparent;
    width: 250px;
    height: 35px;
    font-size: 15px;
    border-radius: 5px;
    margin-left: 25px;
    margin-top: 30px;
}

button:hover {
    cursor: pointer;
}

</style>
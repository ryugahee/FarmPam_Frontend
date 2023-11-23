<template>
    <div class="container">
        <row>
            <div class="logo">
            <img src="../../public/img/LOGO.png" />
        </div>
        
        <div class="loginForm">
            <input placeholder="아이디" />
            <br />
            <input placeholder="비밀번호" />
        </div>

        <div class="bottons">
            <button>로그인</button>
            <br />
            <button>회원가입</button>
        </div>

        <div class="finder">
            <button>아이디 찾기</button> &nbsp; | &nbsp;
            <button>비밀번호 찾기</button>
        </div>

        <div class="line">
            또는
        </div>

        <div class="easyLogin">
            <img src="../../public/img/kakao.png" />
            <br />
            <img src="../../public/img/google.png" />
            <br />
            <img src="../../public/img/naver.png" />
        </div>

        </row>
       
    </div>
</template>

<script>

export default {
    setup(){

    }
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
}

.logo{
    margin-top: 100px;
    justify-content: center;
}

.logo img {
    margin-left: 37px;
}

.loginForm {
    margin-top: 100px;
    text-align: center; 
}

.loginForm input {
    text-align: center;
    background-color: transparent;
    border: transparent;
    border-bottom: #D9D9D9 1px solid;
    margin-bottom: 30px;
    width: 250px;
    font-size: 15px;

}

.loginForm input:focus {
    outline: none;
}

.bottons button {
    background-color: #98CB98;
    border: transparent;
    border-radius: 5px;
    width: 250px;
    height: 35px;
    margin-bottom: 15px;
    font-size: 20px;
    color: white;
}

.bottons button:hover {
 cursor: pointer;
}


.finder button{
    background-color: transparent;
    border: transparent;
}

.finder > button:first-child{
    margin-left: 30px;
}

.finder button:hover {
    cursor: pointer;
}

.line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: #C0C0C0;
    font-size: 14px;
    margin: 8px 0;
}

.line::before{
    content: "";
    flex-grow: 1;
    margin: 0 16px;
    background: #C0C0C0;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
}

.line::after{
    content: "";
    flex-grow: 1;
    margin: 0 16px;
    background: #C0C0C0;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
}

.easyLogin img {
    width: 250px;
    margin-bottom: 5px;
}

</style>
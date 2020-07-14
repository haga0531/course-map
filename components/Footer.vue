<template>
  <div class="footer">
    <div class="footer-nav">
      <a class="footer-nav-item"><nuxt-link to="/about">Course Mapについて</nuxt-link></a>
      <a class="footer-nav-item"><nuxt-link to="/contacts">お問い合わせ</nuxt-link></a>
      <a class="footer-nav-item"><nuxt-link to="/rules">利用規約</nuxt-link></a>
      <a class="footer-nav-item"><nuxt-link to="/privacy">プライバシーポリシー</nuxt-link></a>
    </div>
    <div class="copyright-box">
      &copy;2020 Cource Map All Rights Reserved.
    </div>
  </div>
</template>

<style scoped>
.footer {
  border-top: solid 1px #e6e6e6;
  height: 100px;
  padding: 40px 0;
  margin-top: auto;
}

.footer-nav {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.footer-nav-item {
  text-decoration: none;
  list-style: none;
  padding: 0 40px;
}

.copyright-box {
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}

@media screen and (max-width: 768px){
  .footer-nav {
    display: block;
    margin-bottom: 30px;
  }

  .footer-nav-item {
    display: block;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>
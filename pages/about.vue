<template>
  <div class="about-page">
    <section class="about-box">
      <h2>Course Mapについて</h2>
      <p>
        Couse Mapは無料orできるだけ安価なWebチュートリアルを集めたサイトです。<br>
        新しいことを学ぶ際、「どんな教材を使用すればいいだろうか」という悩みを持つ人がとても多いことから当サービスは作られました。<br>
        高額な教材を購入しなくても無料でたくさんの有益な情報にアクセスできる時代です。ぜひ当サービスを利用してご自身にあったサービスを見つけてください！
      </p>
    </section>
    <section class="about-box">
      <h3>Course Mapの使い方</h3>
      <p>
        検索によって自分が知りたい情報、サイトを見つけてください。<br>
        また、お勧めの教材やサイトがあればお気軽に投稿いただければと思います。
      </p>
    </section>
    <section class="about-box">
      <h3>Course Mapに投稿いただくコンテンツについて</h3>
      <p>
        デジタルコンテンツかつ、高額ではないもの(1万円が基準となります)で投稿いただければと思います。<br>
        1万円を超えるものについては作成者までお問い合わせください！<br>
        (できるだけ無料、安価での教材情報を提供したいためです🙇‍♂️)
      </p>
    </section>

    <section class="about-box developer">
      <h3>開発者</h3>
      はがっち(<a class="link" href="https://twitter.com/uzr4b">@uzr4b</a>)
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class About extends Vue {
}
</script>

<style scoped>
.about-page {
  padding: 30px 0;
  width: 70%;
  margin: 0 auto;
}

.about-box {
  padding: 10px;
}

.link {
  border-bottom: 1px solid #1f4068;
}

.developer {
  margin-top: 40px;
}
</style>
<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" v-if="isAuthenticated">
      <el-menu-item class="logo-text"><nuxt-link to="/">Course Map</nuxt-link></el-menu-item>
      <el-menu-item class="nav-menu_right" style="color: #303133;" @click="centerDialogVisible = true"><i class="el-icon-setting" style="color: #303133;"></i><span class="span">ログアウト</span></el-menu-item>
      <el-menu-item class="nav-menu_right" @click="dialogFormVisible = true" style="color: #303133;"><i class="el-icon-edit" style="color: #303133;"></i><span class="span">投稿する</span></el-menu-item>
    </el-menu>
  
    <el-menu class="el-menu-demo" mode="horizontal" v-else>
      <el-menu-item class="logo-text"><nuxt-link to="/">Course Map</nuxt-link></el-menu-item>
      <el-menu-item class="nav-menu_right" @click="dialogAuthVisible = true" style="color: #303133;"><i class="el-icon-setting" style="color: #303133;"></i>ログイン</el-menu-item>
    </el-menu>

    <el-dialog title="コースを投稿する" :visible.sync="dialogFormVisible" class="form-dialog">
      <el-form :model="form">
        <el-form-item label="画像 (必須)">
            <div class="flex justify-center">
              <img :src="form.image" class="uploaded-image">
            </div>
            <el-upload
              v-if="!form.image"
              action=""
              :show-file-list="false"
              :http-request="uploadFile"
              >
              <el-button size="small" type="primary">画像をアップロードする</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item label="コース名 (必須)">
          <el-input v-model="form.title" autocomplete="off" placeholder="Railsチュートリアル"></el-input>
        </el-form-item>

        <el-form-item label="説明 (任意)">
          <el-input v-model="form.description" autocomplete="off" type="textarea" :rows="rows" placeholder="めっちゃむずい"></el-input>
        </el-form-item>

        <el-form-item label="コースURL (必須)">
          <el-input v-model="form.link" autocomplete="off" placeholder="https://railstutorial.jp/"></el-input>
        </el-form-item>

        <el-form-item label="料金 (任意)">
          <el-input v-model="form.fee" autocomplete="off" placeholder="デフォルトで「無料」が入ります"></el-input>
        </el-form-item>

        <el-form-item label="言語 (任意)">
          <el-select v-model="form.language" placeholder="日本語">
            <el-option
              v-for="item in langOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="ジャンルタグ (必須)"><br>
          <v-select :options="options" v-model="form.selected" multiple placeholder="タグを入力 (例:その他)"></v-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTutorial" :disabled="isDisabled">投稿する</el-button>
        <el-button @click="cancel">キャンセル</el-button>
        <small style="color: red;">※ 画像、コース名、URL、タグは必須です</small>
      </span>
    </el-dialog>

    <el-dialog title="ユーザー認証" :visible.sync="dialogAuthVisible">
      <el-button @click="googleLogin">Google</el-button>
    </el-dialog>

    <el-dialog
      title="ログアウトする"
      :visible.sync="centerDialogVisible"
      class="form-dialog"
      center>
      <span>本当にログアウトしますか？</span>
      <p>投稿されたコンテンツは残ります。</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="logout">ログアウトする</el-button>
        <el-button @click="centerDialogVisible = false">キャンセル</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { firebase, storage, auth } from '@/plugins/firebase.ts'
import { TutorialClass } from '@/store/modules/tutorialType'
import tags from '@/assets/tags'
const categories = require('@/assets/categories.json')

@Component
export default class Header extends Vue {

    dialogTableVisible: boolean =  false
    dialogFormVisible: boolean = false
    dialogAuthVisible: boolean = false
    dialogVisible: boolean = false
    centerDialogVisible: boolean = false

    form: TutorialClass = {
      id: '',
      title: '',
      description: '',
      link: '',
      image: '',
      selected: '',
      categories: categories,
      fee: '',
      language: '',
      likeCount: 0,
      created_at: new Date().getTime(),
      creatorId: ''
    }
    auth: object = {
      name: '',
      email: '',
      password: ''
    }
    options: object = tags
    langOptions: { value: string, label: string}[] = [{
        value: '日本語',
        label: '日本語'
      }, {
        value: '英語',
        label: '英語'
      }, {
        value: 'それ以外',
        label: 'それ以外'
      }]

  get isAuthenticated () {
    return this.$store.getters['auth/isAuthenticated']
  }

  get isDisabled () {
    return !this.form.title || !this.form.link || !this.form.image || !this.form.selected.length
  }

  get rows () {
    const line = this.form.description.match(/\n/g)
    if (line == null) return 5
    return Math.max(line.length + 1, 5)
  }

  async uploadFile (data: any) {
      const storageRef = storage.ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`tutorials/${time}_${data.file.name}`)
      const snapshot = await ref.put(data.file)
      const url = await snapshot.ref.getDownloadURL()
      this.form.image = url
  }

  async addTutorial () {
    const content = {
      title: this.form.title,
      description: this.form.description,
      link: this.form.link,
      image: this.form.image,
      categories: this.form.selected,
      fee: this.form.fee,
      language: this.form.language,
      created_at: new Date().getTime(),
      likeCount: 0,
      creatorId: this.$store.state.auth.user.uid
    }
    await this.$store.dispatch('tutorials/addTutorial', content)
    this.form.title = ''
    this.form.description = ''
    this.form.link = ''
    this.form.image = ''
    this.form.fee = ''
    this.form.language = ''
    this.form.selected = ''
    this.dialogFormVisible = false
    this.$router.push('/')
  }

  cancel () {
    this.form.title = ''
    this.form.description = ''
    this.form.link = ''
    this.form.image = ''
    this.form.fee = ''
    this.form.language = ''
    this.form.selected = ''
    this.dialogFormVisible = false
  }

  googleLogin () {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
      .then(res => {
        this.dialogAuthVisible = false
        this.$store.dispatch('auth/setUser',res.user)
      }).catch(e => console.log(e))
  }

  logout () {
    auth.signOut().then(() => {
      this.$store.dispatch('auth/setUser', null)
      this.centerDialogVisible = false
    }).catch(err => {
      window.alert(err)
    })
  }
}
</script>

<style scoped>
.el-menu-demo {
  padding: 0 100px;
}

.nav-menu_right {
  float: right !important;
}

.el-button {
  margin-left: 0 !important;
  width: 100%;
  margin: 10px 0;
}

.logo-text {
  font-size: 20px; 
  font-weight: bold; 
  color: #303133 !important;
}

@media screen and (max-width: 620px){
  .nav-menu_right {
    float: none;
  }
  .form-dialog >>> .el-dialog {
    width: 90% !important;
  }

  .el-menu {
    display: flex;
    justify-content: space-around;
  }

  .span {
    display: none;
  }
}
</style>
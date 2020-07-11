<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" v-if="isAuthenticated">
      <el-menu-item><nuxt-link to="/">Tutorial Map</nuxt-link></el-menu-item>
      <el-menu-item class="nav-menu_right" @click="logout">ログアウト</el-menu-item>
      <el-menu-item class="nav-menu_right" @click="dialogFormVisible = true">投稿する</el-menu-item>
    </el-menu>

    <el-menu class="el-menu-demo" mode="horizontal" v-else>
      <el-menu-item><nuxt-link to="/">Tutorial Map</nuxt-link></el-menu-item>
      <el-menu-item class="nav-menu_right" @click="dialogAuthVisible = true">ログイン</el-menu-item>
    </el-menu>

    <el-dialog title="チュートリアルを投稿する" :visible.sync="dialogFormVisible">
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
        <el-form-item label="チュートリアル名 (必須)">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="説明 (任意)">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="チュートリアルURL (必須)">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="料金 (任意)">
          <el-input v-model="form.fee" autocomplete="off" placeholder="デフォルトで「無料」が入ります"></el-input>
        </el-form-item>

        <el-form-item label="ジャンルタグ (必須)"><br>
          <v-select :options="options" v-model="form.selected" multiple placeholder="タグを入力 (例:その他)"></v-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTutorial" :disabled="isDisabled">投稿する</el-button>
        <el-button @click="cancel">キャンセル</el-button>
      </span>
    </el-dialog>

    <el-dialog title="ユーザー認証" :visible.sync="dialogAuthVisible" width="30%">
      <el-button @click="googleLogin">Google</el-button>
      <el-button>Twitter</el-button>
      <el-button>Facebook</el-button>
      <p>ログイン方法を選んでください。</p>
    </el-dialog>
  </div>
</template>

<script>
import { firebase, storage, auth } from '@/plugins/firebase'
import tags from '@/assets/tags'
import categories from '@/assets/categories'

export default {
  data () {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogAuthVisible: false,
      dialogVisible: false,
      form: {
        title: '',
        description: '',
        link: '',
        image: '',
        selected: '',
        categories: categories,
        fee: ''
      },
      auth: {
        name: '',
        email: '',
        password: ''
      },
      options: tags
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    },
    isDisabled () {
      return !this.form.title || !this.form.link || !this.form.image || !this.form.selected.length
    }
  },
  methods: {
    async uploadFile (data) {
      const storageRef = storage.ref()
      const time = new Date().getTime()
      const ref = storageRef.child(`tutorials/${time}_${data.file.name}`)
      const snapshot = await ref.put(data.file)
      const url = await snapshot.ref.getDownloadURL()
      this.form.image = url
    },
    async addTutorial () {
      const content = {
        title: this.form.title,
        description: this.form.description,
        link: this.form.link,
        image: this.form.image,
        categories: this.form.selected,
        fee: this.form.fee,
        created_at: new Date().getTime(),
        likeCount: 0
      }
      await this.$store.dispatch('tutorials/addTutorial', content)
      this.form.title = ''
      this.form.description = ''
      this.form.link = ''
      this.form.image = ''
      this.form.fee = ''
      this.form.selected = ''
      this.dialogFormVisible = false
      this.$router.push('/')
    },
    cancel () {
      this.form.title = ''
      this.form.description = ''
      this.form.link = ''
      this.form.image = ''
      this.form.fee = ''
      this.form.selected = ''
      this.dialogFormVisible = false
    },
    googleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
        .then(res => {
          this.dialogAuthVisible = false
          this.$store.dispatch('auth/setUser',res.user)
        }).catch(e => console.log(e))
    },
    logout () {
      auth.signOut().then(() => {
        this.$store.dispatch('auth/setUser', null)
        this.$router.push('/')
      }).catch(err => {
        window.alert(err)
      })
    }
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
</style>
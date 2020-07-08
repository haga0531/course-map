<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item><nuxt-link to="/">Tutorial Map</nuxt-link></el-menu-item>
      <el-menu-item class="nav-menu_right" @click="dialogFormVisible = true">投稿する</el-menu-item>
    </el-menu>

    <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="画像">
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
        <el-form-item label="チュートリアル名">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="説明">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="チュートリアルURL">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="addTutorial">投稿する</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { storage } from '@/plugins/firebase'

export default {
  data () {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        title: '',
        description: '',
        link: '',
        image: ''
      }
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
        image: this.form.image
      }
      await this.$store.dispatch('tutorials/addTutorial', content)
      this.form.title = ''
      this.form.description = ''
      this.form.link = ''
      this.form.image = ''
      this.dialogFormVisible = false
      this.$router.push('/')
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
</style>
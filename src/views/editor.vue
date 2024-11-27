<template>
  <div class="edit-container">
    <el-row class="title">
      <el-input v-model="title" placeholder="请填写文章标题"></el-input>
      <el-row class="upload-activex">
        <label @click="dialogVisible = true">
          <i class="el-icon-picture-outline-round"></i>
          上传封面
        </label>
      </el-row>
      <div class="head-img">
        <img :src="headImg" alt="aya的小窝" />
      </div>
    </el-row>
    <div class="zone">
      <div id="editorContaienr">
        <!-- Or manually control the data synchronization -->
        <quill-editor  v-model="html" :options="editorOption" />
      </div>
    </div>
    <el-row class="sub">
      <el-button @click="updateImage">{{ reeditor ? '修改文章' : '发布文章' }}</el-button>
    </el-row>

    <el-dialog title="您可以选择" :visible.sync="dialogVisible" :close-on-click-modal="false" width="30%" class="dialog">
      <div>
        <span style="padding-bottom: 10px; display: inline-block">网络图片:</span>
        <el-input type="text" v-model="netImg" />
      </div>
      <div>或者</div>
      <label for="file">本地上传</label>
      <input id="file" class="file" name="file" type="file" accept="image/png, image/gif, image/jpeg" @change="getImage" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button class="dialog-sub" @click="dialogSub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import xss from 'xss'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'MyEditor',
  components: {  quillEditor },
  data() {
    return {
      title: '',
      editor: null,
      update: false,
      dialogVisible: false,
      reeditor: false,
      headImg: 'https://wx3.sinaimg.cn/mw690/9afd6f06gy1gctay1ir55j21yt0ik40w.jpg',
      file: '',
      netImg: 'http://www.',
      toolbarConfig: {},
      html: '<p></p>',
      editorOption: {
          // Some Quill options...
          placeholder: '请输入内容...',
        },
      editorConfig: {
        placeholder: '请输入内容...',
        // autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {},
      },
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getReviseData(this.$route.query.id)
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
    },
    async getReviseData(id) {
      let req = await this.$http.get('article/getSingleArticle?id=' + id)
      if (req && req._id) {
        this.title = req.title
        this.headImg = req.bg
        this.netImg = req.bg
        this.html = req.content
        this.reeditor = true
      }
    },
    insertTitle() {
      this.editor.cmd.do('insertHTML', '<h2>二级标题</h2>')
    },
    sub(bg) {
      if (this.update) {
        return false
      }
      this.update = true
      let title = this.title
      let html = this.html
      let content = xss(html) // 此处进行 xss 攻击过滤
      let _url = '/article/uploadarticle'
      let id = ''
      if (this.reeditor) {
        _url = '/article/editArticle'
        id = this.$route.query.id
      }
      this.$http.post(_url, { title, content, bg, id }).then((res) => {
        if (res) {
          this.$message({
            type: 'success',
            message: this.reeditor ? '修改成功' : '发布成功',
          })
          setTimeout(() => {
            this.$router.push(this.reeditor ? '/center' : '/')
          }, 1000)
        }
      })
    },
    getImage(e) {
      this.file = e.target.files[0]
      this.headImg = URL.createObjectURL(this.file) //使用本地图片路径
      this.dialogVisible = false
      this.netImg = ''
    },
    updateImage() {
      // if (this.file == '' && this.netImg == '') {
      //   this.$message.error('请上传头图')
      //   return false
      // }
      if (this.title.length < 2 || this.title.length > 50) {
        this.$message.error('标题字数限制为2-50字')
        return false
      } else if (this.html.replace(/&nbsp;/g, '').replace(/ /g, '') == '') {
        this.$message.error('请编辑内容')
        return false
      }
      if (this.netImg == '') {
        let param = new FormData() //创建form对象
        param.append('file', this.file) //通过append向form对象添加数据
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' },
        } //添加请求头
        this.$http.reqeust('article/image', param, 'POST', config).then((response) => {
          this.sub(response.url)
        })
      } else {
        this.sub(this.headImg)
      }
    },
    dialogSub() {
      let image = new Image()
      let that = this
      image.onload = function () {
        that.dialogVisible = false
        that.headImg = that.netImg
      }
      image.onerror = function (err) {
        that.$message.error(err)
      }

      image.src = this.netImg
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  div {
    padding: 5px 0;
  }
  #file {
    display: none;
  }
  label {
    cursor: pointer;
    background: #ff909b;
    color: #fff;
    display: inline-block;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    box-shadow: 0px 2px 10px #c3c3c3;
  }
  .dialog-sub {
    background: #ff909b;
    color: #fff;
  }
}
.title {
  text-align: center;
  padding: 80px 30px;
  position: relative;
  overflow: hidden;
  min-width: 600px;
  width: 80%;
  margin: 0 auto;
  z-index: 1;
  .upload-activex {
    position: absolute;
    bottom: 10px;
    z-index: 1;
    left: 50%;
    margin-left: -50px;
    label {
      cursor: pointer;
      background: #ff909b;
      color: #fff;
      display: inline-block;
      width: 100px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }

  .head-img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.zone {
  min-width: 600px;
  width: 80%;
  margin: 0 auto;
  .se-title {
    background: #ff909b;
    color: #fff;
  }
}

#editorContaienr {
  border: 1px solid #ccc;
  margin-top: 10px;
}
.sub {
  padding: 10px;
  text-align: center;
  button {
    background-color: #ff909b;
    color: #fff;
  }
}
</style>

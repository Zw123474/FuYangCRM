<template>
  <div>
    <el-upload :class="hideUploadEdit == true ? 'actice' : ''" ref="upload" action="" :http-request="handleUpload" list-type="picture-card" :limit="many" :file-list="initFileList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="handlechange" multiple>
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// import { uploadOSS } from "@/utils/obs";
import website from '@/utils/website'
export default {
  props: {
    url: {
      type: Array,
      default: [],
    },
    src: {
      type: Array,
      default: [],
    },
    many: {
      type: Number,
      default: 3,
    },
  },
  data () {
    return {
      initFileList: [],
      dialogVisible: false,
      hideUploadEdit: false,
      dialogImageUrl: "",
      uploadType: "local", //判断是本地上传  "local" 或 oss 直传 "oss"
    };
  },
  watch: {
    src: {
      immediate: true,
      handler (e, r) {
        let imgList = []
        e.forEach((it, ind) => {
          let obj = {
            name: it.name || ind,
            url: it.url || it,
            uid: it.uid || ind,
          }
          imgList.push(obj)
        })
        this.initFileList = imgList
      },
    },
  },
  methods: {
    //图片多选
    handlechange (file, fileList) {
      this.checkLimit(fileList);
    },
    checkLimit (filelist) {
      if (filelist.length >= this.many) {
        this.hideUploadEdit = true;
      } else {
        this.hideUploadEdit = false;
      }
    },
    // 商品主图 图片放大
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove (file, item) {
      const index = this.initFileList.findIndex((i) => i.url === file.url);
      this.initFileList.splice(index, 1);
      this.$emit("update:url", this.initFileList);
      this.checkLimit(item);
    },
    // 上传图片
    handleUpload ({ file }) {
      try {
        const loading = this.$loading({
          lock: true,
          text: "上传中,请稍后...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        if (this.uploadType == "oss") {
          uploadOSS(file).then((res) => {
            if (res) {
              var url = {
                name: file.name,
                url: res,
                uid: file.uid,
              };
              this.initFileList.push(url);
              this.$emit("update:url", this.initFileList);
            } else {
              this.$message.warning("上传失败，请重试");
            }
            loading.close();
          });
        } else {
          var formData = new FormData();
          formData.append("file", file);
          formData.append("moduleName", file.name.split(".")[0]);
          this.$Apis.uploadFile(formData).then((res) => {
            loading.close();
            if (res.code == 200) {
              var url = {
                name: file.name,
                url: res.data,
                uid: file.uid,
              };
              this.initFileList.push(url);
              this.imageUrl = this.initFileList;
              this.$emit("update:url", this.imageUrl);
            } else {
              this.$message.warning(res.msg);
            }
          });
        }
      } catch (error) { }
    },
  },
};
</script>

<style>
</style>

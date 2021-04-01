<template>
  <div class="UserEdit">
    <my-modal :title="userModalTips"
              :modalShow="showUserInfo"
              @modalRemove="modalRemove"
              @cancel="modalCancel"
              @confirm="modalConfirm">
      <Button shape="circle" type="primary" :icon="editIcon" class="float-right not-allow" @click="userEdit" size="small" v-if="isEdit"></Button>
      <Form ref="userInfo" :model="userForm" :rules="userInfoRules" label-position="top" v-if="showForm">
        <FormItem label="编号:" prop="ID">
          <Input v-model="userForm.ID" :clearable="!isEdit" :disabled="isEdit" />
        </FormItem>
        <FormItem label="题目:" prop="NAME">
          <Input v-model="userForm.NAME" clearable :maxlength="30" :disabled="isEdit"/>
        </FormItem>
        <FormItem label="PDF:" prop="PATH" >
          <Row>
            <Col span="12" style="margin-top: 0px;">
              <Upload action=""
                      :format="['pdf']"
                      :on-format-error="uploadFormatError"
                      :before-upload="onBefore" style="margin-left: 5px;">
                <Button icon="ios-cloud-upload-outline">上传附件</Button>
              </Upload>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="类型:" prop="TYPE">
          <Input v-model="userForm.TYPE"   />
        </FormItem>

        <FormItem label="平台:" prop="PLATFORM">
          <Input v-model="userForm.PLATFORM"   />
        </FormItem>
        <FormItem label="平台链接:" prop="LINK">
          <Input v-model="userForm.LINK"   />
        </FormItem>
        <FormItem label="备注:" prop="NOTE">
          <Input v-model="userForm.NOTE"   />
        </FormItem>
        <FormItem label="年份:" prop="YEAR">
          <Input v-model="userForm.YEAR"   />
        </FormItem>
        <FormItem label="精选:" prop="SELECTED">
          <span class="filterBlock">
            <Select v-model="userForm.SELECTED"
                    class="filter">
              <Option v-for="item in list"
                    :value="item.val"
                    :key="item.val">{{ item.name }}</Option>
            </Select>
          </span>
        </FormItem>
      </Form>
      <div class="modal-info-content" v-else>
        <p> 编号: {{ userInfo.ID }} </p>
        <p> 名称: {{ userInfo.NAME }} </p>
        <!--p> 照片地址: {{ userInfo.PATH }} </p-->
        <p> 类型: {{ userInfo.TYPE }} </p>
        <p> 平台: {{ userInfo.PLATFORM }} </p>
        <p> 平台链接: {{ userInfo.LINK }} </p>
        <p> 备注: {{ userInfo.NOTE }} </p>
        <p> 年份: {{ userInfo.YEAR }} </p>
        <p> 精选: {{ (userInfo.SELECTED?'精选':'普通') }} </p>
      </div>
    </my-modal>
  </div>
</template>

<script>
    export default {
        name: "publicationEdit",
      data () {
        return {

          // 预览图片的src
          src:'',
          // 预览图片Modal
          viewModal:false,
          // 随便写个地址
          action: '',
          // 上传文件
          file: null,

          list:[{
            name: '普通',
            val: 0,
          },
            {
              name: '精选',
              val: 1,
            }
          ],

          actionUrl: '',
          showUserInfo: false,
          canEdit: false,
          showForm: false,
          userForm: {},
          loading: false,
          userId: '', // 当前用户
          // 表单验证
          userInfoRules: {
            ID: [
              { required: true, validator: this.$verify.checkUsername('该项不能为空','编号只能由1-15位的数字组成') , trigger: 'blur' }
            ],
            NAME: [
              { required: true, message: '该项不能为空', trigger: 'blur' }
            ],
            //PATH: [
            //  { required: true, message: '图片路径不能为空', trigger: 'blur' }
            //],
            LINK: [
              { required: true, message: '该项不能为空', trigger: 'blur' }
            ],
            TYPE: [
              { required: true, message: '该项不能为空', trigger: 'blur' }
            ],
            PLATFORM: [
              { required: true, message: '该项不能为空', trigger: 'blur' }
            ],
            //PDF: [
            //  { required: true, message: '该项不能为空', trigger: 'blur' }
            //],
            NOTE: [
              { required: true, message: '没有则填无', trigger: 'blur' }
            ],
            YEAR: [
              { required: true, message: '该项不能为空', trigger: 'blur' }
            ],
            SELECTED: [
              { required: true, message: '该项不能为空', trigger: 'blur' }
            ],
          },
          userModalTips: '信息'
        }
      },
      methods: {
        onBefore (file) {
          file.src = this.convertSrc(file);
          this.file=file;
          // false代表不上传到action的地址，true的话会报错，因为action地址是瞎写的，action地址不写会报错。
          return false;
        },
        handleRemove (file) {
          this.file.splice(this.file.indexOf(file), 1);
        },
        uploadFormatError(){
          this.$Message.error('上传类型只能是pdf');
        },
        handleView (item) {
          this.src = item.src;
          this.viewModal = true;
        },
        convertSrc(file){
          return window.URL.createObjectURL(file);
        },

        // 开启编辑模式
        userEdit () {
          !this.canEdit ? this.canEdit = true : this.userSave()
        },
        // 弹窗取消
        modalCancel () {
          this.showUserInfo = false
          this.canEdit ? this.canEdit = false : this.canEdit
          this.file = null
        },
        // 弹窗确定
        modalConfirm () {
          // 如果是编辑模式 就是有form的情况下
          if (this.showForm) {
            this.$refs.userInfo.validate((valid) => {
              if (valid) {
                console.log(this.file)
                this.$http.post(this.isEdit ? 'publication/updateUser' : 'publication/userAdd',{
                  id: this.userForm.ID,
                  name: this.userForm.NAME,
                  link: this.userForm.LINK,
                  pdf: this.file,
                  platform: this.userForm.PLATFORM,
                  note: this.userForm.NOTE,
                  year: this.userForm.YEAR,
                  type: this.userForm.TYPE,
                  is_select: this.userForm.SELECTED
                },{
                  _this: this,
                  loading: ''
                },res => {
                  this.$emit('reloadData')
                  this.showUserInfo = false
                  this.canEdit = false
                  this.file = null
                },err => {

                })
              } else {

              }
            })
          } else {
            this.showUserInfo = false
          }
        },
        // 修改或新增保存
        userSave () {
          this.canEdit = false
        },
        // 弹窗关闭
        modalRemove () {
          this.showForm ? this.$refs.userInfo.resetFields() : ''
          this.$emit('editClose')
          this.file = null
        }
      },
      props: {
        // 是否为编辑状态(true为编辑 false为新增)
        isEdit: {
          type: Boolean,
          default: true
        },
        modalShow: Boolean,
        userInfo: Object
      },
      computed: {
        editIcon () {
          return this.canEdit ? 'ios-create-outline': 'md-lock'
        }
      },
      watch: {
        modalShow (val) {
          this.showUserInfo = val
          if (val) {
            if (this.isEdit) {
              this.userModalTips = '用户信息'
              this.showForm = false
              this.userForm = this.userInfo
              //this.userId = this.userInfo.ID
            } else {
              this.userModalTips = '新增用户'
              this.showForm = true
              //this.userId = ''
              this.userForm = {
                ID: '',
                NAME: '',
                PATH: '',
                LINK: ''
              }
            }
          }
        },
        canEdit (val) {
          this.showForm = val
        },
        loading (val) {
          if (val) {
            this.$Spin.show({
              render: (h) => {
                return h('div', [
                  h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                      type: 'ios-loading',
                      size: 18
                    }
                  }),
                  h('div', '正在保存')
                ])
              }
            })
          } else {
            this.$Spin.hide()
          }
        }
      }
    }
</script>

<style lang="less">
  .demo-upload-list img {
    width: 100%;height: 100%;
  }
</style>

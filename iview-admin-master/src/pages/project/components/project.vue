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
        <FormItem label="名称:" prop="NAME">
          <Input v-model="userForm.NAME" clearable :maxlength="30" :disabled="isEdit"/>
        </FormItem>
        <FormItem label="类型:" prop="TYPE" >
          <Input v-model="userForm.TYPE"   />
        </FormItem>
        <FormItem label="描述:" prop="DESCRIPTION">
          <Input type="textarea" v-model="userForm.DESCRIPTION"   />
        </FormItem>
      </Form>
      <div class="modal-info-content" v-else>
        <p> 编号: {{ userInfo.ID }} </p>
        <p> 姓名: {{ userInfo.NAME }} </p>
        <p> 类型: {{ userInfo.PATH }} </p>
        <p> 描述: {{ userInfo.DESCRIPTION }} </p>
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
          file: [],

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
              { required: true, validator: this.$verify.checkUsername('编号不能为空','编号只能由1-15位的数字组成') , trigger: 'blur' }
            ],
            NAME: [
              { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            TYPE: [
              { required: true, message: '类型不能为空', trigger: 'blur' }
            ],
            DESCRIPTION: [
              { required: true, message: '描述不能为空', trigger: 'blur' }
            ]
          },
          userModalTips: '工程信息'
        }
      },
      methods: {

        // 开启编辑模式
        userEdit () {
          !this.canEdit ? this.canEdit = true : this.userSave()
        },
        // 弹窗取消
        modalCancel () {
          this.showUserInfo = false
          this.canEdit ? this.canEdit = false : this.canEdit
        },
        // 弹窗确定
        modalConfirm () {
          // 如果是编辑模式 就是有form的情况下
          if (this.showForm) {
            this.$refs.userInfo.validate((valid) => {
              if (valid) {
                console.log(this.file)
                this.$http.post(this.isEdit ? 'project/updateUser' : 'project/userAdd',{
                  id: this.userForm.ID,
                  name: this.userForm.NAME,
                  type: this.userForm.TYPE,
                  description: this.userForm.DESCRIPTION
                },{
                  _this: this,
                  loading: ''
                },res => {
                  this.$emit('reloadData')
                  this.showUserInfo = false
                  this.canEdit = false
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
              this.userModalTips = '信息'
              this.showForm = false
              this.userForm = this.userInfo
              //this.userId = this.userInfo.ID
            } else {
              this.userModalTips = '新增'
              this.showForm = true
              //this.userId = ''
              this.userForm = {
                ID: '',
                NAME: '',
                TYPE: '',
                DESCRIPTION: ''
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

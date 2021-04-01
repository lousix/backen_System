<template>
  <div class="UserEdit">
    <my-modal :title="userModalTips"
              :modalShow="showUserInfo"
              @modalRemove="modalRemove"
              @cancel="modalCancel"
              @confirm="modalConfirm">
      <Button shape="circle" type="primary" :icon="editIcon" class="float-right not-allow" @click="userEdit" size="small" v-if="isEdit"></Button>
      <Form ref="userInfo" :model="userForm" :rules="userInfoRules" label-position="top" v-if="showForm">
        <FormItem label="论文编号:" prop="PUBID" :disabled="isEdit">
          <Input v-model="userForm.PUBID" :clearable="!isEdit" :disabled="isEdit" />
        </FormItem>
        <FormItem label="类型:" prop="TYPE" :disabled="isEdit">
          <span class="filterBlock">
            <Select v-model="userForm.TYPE"
                    class="filter">
            <Option v-for="item in list"
                    :value="item.val"
                    :key="item.val">{{ item.name }}</Option>
            </Select>
          </span>
        </FormItem>
        <FormItem label="作者编号:" prop="ID">
        <Input v-model="userForm.ID" clearable :maxlength="30" />
        </FormItem>
        <FormItem label="作者排序:" prop="NUM">
          <span class="filterBlock">
            <Select v-model="userForm.NUM"
                    class="filter" :disabled="isEdit">
            <Option v-for="item in lists"
                    :value="item.val"
                    :key="item.val">{{ item.name }}</Option>
            </Select>
          </span>
        </FormItem>
      </Form>
      <div class="modal-info-content" v-else>
        <p> 论文编号: {{ userInfo.PUBID }} </p>
        <p> 类型: {{ userInfo.TYPE }} </p>
        <p> 作者编号: {{ userInfo.ID }} </p>
        <p> 作者排序: {{ userInfo.NUM }} </p>
      </div>
    </my-modal>
  </div>
</template>

<script>
    export default {
        name: "writer",
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

          list:[{
            name: '学生',
            val: '学生',
          },
            {
              name: '教师',
              val: '教师',
            }
          ],

          lists:[{
            name: '第一作者',
            val: '1',
            },
            {
              name: '第二作者',
              val: '2',
            },
            {
              name: '第三作者',
              val: '3',
            },
            {
              name: '第四作者',
              val: '4',
            },
            {
              name: '第五作者',
              val: '5',
            },
            {
              name: '第六作者',
              val: '6',
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
            PUBID: [
              { required: true, validator: this.$verify.checkUsername('不能为空','编号只能由1-15位的数字组成') , trigger: 'blur' }
            ],
            ID: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            TYPE: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            //NUM: [
            //  { required: false, message: '不能为空', trigger: 'blur' }
            //]
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
                this.$http.post(this.isEdit ? 'writer/updateUser' : 'writer/userAdd',{
                  publication_id: this.userForm.PUBID,
                  id: this.userForm.ID,
                  type: this.userForm.TYPE,
                  serial_number: this.userForm.NUM
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

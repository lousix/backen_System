<template>
  <div class="StudentEdit">
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
        <FormItem label="姓名:" prop="NAME">
          <Input v-model="userForm.NAME" clearable :maxlength="30" :disabled="isEdit"/>
        </FormItem>
        <FormItem label="照片:" prop="PATH" >
          <Row>
            <Col span="12" style="margin-top: 0px;">
              <Upload action=""
                      :format="['jpg','jpeg','png']"
                      :on-format-error="uploadFormatError"
                      :before-upload="onBefore" style="margin-left: 5px;">
                <Button icon="ios-cloud-upload-outline">上传附件</Button>
              </Upload>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Email:" prop="EMAIL">
          <Input v-model="userForm.EMAIL"   />
        </FormItem>
        <FormItem label="教育经历:" prop="EDUCATION">
          <Input type="textarea" v-model="userForm.EDUCATION"   />
        </FormItem>
        <FormItem label="研究方向:" prop="INTERESTS">
          <Input type="textarea" v-model="userForm.INTERESTS"   />
        </FormItem>
        <FormItem label="学历:" prop="DEGREE">
          <span class="filterBlock">
            <Select v-model="userForm.DEGREE"
                    class="filter">
            <Option v-for="item in Dlist"
                    :value="item.val"
                    :key="item.val">{{ item.name }}</Option>
          </Select>
      </span>
        </FormItem>
        <FormItem label="是否毕业:" prop="ALUMNI">
          <span class="filterBlock">
            <Select v-model="userForm.ALUMNI"
                class="filter">
            <Option v-for="item in Alist"
                  :value="item.val"
                  :key="item.val">{{ item.name }}</Option>
          </Select>
      </span>
        </FormItem>
      </Form>
      <div class="modal-info-content" v-else>
        <p> 编号: {{ userInfo.ID }} </p>
        <p> 姓名: {{ userInfo.NAME }} </p>
        <!--p> 照片地址: {{ userInfo.PATH }} </p-->
        <p> Email: {{ userInfo.EMAIL }} </p>
        <p> 教育经历: {{ userInfo.EDUCATION }} </p>
        <p> 研究方向: {{ userInfo.INTERESTS }} </p>
        <p> 学历: {{ userInfo.DEGREE }} </p>
        <p> 是否毕业: {{ (userInfo.ALUMNI? "毕业":"在读") }} </p>

      </div>
    </my-modal>
  </div>
</template>

<script>
    export default {
      name: "studentEdit",
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

          Alist:[{
            name: '在读',
            val: 0,
            },
            {
              name: '毕业',
              val: 1,
            }
          ],

          Dlist:[{
              name: "本科生",
              val: "本科生",
            },
            {
              name: "研究生",
              val: "研究生",
            },
            {
              name: "博士生",
              val: "博士生",
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
              { required: true, validator: this.$verify.checkUsername('编号不能为空','编号只能由1-15位的数字组成') , trigger: 'blur' }
            ],
            NAME: [
              { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            //PATH: [
            //  { required: true, message: '图片路径不能为空', trigger: 'blur' }
            //],
            EMAIL: [
              { required: true, message: '邮箱不能为空', trigger: 'blur' }
            ],
            EDUCATION: [
              { required: true, message: '教育经历不能为空', trigger: 'blur' }
            ],
            INTERESTS: [
              { required: true, message: '研究方向不能为空', trigger: 'blur' }
            ],
            DEGREE: [
              { required: true, message: '学历不能为空', trigger: 'blur' }
            ],
            ALUMNI: [
              { required: true, message: '毕业情况不能为空', trigger: 'blur' }
            ]
          },
          userModalTips: '学生信息'
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
          this.$Message.error('上传类型只能是jpg,jpeg,png');
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
                this.$http.post(this.isEdit ? 'student/updateUser' : 'student/userAdd',{
                  id: this.userForm.ID,
                  name: this.userForm.NAME,
                  picture: this.file,
                  Email: this.userForm.EMAIL,
                  education: this.userForm.EDUCATION,
                  interests: this.userForm.INTERESTS,
                  degree: this.userForm.DEGREE,
                  is_alumni: this.userForm.ALUMNI,
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
                EMAIL: '',
                EDUCATION: '',
                INTERESTS: '',
                DEGREE: '',
                ALUMNI: ''
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

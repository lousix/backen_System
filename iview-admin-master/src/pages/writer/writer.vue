<template>
  <div class="writer">
    <content-header>
      <div slot="contentHeaderLeft">
        <Col span="5">
          <Row :gutter="5">
            <Col span="4">
              <Button type="primary" icon="ios-search" :loading="isSearching" @click="search"></Button>
            </Col>
          </Row>
        </Col>
      </div>
      <div slot="contentHeaderRight">
        <Button type="primary" @click="userAdd">新增</Button>
        <!--Button type="warning">重置</Button-->
      </div>
    </content-header>
    <content-container>
      <Spin size="large" fix v-if="loading"></Spin>
      <Table border height="425" :columns="columns" :data="userList"></Table>
      <UserEdit :modalShow="showUserInfo"
                :userInfo="userInfo"
                :isEdit="isEdit"
                @reloadData="queryUserByPagination"
                @editClose="editCancel"
      ></UserEdit>
    </content-container>
    <content-footer slot="footer" >
      <Page  :total="total" :page-size="rows" :current="page" class="paging" @on-change="changePage" />
    </content-footer>
  </div>
</template>

<script>
    import UserEdit from "../writer/components/writerEdit";

    export default {
        name: "writer",
      data () {
        return {
          username: '', // 账号,
          isSearching: false, // 查找中
          total: 0,
          page: 1,
          rows: 8,
          showUserInfo: false, // 是否显示用户信息弹窗(新增或编辑)
          modal2: true,
          modal_loading: false,
          loading: false, // 数据加载中
          columns: [
            {
              title: '论文编号',
              key: 'PUBID'
            },
            {
              title: '类型',
              key: 'TYPE'
            },
            {
              title: '作者编号',
              key: 'ID'
            },
            {
              title: '作者排序',
              key: 'NUM',
            },
            {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.userEdit(params.row)
                      }
                    }
                  }, '查看'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.deleteUser(params.row)
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          userList: [],
          // 当前用户
          userId: null,
          userInfo: {},
          isEdit: true
        }
      },
      methods: {

        search () {
          this.isSearching = true
          this.queryUserByPagination()
        },
        // 获取用户列表
        queryUserByPagination () {
          this.$http.get('writer/queryUserByPagination',{
            params: {
              page: this.page,
              rows: this.rows,
            }
          }, {
            _this: this,
            loading: 'loading'
          }, res => {
            this.userList = res.data
            this.total = res.total
            this.isSearching = false
          }, err => {

          })
        },
        // 用户新增
        userAdd () {
          this.isEdit = false
          this.showUserInfo = true
        },
        // 查看用户详细信息
        userEdit (user) {
          this.userInfo = JSON.parse(JSON.stringify(user))
          this.showUserInfo = true
        },
        /**
         * @description: 删除用户(confirm方法可选参数)
         * @param: { loading: 点击按钮后的loading(true,false) title: '删除标题' tips: '删除提示' confirm: '执行删除的方法' cancel: '取消的方法'  }
         * @author: xx
         * @date: 2018-08-10 09:51:55
         */
        deleteUser (userId) {
          this.$confirm({
            title: '删除确认',
            tips: '您是否要继续删除？',
            loading: this.modal_loading,
            confirm: ()=>{  this.deleteConfirm(userId) }
          })
        },
        // 确认删除
        deleteConfirm (user) {
          this.$Modal.remove()
          this.$http.post('writer/deleteUserById', {
            id: user.ID,
            publication_id: user.PUBID,
            type: user.TYPE,
            serial_number: user.NUM
          },{
            _this: this,
            loading: 'loading'
          }, res => {
            this.queryUserByPagination()
          }, err => {

          })
        },
        // 弹窗关闭
        editCancel () {
          this.showUserInfo = false
          this.isEdit = true
        },
        changePage(index){
          this.page = index
          this.queryUserByPagination()
        },
        changeRows(index){
          this.rows = index
          this.queryUserByPagination()
        }
      },
      components: {
        UserEdit
      },
      watch: {
        registerDate (val) {
          if (val[0] !== '') {
            this.startTm = this.$dateFormat(val[0],'yyyy-MM-dd') + ' 00:00:00'
            this.endTm = this.$dateFormat(val[1],'yyyy-MM-dd') + ' 00:00:00'
          } else {
            this.startTm = ''
            this.endTm = ''
          }
        }
      },
      mounted () {
        this.queryUserByPagination()
      }
    }
</script>

<style lang="less">
  @import '~@style/style';
  .not-allow{
    margin-top: -20px;
  }
  .modal-info-content{
    font-size: 14px;
  }
</style>

<!-- 首页 -->
<template>
  <div class="home-index">
      <content-header>
        <div slot="contentHeaderLeft">
          <Col span="5">
            <Row :gutter="5">
              <Col span="4">
                <Button type="primary" icon="ios-search" :loading="isSearching" @click="search"  ></Button>
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
import countTo from 'vue-count-to'
import UserEdit from "../../home/components/homeEdit";
export default {
  name: 'home-index',
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
          title: '编号',
          key: 'ID',
          width: 100,
          align: 'center'
        },
        {
          title: '类型',
          key: 'TYPE',
          align: 'center',
          width: 100
        },
        {
          title: '内容',
          align: 'center',
          key: 'CONTENT',
          render: (h,params) => {
            if(params.row.TYPE == "picture" || params.row.TYPE == "video"){
              return h('span',params.row.CONTENT.substr(31))
            }else{
              return h('span',params.row.CONTENT)
            }
          }

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
                    this.deleteUser(params.row.ID)
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
      this.$http.get('home/queryUserByPagination',{
        params: {
          page: this.page,
          rows: this.rows,
          //username: this.username,
          //startTm: this.startTm,
          //endTm: this.endTm
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
    deleteConfirm (userId) {
      this.$Modal.remove()
      this.$http.post('home/deleteUserById', {
        id: userId
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
  .home-index{
    width:100%;
    height:100%;
    .header-row{
      height: 46%;
      .col-item{
        height: 100%;
      }
    }
    .analysis-search-box{
      height: 6.5%;
      margin: 1% 0;
      .search-content{
        height: 100%;
        border: 1px solid #DDD;
        padding: 0 15px;
        box-sizing: border-box;
        background: #EEE;
        form,
        label,
        div{
          height: 100%;
        }
        .ivu-form-item-content div:not(.ivu-select-dropdown),
        label{
          display: flex;
          align-items: center;
        }
        .ivu-select-dropdown{
          height: auto !important;
          div{
            display: block !important;
            height: auto !important;
          }
        }
        label{
          padding:0;
        }
        .ivu-form-item-content{
          margin-left: 60px;
        }
        .ivu-form-item{
          margin-bottom: 0;
        }
        .ivu-date-picker-rel{
          width: 100%;
        }
        .content-center{
          display: flex;
          align-items: center;
        }
      }
    }
    .footer-row{
      height: 45%;
      .col-item{
        height: 100%;
      }
    }
    .not-allow{
      margin-top: -20px;
    }
    .modal-info-content{
      font-size: 14px;
    }
    .col-item{
      .ivu-card-head{
        background: #F8F8F9;
      }
      .ivu-card-body{
        height: calc(~'100% - 51px');
        &>div{
          width: 100%;
          height: 100%;
          &>div:first-child{
            width: 100%;
            height: 100%;
            canvas{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      &.no-padding{
        .ivu-card-body{
          padding: 5px !important;
        }
      }
    }
    #deviceCount{
      display: flex;
      flex-flow: row wrap;
      .dev-item{
        width: 100%;
        height: auto;
        border: 1px solid #EEE;
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 20%;
        &:last-child{
          margin-bottom: 0;
        }
        span{
          font-size: 22px;
          &:last-child{
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>

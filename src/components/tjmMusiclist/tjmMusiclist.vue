<template>
<div class="table">
  <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
  <el-collapse-item title="    我创建的歌单" name="1" style="color:white;width: 100%; background-color:unset;!important"
                    class="collapse_item">
  <el-table
    :data="createListTableData"
    style="width: 100%; background-color:unset;"
    resizable=“false”>
    <el-table-column label="songsListId" align="center" prop="songsListId" background-color:unset v-if="false" />
    <el-table-column
      fixed="left"
      prop="songsListName"
      label="歌单名"
      align= "center"
      resizable=“false”
      style="color:#DDDD22 !important">
      <template slot-scope="scope">
          <div>
            <a href="javascript:;" @click="view(scope.$index,this.createListTableData)">{{scope.row.songslistName}}</a>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label=""
      fixed="right"
      align= "center"
      resizable=“false”
      style="color:#DDDD22 !important">
      <template slot="header" slot-scope="scope">
        <i class="el-icon-circle-plus-outline" @click="add()"/>
      </template>
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="play(scope.$index,createListTableData)"
          class="el-icon-caret-right"
          size="large"
          circle/>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, createListTableData)"
          class="el-icon-close"
          size="large"
          circle/>
      </template>
    </el-table-column>
  </el-table>
  </el-collapse-item>
    <el-collapse-item title="我收藏的歌单" name="2">
      <el-table
        :data="colloctListTableData"
        style="width: 100%; background-color:unset;"
        resizable=“false”>
        <el-table-column label="songsListId" align="center" prop="songsListId" v-if="false" />
        <el-table-column
          fixed="left"
          prop="songsListName"
          label="歌单名"
          align= "center"
          resizable=“false”
          style="color:#DDDD22 !important">
          <template slot-scope="scope">
            <div>
              <a href="javascript:;" @click="view(scope.$index,this.colloctListTableData)">{{scope.row.songslistName}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          fixed="right"
          align= "center"
          resizable=“false”
          style="color:#DDDD22 !important">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="play(scope.$index,colloctListTableData)"
              class="el-icon-caret-right"
              size="large"
              circle/>
            <el-button
              @click.native.prevent="deleteRow(scope.$index,colloctListTableData)"
              class="el-icon-close"
              size="large"
              circle/>
          </template>
        </el-table-column>
      </el-table>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        createListTableData: [{
          songsListName:'暂无数据',
          songsListId:''
        }],
        colloctListTableData: [{
          songsListName:'暂无数据',
          songsListId:''
        }],
        activeNames:['1','2'],
        show:true
      }
    },
    methods: {
      add(){
        this.$prompt('请输入新建的歌单名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$http.get('http://localhost:8082/api/songs/add?userId='
            +JSON.parse(window.localStorage.getItem("userToken")).userId
            +'&songslistName='+value)
            .then(res =>{
              this.$message({
                type: 'success',
                message: '您新建的歌单名是' + value
              });
            })
            .catch(err => {
              console.log(err);
              this.$message({
                type: 'error',
                message: '很抱歉！由于未知原因，新建歌单失败！'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      successDelete() {
        this.$alert('该歌单成功删除！', '消息通知', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      failDelete() {
        this.$alert('很抱歉，由于奇怪的原因，该歌单删除失败！', '消息通知', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      play(index,rows){
        console.log(rows[index]);
        this.$http.get('http://localhost:8082/api/songs/get_songsdetail/'+rows[index].songslistId)
          .then(res =>{
            console.log(res);
            window.localStorage.setItem('currentIndex','0');
            let playlist=[];
            for(let i = 0;i<res.data.length;i++)
            {
              playlist.push(res.data[0]);
            }
            window.localStorage.setItem('currentPlayList',JSON.stringify(playlist));
            window.localStorage.setItem('currentSongsId',playlist[0].songsId);
          })
          .catch(err => {
            console.log(err);
          })
      },
      deleteRow(index,rows) {
        this.$http.get('http://localhost:8082/api/songslist/delete?'+rows[index].songslistId)
          .then(res =>{
            console.log(res);
            if(res.data=="删除成功"){
              rows.splice(index,1);
              this.successDelete();
            }
            else{
              this.failDelete();
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      handleChange(val) {
        this.activeNames=['1','2'];
        console.log(val);
      },
      view(index,rows) {
        if (rows[index].data()!= "") {
          if(rows==this.createListTableData)
            window.localStorage.setItem("modifiable",'1');
          else
            window.localStorage.setItem("modifiable",'0');
          window.localStorage.setItem("selectSongslistId",rows[index].songslistId);
          this.$router.push('/tjmusic/mainPage/songslist');
        }
      },
    },
    mounted:function () {   //自动触发写入的函数
      this.createListTableData.splice(0,this.createListTableData.length);
      this.colloctListTableData.splice(0,this.colloctListTableData.length);
      if(window.localStorage.getItem("modifiable")==null)
        window.localStorage.setItem("modifiable",'1');
      this.$http.get('http://localhost:8082/api/songslist/get/'+JSON.parse(window.localStorage.getItem("userToken")).userId)
          .then(res =>{//获取创建的歌单
          console.log(res.data);
          if(window.localStorage.getItem("selectedSongslistId")==null)
            window.localStorage.setItem("selectedSongslistId",res.data[0].songsListId);
          alert(res.data[0].songsListName);
          for(let i = 0;i<res.data.length;i++)
          {
            this.createListTableData.push(res.data[i]);//需要修改
            console.log(this);
          }
          console.log(this.createListTableData);
          window.localStorage.setItem("mySongslist",JSON.stringify(this.createListTableData));
        })
        .catch(err => {
          console.log(err);
        });
      this.$http.get('http://localhost:8082/api/listcollect/get/'+JSON.parse(window.localStorage.getItem("userToken")).userId)
        .then(res =>{//获取收藏的歌单
          console.log(res.data);
          if(window.localStorage.getItem("selectedSongslistId")==null){
            window.localStorage.setItem("selectedSongslistId",res.data[0].songsListId);
            window.localStorage.setItem("modifiable",'0');
          }
          for(let i = 0;i<res.data.length;i++)
          {
            this.colloctListTableData.push(res.data[i]);//需要修改
            console.log(this);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
</script>
<style>
.el-collapse .el-collapse-item{
  color: #DDDD22;
background-color: unset !important}
.el-collapse-item .el-collapse-item__header{
  color: #DDDD22;
background-color: unset !important}
.el-collapse-item__header.is-active{
border-bottom-color: #00e1ff;
}
.el-collapse-item .el-collapse-item__wrap{
  color: #DDDD22;
background-color: unset !important}

.el-table,
        .el-table__expanded-cell {
            background-color: transparent !important;
        }
        /* 表格内背景颜色 */
        .el-table th,
        .el-table tr,
        .el-table td {
            background-color: transparent !important;
        }

.el-table {
  /* 表格字体颜色 */
  color: #DDDD22;
  /* 表格边框颜色 */
  border: 0.5px solid #fcfcfc00;
  height: 80%;
}

.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
.el-table thead {
		color: #FAFAE2;
		font-weight: 500;
	}
</style>

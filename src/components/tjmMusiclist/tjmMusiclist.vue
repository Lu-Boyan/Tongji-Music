<template>
<div class="table">
  <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
  <el-collapse-item title="我创建的歌单" name="1" style="width: 100%; background-color:unset;" class="collapse_item">
  <el-table
    :data="myListTableData"
    style="width: 100%; background-color:unset;"
    resizable=“false”>
    <el-table-column label="songslistId" align="center" prop="songslistId" v-if="false" />
    <el-table-column
      fixed="left"
      prop="songslistName"
      label="我的歌单"
      align= "center"
      resizable=“false”
      style="color:#DDDD22 !important">
      <template slot-scope="scope">
          <div>
            <a href="javascript:;" @click="view">{{scope.row.songslistName}}</a>
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
          @click.native.prevent="play(scope.$index, myListTableData)"
          class="el-icon-caret-right"
          size="large"
          circle/>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, myListTableData)"
          class="el-icon-close"
          size="large"
          circle/>
      </template>
    </el-table-column>
  </el-table>
  </el-collapse-item>
    <el-collapse-item title="我收藏的歌单" name="2" style="background-color:transparent; border:0px; color:#90F7F7 !important;">
      <el-table
        :data="myListTableData"
        style="width: 100%; background-color:unset;"
        resizable=“false”>
        <el-table-column label="songslistId" align="center" prop="songslistId" v-if="false" />
        <el-table-column
          fixed="left"
          prop="songslistName"
          label="我的歌单"
          align= "center"
          resizable=“false”
          style="color:#DDDD22 !important">
          <template slot-scope="scope">
            <div>
              <a href="javascript:;" @click="view">{{scope.row.songslistName}}</a>
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
              @click.native.prevent="play(scope.$index, myListTableData)"
              class="el-icon-caret-right"
              size="large"
              circle/>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, myListTableData)"
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
        myListTableData: [{
          songslistName:'暂无数据',
          songslistId:''
        }],
        activeNames:['1'],
      }
    },
    methods: {
      play(index,rows){
        console.log(rows.name);
      },
      deleteRow(index, rows) {
        this.$http.get('http://localhost:8903/listcollect/get_list/'+window.localStorage.getItem("userToken").userId)
          .then(res =>{
            console.log(res);

          })
          .catch(err => {
            console.log(err);
          })
      },
      handleChange(val) {
        console.log(val);
      },
      view(index,rows) {
        if (rows[index].data()!= "") {
            window.localStorage.setItem("selectSongslistId",this.myListTableData[index].songslistId);
            this.$router.push('/tjmusic/mainPage/songslist');
        }
      },
    },
    mounted:function () {   //自动触发写入的函数
      this.myListTableData.splice(0,this.myListTableData.length);
      this.$http.get('http://localhost:8903/listcollect/get_list/'+window.localStorage.getItem("userToken").userId)
          .then(res =>{
          console.log(res.data);
          window.localStorage.setItem("defaultPlayslist",res.data[0].songsListId);
          window.localStorage.setItem("selectedSongslistId",res.data[0].songsListId);
          for(var i = 0;i<res.data.length;i++)
          {
            this.myListTableData.push(res.data[i]);//需要修改
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

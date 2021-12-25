<template>

<div class="table">

    <el-row class="demo-autocomplete">
        <el-input
  type="textarea"
  :autosize="{ minRows: 3, maxRows: 6}"
  placeholder="请输入内容"
  v-model="contentData" circle style="margin-top:10px !important;">
</el-input>
    <el-button icon="el-icon-upload2" circle style="margin-top:10px !important;" @click.native.prevent="addData()"></el-button>
    </el-row>
  <el-table
    :data="commentTableData"
    height="300"
    style="width: 100%; background-color:unset;"
    resizable=“false”>
    <el-table-column
      fixed="left"
      prop="userId"
      align= "left"
      resizable=“false”
      style="color:#DDDD22 !important">
    </el-table-column>
    <el-table-column
      fixed="left"
      prop="commentContent"
      min-width="180%"
      align= "left"
      resizable=“false”
      style="color:#DDDD22 !important">
    </el-table-column>
    <el-table-column
      fixed="left"
      prop="commentTime"
      align= "left"
      resizable=“false”
      style="color:#DDDD22 !important">
    </el-table-column>
    <el-table-column
      fixed="left"
      prop="thumbNum"
      align= "left"
      resizable=“false”
      style="color:#DDDD22 !important">
    </el-table-column>
    <el-table-column
    prop="thumbNum"
      fixed="right"
      align= "right"
      resizable=“false”
      style="color:#DDDD22 !important">

      <template slot-scope="scope">
        <el-button
          @click.native.prevent="play($event,scope.$index, tableData)"
          class="el-icon-thumb"
          size="small"
          circle/>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          class="el-icon-close"

          size="small"
          circle/>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>


<script>
import $ from 'jquery'
  export default {
    data() {

      return {

        commentTableData: [],
        contentData : ''

      }
    },
    methods: {
      play(obj,index,rows){



       // console.log(obj)
        //$(obj).css("black")
        //console.log(this.commentTableData[index]);
        if(this.commentTableData[index].like==false)
        {
          this.commentTableData[index].thumbNum++;
          this.commentTableData[index].like=true;
        }
        //console.log(rows)


      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      getData(){
        console.log('@');
        this.$http.get('http://localhost:8902/comment/get_comment_by_songsId/2')
        .then(res => {
        console.log(res.data);
        this.commentTableData.splice(1,this.commentTableData.length-1)
        for(var i = 0;i<res.data.length;i++)
        {
          this.commentTableData.push(res.data[i])
          console.log(this)
        }
        })
      },
      addData(){
        var url = 'http://localhost:8902/comment/add_comment/2/2/';
        url = url + this.contentData;
        console.log(url);
         this.$http.get(url)
        .then(res => {
        })

        this.getData();



      }

    },

    mounted:function () {   //自动触发写入的函数
            this.getData();
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

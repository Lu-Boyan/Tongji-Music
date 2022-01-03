<template>

  <div class="table">

    <el-row class="demo-autocomplete">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 6}"
        placeholder="请输入内容"
        v-model="contentData" circle style="margin-top:10px;width: 80% !important;">
      </el-input>
      <el-button icon="el-icon-upload2" circle style="margin-left:10px !important;" @click.native.prevent="addData()"></el-button>
    </el-row>
    <el-table
      :data="commentTableData"
      height="350"
      style="width: 100%; background-color:unset;"
      resizable=“false”>
      <el-table-column
        fixed="left"
        prop="userName"
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
            @click.native.prevent="play($event,scope.$index, commentTableData)"
            class="el-icon-thumb"
            v-bind:class="{inred:commentTableData[scope.$index].like}"
            style="border:unset"

            size="small"
            circle/>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, commentTableData)"
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
      UId:'',
      commentTableData: [],
      contentData : '',
      SId:''

    }
  },
  methods: {
    bindId:function(i){
      return "thumb"+i;
    },
    play(obj,index,rows){



      console.log($(obj.target))
      var CId = this.commentTableData[index].commentId;

      if(this.commentTableData[index].like==false)
      {

        console.log(CId)
        this.commentTableData[index].thumbNum++;
        $(obj.target).css("background-color", "indianred");
        this.commentTableData[index].like=true;


        this.$http.get('http://localhost:8082/api/comment/add_thumb/'+this.UId+'/'+CId)
          .then(res => {
            console.log(res.data);

          })

      }else
      {
        $(obj.target).css("background-color","white")
        this.commentTableData[index].like=false;
        this.commentTableData[index].thumbNum--;
        this.$http.get('http://localhost:8082/api/comment/delete_thumb/'+this.UId+'/'+CId)
          .then(res => {
            console.log(res.data);
          })
      }
      //console.log(rows)

    },
    deleteRow(index, rows) {
      //var UId  = JSON.parse(window.localStorage.getItem("userToken")).userId;


      if(this.UId==this.commentTableData[index].userId)
      {


        this.$http.get('http://localhost:8082/api/comment/delete_comment_by_Id/'+this.commentTableData[index].commentId)
          .then(res => {
            console.log(res.data);
          })
        rows.splice(index, 1);
      }

    },
    getData(){
      console.log('@');
      this.SId = window.localStorage.getItem('currentSongsId');

      this.commentTableData.splice(0,this.commentTableData.length)
      this.$http.get('http://localhost:8082/api/comment/get_comment_by_songsId/'+this.SId)
        .then(res => {
          console.log(res.data);
          for(var i = 0;i<res.data.length;i++)
          {
            this.commentTableData.push(res.data[i])
            console.log(this)
          }
        })
    },
    addData(){
      var url = 'http://localhost:8082/api/comment/add_comment/'+this.SId+'/'+this.UId+'/';
      url = url + this.contentData;
      console.log(url);
      this.$http.get(url)
        .then(res => {

        })


      let _this=this
      setTimeout(function()  {

        _this.getData()

      }, 1000);


    }

  },

  mounted:function () {   //自动触发写入的函数
    this.UId = JSON.parse(window.localStorage.getItem("userToken")).userId;
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

.inred{
  background-color: indianred;

}

</style>

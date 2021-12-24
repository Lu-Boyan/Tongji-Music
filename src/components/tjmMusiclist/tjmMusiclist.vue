<template>
<div class="table">
  <el-table
    :data="tableData"
    height="600"
    style="width: 100%; background-color:unset;"
    resizable=“false”>
    <el-table-column
      fixed="left"
      prop="name"
      label="我的歌单"
      align= "center"
      resizable=“false”
      style="color:#DDDD22 !important">
    </el-table-column>
    <el-table-column
      label=""
      fixed="right"
      align= "center"
      resizable=“false”
      style="color:#DDDD22 !important">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="play(scope.$index, tableData)"
          class="el-icon-caret-right"
          size="large"
          circle/>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          class="el-icon-close"
          size="large"
          circle/>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    methods: {
      play(index,rows){
        console.log(rows.name);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    data() {
      return {
        tableData: [{
          name: '稻花香'
        }, {
          name: '桂花香'
        }, {
          name: '梅花香'
        }, {
          name: '兰花香'
        }]
      }
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
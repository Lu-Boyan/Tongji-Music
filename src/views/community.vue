<template>
<div class="background">
  <div class="block">

    <el-card>

      <div>
        <table>
          <tr>
            <td>
              <h2 >动态</h2>
            </td>
            <td>
              <el-button round size="mini" style="margin-top:-5px;position:absolute;right:35px;" @click="dialogFormVisible = true" >发布动态</el-button>
            </td>
          </tr>
        </table>
        
      </div>
      
      <hr color="red" style="margin-top:-10px;">

        <el-timeline style="margin-top:30px; margin-left:-35px">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp">
              <el-card>
                <table>
                  <tr>
                      <td><img src="../assets/logo.png"  style="width:40px; height:40px"></td>
                      <td><h4 style="margin-top:0px; margin-left:0px">{{activity.name}}</h4></td>
                  </tr>
                    <p style="margin-top:10px">{{ activity.content }}</p>
                </table>
              </el-card>
          </el-timeline-item>
        </el-timeline>

    </el-card>

  <el-dialog :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
    <template slot="title" >
      <div style="color:black">分享</div>
    </template>
    <hr style="margin-top:-30px;">

    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item style="margin-left:-120px; width:100%">
          <el-input v-model="form.content" type="textarea" rows="5" placeholder="说点什么吧~" ></el-input>
        </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">分享</el-button>
      </div>
  </el-dialog>

  </div>
</div>
</template>




<style scoped>
    .background{
      background-image: url(../assets/background.jpeg);
      height: 110%;
      width: 100%;
      background-size: 100% 150%;
      background-repeat: repeat;
    }
</style>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        content: '',
        
      },
      activities: [
        {
          // picture:'../assets/logo.png',
          name:'海亦',
          content: 'Success',
          timestamp: '2021-04-17 17:00',
        },
        {
          // picture:'../assets/logo.png',
          name:'初晴',
          content: 'Success',
          timestamp: '2021-04-16 17:00',
        },
      ],
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      alert("分享成功"); 
      this.dialogFormVisible=false;
    },
  },
}
</script>





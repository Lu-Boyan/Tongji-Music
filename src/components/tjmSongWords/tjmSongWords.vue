<template>
<div class="songwords" style="position:center">
    <div style="position:center">
        <el-avatar :size="200" src="https://1.s91i.faiusr.com/4/AFsIABAEGAAgurfA9AUos_CfxwEwgA84uAg!800x800.png?_tm=3&v=1586502589462"></el-avatar>
    </div>
    <div><button @click="get()">播放歌曲</button></div>
    <div class="songname" style="position:center">
        <div style="font-size:30px">{{this.name}}</div>
    </div>
      <div class="music-lyric-items" style="height:50px">
        <!-- <p v-if="!1">还没有播放音乐哦！</p>
        <p v-else-if="this.nolyric==0">暂无歌词！</p>
        <template v-else-if="this.lyric.length > 0"> -->
        <template >
          <!-- <p
            v-for="(item, index) in lyric"
            :key="index"
            :class="{ on: lyricIndex === index }"
          > -->
          <p
            v-for="(item, index) in this.lyric"
            :key="index"
          >
            {{ item.text}}
          </p>
          <!-- <div>{{this.lyric.text}}</div> -->
        </template>
        <!-- <p v-else>歌词加载失败！</p> -->
      </div>
</div>
</template>

<script>
import {
  parseLyric,
} from '@/utils/util'
//import { mapGetters } from 'vuex'
export default{
data()
{
    return {
        //nolyric:false,
        //lyric:[],
        name:'',
        id:'',
        songsId:false,

        lyricIndex: {
        type: Number,
        default: 0
        },
        play: false,
        timer: null,
        // lyric: {
        // type: Array,
        // default: () => []
        // },
        //nolyric:0    
        lyric:[],
    }
},

// mounted()
// {
// console.log("909")
//     this.id=window.localStorage.getItem('currentSongsId');
//     console.log("20"+this.id)
//     this.name=window.localStorage.getItem('currentSongsName');
// },

methods: {
get()
{
    setInterval(this.startPlay, 4000);
    console.log('开始定时器');
    console.log("909")
    this.id=window.localStorage.getItem('currentSongsId');
    console.log("20"+this.id)
    this.name=window.localStorage.getItem('currentSongsName');
    //if(songsId){
    
    this.$http.get('http://47.101.183.170:3000/lyric?id='+this.id)
        .then(res =>{
            console.log("666")
            console.log(res)
            
            this.lyric=parseLyric(res.data.lrc.lyric)
            console.log(this.lyric)
            
            console.log(this.lyric[0].time)
        

        })
        .catch(err => {
        console.log(err);
        })
        
    },
    startPlay() {
      let that = this;
      let i=0
      that.play = true; //开始播放
      that.timer = setTimeout(() => {  //创建并执行定时器
        i++
        console.log(i)
        that.lyric.push(that.lyric[0]); //将第一条数据塞到最后一个
        that.lyric.shift(); //删除第一条数据
        that.play = false; //暂停播放
      }, that.lyric[i+1]-that.lyric[i]);
      //console.log(that.timer);
    },

            
  }
}
</script>


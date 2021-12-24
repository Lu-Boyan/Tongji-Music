<template>
<div class="tjmProcess">
  <el-progress :percentage="50"></el-progress>
</div>
</template>

<script>
  export default {
    methods: {//这里算进度
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
  };
</script>

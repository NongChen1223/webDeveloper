<script setup lang="ts">  
defineProps<{   
  msg: string   
}>()   
</script>   
   
<template>   
  <div class="greetings">   
    <h1 class="green">{{ msg }}</h1>   
    <h3>   
      这是一个使用 <span class="highlight">Vue 3</span> + <span class="highlight">TypeScript</span> + <span class="highlight">Vite</span> 创建的练习项目   
    </h3>   
  </div>   
</template>  
  
<style scoped>  
h1 {  
  font-weight: 500;  
  font-size: 2.6rem;  
  position: relative;  
  top: -10px;  
}  
  
h3 {  
  font-size: 1.2rem;  
}  
  
.greetings h1,  
.greetings h3 {  
  text-align: center;  
}  
  
.highlight {  
  color: #42b883;  
  font-weight: bold;  
}  
</style> 

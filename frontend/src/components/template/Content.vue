<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style scoped>
.content:not(:last-child){ margin-bottom: 0; }
.content {
  margin: 0;
  grid-area: content;
  background-color: azure;
  padding: 20px;
}
</style>
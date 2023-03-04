<template>
  <div class="profile">
    <el-row>
      <el-col
        :offset="21"
        :span="3"
      >
        <img
          class="profile__avatar"
          src="https://www.meme-arsenal.com/memes/52b8f4f801aa9a750d24a5cd5ea56e07.jpg"
          alt="Аватар"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  padding: 20px;

  &__avatar {
    width: 200px;
    height: 200px;
    border: 1px solid $color--black;
    border-radius: 20px;
    box-shadow: 0 0 5px $color--black;
  }
}
</style>
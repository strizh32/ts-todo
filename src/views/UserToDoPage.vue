<template lang="pug">
  .user-todo-page(v-if="user")
    h1.title {{user.name}} ToDo's
    button.button(@click="$router.go(-1)") <= Go Back
    table.table.todos
        tbody
            tr(v-for="{id, completed, title} in toDos" :key="id" :class="{ 'is-selected': completed }")
                td.todo {{title}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getUserToDos, getUserById } from "@/requests";

@Component
export default class UserToDoPage extends Vue {
  private toDos: ToDo[] = [];
  private user: null | User = null;

  mounted(): void {
    this.updateUser();
    this.updateToDos();
  }

  async updateToDos() {
    try {
      const { userId } = this.$route.params;
      const { data } = await getUserToDos(+userId);
      this.toDos = Object.freeze(data);
    } catch {
      console.warn("Error in updateToDos");
    }
  }

  async updateUser() {
    try {
      const { userId } = this.$route.params;
      const { data } = await getUserById(+userId);
      this.user = Object.freeze(data[0]);
    } catch {
      console.warn("Error in updateUser");
    }
  }
}
</script>

<style lang="scss" scoped>
.todos {
  margin: 0 auto;
}
</style>

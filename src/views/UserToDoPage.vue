<template lang="pug">
  .user-todo-page
    template(v-if="user && toDos.length")
        h1.title {{user.name}} ToDo's
        button.button(@click="$router.go(-1)") <= Go Back
        table.table.todos
            tbody
                tr(v-for="({id, completed, title}, idx) in toDos" :key="id")
                    td.todo {{idx + 1}}. {{title}}
                        span(v-if="completed") &nbsp;✅
    template(v-else)
        p.title Please, wait while loading
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
    text-align: left;
}
</style>

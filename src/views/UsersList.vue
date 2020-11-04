<template lang="pug">
  .users-list
    h1.title List of Users
    table.table.is-striped.is-hoverable
        thead
            tr.has-text-weight-bold
                td Name 🗿
                td Email 📧
                td Phone 📱
        tbody
            tr(v-for="{ name, email, phone, id } in $store.state.users" :key="id" @click="handleUserClick(id)")
                td.has-text-weight-semibold {{name}}
                td {{email}}
                td {{phone}}
    nav.pagination(role="navigation" aria-label="pagination")
        ul.pagination-list
            li(v-for="(_page, idx) in pages")
                router-link.pagination-link(:to="`/${idx + 1}`" :class="{'is-current': isCurrentPageLink(idx + 1)}") {{idx + 1}}
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import { getUsers } from "@/requests";
import { UPDATE_TOTAL_USERS_COUNT, UPDATE_USERS } from "@/store";

@Component
export default class UsersList extends Vue {
  mounted() {
    this.fetchUsers();
  }

  @Watch("routePath")
  onRoutePathChanged() {
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const { data, headers } = await getUsers(this.currentPage);
      const { commit } = this.$store;
      const narrowedUsers = data.map((user: User) => {
        const { name, phone, email, id } = user;
        return { name, phone, email, id };
      });
      const totalUsersCount = +headers?.["x-total-count"] || 0;
      commit(UPDATE_USERS, { users: Object.freeze(narrowedUsers) });
      commit(UPDATE_TOTAL_USERS_COUNT, { totalUsersCount });
    } catch {
      console.warn("Error in fetchUsers");
    }
  }

  handleUserClick(userId: number): void {
    this.$router.push({
      name: "UserToDoPage",
      params: { userId: userId.toString() }
    });
  }

  isCurrentPageLink(page: number): boolean {
    return this.currentPage === page;
  }

  get routePath(): string {
    return this.$route.path;
  }

  get pages(): null[] {
    const { totalUsersCount } = this.$store.state;
    const count = Math.ceil(totalUsersCount / 5);
    return new Array(count).fill(null);
  }

  get currentPage(): number {
    const currentPage = this.$route?.params?.page || 1;
    return +currentPage;
  }
}
</script>

<style lang="scss" scoped>
.table {
  margin: 0 auto;
  tr {
    cursor: pointer;
  }
}
.pagination-list {
  justify-content: center;
}
</style>

<script setup>
import { socket } from "@/services/socket";
import { useCommonStore, useUserStore } from "@/stores";
import Dialog from "primevue/dialog";
import OverlayPanel from "primevue/overlaypanel";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Avatar from "../common/Avatar.vue";

const router = useRouter();
const userStore = useUserStore();
const commonStore = useCommonStore();
const visible = ref(false);
const op = ref(null);
const showUserMenu = ref(null);

const toggle = (e) => {
  op.value.toggle(e);
};

const toggleUserMenu = (e) => {
  showUserMenu.value.toggle(e);
};

const handleLogout = () => {
  localStorage.removeItem("token");
  socket.disconnect();
  router.push("/auth/login");
};
</script>

<template>
  <div
    class="flex justify-between items-center h-[46px] pl-[20px] pr-[16px] border flex-shrink-0"
  >
    <div class="flex items-center">
      <span
        :class="`pi pi-angle-double-right mr-3 text-gray-400 hover:text-gray-700
                 p-1 hover:bg-gray-100 ml-[-4px] cursor-pointer`"
        :style="{
          fontSize: '22px',
          display: commonStore.showSidebar ? 'none' : 'inline-block',
        }"
        @click="commonStore.showSidebar = true"
      ></span>
      <div class="flex items-center overflow-hidden pr-4">
        <span
          v-if="commonStore.headerContent.icon"
          :class="`pi ${commonStore.headerContent.icon} mr-2`"
          style="font-size: 20px"
        ></span>
        <span
          class="text-[17px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
          >{{ commonStore.headerContent.text }}</span
        >
      </div>
    </div>

    <div class="flex items-center gap-3">
      <!-- <button
        class="px-[10px] py-[8px] bg-green-100 text-green-600 flex items-center rounded-md hover:bg-green-200"
        @click="visible = true"
      >
        <span class="pi pi-user-plus mr-2"></span>
        <span class="text-[14px] leading-none">Invite</span>
      </button>

      <div
        class="w-[30px] h-[30px] p-[7px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_panel"
      >
        <span class="pi pi-bell text-gray-500"></span>
      </div> -->

      <Avatar
        :image="userStore.user.avatar"
        :label="userStore.user.firstName[0].toUpperCase()"
        size="small"
        class="mr-2 cursor-pointer border border-gray-400"
        @click="toggleUserMenu"
      />
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    header="Invite new teammates 🧑‍🤝‍🧑"
    :style="{ width: '50vw' }"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Dialog>

  <OverlayPanel ref="op" class="w-[500px]">
    <TabView>
      <TabPanel header="All">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </TabPanel>
      <TabPanel header="Me">
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
          sed quia non numquam eius modi.
        </p>
      </TabPanel>
      <TabPanel header="Mention">
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus.
        </p>
      </TabPanel>
    </TabView>
  </OverlayPanel>

  <OverlayPanel ref="showUserMenu" class="w-[250px]">
    <div class="p-3 flex items-center">
      <Avatar
        :image="userStore.user.avatar"
        :label="userStore.user.firstName[0].toUpperCase()"
        size="small"
        class="border border-gray-400"
      />
      <div>
        <span class="text-[14px] ml-3 font-bold block leading-none"
          >{{ userStore.user.firstName }} {{ userStore.user.lastName }}</span
        >
        <span class="text-[12px] ml-3 leading-none block mt-1">{{
          userStore.user.email
        }}</span>
      </div>
    </div>

    <div>
      <RouterLink
        to="/setting/user/profile"
        class="px-4 py-2 cursor-pointer block hover:bg-gray-100"
      >
        <span class="pi pi-user mr-3 text-gray-400"></span>
        <span class="text-[14px]">Edit profile</span>
      </RouterLink>
      <div
        class="px-4 py-2 cursor-pointer hover:bg-gray-100"
        @click="handleLogout"
      >
        <span class="pi pi-sign-out mr-3 text-gray-400"></span>
        <span class="text-[14px]">Logout</span>
      </div>
    </div>
  </OverlayPanel>
</template>

<style>
.p-overlaypanel-content {
  padding: 0 !important;
}

.p-tabview .p-tabview-nav li a.p-tabview-nav-link {
  padding: 15px;
  font-size: 13px;
}

.p-tabview .p-tabview-nav li a.p-tabview-nav-link:not(.p-disabled):focus {
  box-shadow: none;
}
</style>

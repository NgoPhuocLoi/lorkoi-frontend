<script setup>
import Dialog from "primevue/dialog";
import OverlayPanel from "primevue/overlaypanel";

import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { ref } from "vue";
const visible = ref(false);
const op = ref(null);

const toggle = (e) => {
  op.value.toggle(e);
};
</script>

<template>
  <div
    class="flex justify-between items-center h-[46px] pl-[32px] pr-[16px] border flex-shrink-0"
  >
    <div class="flex items-center">
      <div class="text-[20px] leading-none mt-[4px] mr-2">
        <ion-icon name="folder-outline"></ion-icon>
      </div>
      <span class="leading-none text-[17px] font-semibold">My actions</span>
    </div>

    <div class="flex items-center gap-3">
      <button
        class="px-[10px] py-[6px] bg-green-100 text-green-600 flex items-center rounded-md hover:bg-green-200"
        @click="visible = true"
      >
        <div class="mt-[4px] mr-1 leading-none">
          <ion-icon name="person-add-outline"></ion-icon>
        </div>
        <span class="text-[14px] leading-none">Invite</span>
      </button>

      <div
        class="w-[30px] h-[30px] p-[7px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_panel"
      >
        <ion-icon name="notifications-outline"></ion-icon>
      </div>

      <Avatar
        image="https://lh3.googleusercontent.com/a/AGNmyxbQGlKF2CebRae6O1V-B_zOuekgWVT1L57NZA4w3Q=s96-c"
        label="L"
        class="mr-2"
        size="small"
        style="background-color: #2196f3; color: #ffffff"
        shape="circle"
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

  <OverlayPanel ref="op">
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
</template>

<style>
.p-overlaypanel {
  width: 600px;
}

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

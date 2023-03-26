<script setup>
import { useRoute } from "vue-router";
import AvatarGroup from "primevue/avatargroup";
const route = useRoute();
</script>

<template>
  <div class="h-[40px] pl-[20px] shadow flex items-center justify-between">
    <div class="flex items-center">
      <span class="pi pi-bookmark"></span>

      <AvatarGroup class="ml-4">
        <Avatar label="A" size="small" shape="circle" />
        <Avatar label="B" size="small" shape="circle" />
        <Avatar label="C" size="small" shape="circle" />
        <Avatar label="D" size="small" shape="circle" />
        <Avatar label="E" size="small" shape="circle" />
        <Avatar
          label="+2"
          shape="circle"
          size="small"
          style="background-color: '#9c27b0', color: '#ffffff'"
        />
      </AvatarGroup>
    </div>

    <div>
      <Button
        icon="pi pi-bookmark"
        severity="secondary"
        outlined
        aria-label="Bookmark"
        size="small"
      />
    </div>
  </div>

  <div class="flex-1 overflow-auto">
    <div class="p-5 pb-0 flex gap-7 overflow-x-auto bg-[#f8f8f8] h-full">
      <div class="w-[255px] flex-shrink-0 max-h-full flex flex-col">
        <div class="flex items-center justify-between">
          <h4>Backlog</h4>
          <span class="pi pi-ellipsis-v block p-2 cursor-pointer"></span>
        </div>

        <div class="pr-2 mt-3">
          <input
            type="text"
            class="py-2 pl-2 pr-7 rounded-md outline outline-gray-200 outline-1 w-full"
            placeholder="Create new action"
          />
        </div>

        <div class="mt-5 pr-2 flex-1 overflow-auto content">
          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>

          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>
          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-[255px] flex-shrink-0 max-h-full flex flex-col">
        <div class="flex items-center justify-between">
          <h4>Backlog</h4>
          <span class="pi pi-ellipsis-v block p-2 cursor-pointer"></span>
        </div>

        <div class="pr-2 mt-3">
          <input
            type="text"
            class="py-2 pl-2 pr-7 rounded-md outline outline-gray-200 outline-1 w-full"
            placeholder="Create new action"
          />
        </div>

        <div class="mt-5 pr-2 flex-1 overflow-auto content">
          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>

          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>
          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-[255px] flex-shrink-0 max-h-full flex flex-col">
        <div class="flex items-center justify-between">
          <h4>Backlog</h4>
          <span class="pi pi-ellipsis-v block p-2 cursor-pointer"></span>
        </div>

        <div class="pr-2 mt-3">
          <input
            type="text"
            class="py-2 pl-2 pr-7 rounded-md outline outline-gray-200 outline-1 w-full"
            placeholder="Create new action"
          />
        </div>

        <div class="mt-5 pr-2 flex-1 overflow-auto content">
          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>

          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>
          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-[255px] flex-shrink-0 max-h-full flex flex-col">
        <div class="flex items-center justify-between">
          <h4>Backlog</h4>
          <span class="pi pi-ellipsis-v block p-2 cursor-pointer"></span>
        </div>

        <div class="pr-2 mt-3">
          <input
            type="text"
            class="py-2 pl-2 pr-7 rounded-md outline outline-gray-200 outline-1 w-full"
            placeholder="Create new action"
          />
        </div>

        <div class="mt-5 pr-2 flex-1 overflow-auto content">
          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>

          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>
          <div class="w-full rounded-sm overflow-hidden mt-4">
            <div
              class="p-2 text-[14px] shadow-md bg-white border border-blue-900 border-t-0 border-l-4 border-r-0 border-b-0"
            >
              <div class="pb-7">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo,
                nostrum?
              </div>

              <div class="flex">
                <Avatar class="ml-auto" label="A" shape="circle" size="small" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.p-avatar.extra-small {
  width: 24px;
  font-size: 13px;
  height: 24px;
}

button.p-button.p-button-sm {
  padding: 10px;
}

.content {
  mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 17px, black 17px);
  mask-size: 100% 20000px;
  mask-position: left bottom;
  -webkit-mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 17px, black 17px);
  -webkit-mask-size: 100% 20000px;
  -webkit-mask-position: left bottom;
  transition: mask-position 0.3s, -webkit-mask-position 0.3s;
}

.content:hover {
  -webkit-mask-position: left top;
}
</style>

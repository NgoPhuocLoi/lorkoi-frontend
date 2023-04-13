<script setup></script>

<template>
  <div>
    <h2 class="text-[30px] font-semibold text-gray-700 mb-[35px] leading-none">
      My Profile
    </h2>

    <div>
      <div class="flex items-center gap-5">
        <Avatar label="L" shape="circle" size="xlarge" />

        <button
          class="border border-gray-300 py-[6px] font-semibold px-[16px] text-[14px] text-gray-700 rounded-sm"
        >
          Choose Avatar
        </button>
      </div>

      <div class="flex gap-20 mr-[200px] mt-6">
        <div class="w-full">
          <label
            class="block text-[14px] text-gray-700 font-semibold mb-2"
            for=""
            >First name</label
          >
          <input
            type="text"
            class="border border-gray-300 focus:border-blue-400 px-3 py-2 text-[14px] rounded-sm outline-none w-full"
          />
        </div>
        <div class="w-full">
          <label
            class="block text-[14px] text-gray-700 font-semibold mb-2"
            for=""
            >Last name</label
          >
          <input
            type="text"
            class="border border-gray-300 focus:border-blue-400 px-3 py-2 text-[14px] rounded-sm outline-none w-full"
          />
        </div>
      </div>

      <div class="flex gap-20 mr-[200px] mt-6">
        <div class="w-full">
          <label
            class="block text-[14px] text-gray-700 font-semibold mb-2"
            for=""
            >Email</label
          >
          <input
            disabled
            type="text"
            class="border border-gray-300 focus:border-blue-400 px-3 py-2 text-[14px] rounded-sm outline-none w-full"
          />
        </div>
        <div class="w-full">
          <label
            class="block text-[14px] text-gray-700 font-semibold mb-2"
            for=""
            >Phone</label
          >
          <input
            type="text"
            class="border border-gray-300 focus:border-blue-400 px-3 py-2 text-[14px] rounded-sm outline-none w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import Dialog from "primevue/dialog";
import { avatars } from "@/data/avatar.json";
import { useUserStore } from "@/stores";
import { reactive, ref } from "vue";
import { UserService } from "@/services";
import Avatar from "@/components/common/Avatar.vue";
import useToast from "@/hooks/useToast";

const userStore = useUserStore();
const userService = new UserService();
const { showSuccessToast } = useToast();

const user = ref(userStore.user);
let timer;
const visible = ref(false);
const err = reactive({
  firstName: "",
  lastName: "",
  phone: "",
});

const handleUpdate = async (e) => {
  clearTimeout(timer);
  err[e.target.name] = "";
  timer = setTimeout(async () => {
    console.log(12);
    try {
      console.log("Update");
      await userService.update(userStore.user._id, {
        ...userStore.user,
        [e.target.name]: e.target.value,
      });
      showSuccessToast("Profile is updated!");
    } catch (error) {
      console.log(error);
      const errors = error.response?.data.errors;
      console.log({ errors });
      if (errors) {
        for (let e of errors) {
          console.log(e.param);
          err[e.param] = e.msg;
        }
      }
    }
  }, 600);
};

const handleUpdateAvatar = async (avatar) => {
  try {
    await userService.update(userStore.user._id, {
      ...user.value,
      avatar,
    });
    userStore.setUser({ ...user.value, avatar });
    user.value.avatar = avatar;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <h2 class="text-[30px] font-semibold text-gray-700 mb-[35px] leading-none">
      My Profile
    </h2>

    <div>
      <div class="flex items-center gap-5">
        <Avatar
          :image="user.avatar"
          :label="user.firstName[0]"
          size="xlarge"
          class="border border-gray-400 p-1"
        />

        <button
          class="border border-gray-300 py-[6px] font-semibold px-[16px] text-[14px] text-gray-700 rounded-sm"
          @click="visible = true"
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
            v-model="user.firstName"
            name="firstName"
            @input="handleUpdate"
          />

          <span class="error-msg">{{ err.firstName }}</span>
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
            v-model="user.lastName"
            name="lastName"
            @input="handleUpdate"
          />
          <span class="error-msg">{{ err.lastName }}</span>
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
            class="border border-gray-300 focus:border-blue-400 px-3 py-2 text-[14px] rounded-sm outline-none w-full cursor-not-allowed"
            :value="userStore.user.email"
            name="email"
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
            v-model="user.phone"
            name="phone"
            @input="handleUpdate"
          />
          <span class="error-msg">{{ err.phone }}</span>
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    header="Choose a avatar for you"
    :style="{ width: '30vw' }"
  >
    <div class="flex flex-wrap justify-evenly gap-4">
      <div
        v-for="(avatar, index) in avatars"
        :class="`w-[30%] p-2 rounded-full border cursor-pointer hover:border-blue-400 ${
          user.avatar === avatar ? 'border-blue-400' : ''
        }`"
        :key="index"
        @click="handleUpdateAvatar(avatar)"
      >
        <img :src="avatar" alt="" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped></style>

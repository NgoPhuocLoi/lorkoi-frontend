<script setup>
import { AuthService } from "@/services";
import { socket } from "@/services/socket";
import ProgressSpinner from "primevue/progressspinner";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const authService = new AuthService();

const router = useRouter();

const loading = ref(false);
const user = reactive({
  email: "",
  password: "",
});

const err = reactive({
  email: "",
  password: "",
});

const resetErr = (e) => {
  err[e.target.id] = "";
};

const handleLogin = async () => {
  loading.value = true;
  try {
    const res = await authService.login(user);
    localStorage["token"] = res.data.tokens.accessToken;
    socket.connect();
    router.push("/");
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log({ errors });
    if (errors) {
      for (let e of errors) {
        console.log(e.param);
        err[e.param] = e.msg;
      }
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-7 border rounded-md shadow-md bg-white">
    <h2 class="text-[30px] font-bold text-center">Login</h2>
    <div class="px-[10px]">
      <div class="mt-7">
        <div class="p-float-label">
          <InputText
            id="email"
            type="text"
            v-model="user.email"
            class="w-full"
            @input="resetErr"
          />
          <label for="email">Email</label>
        </div>
        <span class="error-msg">{{ err.email }}</span>
      </div>

      <div class="my-7">
        <div class="p-float-label">
          <InputText
            id="password"
            :type="'password'"
            v-model="user.password"
            class="w-full"
            @input="resetErr"
          />
          <label for="password">Password</label>
        </div>
        <span class="error-msg">{{ err.password }}</span>
      </div>

      <Button
        @click="handleLogin"
        label="Sign up"
        size="small"
        class="w-full flex items-center justify-center"
        :disabled="loading"
        ><ProgressSpinner
          v-if="loading"
          style="width: 20px; height: 20px"
          strokeWidth="6"
        />
        <span v-else>Login</span></Button
      >
    </div>

    <RouterLink
      class="text-blue-500 mt-3 text-sm text-center block font-semibold hover:opacity-80"
      to="/auth/register"
      >Don't have an account? Sign up now!!</RouterLink
    >
  </div>
</template>

<style scoped></style>

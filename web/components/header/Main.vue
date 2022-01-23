<template>
  <header class="bg-indigo-600">
    <div class="container mx-auto h-20 flex justify-between items-center text-white">
      <NuxtLink :to="{ name: 'index' }" class="inline-flex items-center gap-x-5">
        <SvgIcon name="icons/logo" class="w-10 h-10" />
        Task editor
      </NuxtLink>
      <NuxtLink :to="{ name: 'add' }" class="add">
        Add
      </NuxtLink>
    </div>
  </header>
</template>

<style>
  .add{
    background: #FFFFFF;
    border-radius: 6px;
    padding: 4px 14px;
    color: #4F46E5;
    font-weight: 500;
  }
</style>

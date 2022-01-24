<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col items-center w-full my-8">
      <SvgIcon name="icons/plus-circle" class="w-20 h-20" />
      <h3 class="text-gray-900 text-xl font-bold ">
        Add a task
      </h3>
    </div>
    <div class="card flex flex-col items-center w-1/3 py-8 px-10">
      <div class="form w-full">
        <div class="mb-6">
          <formInput name="title" :value="title" label="title" options="taskList" @input="title = $event" />
        </div>
        <div class="mb-6">
          <formInputTextArea name="description" :value="description" label="Describe it" options="taskList" @input="description = $event" />
        </div>
        <div class="flex flex-col lg:flex-row mb-6">
          <formInput name="date" :value="date" label="date" class="lg:w-1/2 lg:pr-4" @input="date = $event" />
          <formSelect name="status"
                      :value="status"
                      :options="statusList"
                      label="status"
                      class="lg:w-1/2 lg:pl-2"
                      @input="status = $event"
          />
        </div>
        <button class="w-full bg-indigo-600 text-white rounded-md py-2 text-sm leading-5 font-medium mb-6" @click="postForm">
          Submit
        </button>
        <NuxtLink :to="{ name: 'index' }">
          <button class="w-full bg-gray-50 text-black rounded-md py-2 text-sm leading-5 font-medium ">
            Cancel
          </button>
        </NuxtLink>
        <span v-if="errorField" class="text-red-500">Veuillez vérifier vos champs</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 1000000)).toISOString().substr(0, 10),
      status: 'TODO',
      statusList: [
        {
          label: 'To Do',
          value: 'TODO'
        },
        {
          label: 'Done',
          value: 'DONE'
        }
      ],
      errorField: false
    }
  },
  methods: {
    postForm () {
      if (this.title !== '' && this.description !== '') {
        this.$api.tasks.postTask({ title: this.title, description: this.description, date: this.date, status: this.status }).then(() => {
          this.$router.push({ name: 'index' })
        })
      } else {
        this.errorField = true
      }
    }
  }
}
</script>

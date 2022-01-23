<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col items-center w-full my-8">
      <SvgIcon name="icons/pencil" class="w-20 h-20" />
      <h3 class="text-gray-900 text-xl font-bold ">
        Edit a task
      </h3>
    </div>
    <div class="card flex flex-col items-center w-1/3 py-8 px-10">
      <div class="form w-full">
        <div class="mb-6">
          <formInput name="title" :value="task.title" label="title" options="taskList" @input="task.title = $event" />
        </div>
        <div class="mb-6">
          <formInputTextArea name="description" :value="task.description" label="Describe it" options="taskList" @input="task.description = $event" />
        </div>
        <div class="flex flex-col lg:flex-row mb-6">
          <formInput name="date" :value="task.date" label="date" class="lg:w-1/2 lg:pr-4" @input="task.date = $event" />
          <formSelect name="status"
                      :value="task.status.value"
                      :options="statusList"
                      label="status"
                      class="lg:w-1/2 lg:pl-2"
                      @input="task.status.value = $event"
          />
        </div>
        <button class="w-full bg-indigo-600 text-white rounded-md py-2 text-sm leading-5 font-medium mb-6" @click="editForm">
          Submit
        </button>
        <NuxtLink :to="{ name: 'index' }">
          <button class="w-full bg-gray-50 text-black rounded-md py-2 text-sm leading-5 font-medium ">
            Cancel
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $api, error, route }) {
    const [err, task] = await $api.tasks.findOne(route.query.id)

    if (err) {
      return error({
        statusCode: 404,
        message: err
      })
    }
    if (task.date) {
      task.date = new Date(task.date).toISOString().substr(0, 10)
    }

    return {
      task
    }
  },
  data () {
    return {
      title: '',
      description: '',
      status: 'TODO',
      date: '',
      statusList: [
        {
          label: 'To Do',
          value: 'TODO'
        },
        {
          label: 'Done',
          value: 'DONE'
        }
      ]
    }
  },
  methods: {
    editForm () {
      this.$api.tasks.patchTask(this.$route.query.id, { title: this.task.title, description: this.task.description, date: this.task.date, status: this.task.status.value })
    }
  }
}
</script>

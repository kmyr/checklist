<template>
  <div>
    <form class="form">
      <h2 style="text-transform:capitalize;">{{ this.$route.params.task }}</h2>
      <div class="inputGroup d-flex" v-for="(task, i) in checklist" :key="i">
        <input :id="'taskItem' + i" type="checkbox" v-model="task.status" />
        <label
          :for="'taskItem' + i"
          style="font-size:25px"
          @click="checkItem(task, false)"
        >
          <button
            type="button"
            class="openTaskBtn"
            @click="showItemDetails(task)"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-three-dots-vertical"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
              />
            </svg>
          </button>
          {{ task.title }}
          <span style="font-size:13px;" class="dueDateText">
            {{ task.dueDate.year }}/{{ task.dueDate.month }}/{{
              task.dueDate.day
            }}</span
          >
        </label>
      </div>
    </form>
    <!-- modal -->
    <!-- actionModal -->
    <b-modal id="actionModal" title="Add New Item" ok-only>
      <div class="form-group">
        <label for="titleInput">Title</label>
        <input
          type="text"
          class="form-control"
          id="titleInput"
          v-model="prepareItem.title"
        />
      </div>
      <div class="form-group">
        <label for="notesInput">Notes</label>
        <input
          type="text"
          class="form-control"
          id="notesInput"
          v-model="prepareItem.notes"
        />
      </div>
      <div class="form-group">
        <label for="dueDateInput">Due Date</label>
        <div class="row">
          <div class="col-md-3">
            <input
              type="number"
              class="form-control"
              id="dueDateInput"
              v-model="prepareItem.dueDate.year"
              placeholder="Year"
            />
          </div>
          <div class="col-md-3">
            <input
              type="number"
              class="form-control"
              id="dataInput"
              v-model="prepareItem.dueDate.month"
              placeholder="Month"
            />
          </div>
          <div class="col-md-3">
            <input
              type="number"
              class="form-control"
              id="dataInput"
              v-model="prepareItem.dueDate.day"
              placeholder="Day"
            />
          </div>
          <br />
        </div>
      </div>
      <button
        @click="addItem()"
        class="btn btn-outline-success"
        v-if="!updatingItem"
      >
        Add Item
      </button>
      <button
        @click="checkItem(prepareItem, true, currentUpdatingItem)"
        class="btn btn-outline-success"
        v-if="updatingItem"
      >
        Edit Item
      </button>
    </b-modal>
    <!-- showDetailsModal -->
    <b-modal id="showDetailsModal" :title="prepareItem.title" ok-only>
      <h3>
        {{ prepareItem.title }}
        <span v-if="prepareItem.status" style="font-size:10px">(Done)</span>
      </h3>
      <div class="d-flex">
        <p style="font-weight:900">Created Date:</p>
        <p>{{ prepareItem.createdDate }}</p>
      </div>
      <div class="d-flex">
        <p style="font-weight:900">Due Date:</p>
        <p>
          {{ prepareItem.dueDate.year }}/{{ prepareItem.dueDate.month }}/{{
            prepareItem.dueDate.day
          }}
        </p>
      </div>
      <div class="d-flex">
        <p style="font-weight:900">Notes:</p>
        <p>{{ prepareItem.notes }}</p>
      </div>
      <div class="col-md-12">
        <button
          @click="deleteData($route.params.task, prepareItem)"
          type="button"
          class="btn btn-outline-danger"
        >
          Delete Item
        </button>

        <button
          @click="startEditAction()"
          type="button"
          class="btn btn-outline-success"
          style="float:right"
        >
          Edit Item
        </button>
      </div>
    </b-modal>

    <!-- buttonSection -->
    <button
      class="btn btn-success actionsBtn newItem"
      type="button"
      @click="showModal('actionModal')"
    >
      +
    </button>
    <button
      class="btn btn-outline-danger actionsBtn backBtn"
      type="button"
      @click="showModal('actionModal')"
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-arrow-bar-left"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M5.854 4.646a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L3.207 8l2.647-2.646a.5.5 0 0 0 0-.708z"
        />
        <path
          fill-rule="evenodd"
          d="M10 8a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0 0 1h6.5A.5.5 0 0 0 10 8zm2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"
        />
      </svg>
    </button>
  </div>
</template>
<script>
import getData from "../actions/getData";
import postData from "../actions/postData";
import updateData from "../actions/updateData";
import deleteData from "../actions/deleteData";
import { shamsiDate } from "../main";
import { shamsiYear } from "../main";
import { shamsiMonth } from "../main";
import { shamsiDay } from "../main";
export default {
  data() {
    return {
      prepareItem: { dueDate: { year: "1399", month: "", day: "" } },
      checklist: [],
      currentDate: null,
      updatingItem: false,
      currentUpdatingItem: null,
    };
  },
  mixins: [getData, postData, updateData, deleteData],
  created() {
    this.getData(this.$route.params.task, this.checklist);
    this.checkDueDate();
    this.currentDate = shamsiDate;
  },
  methods: {
    addItem() {
      this.prepareItem.createdDate = this.currentDate;
      this.postData(this.$route.params.task, this.prepareItem, true);
    },
    showItemDetails(object) {
      this.prepareItem = object;
      this.showModal("showDetailsModal");
    },
    showModal(target, resetInput) {
      if (resetInput == true) {
        this.prepareItem = { dueDate: { year: "1399", month: "", day: "" } };
      }
      this.$root.$emit("bv::show::modal", target, "#focusThisOnClose");
    },
    checkItem(object, reloadPage, name) {
      this.updateData(this.$route.params.task, object, name, reloadPage);
    },
    checkDueDate() {
      for (let i = 0; i < this.checklist.length; i++) {
        const expiredItem = this.checklist[i];
        if (
          parseInt(
            expiredItem.dueDate.year == shamsiYear &&
              expiredItem.dueDate.month == shamsiMonth &&
              expiredItem.dueDate.day == shamsiDay
          )
        ) {
          alert("woww");
        }
      }
    },
    startEditAction() {
      this.showModal("showDetailsModal");
      this.updatingItem = true;
      this.currentUpdatingItem = this.prepareItem.title;
      this.showModal("actionModal");
    },
  },
  watch: {},
};
</script>
<style scoped>
@import url("../assets/style/task.css");
</style>

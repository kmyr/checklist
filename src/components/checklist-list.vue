<template>
  <div>
    <div class="container">
      <br />
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">پروشات فیلتر</h5>
              <button class="btn btn-primary task-link">
                <router-link to="/poroshatfilter">مدیریت کارها</router-link>
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">کار های شخصی</h5>
              <button class="btn btn-primary task-link">
                <router-link to="/personal">مدیریت کارها</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
@import url("../assets/style/tasksList.css");
</style>

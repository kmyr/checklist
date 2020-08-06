<script>
import db from "../database/firebaseInit";
export default {
  methods: {
    postData(document, obj, reloadPage) {
      db.collection(document)
        .add(obj)
        .catch(error => console.log(error))
        .then(() => {
          if (reloadPage) {
            location.reload();
          }
        });
    }
  }
};
</script>
<script>
import db from "../datastore/firebaseInit";
export default {
  methods: {
    updateData(document, obj) {
      db.collection(document)
        .where("name", "==", obj.name)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update(obj).then(() => {
              location.reload();
            });
          });
        });
    }
  }
};
</script>
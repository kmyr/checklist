<script>
import db from "../datastore/firebaseInit";

export default {
  methods: {
    async deleteData(doc, obj) {
      db.collection(doc)
        .where("name", "==", obj.name)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });
    }
  }
};
</script>
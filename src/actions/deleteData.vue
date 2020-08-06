<script>
import db from "../database/firebaseInit";

export default {
  methods: {
    async deleteData(doc, obj) {
      db.collection(doc)
        .where("title", "==", obj.title)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
    },
  },
};
</script>

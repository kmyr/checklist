<script>
import db from "../database/firebaseInit";
export default {
  methods: {
    updateData(document, obj, name, reloadPage) {
      if (name == undefined) {
        name = obj.title;
      }
      db.collection(document)
        .where("title", "==", name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update(obj).then(() => {
              if (reloadPage) {
                location.reload();
              }
            });
          });
        });
    },
  },
};
</script>

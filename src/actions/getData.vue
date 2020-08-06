<script>
import db from "../database/firebaseInit";
export default {
  methods: {
    getData(document, arr) {
      db.collection(document)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              createdDate: doc.data().createdDate,
              dueDate: doc.data().dueDate,
              notes: doc.data().notes,
              title: doc.data().title,
              status: doc.data().status
            };
            arr.push(data);
          });
        });
    }
  }
};
</script>
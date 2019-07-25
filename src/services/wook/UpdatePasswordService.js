import firebase from 'firebase'
import RegisterService from '@/services/wook/RegisterService'

export default{
    Update (email) {
        var query=firebase.database().ref("user").orderByKey();
        query.once("value")
        .then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var key=childSnapshot.key;
                var childData = childSnapshot.val();
                var cripted=RegisterService.Crypto(childData.email,childData.password);
                if(email===childData.email){
                    firebase.database().ref().child('/user/' + key)
                    .update({ 
                        password:cripted,
                    });
                    return true;
                }
            })
        })
    }
}

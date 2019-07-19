import firebase from 'firebase'
import Swal from 'sweetalert2'

export default{
    ResetEmail(param){
        var auth = firebase.auth();
        var emailAddress = param;
       
        auth.sendPasswordResetEmail(emailAddress).then(function() {
        Swal.fire({
          type:'info',
          text:'가입된 이메일로 비밀번호가 수신되었습니다!'
        })
        }).catch(function(error) {
            console.log(error);
        });
    }
}

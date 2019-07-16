import firebase from 'firebase' 
export default{
    ResetEmail(param){
        var auth = firebase.auth();
        var emailAddress = param; 
        auth.sendPasswordResetEmail(emailAddress).then(function() {
        alert('가입된 이메일로 비밀번호가 수신되었습니다!');
        }).catch(function(error) {
            console.log(error);
        });
    }
}
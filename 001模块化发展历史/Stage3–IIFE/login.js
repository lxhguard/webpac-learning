(function() {
    let moduleName = 'login module';
    function GetOTP () {
        console.log('login---GetOTP() + moduleName:', moduleName);
    }
    window.login = {
        GetOTP: GetOTP()
    }
})();
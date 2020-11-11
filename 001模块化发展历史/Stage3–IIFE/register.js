(function() {
    let moduleName = 'register module';
    function GetOTP () {
        console.log('register---GetOTP() + moduleName:', moduleName);
    }
    window.register = {
        GetOTP: GetOTP()
    }
})();
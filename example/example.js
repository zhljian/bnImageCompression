let compression = require('../index');

compression.compress("../../game-js-slots/build/jsb-default/res/raw-assets/resources/10001/", null, '../key.txt', function(error){
    if (error) {
        console.error(error);
        return ;
    }
    console.log('compress success');
});
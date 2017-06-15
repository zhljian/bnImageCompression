let compression = require('../index');

compression.compress("/zhljian/work/source/", "/zhljian/work/compression", 'mWOnZaTbJTNARWKPy8mdgf1Ju3cROIjU', function(error){
    if (error) {
        console.error(error);
        return ;
    }
    console.log('compress success');
});
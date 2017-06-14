let compression = require('../index');

compression.compressionDir("/zhljian/work/source/", "/zhljian/work/compression", 'mWOnZaTbJTNARWKPy8mdgf1Ju3cROIjU', function(error){
    if (error) {
        console.error(error);
        return ;
    }
    console.log('compression success');
});